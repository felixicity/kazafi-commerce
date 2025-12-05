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
import { OrderStatus } from "./order-status";

export const schema = z.object({
      id: z.string(),
      customer: z.string(),
      payment: z.string(),
      shipping: z.string(),
      createdAt: z.string(),
});

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
                              <DrawerTitle>Order_Id: #PO-{item.id}</DrawerTitle>
                              <DrawerDescription>This Order was created on {item.createdAt}</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                              <h2>Customer: {item.customer}</h2>
                              <p>Email: chukwufelix16@gmail.com</p>
                              {/* {!isMobile && (
                                    <>
                                          <div> I&apos;m on Desktop dooal 😋 </div>
                                    </>
                              )} */}
                              <OrderStatus item={item} />
                              <p>Payment Status: {item.payment}</p>
                        </div>
                        <DrawerFooter>
                              <DrawerClose asChild>
                                    <Button
                                          variant={item.shipping !== "delivered" ? "destructive" : "default"}
                                          className="cursor-pointer"
                                    >
                                          {item.shipping !== "delivered" ? "Cancel order" : "Done"}
                                    </Button>
                              </DrawerClose>
                        </DrawerFooter>
                  </DrawerContent>
            </Drawer>
      );
}
