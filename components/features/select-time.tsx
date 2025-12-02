"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

const CURRENCIES = ["This week", "This month", "Last month", "3 Months ago", "6 Months ago"];

export function ButtonGroupSelect() {
      const [time, setTime] = React.useState("Today");

      return (
            <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="bg-white">{time}</SelectTrigger>
                  <SelectContent className="min-w-24">
                        {CURRENCIES.map((time) => (
                              <SelectItem key={time} value={time}>
                                    <span className="text-muted-foreground">{time}</span>
                              </SelectItem>
                        ))}
                  </SelectContent>
            </Select>
      );
}
