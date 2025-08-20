"use client";
import {
  Banknote,
  Building2,
  ChevronRight,
  Database,
  Edit,
  LayoutGrid,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Plus,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, type Key } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { UnifiedFormData } from "@/types/unifiedForm";
import type { Node as ApiNode, GetOneNode } from "@/types/org.interfaces";
import { AddRegionDialog } from "../utility-companies-dialogs/add-region-dialog";
import { AddBusinessHubDialog } from "../utility-companies-dialogs/add-business-hub-dialog";
import { AddSubstationDialog } from "@/components/utility-companies/utility-companies-dialogs/add-substation-dialog";
import { AddFeederLineDialog } from "@/components/utility-companies/utility-companies-dialogs/add-feeder-line-dialog";
import { AddDistributionSubstationDialog } from "@/components/utility-companies/utility-companies-dialogs/add-dss-dialog";
import { EditRootDialog } from "@/components/utility-companies/utility-companies-dialogs/edit-root-dialog";
import { EditBusinessHubDialog } from "@/components/utility-companies/utility-companies-dialogs/edit-business-hub-dialog";
import { EditSubstationDialog } from "@/components/utility-companies/utility-companies-dialogs/edit-substation-dialog";
import { EditFeederLineDialog } from "@/components/utility-companies/utility-companies-dialogs/edit-feeder-line-dialog";
import { EditDistributionSubstationDialog } from "@/components/utility-companies/utility-companies-dialogs/edit-dss-dialog";
import { AddServiceCenterDialog } from "@/components/utility-companies/utility-companies-dialogs/add-service-center-dialog";
import { EditServiceCenterDialog } from "@/components/utility-companies/utility-companies-dialogs/edit-service-center-dialog";
import {
  useCreateRegionBhubServiceCenter,
  useCreateSubstationTransfomerFeeder,
  useGetOneOrg,
} from "@/hooks/use-orgs";
import { toast } from "sonner";

