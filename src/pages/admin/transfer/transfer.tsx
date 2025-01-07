import { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Table } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TableHeaderTransfer from "@/components/admin/transfer/table/table-header";
import {
  TableBodyTransfer,
  TableFooterTransfer,
  transferColumns,
} from "@/components/admin/transfer/table";
import { AddTransfer } from "@/components/admin/transfer/modal/CreateModal";
import useTransferStore from "@/store/transfer/transfer";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransferPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [search, setSearch] = useState("");
  const [isLoadingWithDelay, setIsLoadingWithDelay] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    transfers,
    pagination,
    loadingGetTransfers,
    setLoadingGetTransfers,
    findAllTransfers,
  } = useTransferStore();

  const table = useReactTable({
    data: transfers || [],
    columns: transferColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      },
    },
    pageCount: pagination.totalPages || 1,
    manualPagination: true,
  });

  useEffect(() => {
    setIsLoadingWithDelay(true);

    const delayTimer = setTimeout(() => {
      setIsLoadingWithDelay(false);
    }, 2000);

    return () => clearTimeout(delayTimer);
  }, [loadingGetTransfers]);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        setLoadingGetTransfers(true);
        await findAllTransfers(search, currentPage, pageSize);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoadingGetTransfers(false);
      }
    };

    fetchTransfers();
  }, [search, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    console.log("Changing to page:", newPage);
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    console.log("Changing page size to:", newSize);
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="flex h-full overflow-hidden">
      <main className="flex-1 p-6 overflow-auto pb-20">
        <div className="flex-1 flex flex-col min-h-0">
          <Card className="w-full shadow-lg rounded-md border">
            <CardHeader className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Table Tansfer</h3>
                <div className="space-x-2">
                  <AddTransfer />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center py-4">
                <Input
                  placeholder="Filter by card number"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="max-w-sm"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Columns <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value: any) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              {isLoadingWithDelay || loadingGetTransfers ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <div className="rounded-md border h-[525px] overflow-y-scroll">
                  <Table>
                    <TableHeaderTransfer table={table} />
                    <TableBodyTransfer table={table} />
                  </Table>
                </div>
              )}
            </CardContent>
            <CardFooter className="px-4 py-4 border-t">
              <TableFooterTransfer
                table={table}
                pagination={{
                  currentPage: currentPage,
                  pageSize: pageSize,
                  totalItems: pagination.totalItems,
                  totalPages: pagination.totalPages,
                }}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
