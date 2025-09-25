"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useState } from "react";
import ProfileDropdown from "./profiledropdown";
import { EditProfileDialog } from "./profile/edit-profile-dialog";
import type { UnifiedFormData } from "@/types/unifiedForm";

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
  const [isProfileViewActive, setIsProfileViewActive] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const pathSegments = pathname.split("/").filter(Boolean);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;

    const segmentKey = segment.toLowerCase();
    const routeData = routeMeta[segmentKey];

    const { icon: IconComponent, label } = routeData ?? {
      label: segment.replace(/-/g, " "),
      icon: Building2, 
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

 const UserAvatar = () => {
    const { user } = useAuth();
    const initials = `${user?.firstname?.charAt(0) ?? ""}${user?.lastname?.charAt(0) ?? ""}`.toUpperCase();
    return (
      <Avatar className="h-7 w-7 sm:h-10 sm:w-10">
        <AvatarImage src="" alt="User" />
        <AvatarFallback className="rounded-full bg-[var(--primary)] text-xs text-white sm:text-sm">
          {initials}
        </AvatarFallback>
      </Avatar>
    );
  };

  function handleProfilepdate(data: UnifiedFormData): void {
    console.log("Admin updated:", data);
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-[#FEFAF5] px-4 sm:px-6 lg:px-4">
      <div className="flex items-center">
        {/* Logo Section */}
        <div className="mr-40 flex items-center gap-4">
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
      <DropdownMenu
        onOpenChange={(open) => {
          if (!open) setIsProfileViewActive(false);
        }}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
          <UserAvatar/>
          <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          side="bottom"
          className="w-fit bg-white mt-4 text-gray-700 p-0"
          collisionPadding={10}
          avoidCollisions
        >
          {isProfileViewActive ? (
            <ProfileDropdown
              closeDropdown={() => setIsProfileViewActive(false)}
              openEditProfileModal={() => {
                // setIsProfileViewActive(false);
                // openEditProfileModal();
                setIsEditDialogOpen(true);
              }}
            />
          ) : (
            <>
              <DropdownMenuItem
                className="cursor-pointer hover:bg-gray-100"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsProfileViewActive(true);
                }}
              >
                <User size={12} className="mr-2" />
                Profile
              </DropdownMenuItem>


              <DropdownMenuItem
                className="cursor-pointer text-red-600 hover:bg-gray-100"
                onSelect={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <LogOut size={12} className="mr-2 text-red-600" />
                Log out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* dialogs  */}
      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedContact={user ?? null} 
        onSubmit={handleProfilepdate}
      />
    </header>
  );
}
