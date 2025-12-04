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

export const schema = z.object({
      id: z.string(),
      customer: z.string(),
      payment: z.string(),
      shipping: z.string(),
      createdAt: z.string(),
});

const productData = [
      {
            id: 1,
            name: "Essential Oversized Tee",
            category: "T-Shirts",
            price: 45.0,
            originalPrice: 60.0,
            description: "A classic fit tee made from organic cotton.",
            imagePlaceholder: "https://placehold.co/400x500/A0A0A0/FFFFFF?text=Tee+A",
            variants: {
                  color: [
                        { name: "Black", hex: "#000000" },
                        { name: "White", hex: "#FFFFFF" },
                  ],
                  sizes: ["S", "M", "L", "XL"],
            },
            reviews: { rating: 4.8, count: 124 },
      },
];

export function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
      const isMobile = useIsMobile();

      return (
            <Drawer direction={isMobile ? "bottom" : "right"}>
                  <DrawerTrigger asChild>
                        <div>#PO-{item.id}</div>
                  </DrawerTrigger>
                  <DrawerContent>
                        <DrawerHeader className="gap-1">
                              <DrawerTitle>Order_Id: #PO-{item.id}</DrawerTitle>
                              <DrawerDescription>This Order was created on {item.createdAt}</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                              {!isMobile && (
                                    <>
                                          <div> I&apos;m on Desktop dooal 😋 </div>
                                    </>
                              )}
                              <p>Shipping Status: {item.shipping}</p>
                              <p>Payment Status: {item.payment}</p>
                        </div>
                        <DrawerFooter>
                              <Button>Submit</Button>
                              <DrawerClose asChild>
                                    <Button variant="outline">Done</Button>
                              </DrawerClose>
                        </DrawerFooter>
                  </DrawerContent>
            </Drawer>
      );
}
