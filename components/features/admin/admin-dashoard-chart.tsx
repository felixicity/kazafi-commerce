"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
      ChartConfig,
      ChartContainer,
      ChartTooltip,
      ChartTooltipContent,
      ChartLegend,
      ChartLegendContent,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, LabelList } from "recharts";
import { SectionCards } from "./section-cards";

export type RevenueDataPoint = {
      date: string;
      currentRevenue: number;
      comparisonRevenue: number; // Previous Period or Last Year
      event?: string; // For adding annotations
};

const revenueData: RevenueDataPoint[] = [
      { date: "Nov 01", currentRevenue: 4500, comparisonRevenue: 4000 },
      { date: "Nov 02", currentRevenue: 4800, comparisonRevenue: 3800 },
      { date: "Nov 03", currentRevenue: 5200, comparisonRevenue: 4100 },
      { date: "Nov 04", currentRevenue: 5100, comparisonRevenue: 4200 },
      { date: "Nov 05", currentRevenue: 6500, comparisonRevenue: 4500, event: "Flash Sale Start" },
      { date: "Nov 06", currentRevenue: 8900, comparisonRevenue: 5500 },
      { date: "Nov 07", currentRevenue: 7100, comparisonRevenue: 6000 },
      { date: "Nov 08", currentRevenue: 6800, comparisonRevenue: 6200 },
      { date: "Nov 09", currentRevenue: 7500, comparisonRevenue: 6500 },
      { date: "Nov 10", currentRevenue: 7300, comparisonRevenue: 8000 },
      { date: "Nov 11", currentRevenue: 6000, comparisonRevenue: 4500 },
      { date: "Nov 12", currentRevenue: 5800, comparisonRevenue: 5200 },
      { date: "Nov 13", currentRevenue: 6200, comparisonRevenue: 5800, event: "Mid-Month Promo" },
      { date: "Nov 14", currentRevenue: 6700, comparisonRevenue: 6000 },
      // ... (add more data points for 30 days)
      { date: "Nov 30", currentRevenue: 9500, comparisonRevenue: 8500 },
];

const totalRevenue = revenueData.reduce((sum, item) => sum + item.currentRevenue, 0);
const comparisonRevenue = revenueData.reduce((sum, item) => sum + item.comparisonRevenue, 0);
const percentageChange = ((totalRevenue - comparisonRevenue) / comparisonRevenue) * 100;

// Define the configuration for the chart lines and colors
const chartConfig = {
      currentRevenue: {
            label: "Current Period",
            color: "blue", // Primary color (e.g., blue)
      },
      comparisonRevenue: {
            label: "Previous Period",
            color: "skyblue", // Secondary color (e.g., light gray/dashed look)
      },
} satisfies ChartConfig;

export function RevenueChart() {
      const currentTotal = revenueData.reduce((sum, item) => sum + item.currentRevenue, 0);
      const formattedTotal = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
            currentTotal
      );

      const isPositive = percentageChange >= 0;
      const changeColor = isPositive ? "text-green-500" : "text-red-500";
      const changeSign = isPositive ? "+" : "";

      return (
            <Card className="col-span-4 shadow-lg p-4">
                  <SectionCards />
                  <CardHeader className="px-0">
                        <CardTitle>Total Revenue Trend (Last 30 Days)</CardTitle>
                        <div className="flex items-baseline space-x-2">
                              {/* Large Primary Metric and Change Indicator */}
                              <p className="text-4xl font-bold">{formattedTotal}</p>
                              <p className={`text-sm font-medium ${changeColor}`}>
                                    {changeSign}
                                    {percentageChange.toFixed(1)}% vs. Prior Period
                              </p>
                        </div>
                  </CardHeader>
                  <CardContent className="px-0">
                        <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
                              <LineChart
                                    accessibilityLayer
                                    data={revenueData}
                                    margin={{ left: 12, right: 12, top: 20 }}
                              >
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                          dataKey="date"
                                          tickLine={true}
                                          axisLine={true}
                                          tickMargin={8}
                                          // Only show a few labels for clarity on the dashboard
                                          tickFormatter={(value, index) => (index % 5 === 0 ? value : "")}
                                    />
                                    <YAxis
                                          tickLine={true}
                                          axisLine={true}
                                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                                    />

                                    <ChartTooltip
                                          content={
                                                <ChartTooltipContent
                                                      formatter={(value: number) =>
                                                            new Intl.NumberFormat("en-NG", {
                                                                  style: "currency",
                                                                  currency: "NGN",
                                                            }).format(value)
                                                      }
                                                />
                                          }
                                    />

                                    <ChartLegend content={<ChartLegendContent className="mt-4" />} />

                                    {/* Current Revenue Line */}
                                    <Line
                                          dataKey="currentRevenue"
                                          type="monotone"
                                          stroke={chartConfig.currentRevenue.color}
                                          strokeWidth={2}
                                          activeDot={{ r: 6 }}
                                    >
                                          {/* Adding Annotations for Key Events */}
                                          <LabelList
                                                dataKey="event"
                                                position="top"
                                                offset={10}
                                                className="fill-foreground text-xs font-semibold"
                                          />
                                    </Line>

                                    {/* Comparison Revenue Line (Dashed/Lighter) */}
                                    <Line
                                          dataKey="comparisonRevenue"
                                          type="monotone"
                                          stroke={chartConfig.comparisonRevenue.color}
                                          strokeDasharray="5 5" // Makes the comparison line dashed
                                          strokeWidth={1}
                                          dot={false} // Don't show dots on the comparison line
                                    />
                              </LineChart>
                        </ChartContainer>
                  </CardContent>
            </Card>
      );
}
