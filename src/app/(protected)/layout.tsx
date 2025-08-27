"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { SidebarNav } from "@/components/sidebar-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Navbar } from "@/components/navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col">
        {/* Mobile message - only shows on small screens */}
        <div className="bg-background fixed inset-0 z-50 flex items-center justify-center p-4 md:hidden">
          <div className="max-w-md text-center">
            <h2 className="mb-4 text-3xl font-black">Screen Too Small</h2>
            <p className="mb-4 text-2xl font-semibold">
              This application is designed for larger screens. Please use a
              tablet or desktop computer for the best experience.
            </p>
            <p>
              Current screen size:{" "}
              {typeof window !== "undefined" && `${window.innerWidth}px`}
            </p>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden w-full md:flex md:flex-col">
          {/* Navbar with logo spans full width */}
          <Navbar />

          {/* Content area with sidebar */}
          <div className="flex flex-1 pt-16">
            {/* Sidebar with fixed width */}
            <div className="flex-shrink-0">
              <SidebarNav />
            </div>
            {/* Main content area */}
            <main className="flex-1 px-8 py-4">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
