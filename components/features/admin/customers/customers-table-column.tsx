import { TableCellViewer } from "./customers-table-viewer";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { IdealCustomer } from "./customers-table";

export const columns: ColumnDef<IdealCustomer>[] = [
      {
            accessorKey: "id",
            header: "Customer Id",
            cell: ({ row }) => <div>{row.original.id}</div>,
            enableHiding: false,
            enableSorting: false,
      },
      {
            accessorKey: "name",
            header: "Customer name",
            cell: ({ row }) => <div>{row.original.name}</div>,
      },
      {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => <div>{row.original.email}</div>,
            enableHiding: false,
      },
      {
            accessorKey: "createdAt",
            header: "Account created",
            cell: ({ row }) => <div>{row.original.createdAt}</div>,
            enableHiding: false,
      },
      {
            id: "role",
            header: "Role",
            cell: ({ row }) => <div>{row.original.role}</div>,
            enableHiding: false,
      },
      {
            id: "status",
            header: "Status",
            cell: ({ row }) => <Badge variant={row.original.status}>{row.original.status}</Badge>,
            enableHiding: false,
      },
      {
            accessorKey: "login",
            header: "Last activity",
            cell: ({ row }) => <div>{row.original.login}</div>,
            enableHiding: false,
      },
      {
            id: "actions",
            cell: ({ row }) => <TableCellViewer item={row.original} />,
      },
];
