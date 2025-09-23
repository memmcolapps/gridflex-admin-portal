"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/hooks/use-orgs";

interface ProfileDropdownProps {
  closeDropdown: () => void;
  openEditProfileModal?: () => void;
  openChangePasswordModal?: () => void;
}

export default function ProfileDropdown({
  closeDropdown,
  openEditProfileModal,
  openChangePasswordModal,
}: ProfileDropdownProps) {
  const { user: authUser } = useAuth();
  const { data, isLoading, isError, error } = useUser(String(authUser?.id));

  const loggedUser = data?.data;
  const activeUser = loggedUser ?? authUser; 

  if (isLoading && !authUser) {
    return (
      <div className="min-w-[400px] p-6 bg-white rounded-lg shadow-lg">
        <p>Loading profile details...</p>
      </div>
    );
  }

  if (isError && !activeUser) {
    console.error("Failed to fetch user profile:", error);
    return (
      <div className="min-w-[400px] p-6 bg-white rounded-lg shadow-lg">
        <p>Error: Failed to load profile. Please try again.</p>
      </div>
    );
  }

  if (!activeUser) {
    return (
      <div className="min-w-[400px] p-6 bg-white rounded-lg shadow-lg">
        <p>No user data available.</p>
      </div>
    );
  }

  const fullName =
    `${activeUser.firstname ?? ""} ${activeUser.lastname ?? ""}`.trim() ||
    "User Name";
  const userEmail = activeUser.email ?? "user@example.com";
  const userRoles =
    activeUser?.roles?.map((role) => role.userRole).join(", ") ?? "User";
  const phoneNumber = activeUser.phoneNo ?? "N/A";

  return (
    <div className="min-w-[400px] p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-4 w-full">
        <div>
          <p className="font-semibold">{fullName}</p>
          <p className="text-sm text-gray-500">{userEmail}</p>
          <p className="text-sm text-black">{userRoles}</p>
        </div>
      </div>

      <hr className="text-gray-200 mt-2" />

      <div className="flex justify-between w-full p-2">
        <div className="font-semibold">Name</div>
        <p>{fullName}</p>
      </div>
      <div className="flex justify-between w-full p-2">
        <div className="font-semibold">Email</div>
        <p>{userEmail}</p>
      </div>
      <div className="flex justify-between w-full p-2">
        <div className="font-semibold">Phone Number</div>
        <p>{phoneNumber}</p>
      </div>
      <div className="flex justify-between w-full p-2">
        <div className="font-semibold">Password</div>
        <p>•••••••••</p>
      </div>

      <hr className="text-gray-200 mt-2" />

      <div className="mt-4 flex gap-2 justify-between">
        <Button
          variant="outline"
          onClick={closeDropdown}
          className="cursor-pointer text-[#161CCA]"
        >
          Cancel
        </Button>
        <Button
          onClick={openEditProfileModal}
          className="cursor-pointer bg-[#161CCA] text-white"
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
