"use client";

import * as React from "react";
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

import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table";
import { columns } from "./payment-table-column";

export function PaymentsTable({ data: initialData }) {
      const [data, setData] = React.useState(() => initialData);
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

      const dataIds = React.useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

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

      return (
            <Table>
                  <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                              <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                          <TableHead key={header.id} colSpan={header.colSpan}>
                                                {header.isPlaceholder
                                                      ? null
                                                      : flexRender(header.column.columnDef.header, header.getContext())}
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
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      );
}
