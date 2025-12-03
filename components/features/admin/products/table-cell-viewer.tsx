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
      id: z.number(),
      image: z.string(),
      name: z.string(),
      status: z.string(),
      instock: z.number(),
      type: z.string(),
      category: z.string(),
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
                        <div className="border border-gray-300 w-12 h-12 rounded-sm">
                              <img src={item.image} alt={item.image} className="w-full" />
                        </div>
                        {/* <Button variant="link" className="w-fit px-0 text-left">
                              {item.image}
                        </Button> */}
                  </DrawerTrigger>
                  <DrawerContent>
                        <DrawerHeader className="gap-1">
                              <DrawerTitle>{item.name}</DrawerTitle>
                              <DrawerDescription>{productData[0].description}</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                              {!isMobile && (
                                    <>
                                          <div> I&apos;m on Desktop dooal 😋 </div>
                                    </>
                              )}
                              <p>${item.price}</p>
                              <img src={item.image} alt={item.image} className="w-full" />
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
