"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Building2,
  LayoutDashboard,
  Mail,
  Shield,
  ChartColumnDecreasing,
  ClipboardPlus,
  type LucideIcon,
  CircleAlert,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Utility Companies", href: "/utility-companies", icon: Building2 },
  { title: "Admin Management", href: "/admin-management", icon: Shield },
  { title: "Analysis", href: "/analysis", icon: ChartColumnDecreasing },
  { title: "Incident Report", href: "/incident-management", icon: CircleAlert },
  { title: "Contact Messages", href: "/contact-message", icon: Mail },
  { title: "Audit Log", href: "/audit-log", icon: ClipboardPlus },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <Sidebar className="fixed top-16 left-0 z-40 hidden h-[calc(100vh-4rem)] overflow-y-auto border-r border-gray-200 md:block">
      <SidebarContent className="pt-4">
        <p className="px-6 pb-2 text-sm font-semibold text-white">
          Main Navigation
        </p>
        <SidebarMenu className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.title} className="list-none">
                <Link
                  href={item.href}
                  className={cn(
                    "group flex w-full items-center gap-3 rounded-md p-2.5 text-base transition-all duration-200",
                    isActive
                      ? "bg-white font-medium text-gray-900 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1),0px_-1px_4px_0px_rgba(0,0,0,0.1)]"
                      : "text-white hover:bg-white/10 hover:text-white",
                  )}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      "transition-colors duration-200",
                      isActive
                        ? "text-gray-900"
                        : "text-gray-900 group-hover:text-gray-800",
                    )}
                  />
                  <span
                    className={cn(
                      "transition-colors duration-200",
                      isActive
                        ? "text-gray-900"
                        : "text-gray-900 group-hover:text-gray-800",
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4 py-6">
        <Button
        onClick={handleLogout}
          className="flex bg-white font-medium text-gray-900 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1),0px_-1px_4px_0px_rgba(0,0,0,0.1)] justify-start h-10 cursor-pointer items-center gap-2 hover:bg-gray-50"
        >
          <LogOut color="#FF5F57" />
          Log Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
