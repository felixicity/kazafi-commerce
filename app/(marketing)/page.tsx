"use client";

import { useState } from "react";
import { Navigation } from "@/components/features/client/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemTitle, ItemActions } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const products = [
      {
            id: 1,
            name: "Ada Chairs",
            price: 50000,
            image: "/images/ada-l-shaped-sofas-39870010196190-Photoroom.png",
      },
      {
            id: 2,
            name: "Ada Sofas",
            price: 45000,
            image: "/images/ada-sofas-39870048829662-Photoroom.png",
      },
      {
            id: 3,
            name: "Ada Sofas (Variant)",
            price: 47000,
            image: "/images/ada-sofas-39870048862430-Photoroom.png",
      },
      {
            id: 4,
            name: "Alausa Sofas",
            price: 65000,
            image: "/images/alausa-sofas-39870436081886-Photoroom.png",
      },
];

export default function Page() {
      const [openCart, setOpenCart] = useState(false);
      return (
            <div>
                  <Navigation openCart={openCart} setOpenCart={setOpenCart} />
                  <main className="relative">
                        <section>
                              <Card className="mx-5 my-1  gap-1 bg-black text-white lg:mx-20 lg:gap-2">
                                    <CardHeader className="text-sm lg:text-xl font-bold">
                                          Black Friday Deals!!
                                    </CardHeader>
                                    <CardContent className="text-sm md:text-lg">
                                          Shop items up to <strong className="text-3xl px-1">95%</strong> off every
                                          friday from Nov,14 - Dec, 22
                                    </CardContent>
                              </Card>
                              <div className="mx-5 my-5 grid lg:mx-20">
                                    <Item variant="outline">
                                          <ItemContent>
                                                <ItemTitle>Free Shipping for items over #30k</ItemTitle>
                                                <ItemDescription>Terms and condition apply</ItemDescription>
                                          </ItemContent>
                                          <ItemActions>
                                                <Button variant="outline" size="sm">
                                                      Action
                                                </Button>
                                          </ItemActions>
                                    </Item>
                              </div>
                        </section>
                        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:mx-20 mx-5 my-10 ">
                              {products.map((product) => (
                                    <Card key={product.id}>
                                          <CardContent>
                                                {/* AspectRatio ensures clean grid alignment */}
                                                <AspectRatio ratio={3 / 3}>
                                                      <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            width={350}
                                                            height={200}
                                                      />
                                                      <Badge className="absolute top-2 right-2">New</Badge>
                                                </AspectRatio>
                                                <h3 className="text-lg mt-3">{product.name}</h3>
                                                <p className="font-bold">{product.price}</p>
                                          </CardContent>
                                    </Card>
                              ))}
                        </section>
                  </main>
                  <section className="lg:mx-20 my-12">
                        <h2 className="text-xl font-semibold">Recommendations for you</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8 ">
                              {products.map((product) => (
                                    <Card key={product.id}>
                                          <CardContent>
                                                {/* AspectRatio ensures clean grid alignment */}
                                                <AspectRatio ratio={3 / 3}>
                                                      <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            width={350}
                                                            height={200}
                                                      />
                                                      <Badge className="absolute top-2 right-2">New</Badge>
                                                </AspectRatio>
                                                <h3 className="text-lg mt-3">{product.name}</h3>
                                                <p className="font-bold">{product.price}</p>
                                          </CardContent>
                                    </Card>
                              ))}
                        </div>
                  </section>
            </div>
      );
}
