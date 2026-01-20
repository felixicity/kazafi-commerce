"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RevenueChart } from "@/components/features/admin/admin-dashoard-chart";
import { RecentActivityTable } from "@/components/features/admin/recent-activity-table";
import { ButtonGroupSelect } from "@/components/features/admin/table-duration-switch";
import { getAllOrders } from "@/lib/mutations/order";
import { getAllPayments } from "@/lib/mutations/payment"; // Placeholder import
import { UrgentTasks } from "@/components/features/admin/urgent-tasks";
import { Spinner } from "@/components/ui/spinner";
import { Order } from "@/components/features/admin/orders/order-table-column";
import { Payment } from "@/components/features/admin/payments/payment-table-column";

export default function Page() {
      const [timeRange, setTimeRange] = useState("30 Days");
      const { data: ordersData, isLoading: ordersLoading } = useQuery({
            queryKey: ["orders"],
            queryFn: getAllOrders,
      });

      const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
            queryKey: ["payments"],
            queryFn: getAllPayments, // Placeholder function
      });

      const totalOrders = ordersData ? ordersData.length : 0;
      const paymentsToFulfill: number = paymentsData
            ? paymentsData.filter((payment: Payment) => payment.status !== "successful").length
            : 0;
      const ordersToFulfill: number = ordersData
            ? ordersData.filter((order: Order) => order.status !== "delivered").length
            : 0;

      return (
            <div className="flex flex-1 flex-col bg-[#efefdc]">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
                              <section>
                                    <ButtonGroupSelect timeRange={timeRange} setTimeRange={setTimeRange} />
                              </section>
                              <section>
                                    {paymentsLoading ? (
                                          <Spinner />
                                    ) : (
                                          <RevenueChart
                                                totalOrders={totalOrders}
                                                paymentsData={paymentsData}
                                                timeRange={timeRange}
                                          />
                                    )}
                              </section>
                              <section>
                                    <h2 className="font-semibold px-2">Things to do next</h2>
                                    <UrgentTasks
                                          paymentsToFulfill={paymentsToFulfill}
                                          ordersToFulfill={ordersToFulfill}
                                    />
                              </section>
                              <section>
                                    <h2 className="font-semibold px-2 pb-4">Recent Activity</h2>
                                    <RecentActivityTable />
                              </section>
                        </div>
                  </div>
            </div>
      );
}
