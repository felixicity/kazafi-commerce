import { TableCellViewer } from "./table-cell-viewer";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { productSchema } from "./products-table";

export const columns: ColumnDef<z.infer<typeof productSchema>>[] = [
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
            accessorKey: "imageURLs",
            header: "",
            cell: ({ row }) => <TableCellViewer item={row.original} />,
            enableHiding: false,
      },
      {
            accessorKey: "productName",
            header: "Product",
            cell: ({ row }) => <div className="font-semibold text-shadow-muted">{row.original.name}</div>,
      },
      {
            accessorKey: "stock",
            header: "Stock",
            cell: ({ row }) => (
                  <div>
                        <span className="text-red-700">
                              {row.original.variations.reduce((acc, varr) => acc + Number(varr.stock), 0)} items in
                              stock
                        </span>
                        <br />
                        {row.original.variations.length > 1 && `${row.original.variations.length} variants`}
                  </div>
            ),
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
