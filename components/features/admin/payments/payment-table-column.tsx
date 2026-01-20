import { TableCellViewer } from "./payment-table-viewer";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

export const schema = z.object({
      // Use catch() to provide a default if the field is missing/undefined
      id: z.string().catch("N/A"),
      order: z.string().catch("Unknown"),
      createdAt: z.string().catch(() => new Date().toISOString()),
      type: z.string().catch("Payment"),
      amount: z.number().catch(0),
      // Ensure status falls back to "pending" if the API sends something weird
      status: z.enum(["successful", "cancelled", "pending", "failed"]).catch("pending"),
      email: z.string().email().catch("no-email@example.com"),
      method: z.string().catch("Unknown"),
      updatedAt: z.string().catch(() => new Date().toISOString()),
});

export type Payment = z.infer<typeof schema>;

export const columns: ColumnDef<Payment>[] = [
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
