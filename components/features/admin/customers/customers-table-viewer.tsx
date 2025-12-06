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

export const schema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.email(),
      createdAt: z.string(),
      role: z.string(),
      status: z.string(),
      login: z.number(),
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
                              <DrawerDescription>Joined since {item.createdAt}</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                              <h2>Customer: {item.name}</h2>
                              <p>Email: {item.email}</p>
                              {/* {!isMobile && (
                                    <>
                                          <div> I&apos;m on Desktop dooal 😋 </div>
                                    </>
                              )} */}
                        </div>
                        <DrawerFooter>
                              <DrawerClose asChild>
                                    <Button>Done</Button>
                              </DrawerClose>
                        </DrawerFooter>
                  </DrawerContent>
            </Drawer>
      );
}
