import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TableActionTopup from "./table-action";
import { Topup } from "@/types/model";
import { Link } from "react-router-dom";

export const topupColumns: ColumnDef<Topup>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-mono">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "card_number",
    header: "Card Number",
    cell: ({ row }) => (
      <Link
        to={`/topups/detail/${row.getValue("card_number")}`}
        className="font-mono text-blue-500 underline"
      >
        {row.getValue("card_number")}
      </Link>
    ),
  },
  {
    accessorKey: "topup_no",
    header: "Topup No",
    cell: ({ row }) => <div>{row.getValue("topup_no")}</div>,
  },
  {
    accessorKey: "topup_amount",
    header: "Topup Amount",
    cell: ({ row }) => {
      const amount = row.getValue("topup_amount") as number;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "topup_method",
    header: "Topup Method",
    cell: ({ row }) => {
      const method = row.getValue("topup_method") as string;
      const formatted = method
        .replace(/_/g, " ")
        .replace(/^\w/, (c) => c.toUpperCase());
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "topup_time",
    header: "Topup Time",
    cell: ({ row }) => {
      const time = row.getValue("topup_time") as string;
      return <div>{new Date(time).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as string;
      return <div>{new Date(createdAt).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const updatedAt = row.getValue("updated_at") as string;
      return <div>{new Date(updatedAt).toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-right">Actions</div>,
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <TableActionTopup topup={row.original} />,
  },
];
