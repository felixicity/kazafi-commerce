"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/features/client/navigation";

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <div>
                  <Navigation />
                  {children}
            </div>
      );
}
