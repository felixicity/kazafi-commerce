import { TableCellViewer } from "./payment-table-viewer";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const schema = z.object({
      id: z.string(),
      order: z.string(),
      createdAt: z.string(),
      type: z.string(),
      amount: z.string(),
      status: z.string(),
      email: z.email(),
      method: z.string(),
});

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
      {
            accessorKey: "id",
            header: "Transaction Id",
            cell: ({ row }) => <div>{row.original.id}</div>,
            enableHiding: false,
            enableSorting: false,
      },
      {
            accessorKey: "order",
            header: "Order Id",
            cell: ({ row }) => <div>{row.original.order}</div>,
      },
      {
            accessorKey: "createdAt",
            header: "Transaction date",
            cell: ({ row }) => <div>{new Date(row.original.createdAt).toLocaleDateString()}</div>,
            enableHiding: false,
      },
      {
            accessorKey: "type",
            header: "Transaction type",
            cell: ({ row }) => <div>{row.original.type}</div>,
            enableHiding: false,
      },
      {
            id: "amount",
            header: "Amount",
            cell: ({ row }) => (
                  <div>
                        {new Intl.NumberFormat("en-NG", {
                              style: "currency",
                              currency: "NGN",
                        }).format(row.original.amount)}
                  </div>
            ),
            enableHiding: false,
      },
      {
            id: "status",
            header: "Payment status",
            cell: ({ row }) => <div>{row.original.status}</div>,
            enableHiding: false,
      },
      {
            accessorKey: "email",
            header: "Customer email",
            cell: ({ row }) => <div>{row.original.email}</div>,
            enableHiding: false,
      },
      {
            accessorKey: "method",
            header: "Payment method",
            cell: ({ row }) => <div>{row.original.method}</div>,
            enableHiding: false,
      },
      {
            id: "actions",
            cell: ({ row }) => <TableCellViewer item={row.original} />,
      },
];
