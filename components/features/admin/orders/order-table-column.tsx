import { TableCellViewer } from "../orders/order-table-viewer";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered"];
const PAYMENTS_STATUS = ["paid", "failed", "pending"];

export const schema = z.object({
      id: z.string(),
      customer: z.any(),
      paymentStatus: z.enum(PAYMENTS_STATUS),
      status: z.enum(STATUS_OPTIONS),
      createdAt: z.string(),
      amount: z.number(),
      items: z.string(),
});

export type Order = z.infer<typeof schema>;

export const columns: ColumnDef<Order>[] = [
      {
            accessorKey: "id",
            header: "Order Id",
            cell: ({ row }) => <div>#PO-{row.original.id}</div>,
            enableHiding: false,
            enableSorting: false,
      },
      {
            accessorKey: "createdAt",
            header: "Order date",
            cell: ({ row }) => (
                  <div>
                        <span>{row.original.createdAt.split("T")[0]}</span>
                  </div>
            ),
      },
      {
            accessorKey: "customer",
            header: "Customer email",
            cell: ({ row }) => (
                  <div>
                        {typeof row.original.customer === "object"
                              ? row.original.customer?.email
                              : row.original.customer}
                  </div>
            ),
            enableHiding: false,
      },
      {
            accessorKey: "shipping",
            header: "Status",
            cell: ({ row }) => {
                  const statusVariant = row.original.status as "delivered" | "shipped" | "processing" | "cancelled";
                  return <Badge variant={statusVariant}>{row.original.status}</Badge>;
            },
            enableHiding: false,
      },
      {
            id: "amount",
            header: "Total amount",
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
            id: "items",
            header: "Item/Qty",
            cell: ({ row }) => <div>{row.original.items}</div>,
            enableHiding: false,
      },
      {
            accessorKey: "payment",
            header: "Payment status",
            cell: ({ row }) => {
                  const paymentStatusVariant = row.original.paymentStatus as "paid" | "failed" | "pending";
                  return <Badge variant={paymentStatusVariant}>{row.original.paymentStatus}</Badge>;
            },
            enableHiding: false,
      },
      {
            id: "actions",
            cell: ({ row }) => <TableCellViewer item={row.original} />,
      },
];
