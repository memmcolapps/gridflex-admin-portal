import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Eye,
  Pencil,
  CircleSlash,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditAdminDialog, type AdminData } from "./admin-management-dialogs/edit-admin-dialog";
import { SuspendAdminDialog } from "./admin-management-dialogs/suspend-admin-dialog";
import { UnsuspendAdminDialog } from "./admin-management-dialogs/unsuspend-admin-dialog";
import { useGetAdminResponse } from "@/hooks/use-orgs";
import type { UnifiedFormData } from "@/types/unifiedForm";
import type { SearchProps } from "@/types/org.interfaces";

const SkeletonRow = () => (
  <TableRow className="hover:bg-gray-50">
    <TableCell className="py-4 pl-6">
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </TableCell>
    <TableCell className="py-4">
      <div className="flex flex-col gap-2">
        <div className="h-3 w-26 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </TableCell>
    <TableCell className="py-4">
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
    </TableCell>
    <TableCell className="py-4">
      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
    </TableCell>
    <TableCell className="py-4">
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
    </TableCell>
    <TableCell className="pr-6 text-right">
      <div className="flex justify-end">
        <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </TableCell>
  </TableRow>
);

export default function AdminManagementTable({ filterParams }: SearchProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isUnsuspendDialogOpen, setIsUnsuspendDialogOpen] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState<{
    id: string;
    name: string;
    status: boolean;
  } | null>(null);

  const [selectedUser, setSelectedUser] = useState<AdminData | null>(null);

  const skeletonItems = Array(itemsPerPage).fill(0);

  const apiParams = filterParams?.role === "all"
    ? {
      search: filterParams?.search,
      status: filterParams?.status
    }
    : filterParams;

  const { data: admin, isLoading, error } = useGetAdminResponse(apiParams);
  const adminData = admin?.data?.operators ?? [];

  const totalPages = Math.ceil(
    (adminData?.length || 0) / itemsPerPage,
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 10;

    for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
      pages.push(i);
    }

    if (totalPages > maxVisiblePages) {
      pages.push('...');
      for (let i = Math.max(maxVisiblePages + 1, totalPages - 2); i <= totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterParams]);

  function handleAdminUpdate(data: UnifiedFormData): void {
    console.log("Admin updated:", data);
  }


  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">Failed to load admin infomation</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">
          Admin List
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow
              className="border-b border-black hover:bg-[hsla(0,0%,20%,0.1)]"
              style={{ backgroundColor: "hsla(0, 0%, 96%)" }}
            >
              <TableHead className="h-12 pl-6 text-base font-medium text-gray-700">
                Admin Name
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Email
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Role
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Status
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Last Login
              </TableHead>
              <TableHead className="pr-6 text-right text-base font-medium text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              skeletonItems.map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : adminData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No admins found
                </TableCell>
              </TableRow>
            ) : (
              adminData.map((data) => (
                <TableRow key={data.id} className="hover:bg-gray-50">
                  <TableCell className="py-6 pl-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {data.firstname +
                          " " +
                          data.lastname}
                      </div>
                      <div className="text-xs text-gray-500">{""}</div>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm font-medium text-gray-900">
                    {data.email}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">
                    {data.roles.map((role, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className={`rounded-sm px-2 py-1 font-semibold ${role.userRole === "SUPER_ADMIN"
                          ? "bg-green-50 text-green-700"
                          : role.userRole === "Developer"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-900"
                          }`}
                      >
                        {role.userRole}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="py-4">
                    {data.status ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-50 rounded-sm px-2 py-1 font-semibold text-green-700 hover:bg-green-50"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-red-50 rounded-sm px-2 py-1 font-semibold text-red-700 hover:bg-red-50"
                      >
                        Suspended
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">
                    {data.updatedAt}
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 cursor-pointer rounded-lg border border-gray-200 bg-white p-0 shadow-sm hover:bg-gray-50"
                        >
                          <MoreVertical size={16} className="text-gray-600" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="center">
                        <DropdownMenuItem
                          className="align-items-center cursor-pointer"
                          onClick={() =>
                            router.push(`/admin-details/${data.id}`)
                          }
                        >
                          <Eye size={14} className="mt-1 mr-2 text-black" />
                          View Details
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUser({
                              id: data.id,
                              firstname: data.firstname,
                              lastname: data.lastname,
                              email: data.email,
                              defaultPassword: data.defaultPassword || '',
                              department: "",
                              phoneNo: data.phoneNo || "",
                              role: data.roles[0]?.userRole || ""
                            });
                            setIsEditDialogOpen(true);
                          }}
                          className="align-items-center cursor-pointer"
                        >
                          <Pencil size={14} className="mr-2 text-black" />
                          Edit
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          disabled={data.status === false}
                          onClick={() => {
                            if (data.status !== false) {
                              setSelectedAdmin({
                                id: data.id,
                                name: `${data.firstname} ${data.lastname}`,
                                status: data.status
                              });
                              setIsSuspendDialogOpen(true);
                            }
                          }}
                          className={`
                            align-items-center cursor-pointer
                            ${data.status === false ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                          <CircleSlash size={14} className="mr-2 text-black" />
                          <span>Suspend</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          disabled={data.status === true}
                          onClick={() => {
                            if (data.status !== true) {
                              setSelectedAdmin({
                                id: data.id,
                                name: `${data.firstname} ${data.lastname}`,
                                status: data.status,
                              });
                              setIsUnsuspendDialogOpen(true);
                            }
                          }}
                          className={`
                          align-items-center cursor-pointer
                          ${data.status === true ? "opacity-50 cursor-not-allowed" : ""}
                          `}
                        >
                          <CircleSlash size={14} className="mr-2 text-black" />
                          <span>Unsuspend</span>
                        </DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
              )
            )}
          </TableBody>
        </Table>
        {adminData.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex border-1 border-gray-300 cursor-pointer items-center px-3 py-2 gap-1 bg-white text-gray-900"
            >
              <ArrowLeft color="#414651" strokeWidth={1.75} />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={index} className="px-2 text-gray-400">...</span>
                ) : (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(page as number)}
                    className={`h-8 w-8 cursor-pointer p-0 ${currentPage === page
                      ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      : "text-gray-500 hover:bg-gray-50"
                      }`}
                  >
                    {page}
                  </Button>
                )
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex border-1 border-gray-300 cursor-pointer items-center px-3 py-2 gap-1 bg-white text-gray-900"
            >
              Next
              <ArrowRight color="#414651" strokeWidth={1.75} />
            </Button>
          </div>
        )}

      </CardContent>

      {/* Dialogs */}
      <EditAdminDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        selectedContact={selectedUser}
        onSubmit={handleAdminUpdate}
      />

      <SuspendAdminDialog
        isOpen={isSuspendDialogOpen}
        onOpenChange={(open) => {
          setIsSuspendDialogOpen(open);
          if (!open) setSelectedAdmin(null);
        }}
        adminId={selectedAdmin?.id || ""}
        adminName={selectedAdmin?.name}
      />

      <UnsuspendAdminDialog
        isOpen={isUnsuspendDialogOpen}
        onOpenChange={(open) => {
          setIsUnsuspendDialogOpen(open);
          if (!open) setSelectedAdmin(null);
        }}
        adminId={selectedAdmin?.id || ""}
        adminName={selectedAdmin?.name}
      />
    </Card>
  );
}