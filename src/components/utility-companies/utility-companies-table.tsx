// utility-companies-table.tsx
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
  Building2,
  MoreVertical,
  Eye,
  Pencil,
  CircleSlash,
  ArrowLeft,
  ArrowRight,
  CircleCheckBig,
  CircleAlert,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetOrgs } from "@/hooks/use-orgs";
import { SuspendUtilityDialog } from "./utility-companies-dialogs/suspend-utility-dialog";
import { UnsuspendUtilityDialog } from "./utility-companies-dialogs/unsuspend-utility-dialog";
import { SelectModulesDialog } from "./utility-companies-dialogs/add-modules-dialog";
import { EditUtilityCompanyDialog, type OrganizationData } from "./utility-companies-dialogs/edit-utility-company-dialog";
import type { UnifiedFormData } from "@/types/unifiedForm";

export default function UtilityCompaniesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isSelectModulesDialogOpen, setIsSelectModulesDialogOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isUnsuspendDialogOpen, setIsUnsuspendDialogOpen] = useState(false);
  const router = useRouter();
  const { data: utilityCompaniesData } = useGetOrgs();
  const handleSubmit = (data: UnifiedFormData) => {
    console.log("Submitted data:", data);
    setIsEditOpen(false);
  };
  const totalPages = Math.ceil(
    (utilityCompaniesData?.organizations.length || 0) / itemsPerPage,
  );
  const [selectedOrganization, setSelectedOrganization] = useState<{
    id: string;
    name: string;
    status?: boolean;
  } | null>(null);

  const [selectedOrg, setSelectedOrg] = useState<OrganizationData | null>(null)

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

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-1">
        <CardTitle className="text-lg font-semibold">
          Utility Companies
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
                Utility Name
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Admin
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Status
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Customers
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Total Vending
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Total Billing
              </TableHead>
              <TableHead className="h-12 text-base font-medium text-gray-700">
                Registration Date
              </TableHead>
              <TableHead className="h-12 pr-6 text-right text-base font-medium text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilityCompaniesData?.organizations.map((company) => (
              <TableRow key={company.id} className="hover:bg-gray-50">
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Building2 size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {company.businessName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {company.operator?.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div>
                    <div className="text-sm text-gray-900">
                      {company.operator?.firstname +
                        " " +
                        company.operator?.lastname}
                    </div>
                    <div className="text-xs text-gray-500">{""}</div>
                  </div>
                </TableCell>
                {/* <TableCell className="py-4">
                  {company.status === true ? (
                    <Badge
                      variant="secondary"
                      className="bg-green-50 px-3 font-normal text-green-700 hover:bg-green-50"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-red-50 px-3 font-normal text-red-700 hover:bg-red-50"
                    >
                      Inactive
                    </Badge>
                  )}
                </TableCell> */}
                <TableCell className="py-4">
                  {company.status ? (
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
                  {company.totalCustomer}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {company.totalVending}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {company.totalBilling}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {company.createdAt}
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
                        onClick={() => router.push('/incident-management')}
                        className="align-items-center cursor-pointer">
                        <CircleAlert size={14} className="mr-2 text-black" />
                        View Incidents
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="align-items-center cursor-pointer"
                        onClick={() =>
                          router.push(`/performance-overview/${company.id}`)
                        }
                      >
                        <Eye size={14} className="mt-1 mr-2 text-black" />
                        View Details
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedOrg ({
                            businessName: company.businessName ?? "",
                            postalCode: company.postalCode ?? "",
                            address: company.address ?? "",
                            country: company.country ?? "",
                            state: company.state ?? "",
                            city: company.city ?? "",
                            firstName: company.operator?.firstname ?? "",
                            lastName: company.operator?.lastname ?? "",
                            email: company.operator?.email ?? "",
                            phoneNumber: company.id ?? "",
                          })
                          setIsEditOpen(true)
                        }}
                        className="align-items-center cursor-pointer">
                        <Pencil size={14} className="mr-2 text-black" />
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedOrganization({
                            id: company.id,
                            name: company.businessName,
                          });
                          setIsSelectModulesDialogOpen(true);
                        }}
                        className="flex items-center cursor-pointer"
                      >
                        <CircleCheckBig size={14} className="mr-2 text-black" />
                        Select Modules
                      </DropdownMenuItem>


                      <DropdownMenuItem
                        disabled={company.status === false}
                        onClick={() => {
                          if (company.status !== false) {
                            setSelectedOrganization({
                              id: company.id,
                              name: `${company.businessName}`,
                              status: company.status
                            });
                            setIsSuspendDialogOpen(true);
                          }
                        }}
                        className={`
                          align-items-center cursor-pointer
                          ${company.status === false ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                      >
                        <CircleSlash size={14} className="mr-2 text-black" />
                        <span>Suspend</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        disabled={company.status === true}
                        onClick={() => {
                          if (company.status !== true) {
                            setSelectedOrganization({
                              id: company.id,
                              name: `${company.businessName}`,
                              status: company.status,
                            });
                            setIsUnsuspendDialogOpen(true);
                          }
                        }}
                        className={`
                        align-items-center cursor-pointer
                        ${company.status === true ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                      >
                        <CircleSlash size={14} className="mr-2 text-black" />
                        <span>Unsuspend</span>
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
      </CardContent>

      {/* Dialogs */}
      <SelectModulesDialog
        isOpen={isSelectModulesDialogOpen}
        onOpenChange={setIsSelectModulesDialogOpen}
        organizationId={selectedOrganization?.id || ''}
      />
      <EditUtilityCompanyDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSubmit={handleSubmit}
        organizationId={selectedOrganization?.id || ""}
        selectedOrganization={selectedOrg}
      />
      <SuspendUtilityDialog
        isOpen={isSuspendDialogOpen}
        onOpenChange={(open) => {
          setIsSuspendDialogOpen(open);
          if (!open) setSelectedOrganization(null);
        }}
        organizationId={selectedOrganization?.id || ""}
        organizationName={selectedOrganization?.name}
      />

      <UnsuspendUtilityDialog
        isOpen={isUnsuspendDialogOpen}
        onOpenChange={(open) => {
          setIsUnsuspendDialogOpen(open);
          if (!open) setSelectedOrganization(null);
        }}
        organizationId={selectedOrganization?.id || ""}
        organizationName={selectedOrganization?.name}
      />
    </Card>
  );
}
