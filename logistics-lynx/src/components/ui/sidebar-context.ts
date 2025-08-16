/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { SidebarContext } from "./sidebar";

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
