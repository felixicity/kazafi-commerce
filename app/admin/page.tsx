import { RevenueChart } from "@/components/features/chart-area-interactive";
import { RecentActivityTable } from "@/components/features/data-table";
import { ButtonGroupSelect } from "@/components/features/select-time";

import { UrgentTasks } from "@/components/features/urgent-tasks";

export default function Page() {
      return (
            <div className="flex flex-1 flex-col bg-[#efefdc]">
                  <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
                              <section>
                                    <ButtonGroupSelect />
                              </section>
                              <section>
                                    <RevenueChart />
                              </section>
                              <section>
                                    <h2 className="font-semibold px-2">Things to do next</h2>
                                    <UrgentTasks />
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
