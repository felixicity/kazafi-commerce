import { TableCellViewer } from "./table-cell-viewer";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

export const schema = z.object({
      id: z.number(),
      image: z.string(),
      name: z.string(),
      status: z.string(),
      instock: z.number(),
      type: z.string(),
      category: z.string(),
});

export const columns: ColumnDef<z.infer<typeof schema>>[] = [
      {
            id: "select",
            header: ({ table }) => (
                  <div className="flex items-center justify-center">
                        <Checkbox
                              checked={
                                    table.getIsAllPageRowsSelected() ||
                                    (table.getIsSomePageRowsSelected() && "indeterminate")
                              }
                              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                              aria-label="Select all"
                        />
                  </div>
            ),
            cell: ({ row }) => (
                  <div className="flex items-center justify-center">
                        <Checkbox
                              checked={row.getIsSelected()}
                              onCheckedChange={(value) => row.toggleSelected(!!value)}
                              aria-label="Select row"
                        />
                  </div>
            ),
            enableSorting: false,
            enableHiding: false,
      },
      {
            accessorKey: "image",
            header: "",
            cell: ({ row }) => <TableCellViewer item={row.original} />,
            enableHiding: false,
      },
      {
            accessorKey: "name",
            header: "Product",
            cell: ({ row }) => <div className="font-semibold text-shadow-muted">{row.original.name}</div>,
      },
      {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                  <div className="w-32">
                        <Badge variant={row.original.status || "draft"} className="px-1.5">
                              {row.original.status}
                        </Badge>
                  </div>
            ),
      },
      {
            accessorKey: "instock",
            cell: ({ row }) => <div>{row.original.instock} items in stock</div>,
      },
      {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <div>{row.original.category}</div>,
      },
      {
            id: "actions",
            cell: () => (
                  <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                              <Button
                                    variant="ghost"
                                    className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                                    size="icon"
                              >
                                    <IconDotsVertical />
                                    <span className="sr-only">Open menu</span>
                              </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Activate</DropdownMenuItem>
                              <DropdownMenuItem>Archive</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                  </DropdownMenu>
            ),
      },
];
