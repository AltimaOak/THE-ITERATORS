"use client";

import { TypographyProvider } from "@/context/TypographyContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TypographyProvider>
      {children}
    </TypographyProvider>
  );
}
