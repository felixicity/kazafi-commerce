"use client";

import * as React from "react";
import {
      closestCenter,
      DndContext,
      KeyboardSensor,
      MouseSensor,
      TouchSensor,
      useSensor,
      useSensors,
      type DragEndEvent,
      type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
      IconChevronDown,
      IconChevronLeft,
      IconChevronRight,
      IconChevronsLeft,
      IconChevronsRight,
      IconLayoutColumns,
      IconPlus,
} from "@tabler/icons-react";
import {
      ColumnFiltersState,
      flexRender,
      getCoreRowModel,
      getFacetedRowModel,
      getFacetedUniqueValues,
      getFilteredRowModel,
      getPaginationRowModel,
      getSortedRowModel,
      Row,
      SortingState,
      useReactTable,
      VisibilityState,
} from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
      DropdownMenu,
      DropdownMenuCheckboxItem,
      DropdownMenuContent,
      DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { columns } from "./table-columns";
import Link from "next/link";
import { ButtonGroup } from "@/components/ui/button-group";

export const productSchema = z.object({
      _id: z.string(),
      name: z.string(),
      description: z.string(),
      category: z.string(),
      variations: z.array(
            z.object({
                  color: z.string(),
                  hexCode: z.string(),
                  sizes: z.array(z.string()),
                  price: z.number(),
                  stock: z.number(),
                  imageURLs: z.array(z.string()),
                  _id: z.object({ $oid: z.string() }),
                  discount: z.string().optional(),
            }),
      ),
      isFeatured: z.boolean(),
      createdAt: z.object({ $date: z.string() }),
      updatedAt: z.object({ $date: z.string() }),
});

