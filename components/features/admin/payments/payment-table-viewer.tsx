import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useIsMobile } from "@/hooks/use-mobile";
import {
      Drawer,
      DrawerClose,
      DrawerContent,
      DrawerDescription,
      DrawerFooter,
      DrawerHeader,
      DrawerTitle,
      DrawerTrigger,
} from "@/components/ui/drawer";
import { IconDotsVertical } from "@tabler/icons-react";
import { PaymentStatus } from "./payment-status";
import { schema } from "./payment-table-column";

export function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
      const isMobile = useIsMobile();

      return (
            <Drawer direction={isMobile ? "bottom" : "right"}>
                  <DrawerTrigger asChild>
                        <Button variant="outline" size="sm" className="rounded-md">
                              view details <IconDotsVertical />
                        </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                        <DrawerHeader className="gap-1">
                              <DrawerTitle>Payment_Id: {item.id}</DrawerTitle>
                              <DrawerDescription>This Payment was created on {item.createdAt}</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                              {/* <h2>Customer: {item.customer}</h2> */}
                              <p>Email: {item.email}</p>
                              {/* {!isMobile && (
                                    <>
                                          <div> I&apos;m on Desktop dooal 😋 </div>
                                    </>
                              )} */}
                              <PaymentStatus item={item} />
                              <p>Payment Status: {item.status}</p>
                        </div>
                        <DrawerFooter>
                              <DrawerClose asChild>
                                    <Button className="cursor-pointer">Done</Button>
                              </DrawerClose>
                        </DrawerFooter>
                  </DrawerContent>
            </Drawer>
      );
}
