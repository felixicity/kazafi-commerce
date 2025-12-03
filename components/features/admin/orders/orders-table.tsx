import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from "@/components/ui/table";

export function OrdersTable() {
      return (
            <Table>
                  <TableHeader>
                        <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Age</TableHead>
                        </TableRow>
                  </TableHeader>
                  <TableBody>
                        <TableRow>
                              <TableCell>Felix</TableCell>
                              <TableCell>29</TableCell>
                        </TableRow>
                  </TableBody>
            </Table>
      );
}
