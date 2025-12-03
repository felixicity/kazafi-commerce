"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

const DURATIONS = ["This week", "This month", "Last month", "3 Months ago", "6 Months ago"];

export function ButtonGroupSelect() {
      const [duration, setduration] = React.useState("Today");

      return (
            <Select value={duration} onValueChange={setduration}>
                  <SelectTrigger className="bg-white">{duration}</SelectTrigger>
                  <SelectContent className="min-w-24">
                        {DURATIONS.map((duration) => (
                              <SelectItem key={duration} value={duration}>
                                    <span className="text-muted-foreground">{duration}</span>
                              </SelectItem>
                        ))}
                  </SelectContent>
            </Select>
      );
}
