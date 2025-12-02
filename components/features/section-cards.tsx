import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const overviewData = [
      { title: "Sessions", amount: "216", stat: 32 },
      { title: "Total sales", amount: "$1500.00", stat: 12.5 },
      { title: "Total Orders", amount: 72, stat: 12.5 },
      { title: "Conversion rate", amount: "3.2%", stat: -9.6 },
];

export function SectionCards() {
      return (
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 lg:gap-6 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                  {overviewData.map((item, index) => (
                        <Card key={index} className="@container/card lg:border-none lg:shadow-none hover:bg-gray-100">
                              <CardHeader>
                                    <CardDescription className="text-gray-700">{item?.title}</CardDescription>
                                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                          {item?.amount}
                                    </CardTitle>
                                    <CardAction>
                                          <Badge
                                                variant="outline"
                                                className={item.stat > 0 ? "text-green-600" : " text-red-500"}
                                          >
                                                {item.stat > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                                                {item.stat}%
                                          </Badge>
                                    </CardAction>
                              </CardHeader>
                        </Card>
                  ))}
            </div>
      );
}
