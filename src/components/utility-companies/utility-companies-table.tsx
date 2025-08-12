// utility-companies-table.tsx
import { useState } from "react";
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
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  CircleSlash,
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

const utilityCompaniesData = [
  {
    id: 1,
    company: "IBDEC",
    email: "Mon.grid@powergrid.com",
    admin: "Deyemi Oyewo",
    phone: "+23491827372",
    status: "Active",
    customers: "45,000",
    totalVending: "₦2.4 Billion",
    totalBilling: "₦2.4 Billion",
    registrationDate: "1/15/2024",
  },
  {
    id: 2,
    company: "IBDEC",
    email: "Mon.grid@powergrid.com",
    admin: "Deyemi Oyewo",
    phone: "+23491827372",
    status: "Active",
    customers: "45,000",
    totalVending: "₦2.4 Billion",
    totalBilling: "₦2.4 Billion",
    registrationDate: "1/15/2024",
  },
  {
    id: 3,
    company: "IBDEC",
    email: "Mon.grid@powergrid.com",
    admin: "Deyemi Oyewo",
    phone: "+23491827372",
    status: "Active",
    customers: "45,000",
    totalVending: "₦2.4 Billion",
    totalBilling: "₦2.4 Billion",
    registrationDate: "1/15/2024",
  },
  {
    id: 4,
    company: "IBDEC",
    email: "Mon.grid@powergrid.com",
    admin: "Deyemi Oyewo",
    phone: "+23491827372",
    status: "Active",
    customers: "45,000",
    totalVending: "₦2.4 Billion",
    totalBilling: "₦2.4 Billion",
    registrationDate: "1/15/2024",
  },
  {
    id: 5,
    company: "IBDEC",
    email: "Mon.grid@powergrid.com",
    admin: "Deyemi Oyewo",
    phone: "+23491827372",
    status: "Active",
    customers: "45,000",
    totalVending: "₦2.4 Billion",
    totalBilling: "₦2.4 Billion",
    registrationDate: "1/15/2024",
  },
  {
    id: 6,
    company: "IBDEC",
    email: "Mon.grid@powergrid.com",
    admin: "Deyemi Oyewo",
    phone: "+23491827372",
    status: "Active",
    customers: "45,000",
    totalVending: "₦2.4 Billion",
    totalBilling: "₦2.4 Billion",
    registrationDate: "1/15/2024",
  },
];

export default function UtilityCompaniesTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = 10;

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
              style={{ backgroundColor: "hsla(0, 0%, 20%, 0.1)" }}
            >
              <TableHead className="h-12 pl-6 text-xs font-bold text-gray-700 uppercase">
                COMPANY
              </TableHead>
              <TableHead className="h-12 text-xs font-bold text-gray-700 uppercase">
                ADMIN
              </TableHead>
              <TableHead className="h-12 text-xs font-bold text-gray-700 uppercase">
                STATUS
              </TableHead>
              <TableHead className="h-12 text-xs font-bold text-gray-700 uppercase">
                CUSTOMERS
              </TableHead>
              <TableHead className="h-12 text-xs font-bold text-gray-700 uppercase">
                TOTAL VENDING
              </TableHead>
              <TableHead className="h-12 text-xs font-bold text-gray-700 uppercase">
                TOTAL BILLING
              </TableHead>
              <TableHead className="h-12 text-xs font-bold text-gray-700 uppercase">
                REGISTRATION DATE
              </TableHead>
              <TableHead className="h-12 pr-6 text-right text-xs font-bold text-gray-700 uppercase">
                ACTION
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {utilityCompaniesData.map((company) => (
              <TableRow key={company.id} className="hover:bg-gray-50">
                <TableCell className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                      <Building2 size={18} className="text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {company.company}
                      </div>
                      <div className="text-xs text-gray-500">
                        {company.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div>
                    <div className="text-sm text-gray-900">{company.admin}</div>
                    <div className="text-xs text-gray-500">{company.phone}</div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <Badge
                    variant="secondary"
                    className="bg-green-50 px-3 font-normal text-green-700 hover:bg-green-50"
                  >
                    {company.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {company.customers}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {company.totalVending}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {company.totalBilling}
                </TableCell>
                <TableCell className="text-sm text-gray-900">
                  {company.registrationDate}
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
                      <DropdownMenuItem className="align-items-center cursor-pointer">
                        <Eye size={14} className="text-black mt-1" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="align-items-center cursor-pointer">
                        <Pencil size={14} className="text-black" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="align-items-center cursor-pointer" >
                        <CircleSlash size={14} className="text-black" />
                        Suspend
                      </DropdownMenuItem>
                      <DropdownMenuItem className="align-items-center cursor-pointer">
                        <CircleSlash size={14} className="text-black" />
                        Unsuspend
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex cursor-pointer items-center gap-1 bg-gray-50 text-gray-600"
          >
            <ChevronLeft size={16} />
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
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-600 hover:bg-gray-50"
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
                className="h-8 w-8 cursor-pointer p-0 text-gray-600 hover:bg-gray-100"
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="flex cursor-pointer items-center gap-1 bg-gray-50 text-gray-600"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
