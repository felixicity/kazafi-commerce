import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Payment } from "./payments/payment-table-column";

interface OverViewData {
      title: string;
      amount: number | string;
      stat?: number;
}

export function SectionCards({ totalOrders, paymentsData }: { totalOrders: number; paymentsData: Payment[] }) {
      const overviewData: OverViewData[] = [
            {
                  title: "Sessions",
                  amount: 235,
                  stat: 15,
            },
            {
                  title: "Total Orders",
                  amount: totalOrders || 0,
                  stat: 12,
            },
            {
                  title: "Total Sales",
                  amount: paymentsData
                        ? new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
                                paymentsData?.reduce((acc: number, payment: Payment) => acc + payment.amount, 0),
                          )
                        : 0,
                  stat: 3.5,
            },
            {
                  title: "Conversion Rate",
                  amount: "4.5%",
            },
      ];

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
                                                className={(item.stat ?? 0) > 0 ? "text-green-600" : "text-red-500"}
                                          >
                                                {(item.stat ?? 0) > 0 ? <IconTrendingUp /> : <IconTrendingDown />}
                                                {item?.stat}%
                                          </Badge>
                                    </CardAction>
                              </CardHeader>
                        </Card>
                  ))}
            </div>
      );
}
