'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { useIncidentReports, useResolveIncidents } from "@/hooks/use-orgs";
import { toast } from "sonner";
import { useState } from "react";

export default function RecentIncidents() {
  const [currentPage, setCurrentPage] = useState(0); 
  const itemsPerPage = 10;

  const { data: incidents } = useIncidentReports(currentPage, itemsPerPage);
  const { mutate: resolveIncident } = useResolveIncidents();

  const incidentList = incidents?.data?.data || [];
  const totalData = incidents?.data?.totalData || 0;
  const totalPages = Math.ceil(totalData / itemsPerPage);

  const handleResolve = (incidentId: string, userName: string) => {
    resolveIncident(
      { id: incidentId, status: true },
      {
        onSuccess: () => toast.success(`${userName} resolved successfully`),
        onError: (err) => {
          toast.error(`Failed to resolve ${userName}`);
          console.error(err);
        },
      }
    );
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 10;

    for (let i = 1; i <= Math.min(totalPages, maxVisiblePages); i++) {
      pages.push(i);
    }

    if (totalPages > maxVisiblePages) {
      pages.push("...");
      for (
        let i = Math.max(maxVisiblePages + 1, totalPages - 2);
        i <= totalPages;
        i++
      ) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  return (
    <div className="py-8">
      <div className="w-full">
        <div className="Recent Incidents">
          <Card className="shadow-none gap-0 rounded-lg pb-6 pt-6 bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                Recent Incidents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-col gap-5">
                {incidentList.map((incident) => (
                  <div
                    key={incident.id}
                    className={`rounded-lg flex flex-col gap-1
                      ${incident.status === true
                        ? "bg-green-100"
                        : incident.type === "auto"
                        ? "bg-red-100"
                        : incident.type === "reported"
                        ? "bg-yellow-100"
                        : ""}`}
                  >
                    <div className="flex justify-between items-center pr-4">
                      <div>
                        <ul>
                          <div className="flex py-2 gap-2">
                            <div className="pt-2 pl-2">
                              <div className="w-[5.5px] h-[5.5px] bg-[#161CCA] rounded-full"></div>
                            </div>
                            <li className="flex flex-col">
                              {incident.type === "auto" ? (
                                <>
                                  <span className="text-gray-900">
                                    {incident.message}
                                  </span>
                                  <span className="text-gray-600">User: Auto</span>
                                  <span className="text-gray-600">
                                    Utility Company: Memmcol
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

                              <span className="text-gray-600 gap-1 flex items-center">
                                {new Date(incident.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                                <div className="w-[4px] h-[4px] bg-[#6D6D6D] rounded-full"></div>
                                <Clock size={16} color="#6D6D6D" />
                                {new Date(incident.createdAt).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                  }
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
                                incident?.organization?.businessName
                              )
                            }
                            className="flex h-10 cursor-pointer text-black items-center border-1 border-gray-400 gap-2 bg-gray-50 hover:bg-gray-100"
                          >
                            Resolve
                          </Button>
                        ) : (
                          <div className="flex h-10 text-gray-600 font-semibold items-center rounded-md border-1 border-gray-400 px-4 gap-2 bg-transparent">
                            Resolved
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {incidentList.length > 0 && (
                <div className="flex items-center mt-10 justify-between px-6 py-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                    disabled={currentPage === 0}
                    className="flex border-1 border-gray-300 cursor-pointer items-center px-3 py-2 gap-1 bg-white text-gray-900"
                  >
                    <ArrowLeft color="#414651" strokeWidth={1.75} />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span key={index} className="px-2 text-gray-400">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === (page as number - 1) ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setCurrentPage((page as number) - 1)}
                          className={`h-8 w-8 cursor-pointer p-0 ${
                            currentPage === page as number - 1
                              ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                    }
                    disabled={currentPage === totalPages - 1}
                    className="flex border-1 border-gray-300 cursor-pointer items-center px-3 py-2 gap-1 bg-white text-gray-900"
                  >
                    Next
                    <ArrowRight color="#414651" strokeWidth={1.75} />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