export default function PerformanceOverview({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [activeTab, setActiveTab] = useState("summary");
  const [isAddRegionOpen, setIsAddRegionOpen] = useState(false);
  const [isAddBusinessHubOpen, setIsAddBusinessHubOpen] = useState(false);
  const [isAddServiceCenterOpen, setIsAddServiceCenterOpen] = useState(false);
  const [isAddSubstationOpen, setIsAddSubstationOpen] = useState(false);
  const [isAddFeederLineOpen, setIsAddFeederLineOpen] = useState(false);
  const [isAddDSSOpen, setIsAddDSSOpen] = useState(false);
  const [isEditRootOpen, setIsEditRootOpen] = useState(false);
  const [isEditBusinessHubOpen, setIsEditBusinessHubOpen] = useState(false);
  const [isEditServiceCenterOpen, setIsEditServiceCenterOpen] = useState(false);
  const [isEditSubstationOpen, setIsEditSubstationOpen] = useState(false);
  const [isEditFeederLineOpen, setIsEditFeederLineOpen] = useState(false);
  const [isEditDSSOpen, setIsEditDSSOpen] = useState(false);
  const [currentParentId, setCurrentParentId] = useState<string>("");
  const [currentEditNode, setCurrentEditNode] = useState<ApiNode | null>(null);
  const queryClient = useQueryClient();

  const { data: performanceData } = useGetOneOrg(id);

  const { mutate: createRegionBhubServiceCenter } =
    useCreateRegionBhubServiceCenter();
  const { mutate: createSubstationTransfomerFeeder } =
    useCreateSubstationTransfomerFeeder();
  const [expanded, setExpanded] = useState(
    new Set([performanceData?.businessName]),
  );

  const summary = [
    {
      title: "Total Customers",
      value: performanceData?.totalCustomer ?? "0",
      change: "+8%",
      changeColor: "text-green-600",
      subtitle: "Vs last year",
      icon: <Users size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Total Vending Amount",
      value: performanceData?.totalVending ?? "0",
      change: "+2%",
      changeColor: "text-green-600",
      subtitle: "Vs last year",
      icon: <TrendingUp size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Total Billing Amount",
      value: performanceData?.totalBilling ?? "0",
      change: "+5%",
      changeColor: "text-green-600",
      subtitle: "Vs last year",
      icon: <Banknote size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Feeders Connected",
      value: performanceData?.totalFeeder ?? "0",
      change: "+1%",
      changeColor: "text-green-600",
      subtitle: "Vs last year",
      icon: <Banknote size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
    },
  ];

  const updateNode = (nodeName: string, updatedData: UnifiedFormData) => {
    console.log("Updating node:", nodeName, "with data:", updatedData);
  };

  const handleAddRegion = (data: UnifiedFormData) => {
    if (!currentParentId) {
      console.error("No parent ID set for adding region");
      return;
    }

    createRegionBhubServiceCenter(
      {
        orgId: id,
        parentId: currentParentId,
        regionId: data.regionId ?? `REG-${Date.now()}`,
        name: data.regionName ?? "Unnamed Region",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        type: "region",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddRegionOpen(false);
          setCurrentParentId("");
          console.log("Region created successfully");
          toast.success("Region created successfully");
        },
        onError: (error) => {
          console.error("Error creating region:", error);
          toast.error("Error creating region");
        },
      },
    );
  };

  const handleAddBusinessHub = (data: UnifiedFormData) => {
    if (!currentParentId) {
      console.error("No parent ID set for adding business hub");
      return;
    }

    createRegionBhubServiceCenter(
      {
        orgId: id,
        parentId: currentParentId,
        regionId: data.regionId ?? `BH-${Date.now()}`,
        name: data.businessHubName ?? "Unnamed Business Hub",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        type: "business hub",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddBusinessHubOpen(false);
          setCurrentParentId("");
          console.log("Business hub created successfully");
          toast.success("Business hub created successfully");
        },
        onError: (error) => {
          console.error("Error creating business hub:", error);
          toast.error("Error creating business hub");
        },
      },
    );
  };

  const handleAddServiceCenter = (data: UnifiedFormData) => {
    if (!currentParentId) {
      console.error("No parent ID set for adding service center");
      return;
    }

    createRegionBhubServiceCenter(
      {
        orgId: id,
        parentId: currentParentId,
        regionId: data.regionId ?? `SC-${Date.now()}`,
        name: data.serviceCenterName ?? "Unnamed Service Center",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        type: "service center",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddServiceCenterOpen(false);
          setCurrentParentId("");
          console.log("Service center created successfully");
          toast.success("Service center created successfully");
        },
        onError: (error) => {
          console.error("Error creating service center:", error);
          toast.error("Error creating service center");
        },
      },
    );
  };

  const handleAddSubstation = (data: UnifiedFormData) => {
    if (!currentParentId) {
      console.error("No parent ID set for adding substation");
      return;
    }

    createSubstationTransfomerFeeder(
      {
        orgId: id,
        parentId: currentParentId,
        name: data.substationName ?? "Unnamed Substation",
        serialNo: data.serialNumber ?? `SUB-${Date.now()}`,
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        type: "substation",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddSubstationOpen(false);
          setCurrentParentId("");
          console.log("Substation created successfully");
          toast.success("Substation created successfully");
        },
        onError: (error) => {
          console.error("Error creating substation:", error);
          toast.error("Error creating substation");
        },
      },
    );
  };

  const handleAddFeederLine = (data: UnifiedFormData) => {
    if (!currentParentId) {
      console.error("No parent ID set for adding feeder line");
      return;
    }

    createSubstationTransfomerFeeder(
      {
        orgId: id,
        parentId: currentParentId,
        name: data.feederName ?? "Unnamed Feeder Line",
        serialNo: data.serialNumber ?? `FL-${Date.now()}`,
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        type: "feeder line",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddFeederLineOpen(false);
          setCurrentParentId("");
          console.log("Feeder line created successfully");
          toast.success("Feeder line created successfully");
        },
        onError: (error) => {
          console.error("Error creating feeder line:", error);
          toast.error("Error creating feeder line");
        },
      },
    );
  };

  const handleAddDSS = (data: UnifiedFormData) => {
    if (!currentParentId) {
      console.error("No parent ID set for adding DSS");
      return;
    }

    createSubstationTransfomerFeeder(
      {
        orgId: id,
        parentId: currentParentId,
        name: data.substationName ?? "Unnamed Distribution Substation (DSS)",
        serialNo: data.serialNumber ?? `DSS-${Date.now()}`,
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        type: "transformer",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddDSSOpen(false);
          setCurrentParentId("");
          console.log("DSS created successfully");
          toast.success("DSS created successfully");
        },
        onError: (error) => {
          console.error("Error creating DSS:", error);
          toast.error("Error creating DSS");
        },
      },
    );
  };

  const handleEditRoot = (data: UnifiedFormData) => {
    console.log("Editing root:", data);
    setIsEditRootOpen(false);
  };

  const handleEditBusinessHub = (data: UnifiedFormData) => {
    if (currentEditNode) {
      updateNode(currentEditNode.name, data);
    }
    setIsEditBusinessHubOpen(false);
    setCurrentEditNode(null);
  };

  const handleEditServiceCenter = (data: UnifiedFormData) => {
    if (currentEditNode) {
      updateNode(currentEditNode.name, data);
    }
    setIsEditServiceCenterOpen(false);
    setCurrentEditNode(null);
  };

  const handleEditSubstation = (data: UnifiedFormData) => {
    if (currentEditNode) {
      updateNode(currentEditNode.name, data);
    }
    setIsEditSubstationOpen(false);
    setCurrentEditNode(null);
  };

  const handleEditFeederLine = (data: UnifiedFormData) => {
    if (currentEditNode) {
      updateNode(currentEditNode.name, data);
    }
    setIsEditFeederLineOpen(false);
    setCurrentEditNode(null);
  };

  const handleEditDSS = (data: UnifiedFormData) => {
    if (currentEditNode) {
      updateNode(currentEditNode.name, data);
    }
    setIsEditDSSOpen(false);
    setCurrentEditNode(null);
  };

  function RenderNode({
    node,
    level,
    _isRoot = false,
  }: {
    node: GetOneNode;
    level: number;
    _isRoot?: boolean;
  }) {
    const nodeName = node.name;
    const nodeId = node.id;
    const isExpanded = expanded.has(nodeName);

    const toggleExpanded = () => {
      const newExpanded = new Set(expanded);
      if (isExpanded) {
        newExpanded.delete(nodeName);
      } else {
        newExpanded.add(nodeName);
      }
      setExpanded(newExpanded);
    };

    // For the tree display, we can't determine the exact node type without additional data
    // So we'll use a generic icon for now, or you could add type information to GetOneNode
    const Icon = Building2;

    return (
      <>
        <div
          className={`flex items-center justify-between ${level > 0 ? `pl-${level * 6}` : ""}`}
        >
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={toggleExpanded}
          >
            <ChevronRight
              size={16}
              className={`text-gray-500 transition-transform ${isExpanded ? "rotate-90" : ""} ${node.nodesTree?.length === 0 ? "invisible" : ""}`}
            />
            <Icon size={18} className="text-gray-500" />
            <span className="font-medium text-gray-900">{nodeName}</span>
          </div>
          <div className="flex items-center gap-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="lg"
                  className="cursor-pointer bg-white p-1 text-black hover:text-gray-700"
                >
                  <Plus size={28} className="h-24 w-24" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="center"
                sideOffset={4}
                avoidCollisions={false}
              >
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddRegionOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <LayoutGrid size={16} />
                  Region
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddBusinessHubOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Building2 size={16} />
                  Business Hub
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddServiceCenterOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Wrench size={16} />
                  Service Centre
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddSubstationOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Database size={16} />
                  Substation
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddFeederLineOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Zap size={16} />
                  Feeder Line
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddDSSOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Lightbulb size={16} />
                  Distribution Substation (DSS)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="lg"
              className="cursor-pointer px-1 text-black hover:text-gray-700"
              onClick={() => {
                // For editing, we'll need to set a simplified node structure
                // Since GetOneNode doesn't have nodeInfo, we'll handle this differently
                setCurrentEditNode({
                  id: nodeId,
                  orgId: node.orgId,
                  name: nodeName,
                  nodeInfo: {
                    id: nodeId,
                    nodeId: nodeId,
                    name: nodeName,
                    phoneNo: "",
                    email: "",
                    contactPerson: "",
                    address: "",
                    createdAt: "",
                    updatedAt: "",
                  },
                });

                // For now, we'll default to root edit since we don't have type info
                setIsEditRootOpen(true);
              }}
            >
              <Edit size={28} className="h-24 w-24" />
            </Button>
          </div>
        </div>
        {isExpanded &&
          node.nodesTree?.map(
            (child: GetOneNode, idx: Key | null | undefined) => (
              <RenderNode key={idx} node={child} level={level + 1} />
            ),
          )}
      </>
    );
  }

  return (
    <div className="space-y-6 bg-white p-6">
      {/* Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Performance Overview
        </h1>
        <p className="text-sm text-gray-500">
          Manage {performanceData?.businessName}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="border-b border-gray-200">
        <button
          onClick={() => setActiveTab("summary")}
          className={`relative pb-3 text-sm font-medium transition-colors ${
            activeTab === "summary"
              ? "text-black after:absolute after:right-0 after:bottom-[-1px] after:left-0 after:h-[1px] after:bg-black after:content-['']"
              : "text-gray-600 hover:text-gray-900"
          } `}
        >
          Summary
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summary.map((item, idx) => (
          <Card key={idx} className="border border-gray-200 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    {item.title}
                  </p>
                  <p className="mb-1 text-2xl font-bold text-gray-900">
                    {item.value}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    {item.subtitle}
                    <span className={`font-medium ${item.changeColor}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`mt-4 flex h-15 w-15 items-center justify-center rounded-lg ${item.iconBg}`}
                >
                  {item.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Company Status */}
      <Card className="h-30 border border-gray-200 bg-white shadow-sm">
        <CardContent className="flex h-full items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
              <Building2 size={24} className="text-gray-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-gray-900">
                  {performanceData?.businessName}
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700"
                >
                  {performanceData?.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Registered {performanceData?.createdAt}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer border-gray-200 bg-white text-black hover:bg-white"
            onClick={() => setIsEditRootOpen(true)}
          >
            <Edit size={16} className="text-black" />
            Edit Info
          </Button>
        </CardContent>
      </Card>

      {/* Profile and Hierarchy */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        {/* Profile + Hierarchy (30%) */}
        <div className="space-y-6 lg:col-span-3">
          {/* Company Profile */}
          <Card className="w-full border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <Building2 size={18} className="text-gray-500" />
                <span>Company Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="mb-4 text-sm font-medium text-gray-600">
                Company Information
              </h3>
              <ul className="space-y-1">
                <li className="flex items-center gap-3">
                  <Building2 size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-sm font-bold text-black">
                      {performanceData?.businessName}
                    </p>
                    <p className="text-sm font-medium text-gray-400">Company</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Users size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-sm font-bold text-black">
                      {performanceData?.operator.firstname +
                        " " +
                        performanceData?.operator.lastname}
                    </p>
                    <p className="text-sm font-medium text-gray-400">
                      Contact Person
                    </p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-sm font-bold text-black">
                      {performanceData?.operator.email}
                    </p>
                    <p className="text-sm font-medium text-gray-400">Email</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-sm font-bold text-black">{""}</p>
                    <p className="text-sm font-medium text-gray-400">Phone</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-sm font-bold text-black">
                      {performanceData?.address}
                    </p>
                    <p className="text-sm font-medium text-gray-400">Address</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Organization (70%) */}
        <div className="lg:col-span-7">
          {/* Organizational Hierarchy */}
          <Card className="border border-gray-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Organizational Hierarchy
              </CardTitle>
              <p className="text-sm text-gray-500">
                Build the organization structure
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <RenderNode
                  node={{
                    id: performanceData?.operator.nodes.id || "root",
                    orgId: id,
                    name: performanceData?.businessName || "Root",
                    nodesTree: performanceData?.operator.nodes.nodesTree || [],
                  }}
                  level={0}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dialogs */}
        <AddRegionDialog
          isOpen={isAddRegionOpen}
          onOpenChange={setIsAddRegionOpen}
          onSubmit={handleAddRegion}
        />
        <AddBusinessHubDialog
          isOpen={isAddBusinessHubOpen}
          onOpenChange={setIsAddBusinessHubOpen}
          onSubmit={handleAddBusinessHub}
        />
        <AddServiceCenterDialog
          isOpen={isAddServiceCenterOpen}
          onOpenChange={setIsAddServiceCenterOpen}
          onSubmit={handleAddServiceCenter}
        />
        <AddSubstationDialog
          isOpen={isAddSubstationOpen}
          onOpenChange={setIsAddSubstationOpen}
          onSubmit={handleAddSubstation}
        />
        <AddFeederLineDialog
          isOpen={isAddFeederLineOpen}
          onOpenChange={setIsAddFeederLineOpen}
          onSubmit={handleAddFeederLine}
        />
        <AddDistributionSubstationDialog
          isOpen={isAddDSSOpen}
          onOpenChange={setIsAddDSSOpen}
          onSubmit={handleAddDSS}
        />
        <EditRootDialog
          isOpen={isEditRootOpen}
          onOpenChange={setIsEditRootOpen}
          onSubmit={handleEditRoot}
          initialData={{
            rootId: "IBDEC001",
            rootName: performanceData?.businessName,
            contactPerson:
              performanceData?.operator.firstname +
              " " +
              performanceData?.operator.lastname,
            email: performanceData?.operator.email,
            phoneNumber: "",
            address: performanceData?.address,
          }}
        />
        <EditBusinessHubDialog
          isOpen={isEditBusinessHubOpen}
          onOpenChange={setIsEditBusinessHubOpen}
          onSubmit={handleEditBusinessHub}
          initialData={
            currentEditNode
              ? {
                  businessHubId: currentEditNode.nodeInfo?.bhubId ?? "",
                  businessHubName:
                    currentEditNode.nodeInfo?.name ?? currentEditNode.name,
                  phoneNumber: currentEditNode.nodeInfo?.phoneNo ?? "",
                  email: currentEditNode.nodeInfo?.email ?? "",
                  contactPerson: currentEditNode.nodeInfo?.contactPerson ?? "",
                  address: currentEditNode.nodeInfo?.address ?? "",
                }
              : {}
          }
        />
        <EditServiceCenterDialog
          isOpen={isEditServiceCenterOpen}
          onOpenChange={setIsEditServiceCenterOpen}
          onSubmit={handleEditServiceCenter}
          initialData={
            currentEditNode
              ? {
                  serviceCenterId: currentEditNode.id,
                  serviceCenterName:
                    currentEditNode.nodeInfo?.name ?? currentEditNode.name,
                  phoneNumber: currentEditNode.nodeInfo?.phoneNo ?? "",
                  email: currentEditNode.nodeInfo?.email ?? "",
                  contactPerson: currentEditNode.nodeInfo?.contactPerson ?? "",
                  address: currentEditNode.nodeInfo?.address ?? "",
                }
              : {}
          }
        />
        <EditSubstationDialog
          isOpen={isEditSubstationOpen}
          onOpenChange={setIsEditSubstationOpen}
          onSubmit={handleEditSubstation}
          initialData={
            currentEditNode
              ? {
                  substationName:
                    currentEditNode.nodeInfo?.name ?? currentEditNode.name,
                  serialNumber: currentEditNode.nodeInfo?.serialNo ?? "",
                  assetId: "", // Not available in NodeInfo, so default to empty
                  status: currentEditNode.nodeInfo?.status
                    ? "Active"
                    : "Inactive",
                  voltage: currentEditNode.nodeInfo?.voltage ?? "330 KV",
                  longitude: currentEditNode.nodeInfo?.longitude ?? "",
                  latitude: currentEditNode.nodeInfo?.latitude ?? "",
                  description: currentEditNode.nodeInfo?.description ?? "",
                  phoneNumber: currentEditNode.nodeInfo?.phoneNo ?? "",
                  email: currentEditNode.nodeInfo?.email ?? "",
                  contactPerson: currentEditNode.nodeInfo?.contactPerson ?? "",
                  address: currentEditNode.nodeInfo?.address ?? "",
                }
              : {}
          }
        />
        <EditFeederLineDialog
          isOpen={isEditFeederLineOpen}
          onOpenChange={setIsEditFeederLineOpen}
          onSubmit={handleEditFeederLine}
          initialData={
            currentEditNode
              ? {
                  feederName:
                    currentEditNode.nodeInfo?.name ?? currentEditNode.name,
                  serialNumber: currentEditNode.nodeInfo?.serialNo ?? "",
                  assetId: "", // Not available in NodeInfo, so default to empty
                  status: currentEditNode.nodeInfo?.status
                    ? "Active"
                    : "Inactive",
                  voltage: currentEditNode.nodeInfo?.voltage ?? "330 KV",
                  longitude: currentEditNode.nodeInfo?.longitude ?? "",
                  latitude: currentEditNode.nodeInfo?.latitude ?? "",
                  description: currentEditNode.nodeInfo?.description ?? "",
                  phoneNumber: currentEditNode.nodeInfo?.phoneNo ?? "",
                  email: currentEditNode.nodeInfo?.email ?? "",
                  contactPerson: currentEditNode.nodeInfo?.contactPerson ?? "",
                  address: currentEditNode.nodeInfo?.address ?? "",
                }
              : {}
          }
        />
        <EditDistributionSubstationDialog
          isOpen={isEditDSSOpen}
          onOpenChange={setIsEditDSSOpen}
          onSubmit={handleEditDSS}
          initialData={
            currentEditNode
              ? {
                  substationName:
                    currentEditNode.nodeInfo?.name ?? currentEditNode.name,
                  serialNumber: currentEditNode.nodeInfo?.serialNo ?? "",
                  assetId: "", // Not available in NodeInfo, so default to empty
                  status: currentEditNode.nodeInfo?.status
                    ? "Active"
                    : "Inactive",
                  voltage: currentEditNode.nodeInfo?.voltage ?? "330 KV",
                  longitude: currentEditNode.nodeInfo?.longitude ?? "",
                  latitude: currentEditNode.nodeInfo?.latitude ?? "",
                  description: currentEditNode.nodeInfo?.description ?? "",
                  phoneNumber: currentEditNode.nodeInfo?.phoneNo ?? "",
                  email: currentEditNode.nodeInfo?.email ?? "",
                  contactPerson: currentEditNode.nodeInfo?.contactPerson ?? "",
                  address: currentEditNode.nodeInfo?.address ?? "",
                }
              : {}
          }
        />
      </div>
    </div>
  );
}
