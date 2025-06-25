// src/components/ClientComponentsWrapper.tsx
"use client";

import { ReactNode, useEffect } from "react";

export function ClientComponentsWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    const blockScreenshot = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen") {
        e.preventDefault();
        navigator.clipboard.writeText("Screenshots are disabled.");
        alert("Screenshot blocked.");
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", blockScreenshot);
    return () => document.removeEventListener("keydown", blockScreenshot);
  }, []);

  return <>{children}</>;
}