function DraggableRow({ row }: { row: Row<z.infer<typeof productSchema>> }) {
      const { transform, transition, setNodeRef, isDragging } = useSortable({
            id: row.id,
      });

      return (
            <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  data-dragging={isDragging}
                  ref={setNodeRef}
                  className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                  style={{
                        transform: CSS.Transform.toString(transform),
                        transition: transition,
                  }}
            >
                  {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
            </TableRow>
      );
}
type Product = z.infer<typeof productSchema>;

// 2. Apply it to the function props
export default function ProductsTable({ initialData }: { initialData: Product[] }) {
      const [data, setData] = React.useState<Product[]>(initialData || []);

      React.useEffect(() => {
            if (initialData) {
                  setData(initialData);
            }
      }, [initialData]);

      const [rowSelection, setRowSelection] = React.useState({});
      const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
      const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
      const [sorting, setSorting] = React.useState<SortingState>([]);
      const [pagination, setPagination] = React.useState({
            pageIndex: 0,
            pageSize: 10,
      });
      const sortableId = React.useId();
      const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

      const table = useReactTable({
            data,
            columns,
            state: {
                  sorting,
                  columnVisibility,
                  rowSelection,
                  columnFilters,
                  pagination,
            },
            getRowId: (row) => row._id,
            enableRowSelection: true,
            onRowSelectionChange: setRowSelection,
            onSortingChange: setSorting,
            onColumnFiltersChange: setColumnFilters,
            onColumnVisibilityChange: setColumnVisibility,
            onPaginationChange: setPagination,
            getCoreRowModel: getCoreRowModel(),
            getFilteredRowModel: getFilteredRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            getSortedRowModel: getSortedRowModel(),
            getFacetedRowModel: getFacetedRowModel(),
            getFacetedUniqueValues: getFacetedUniqueValues(),
      });

      const dataIds = React.useMemo<UniqueIdentifier[]>(() => table.getRowModel().rows.map((row) => row.id), [table]);

      function handleDragEnd(event: DragEndEvent) {
            const { active, over } = event;
            if (active && over && active.id !== over.id) {
                  setData((items) => {
                        const oldIndex = items.findIndex((item) => item._id === active.id);
                        const newIndex = items.findIndex((item) => item._id === over.id);
                        return arrayMove(items, oldIndex, newIndex);
                  });
            }
      }

      return (
            <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
                  <div className="flex items-center justify-end px-4 lg:px-6">
                        <div className="flex items-center gap-2">
                              <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                          <Button variant="outline" size="sm">
                                                <IconLayoutColumns />
                                                <span className="hidden lg:inline">Customize Columns</span>
                                                <span className="lg:hidden">Columns</span>
                                                <IconChevronDown />
                                          </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                          {table
                                                .getAllColumns()
                                                .filter(
                                                      (column) =>
                                                            typeof column.accessorFn !== "undefined" &&
                                                            column.getCanHide(),
                                                )
                                                .map((column) => {
                                                      return (
                                                            <DropdownMenuCheckboxItem
                                                                  key={column.id}
                                                                  className="capitalize"
                                                                  checked={column.getIsVisible()}
                                                                  onCheckedChange={(value) =>
                                                                        column.toggleVisibility(!!value)
                                                                  }
                                                            >
                                                                  {column.id}
                                                            </DropdownMenuCheckboxItem>
                                                      );
                                                })}
                                    </DropdownMenuContent>
                              </DropdownMenu>
                              <ButtonGroup className=" flex items-center bg-[#5a31f4] hover:bg-[#4c29cc] transition-colors rounded-lg shadow-sm text-white cursor-pointer px-2">
                                    <IconPlus />
                                    <Button asChild variant="link">
                                          <Link href="./products/add" className="text-white">
                                                Add New Product
                                          </Link>
                                    </Button>
                              </ButtonGroup>
                        </div>
                  </div>
                  <TabsContent value="outline" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                        <div className="overflow-hidden rounded-lg border">
                              <DndContext
                                    collisionDetection={closestCenter}
                                    modifiers={[restrictToVerticalAxis]}
                                    onDragEnd={handleDragEnd}
                                    sensors={sensors}
                                    id={sortableId}
                              >
                                    <Table>
                                          <TableHeader className="bg-muted sticky top-0 z-10">
                                                {table.getHeaderGroups().map((headerGroup) => (
                                                      <TableRow key={headerGroup.id}>
                                                            {headerGroup.headers.map((header) => {
                                                                  return (
                                                                        <TableHead
                                                                              key={header.id}
                                                                              colSpan={header.colSpan}
                                                                        >
                                                                              {header.isPlaceholder
                                                                                    ? null
                                                                                    : flexRender(
                                                                                            header.column.columnDef
                                                                                                  .header,
                                                                                            header.getContext(),
                                                                                      )}
                                                                        </TableHead>
                                                                  );
                                                            })}
                                                      </TableRow>
                                                ))}
                                          </TableHeader>
                                          <TableBody className="**:data-[slot=table-cell]:first:w-8">
                                                {table.getRowModel().rows?.length ? (
                                                      <SortableContext
                                                            items={dataIds}
                                                            strategy={verticalListSortingStrategy}
                                                      >
                                                            {table.getRowModel().rows.map((row) => (
                                                                  <DraggableRow key={row.id} row={row} />
                                                            ))}
                                                      </SortableContext>
                                                ) : (
                                                      <TableRow>
                                                            <TableCell
                                                                  colSpan={columns.length}
                                                                  className="h-24 text-center"
                                                            >
                                                                  No results.
                                                            </TableCell>
                                                      </TableRow>
                                                )}
                                          </TableBody>
                                    </Table>
                              </DndContext>
                        </div>
                        <div className="flex items-center justify-between px-4">
                              <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                                    {table.getFilteredRowModel().rows.length} row(s) selected.
                              </div>
                              <div className="flex w-full items-center gap-8 lg:w-fit">
                                    <div className="hidden items-center gap-2 lg:flex">
                                          <Label htmlFor="rows-per-page" className="text-sm font-medium">
                                                Rows per page
                                          </Label>
                                          <Select
                                                value={`${table.getState().pagination.pageSize}`}
                                                onValueChange={(value) => {
                                                      table.setPageSize(Number(value));
                                                }}
                                          >
                                                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                                      <SelectValue placeholder={table.getState().pagination.pageSize} />
                                                </SelectTrigger>
                                                <SelectContent side="top">
                                                      {[10, 20, 30, 40, 50].map((pageSize) => (
                                                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                                                  {pageSize}
                                                            </SelectItem>
                                                      ))}
                                                </SelectContent>
                                          </Select>
                                    </div>
                                    <div className="flex w-fit items-center justify-center text-sm font-medium">
                                          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                                    </div>
                                    <div className="ml-auto flex items-center gap-2 lg:ml-0">
                                          <Button
                                                variant="outline"
                                                className="hidden h-8 w-8 p-0 lg:flex"
                                                onClick={() => table.setPageIndex(0)}
                                                disabled={!table.getCanPreviousPage()}
                                          >
                                                <span className="sr-only">Go to first page</span>
                                                <IconChevronsLeft />
                                          </Button>
                                          <Button
                                                variant="outline"
                                                className="size-8"
                                                size="icon"
                                                onClick={() => table.previousPage()}
                                                disabled={!table.getCanPreviousPage()}
                                          >
                                                <span className="sr-only">Go to previous page</span>
                                                <IconChevronLeft />
                                          </Button>
                                          <Button
                                                variant="outline"
                                                className="size-8"
                                                size="icon"
                                                onClick={() => table.nextPage()}
                                                disabled={!table.getCanNextPage()}
                                          >
                                                <span className="sr-only">Go to next page</span>
                                                <IconChevronRight />
                                          </Button>
                                          <Button
                                                variant="outline"
                                                className="hidden size-8 lg:flex"
                                                size="icon"
                                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                                disabled={!table.getCanNextPage()}
                                          >
                                                <span className="sr-only">Go to last page</span>
                                                <IconChevronsRight />
                                          </Button>
                                    </div>
                              </div>
                        </div>
                  </TabsContent>
            </Tabs>
      );
}
