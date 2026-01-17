"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/features/client/navigation";

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      const [openCart, setOpenCart] = useState(false);
      return (
            <div>
                  <Navigation openCart={openCart} setOpenCart={setOpenCart} />
                  {children}
            </div>
      );
}
