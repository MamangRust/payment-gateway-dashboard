import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash, MoreHorizontal } from "lucide-react";
import { TableActionSaldoProps } from "@/types/table";
import useModalSaldo from "@/store/saldo/modal";

const TableActionSaldo = ({ saldo }: TableActionSaldoProps) => {
  const { showModalEdit, showModalDelete } = useModalSaldo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => console.log("Viewing details for:", saldo.id)}
        >
          <Eye className="mr-2 h-4 w-4 text-gray-500" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => showModalEdit(saldo.saldo_id)}>
          <Pencil className="mr-2 h-4 w-4 text-gray-500" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => showModalDelete(saldo.saldo_id)}
          className="text-red-600"
        >
          <Trash className="mr-2 h-4 w-4 text-red-500" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableActionSaldo;
