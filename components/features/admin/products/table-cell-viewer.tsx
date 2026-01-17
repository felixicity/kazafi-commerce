import Image from "next/image";
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
import { productSchema } from "./products-table";

export function TableCellViewer({ item }: { item: z.infer<typeof productSchema> }) {
      const isMobile = useIsMobile();

      return (
            <Drawer direction={isMobile ? "bottom" : "right"}>
                  <DrawerTrigger asChild>
                        <div className="border border-gray-300 w-12 h-12 rounded-sm">
                              <Image
                                    src={item.variations[0]?.imageURLs[0]}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    width={500}
                                    height={500}
                              />
                        </div>
                  </DrawerTrigger>
                  <DrawerContent>
                        <DrawerHeader className="gap-1">
                              <DrawerTitle>{item.name}</DrawerTitle>
                              <DrawerDescription>{item.description}</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
                              {!isMobile && (
                                    <>
                                          <div> I&apos;m on Desktop dooal 😋 </div>
                                    </>
                              )}
                              {/* <p>₦{item.variation?.price.toLocaleString()}</p>
                              <p>Stock: {item.variation?.stock}</p> */}
                              <p>Category: {item.category}</p>
                              <div className="flex gap-2">
                                    {item.variations.map((varr) => (
                                          <Image
                                                key={varr.color}
                                                src={varr.imageURLs[0]}
                                                alt={`${item.name} ${varr.color}`}
                                                className="w-20 h-20 object-cover"
                                                width={500}
                                                height={500}
                                          />
                                    ))}
                              </div>
                        </div>
                        <DrawerFooter>
                              <DrawerClose asChild>
                                    <Button variant="outline">Done</Button>
                              </DrawerClose>
                        </DrawerFooter>
                  </DrawerContent>
            </Drawer>
      );
}
