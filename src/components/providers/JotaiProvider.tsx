"use client";
import { Provider } from "jotai";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
function SessionRestorer() {
  const { restoreSession } = useAuth();
  useEffect(() => { restoreSession(); }, []);
  return null;
}
export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <SessionRestorer />
      {children}
    </Provider>
  );
}
