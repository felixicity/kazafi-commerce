"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Item, ItemContent, ItemDescription, ItemTitle, ItemActions } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { HomeCarousel } from "@/components/features/client/homepage-carousel";

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
      return (
            <div>
                  <main className="relative">
                        <section>
                              <HomeCarousel />
                              <div className="mx-5 my-5 grid lg:mx-20">
                                    <Item variant="outline">
                                          <ItemContent>
                                                <ItemTitle className="text-lg">
                                                      Free Shipping for items over 30k
                                                </ItemTitle>
                                                <ItemDescription>Terms and condition apply</ItemDescription>
                                          </ItemContent>
                                          <ItemActions>
                                                <Button variant="outline" size="sm">
                                                      Check deal
                                                </Button>
                                          </ItemActions>
                                    </Item>
                              </div>
                        </section>
                        <section className="mx-5 lg:mx-20 my-12">
                              <h2 className="text-xl font-semibold">New Arrivals</h2>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6  my-10 ">
                                    {products.map((product) => (
                                          <Link href="/shop" key={product.id} className="cursor-pointer">
                                                <Card>
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
                                                            <p className="font-bold">
                                                                  {new Intl.NumberFormat("en-NG", {
                                                                        style: "currency",
                                                                        currency: "NGN",
                                                                  }).format(product.price)}
                                                            </p>
                                                      </CardContent>
                                                </Card>
                                          </Link>
                                    ))}
                              </div>
                        </section>
                  </main>
                  <section className="mx-5 lg:mx-20 my-12">
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
