"use client";

import React from "react";
import { TruthLensProvider } from "@/lib/store";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <TruthLensProvider>{children}</TruthLensProvider>;
}
