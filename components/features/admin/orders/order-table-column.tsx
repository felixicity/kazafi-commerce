import { TableCellViewer } from "../orders/order-table-viewer";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconDotsVertical } from "@tabler/icons-react";

export const schema = z.object({
      id: z.string(),
      customer: z.string(),
      payment: z.string(),
      shipping: z.string(),
      createdAt: z.string(),
      amount: z.number(),
});

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
      {
            accessorKey: "id",
            header: "Order Id",
            cell: ({ row }) => <TableCellViewer item={row.original} />,
            enableHiding: false,
            enableSorting: false,
      },
      {
            accessorKey: "createdAt",
            header: "Order date",
            cell: ({ row }) => (
                  <div>
                        <span>{row.original.createdAt.split("T")[0]}</span>
                        <span>{row.original.createdAt.split("T")[1]}</span>
                  </div>
            ),
      },
      {
            accessorKey: "customer",
            header: "Customer name",
            cell: ({ row }) => <div>{row.original.customer}</div>,
            enableHiding: false,
      },
      {
            accessorKey: "shipping",
            header: "Status",
            cell: ({ row }) => <Badge variant={row.original.shipping}>{row.original.shipping}</Badge>,
            enableHiding: false,
      },
      {
            id: "amount",
            header: "Total amount",
            cell: ({ row }) => <div>{row.original.amount}</div>,
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
            cell: ({ row }) => <Badge variant={row.original.payment}>{row.original.payment}</Badge>,
            enableHiding: false,
      },
      {
            id: "actions",
            cell: () => (
                  <Button variant="outline" size="sm" className="rounded-md">
                        view details <IconDotsVertical />
                  </Button>
            ),
      },
];
