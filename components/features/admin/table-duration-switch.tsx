"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

const DURATIONS = ["Today", "7 Days", "14 Days", "30 Days"];

export function ButtonGroupSelect({ timeRange, setTimeRange }) {
      return (
            <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="bg-white">{timeRange}</SelectTrigger>
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
