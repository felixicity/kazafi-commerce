import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
      Item,
      ItemActions,
      ItemContent,
      ItemDescription,
      ItemGroup,
      ItemMedia,
      ItemSeparator,
      ItemTitle,
} from "@/components/ui/item";
import { Icon12Hours, IconCaretRight, IconChevronRight, IconFolder, IconHandOff } from "@tabler/icons-react";

export function UrgentTasks({
      paymentsToFulfill,
      ordersToFulfill,
}: {
      paymentsToFulfill: number;
      ordersToFulfill: number;
}) {
      const tasks = [
            {
                  number: ordersToFulfill,
                  title: "order",
                  task: "Orders to fulfill",
            },
            {
                  number: paymentsToFulfill,
                  title: "payment",
                  task: "Payments to approve",
            },
      ];

      return (
            <div className="flex w-full flex-col my-4 gap-6">
                  <ItemGroup>
                        {tasks.map((item, index) => (
                              <React.Fragment key={item.title}>
                                    <Item variant="outline" size="sm" className="flex bg-white">
                                          <ItemMedia>
                                                {item.title == "order" ? (
                                                      <Icon12Hours />
                                                ) : item.title == "payment" ? (
                                                      <IconHandOff />
                                                ) : (
                                                      <IconFolder />
                                                )}
                                          </ItemMedia>
                                          <ItemContent className="flex flex-row gap-2 ml-4">
                                                <ItemTitle className="font-semibold">{item.number}</ItemTitle>
                                                <ItemDescription>{item.task}</ItemDescription>
                                          </ItemContent>
                                          <ItemActions>
                                                <Button variant="ghost" size="icon" className="rounded-full">
                                                      <IconChevronRight />
                                                </Button>
                                          </ItemActions>
                                    </Item>
                                    {index !== tasks.length - 1 && <ItemSeparator />}
                              </React.Fragment>
                        ))}
                  </ItemGroup>
            </div>
      );
}
