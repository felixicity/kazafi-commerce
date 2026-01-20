"use client";

import * as React from "react";
import {
      flexRender,
      getCoreRowModel,
      getFacetedRowModel,
      getFacetedUniqueValues,
      getFilteredRowModel,
      getPaginationRowModel,
      getSortedRowModel,
      SortingState,
      useReactTable,
      VisibilityState,
      ColumnFiltersState,
} from "@tanstack/react-table";

import { type UniqueIdentifier } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table";
import { columns, Payment } from "./payment-table-column";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { schema } from "./payment-table-column";

interface RawPayment {
      _id?: string;
      createdAt?: string;
      amount?: number;
      status?: "successful" | "cancelled" | "pending" | "failed";
      channel?: string;
      type?: string;
      order?: string;
      customer_email: string;
}

export function PaymentsTable({ data: initialData }: { data: RawPayment[] }) {
      const transformedData = React.useMemo<Payment[]>(() => {
            if (!initialData) return [];

            return initialData.map((payment) => {
                  // Create an object that matches the expected Payment shape
                  const raw = {
                        id: payment._id ?? "N/A",
                        email: payment.customer_email ?? "N/A",
                        createdAt: payment.createdAt ?? new Date().toISOString(),
                        amount: payment.amount ?? 0,
                        method: payment.channel ?? "N/A",
                        status: payment.status ?? "pending",
                        type: payment.type ?? "N/A",
                        order: payment.order ?? "N/A",
                  };

                  // Use your Zod schema to parse it.
                  // This guarantees the result is a strict 'Payment' type.
                  return schema.parse(raw);
            });
      }, [initialData]);

      // Specify the type for useState to match the table's expectation
      const [data, setData] = React.useState<Payment[]>(transformedData);
      const [rowSelection, setRowSelection] = React.useState({});
      const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
      const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
      const [sorting, setSorting] = React.useState<SortingState>([]);
      const [pagination, setPagination] = React.useState({
            pageIndex: 0,
            pageSize: 10,
      });

      // Update state when props change
      React.useEffect(() => {
            setData(transformedData);
      }, [transformedData]);

      const table = useReactTable<Payment>({
            data,
            columns,
            state: {
                  sorting,
                  columnVisibility,
                  rowSelection,
                  columnFilters,
                  pagination,
            },
            getRowId: (row) => row.id.toString(),
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

      return (
            <div>
                  <Table>
                        <TableHeader>
                              {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                          {headerGroup.headers.map((header) => (
                                                <TableHead key={header.id} colSpan={header.colSpan}>
                                                      {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext(),
                                                              )}
                                                </TableHead>
                                          ))}
                                    </TableRow>
                              ))}
                        </TableHeader>
                        <TableBody className="**:data-[slot=table-cell]:first:w-8">
                              {table.getRowModel().rows?.length ? (
                                    <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                                          {table.getRowModel().rows.map((row) => (
                                                <TableRow
                                                      key={row.index}
                                                      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
                                                >
                                                      {row.getVisibleCells().map((cell) => (
                                                            <TableCell key={cell.id}>
                                                                  {flexRender(
                                                                        cell.column.columnDef.cell,
                                                                        cell.getContext(),
                                                                  )}
                                                            </TableCell>
                                                      ))}
                                                </TableRow>
                                          ))}
                                    </SortableContext>
                              ) : (
                                    <TableRow>
                                          <TableCell colSpan={columns.length} className="h-24 text-center">
                                                No results.
                                          </TableCell>
                                    </TableRow>
                              )}
                        </TableBody>
                  </Table>
                  <div className="flex items-center justify-between px-8 my-12">
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
                                                {[5, 10, 20, 30, 40].map((pageSize) => (
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
            </div>
      );
}
