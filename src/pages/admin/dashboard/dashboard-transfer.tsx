import { Users, Store, Repeat, FileText, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Chart from "react-apexcharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TableTransfer } from "@/components/admin/transfer";
import useListTransfer from "@/hooks/admin/transfer/ListTransfer";
import useTransferStore from "@/store/transfer/transfer";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "@/helpers/debounce";
import { formatRupiah } from "@/helpers/formatRupiah";
import ThemeChart from "@/components/ui/chart";
import ChartSkeleton from "@/components/ui/chartSkeleton";

export default function DashboardTransfers() {
  const initialYear = useMemo(() => {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }, []);

  const [selectedYear, setSelectedYear] = useState<number>(initialYear);

  const {
    table,
    search,
    setSearch,
    loadingGetTransfers,
    pagination,
    handlePageChange,
    handlePageSizeChange,
    isLoadingWithDelay,
    showModal,
  } = useListTransfer();
  const { toast } = useToast();

  const {
    findMonthStatusSuccess,
    monthStatusSuccess,
    loadingMonthStatusSuccess,
    errorMonthStatusSuccess,
    setLoadingMonthStatusSuccess,
    setErrorMonthStatusSuccess,

    findYearStatusSuccess,
    yearStatusSuccess,
    loadingYearStatusSuccess,
    errorYearStatusSuccess,
    setLoadingYearStatusSuccess,
    setErrorYearStatusSuccess,

    findMonthStatusFailed,
    monthStatusFailed,
    loadingMonthStatusFailed,
    errorMonthStatusFailed,
    setLoadingMonthStatusFailed,
    setErrorMonthStatusFailed,

    findYearStatusFailed,
    yearStatusFailed,
    loadingYearStatusFailed,
    errorYearStatusFailed,
    setLoadingYearStatusFailed,
    setErrorYearStatusFailed,

    findMonthTransferAmount,
    monthTransferAmount,
    loadingMonthTransferAmount,
    errorMonthTransferAmount,
    setLoadingMonthTransferAmount,
    setErrorMonthTransferAmount,

    findYearTransferAmount,
    yearTransferAmount,
    loadingYearTransferAmount,
    setLoadingYearTransferAmount,
    setErrorYearTransferAmount,
  } = useTransferStore();

  const monthlyAmount = useMemo(() => {
    if (!monthTransferAmount || !Array.isArray(monthTransferAmount)) {
      return Array(12).fill(0);
    }

    const balances = Array(12).fill(0);
    const year = new Date().getFullYear();

    monthTransferAmount.forEach((balance) => {
      const monthIndex = new Date(`${balance.month} 1, ${year}`).getMonth();
      if (balance.total_amount !== undefined) {
        balances[monthIndex] = balance.total_amount;
      }
    });

    return balances;
  }, [monthTransferAmount]);

  const yearlyAmount = useMemo(() => {
    if (!yearTransferAmount || !Array.isArray(yearTransferAmount)) {
      return Array(5).fill(0);
    }

    const balanceMap = new Map<number, number>();
    yearTransferAmount.forEach((balance) => {
      balanceMap.set(Number(balance.year), balance.total_amount);
    });

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);

    return years.map((year) => balanceMap.get(year) || 0);
  }, [yearTransferAmount]);

  const fetchMonthlyAmount = useCallback(
    async (year: number) => {
      try {
        setLoadingMonthTransferAmount(true);
        setErrorMonthTransferAmount(null);

        await findMonthTransferAmount(toast, year);
      } catch (error) {
        console.error("Failed to fetch monthly payment method:", error);
        setErrorMonthTransferAmount("Failed to fetch monthly payment method");
      } finally {
        setLoadingMonthTransferAmount(false);
      }
    },
    [
      findMonthTransferAmount,
      setLoadingMonthTransferAmount,
      setErrorMonthTransferAmount,
    ],
  );

  const fetchYearlyAmount = useCallback(
    async (year: number) => {
      try {
        setLoadingYearTransferAmount(true);
        setErrorYearTransferAmount(null);

        await findYearTransferAmount(toast, year);
      } catch (error) {
        setErrorYearTransferAmount("Failed to fetch yearly balance");
      } finally {
        setLoadingYearTransferAmount(false);
      }
    },
    [
      findYearTransferAmount,
      setLoadingYearTransferAmount,
      setErrorYearTransferAmount,
    ],
  );

  const debouncedFetchMonthlyAmount = debounce(fetchMonthlyAmount, 300);
  const debouncedFetchYearlyAmount = debounce(fetchYearlyAmount, 300);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        debouncedFetchMonthlyAmount(selectedYear),
        debouncedFetchYearlyAmount(selectedYear),
      ]);
    };

    fetchData();

    return () => {
      debouncedFetchMonthlyAmount.cancel();
      debouncedFetchYearlyAmount.cancel();
    };
  }, [selectedYear]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mt-10">
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Transfers
            </CardTitle>
            <Repeat className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80</div>{" "}
          </CardContent>
        </Card>
        <Card className="w-full shadow-lg rounded-md border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Successful Transfers
            </CardTitle>
            <Repeat className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>{" "}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Transfers
            </CardTitle>
            <Repeat className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>{" "}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Transfers
            </CardTitle>
            <Repeat className="h-6 w-6 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>{" "}
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-8 mt-4">
        <div className="flex justify-between">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {/* {format(selectedMonth, "MMMM", { locale: id })}{" "} */}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  // selected={selectedMonth}
                  // onSelect={(date) => {
                  //   if (date) {
                  //     setSelectedMonth(date);
                  //     fetchMonthlyData(date);
                  //   }
                  // }}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            {/* <YearPicker
              selectedYear={selectedYear}
              onYearChange={(date) => handleYearChange(date)}
            /> */}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {loadingMonthTransferAmount ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Monthly Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "monthly-amount-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ],
                    },
                    yaxis: {
                      title: { text: "Balance (Rp)" },
                      labels: {
                        formatter: (value) => formatRupiah(value),
                      },
                    },
                    tooltip: {
                      y: {
                        formatter: (value) => formatRupiah(value),
                      },
                    },
                    colors: ["#6366F1"],
                  }}
                  series={[{ name: "Monthly Balance", data: monthlyAmount }]}
                  type="line"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
          {loadingYearTransferAmount ? (
            <ChartSkeleton />
          ) : (
            <Card className="w-full shadow-lg rounded-md border">
              <CardHeader>
                <CardTitle>Yearly Balances</CardTitle>
              </CardHeader>
              <CardContent>
                <ThemeChart
                  options={{
                    chart: {
                      id: "yearly-amount-chart",
                      toolbar: { show: false },
                    },
                    xaxis: {
                      categories: Array.from({ length: 5 }, (_, i) =>
                        (new Date().getFullYear() - 4 + i).toString(),
                      ),
                    },
                    yaxis: {
                      title: { text: "Balance (Rp)" },
                      labels: {
                        formatter: (value) => formatRupiah(value),
                      },
                    },
                    tooltip: {
                      y: {
                        formatter: (value) => formatRupiah(value),
                      },
                    },
                    colors: ["#22C55E"],
                  }}
                  series={[{ name: "Yearly Amount", data: yearlyAmount }]}
                  type="bar"
                  height={300}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <TableTransfer
        search={search}
        setSearch={setSearch}
        isLoadingWithDelay={isLoadingWithDelay}
        loadingGetTransfers={loadingGetTransfers}
        table={table}
        pagination={pagination}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
