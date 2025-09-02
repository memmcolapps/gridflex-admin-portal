import { useState } from "react";
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
// import { useGetOrgs } from "@/hooks/use-orgs";
import { EditAdminDialog } from "./admin-management-dialogs/edit-admin-dialog";
import { SuspendAdminDialog } from "./admin-management-dialogs/suspend-admin-dialog";
import { UnsuspendAdminDialog } from "./admin-management-dialogs/unsuspend-admin-dialog";

const ADMIN_DATA = [
  {
    id: '1',
    firstName: 'Adeyemi',
    lastName: ' Oyewo',
    email: 'Deyemioyewo@gmail.com',
    role: 'Admin',
    phoneNumber: '+234 810 XXX XXXX',
    address: '12 Adeola Odeku St, Lagos',
    status: true,
    lastLogin: '2024-01-15 09:30',
  },
  {
    id: '2',
    firstName: 'Adeyemi',
    lastName: ' Oyewo',
    email: 'Deyemioyewo@gmail.com',
    role: 'Developer',
    phoneNumber: '+234 810 XXX XXXX',
    address: '12 Adeola Odeku St, Lagos',
    status: false,
    lastLogin: '2024-01-15 09:30',
  },
  {
    id: '3',
    firstName: 'Adeyemi',
    lastName: ' Oyewo',
    email: 'Deyemioyewo@gmail.com',
    phoneNumber: '+234 810 XXX XXXX',
    address: '12 Adeola Odeku St, Lagos',
    role: 'Developer',
    status: true,
    lastLogin: '2024-01-15 09:30',
  },
  {
    id: '4',
    firstName: 'Adeyemi',
    lastName: ' Oyewo',
    email: 'Deyemioyewo@gmail.com',
    phoneNumber: '+234 810 XXX XXXX',
    address: '12 Adeola Odeku St, Lagos',
    role: 'Support',
    status: true,
    lastLogin: '2024-01-15 09:30',
  },
  {
    id: '5',
    firstName: 'Adeyemi',
    lastName: ' Oyewo',
    email: 'Deyemioyewo@gmail.com',
    phoneNumber: '+234 810 XXX XXXX',
    address: '12 Adeola Odeku St, Lagos',
    role: 'Developer',
    status: true,
    lastLogin: '2024-01-15 09:30',
  },
]

export default function AdminManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false)
  const [isUnsuspendDialogOpen, setIsUnsuspendDialogOpen] = useState(false)
  // const { data: utilityCompaniesData, isLoading, isError } = useGetOrgs();
  // const totalPages = Math.ceil(
  //   (utilityCompaniesData?.organizations.length || 0) / itemsPerPage,
  // );

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
              style={{ backgroundColor: "hsla(0, 0%, 20%, 0.1)" }}
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
            {ADMIN_DATA.map((data) => (
              <TableRow key={data.id} className="hover:bg-gray-50">
                <TableCell className="py-6 pl-6">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {data.firstName +
                        " " +
                        data.lastName}
                    </div>
                    <div className="text-xs text-gray-500">{""}</div>
                  </div>
                </TableCell>

                <TableCell className="text-sm font-medium text-gray-900">
                  {data.email}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {data.role === 'Developer' && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 rounded-sm px-2 py-1 text-[var(--primary)] hover:bg-primary/80"
                    >
                      Developer
                    </Badge>
                  )}
                  {data.role === 'Admin' && (
                    <Badge
                      variant="secondary"
                      className="bg-green-50 rounded-sm px-2 py-1 font-normal text-green-700 hover:bg-green-50"
                    >
                      Admin
                    </Badge>
                  )}
                  {data.role === 'Support' && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 rounded-sm px-2 py-1 font-normal text-gray-900 hover:bg-green-50"
                    >
                      Support
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="py-4">
                  {data.status === true ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-50 rounded-sm px-2 py-1 font-normal text-green-700 hover:bg-green-50"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-red-50 rounded-sm px-2 py-1 font-normal text-red-700 hover:bg-red-50"
                    >
                      Suspended
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {data.lastLogin}
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
                      <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)} className="align-items-center cursor-pointer">
                        <Pencil size={14} className="mr-2 text-black" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsSuspendDialogOpen(true)} className="align-items-center cursor-pointer">
                        <CircleSlash size={14} className="mr-2 text-black" />
                        Suspend
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setIsUnsuspendDialogOpen(true)} className="align-items-center cursor-pointer">
                        <CircleSlash size={14} className="mr-2 text-black" />
                        Unsuspend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
            {[1, 2, 3].map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 cursor-pointer p-0 ${currentPage === page
                  ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                {page}
              </Button>
            ))}
            <span className="px-2 text-gray-400">...</span>
            {[8, 9, 10].map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={`h-8 w-8 cursor-pointer p-0 ${currentPage === page
                  ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="lg"
            // onClick={() =>
            //   setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            // }
            // disabled={currentPage === totalPages}
            className="flex border-1 border-gray-300 cursor-pointer items-center px-3 py-2 gap-1 bg-white text-gray-900"
          >
            Next
            <ArrowRight color="#414651" strokeWidth={1.75} />
          </Button>
        </div>
      </CardContent>

      {/* Dialogs */}
      <EditAdminDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
      />
      <SuspendAdminDialog
        isOpen={isSuspendDialogOpen}
        onOpenChange={setIsSuspendDialogOpen}
      />
      <UnsuspendAdminDialog
        isOpen={isUnsuspendDialogOpen}
        onOpenChange={setIsUnsuspendDialogOpen}
      />
    </Card>
  );
}
