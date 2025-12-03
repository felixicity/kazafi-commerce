import { TableCellViewer } from "../products/table-cell-viewer";
import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { IconDotsVertical } from "@tabler/icons-react";

export const schema = z.object({
      order: z.string(),
      customer: z.string(),
      shipping: z.string(),
      payment: z.string(),
      date: z.date(),
});

export const columns: ColumnDef<z.infer<typeof schema>>[] = [];
