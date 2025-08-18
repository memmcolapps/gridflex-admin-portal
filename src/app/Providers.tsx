"use client";
import { Toaster } from "sonner";
import { AuthProvider } from "../contexts/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            style: {
              margin: "0 auto",
              maxWidth: "calc(100vw - 32px)",
              width: "fit-content",
            },
          }}
        />{" "}
      </AuthProvider>
    </QueryClientProvider>
  );
}
