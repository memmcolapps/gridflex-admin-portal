"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import {
  Building2,
  LayoutDashboard,
  Mail,
  Shield,
  CircleAlert,
  ChartColumnDecreasing,
  ClipboardPlus,
  type LucideIcon,
} from "lucide-react";

const routeMeta: Record<string, { label: string; icon: LucideIcon }> = {
  dashboard: { label: "Dashboard", icon: LayoutDashboard },
  "utility-companies": { label: "Utility Companies", icon: Building2 },
  "admin-management": { label: "Admin Management", icon: Shield },
  analysis: { label: "Analysis", icon: ChartColumnDecreasing },
  "incident-report": { label: "Incident Report", icon: CircleAlert },
  "contact-messages": { label: "Contact Messages", icon: Mail },
  "audit-log": { label: "Audit Log", icon: ClipboardPlus },
};

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const pathSegments = pathname.split("/").filter(Boolean);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;

    // Get metadata with proper fallback
    const segmentKey = segment.toLowerCase();
    const routeData = routeMeta[segmentKey];

    const { icon: IconComponent, label } = routeData ?? {
      label: segment.replace(/-/g, " "),
      icon: Building2, // Default fallback icon
    };

    return (
      <div key={href} className="flex items-center gap-2">
        {index !== 0 && <ChevronRight size={16} className="text-gray-400" />}
        <div className="flex items-center gap-1">
          <IconComponent
            size={16}
            className={cn(isLast ? "text-gray-800" : "text-gray-600")}
          />
          {isLast ? (
            <span className="text-sm text-gray-800 capitalize">{label}</span>
          ) : (
            <Link
              href={href}
              className="text-sm font-medium text-gray-700 capitalize hover:underline"
            >
              {label}
            </Link>
          )}
        </div>
      </div>
    );
  });

  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-[#FEFAF5] px-4 sm:px-6 lg:px-4">
      <div className="flex items-center">
        {/* Logo Section */}
        <div className="mr-45 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/gridflex-admin-logo.svg"
              alt="GridFlex Logo"
              width={42}
              height={54}
              className="h-auto w-10"
            />
            <span className="text-xl font-semibold">Admin Portal</span>
          </Link>
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2">{breadcrumbs}</div>
      </div>

      {/* User Menu */}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User size={16} />
              <span className="text-sm font-medium">
                {user.firstname} {user.lastname}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-medium">
                  {user.firstname} {user.lastname}
                </p>
                <p className="text-muted-foreground text-xs leading-none">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut size={16} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
