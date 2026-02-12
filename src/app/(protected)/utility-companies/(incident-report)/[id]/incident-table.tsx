"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCompanyIncidentReports,
  useResolveIncidents,
} from "@/hooks/use-orgs";
import { toast } from "sonner";
import { useState } from "react";
import { useParams } from "next/navigation";

interface CompanyIncidentTableProps {
  activeTab: "unresolved" | "resolved";
}

export default function CompanyIncidentTable({
  activeTab,
}: CompanyIncidentTableProps) {
  const params = useParams();
  const companyId = params.id as string;

  const [unresolvedPage, setUnresolvedPage] = useState(0);
  const [resolvedPage, setResolvedPage] = useState(0);
  const itemsPerPage = 10;

  const currentPage = activeTab === "unresolved" ? unresolvedPage : resolvedPage;
  const setCurrentPage =
    activeTab === "unresolved" ? setUnresolvedPage : setResolvedPage;

  const { data: incidents, isLoading } = useCompanyIncidentReports(
    companyId,
    currentPage,
    itemsPerPage,
    activeTab === "resolved",
  );
  const { mutate: resolveIncident } = useResolveIncidents();

  const incidentList = incidents?.data?.data || [];
  const totalData = incidents?.data?.totalData || 0;
  const totalPages = Math.ceil(totalData / itemsPerPage); 

  const skeletonItems = Array(5).fill(0);

  const handleResolve = (incidentId: string, userName: string) => {
    resolveIncident(
      { id: incidentId, status: true },
      {
        onSuccess: () => {
          toast.success(`${userName} resolved successfully`);
          setUnresolvedPage(0); 
        },
        onError: (err) => {
          toast.error(`Failed to resolve ${userName}`);
          console.error(err);
        },
      },
    );
  };

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    const pages: (number | "...")[] = [];
    const delta = 2;

    pages.push(0);

    const rangeStart = Math.max(1, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 2, currentPage + delta);

    if (rangeStart > 1) pages.push("...");

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 2) pages.push("...");

    pages.push(totalPages - 1);

    return pages;
  };

  return (
    <div className="w-full">
      <Card className="gap-0 rounded-lg bg-white pt-6 pb-6 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl font-medium">
            {activeTab === "unresolved" ? "Unresolved" : "Resolved"} Incidents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col gap-5">
            {isLoading ? (
              skeletonItems.map((_, index) => (
                <div
                  key={index}
                  className="flex animate-pulse flex-col gap-2 rounded-lg bg-gray-100 p-4"
                >
                  <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                  <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                  <div className="h-3 w-1/3 rounded bg-gray-200"></div>
                  <div className="mt-2 h-3 w-1/4 rounded bg-gray-200"></div>
                </div>
              ))
            ) : incidentList.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No {activeTab} incidents found
              </div>
            ) : (
              incidentList.map((incident) => (
                <div
                  key={incident.id}
                  className={`flex flex-col gap-1 rounded-lg ${
                    incident.status === true
                      ? "bg-green-100"
                      : incident.type === "auto"
                        ? "bg-red-100"
                        : incident.type === "reported"
                          ? "bg-yellow-100"
                          : ""
                  }`}
                >
                  <div className="flex items-center justify-between pr-4">
                    <div>
                      <ul>
                        <div className="flex gap-2 py-2">
                          <div className="pt-2 pl-2">
                            <div className="h-[5.5px] w-[5.5px] rounded-full bg-[#161CCA]"></div>
                          </div>
                          <li className="flex flex-col">
                            {incident.type === "auto" ? (
                              <>
                                <span className="text-gray-900">
                                  {incident.message}
                                </span>
                                <span className="text-gray-600">
                                  User: Auto
                                </span>
                                <span className="text-gray-600">
                                  Utility Company:{" "}
                                  {incident?.organization.businessName}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-gray-900">
                                  {incident.message}
                                </span>
                                {incident?.user && (
                                  <span className="text-gray-600">
                                    User: {incident?.user?.firstname}{" "}
                                    {incident?.user?.lastname}
                                  </span>
                                )}
                                {incident?.organization && (
                                  <span className="text-gray-600">
                                    Utility Company:{" "}
                                    {incident.organization?.businessName}
                                  </span>
                                )}
                              </>
                            )}

                            <span className="flex items-center gap-1 text-gray-600">
                              {new Date(incident.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                              <div className="h-[4px] w-[4px] rounded-full bg-[#6D6D6D]"></div>
                              <Clock size={16} color="#6D6D6D" />
                              {new Date(incident.createdAt).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                },
                              )}
                            </span>
                          </li>
                        </div>
                      </ul>
                    </div>
                    <div>
                      {incident.status === false ? (
                        <Button
                          onClick={() =>
                            handleResolve(
                              incident.id,
                              incident?.organization?.businessName,
                            )
                          }
                          className="flex h-10 cursor-pointer items-center gap-2 border-1 border-gray-400 bg-gray-50 text-black hover:bg-gray-100"
                        >
                          Resolve
                        </Button>
                      ) : (
                        <div className="flex h-10 items-center gap-2 rounded-md border-1 border-gray-400 bg-transparent px-4 font-semibold text-gray-600">
                          Resolved
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {incidentList.length > 0 && (
            <div className="mt-10 flex items-center justify-between px-6 py-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 0} // ✅ disabled at 0
                className="flex cursor-pointer items-center gap-1 border-1 border-gray-300 bg-white px-3 py-2 text-gray-900"
              >
                <ArrowLeft color="#414651" strokeWidth={1.75} />
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                      ...
                    </span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`h-8 w-8 cursor-pointer p-0 ${
                        currentPage === page
                          ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page + 1} 
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages - 1} 
                className="flex cursor-pointer items-center gap-1 border-1 border-gray-300 bg-white px-3 py-2 text-gray-900"
              >
                Next
                <ArrowRight color="#414651" strokeWidth={1.75} />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}