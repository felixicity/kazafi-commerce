"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@react-email/components";
import { Card, CardAction, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { IconCaretRight } from "@tabler/icons-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function HomeCarousel() {
      const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

      const isMobile = useIsMobile();

      const promotions = [
            {
                  header: "Black Friday Deals!!",
                  description: `Shop items up to 15% off every friday from Nov,14 - Dec, 22`,
                  bgColor: "bg-gray-600",
                  images: [
                        "/images/femi-occasional-chairs-39871555010782-Photoroom.png",
                        "/images/segun-diy-table-tables-39872573931742-Photoroom.png",
                  ],
            },
            {
                  header: "Harmattan Deals",
                  description: `Prepare for what is coming, live in warmth throughout the season`,
                  bgColor: "bg-[#8C6E27]",
                  images: ["/images/bisoye-sofas-39870832771294-Photoroom.png"],
            },
      ];
      return (
            <Carousel
                  plugins={[plugin.current]}
                  className="w-full"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
            >
                  <CarouselContent>
                        {promotions.map((promotion, index) => (
                              <CarouselItem key={index}>
                                    <div className="p-1">
                                          <Card
                                                className={cn(
                                                      "mx-5 my-1 gap-1 text-white lg:mx-20 lg:gap-2 cursor-pointer",
                                                      promotion.bgColor,
                                                )}
                                          >
                                                <CardHeader className="text-lg lg:text-xl font-bold">
                                                      {promotion.header}
                                                </CardHeader>
                                                <CardContent className="text-sm md:text-lg">
                                                      <CardDescription className="text-white font-semibold lg:text-lg">
                                                            {promotion.description}
                                                      </CardDescription>
                                                      <div className="flex">
                                                            {promotion.images.map((img) => (
                                                                  <Image
                                                                        key={img}
                                                                        src={img}
                                                                        alt={promotion.header}
                                                                        width={isMobile ? 150 : 250}
                                                                        height={isMobile ? 100 : 250}
                                                                  />
                                                            ))}
                                                      </div>
                                                      <CardAction>
                                                            <Button className="bg-white text-black lg:rounded-lg rounded-sm text-sm lg:font-bold font-semibold  py-2 px-5 lg:py-3 lg:px-5">
                                                                  Shop now
                                                            </Button>
                                                      </CardAction>
                                                </CardContent>
                                          </Card>
                                    </div>
                              </CarouselItem>
                        ))}
                  </CarouselContent>
            </Carousel>
      );
}
