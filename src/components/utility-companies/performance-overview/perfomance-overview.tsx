"use client";
import {
  ArrowUp,
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
  PlugZap,
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
import { use, useState, type Key } from "react";
import type { UnifiedFormData } from "@/types/unifiedForm";
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
import { useGetAllNodes } from "@/hooks/use-orgs";
import { useParams } from "next/navigation";

type Node = {
  name: string;
  type?: string; // e.g., "root", "region", "businessHub", "substation", "feederLine", "dss", "serviceCenter"
  businessHubId?: string;
  serviceCenterId?: string;
  serialNumber?: string;
  assetId?: string;
  status?: string;
  voltage?: string;
  longitude?: string;
  latitude?: string;
  description?: string;
  phoneNumber?: string;
  email?: string;
  contactPerson?: string;
  address?: string;
  children?: Node[];
};

const performanceData = {
  name: "IBDEC",
  status: "Active",
  registered: "January 15, 2024",
  summary: [
    {
      title: "Total Customers",
      value: "200,000",
      change: "+8%",
      changeColor: "text-green-600",
      subtitle: "Vs last year",
      icon: <Users size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Total Vending Amount",
      value: "N1.2 Billion",
      change: "+2%",
      changeColor: "text-green-600",
      subtitle: "Vs last year",
      icon: <TrendingUp size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Total Billing Amount",
      value: "N2.4 Billion",
      change: "+5%",
      changeColor: "text-green-600",
      subtitle: "Vs last year",
      icon: <Banknote size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
    },
    {
      title: "Feeders Connected",
      value: "200",
      change: "+1%",
      changeColor: "text-green-600",
      subtitle: "Vs last year",
      icon: <Banknote size={24} className="text-gray-600" />,
      iconBg: "bg-gray-100",
    },
  ],
  profile: {
    company: "IBDEC",
    contact: "Ada Okoro",
    email: "ada@powergrid.com",
    phone: "+234 810 XXX XXXX",
    address: "12 Adeola Odeku St, Lagos",
  },
};

export default function PerformanceOverview({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [activeTab, setActiveTab] = useState("summary");
  const [expanded, setExpanded] = useState(new Set([performanceData.name]));
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
  const [currentParentName, setCurrentParentName] = useState<string>("");
  const [currentEditNode, setCurrentEditNode] = useState<Node | null>(null);
  const [companyProfile, setCompanyProfile] = useState(performanceData.profile);
  const { data: tree, isLoading } = useGetAllNodes(id);

  const addChild = (parentName: string, newChild: Node) => {
    console.log("Adding child:", newChild, "to parent:", parentName);
  };

  const updateNode = (nodeName: string, updatedData: UnifiedFormData) => {
    console.log("Updating node:", nodeName, "with data:", updatedData);
  };

  const handleAddRegion = (data: UnifiedFormData) => {
    const newRegion: Node = {
      name: data.regionName ?? "Unnamed Region",
      type: "region",
      children: [],
    };
    addChild(currentParentName, newRegion);
    setIsAddRegionOpen(false);
    setCurrentParentName("");
  };

  const handleAddBusinessHub = (data: UnifiedFormData) => {
    const newBusinessHub: Node = {
      name: data.businessHubName ?? "Unnamed Business Hub",
      type: "businessHub",
      businessHubId: data.businessHubId ?? `BH-${Date.now()}`,
      phoneNumber: data.phoneNumber ?? "",
      email: data.email ?? "",
      contactPerson: data.contactPerson ?? "",
      address: data.address ?? "",
      children: [],
    };
    addChild(currentParentName, newBusinessHub);
    setIsAddBusinessHubOpen(false);
    setCurrentParentName("");
  };

  const handleAddServiceCenter = (data: UnifiedFormData) => {
    const newServiceCenter: Node = {
      name: data.serviceCenterName ?? "Unnamed Service Center",
      type: "serviceCenter",
      serviceCenterId: data.serviceCenterId ?? `SC-${Date.now()}`,
      phoneNumber: data.phoneNumber ?? "",
      email: data.email ?? "",
      contactPerson: data.contactPerson ?? "",
      address: data.address ?? "",
      children: [],
    };
    addChild(currentParentName, newServiceCenter);
    setIsAddServiceCenterOpen(false);
    setCurrentParentName("");
  };

  const handleAddSubstation = (data: UnifiedFormData) => {
    const newSubstation: Node = {
      name: data.substationName ?? "Unnamed Substation",
      type: "substation",
      serialNumber: data.serialNumber ?? `SUB-${Date.now()}`,
      assetId: data.assetId ?? "",
      status: data.status ?? "Active",
      voltage: data.voltage ?? "330 KV",
      longitude: data.longitude ?? "",
      latitude: data.latitude ?? "",
      description: data.description ?? "",
      phoneNumber: data.phoneNumber ?? "",
      email: data.email ?? "",
      contactPerson: data.contactPerson ?? "",
      address: data.address ?? "",
      children: [],
    };
    addChild(currentParentName, newSubstation);
    setIsAddSubstationOpen(false);
    setCurrentParentName("");
  };

  const handleAddFeederLine = (data: UnifiedFormData) => {
    const newFeederLine: Node = {
      name: data.feederName ?? "Unnamed Feeder Line",
      type: "feederLine",
      serialNumber: data.serialNumber ?? `FL-${Date.now()}`,
      assetId: data.assetId ?? "",
      status: data.status ?? "Active",
      voltage: data.voltage ?? "330 KV",
      longitude: data.longitude ?? "",
      latitude: data.latitude ?? "",
      description: data.description ?? "",
      phoneNumber: data.phoneNumber ?? "",
      email: data.email ?? "",
      contactPerson: data.contactPerson ?? "",
      address: data.address ?? "",
      children: [],
    };
    addChild(currentParentName, newFeederLine);
    setIsAddFeederLineOpen(false);
    setCurrentParentName("");
  };

  const handleAddDSS = (data: UnifiedFormData) => {
    const newDSS: Node = {
      name: data.substationName ?? "Unnamed Distribution Substation (DSS)",
      type: "dss",
      serialNumber: data.serialNumber ?? `DSS-${Date.now()}`,
      assetId: data.assetId ?? "",
      status: data.status ?? "Active",
      voltage: data.voltage ?? "330 KV",
      longitude: data.longitude ?? "",
      latitude: data.latitude ?? "",
      description: data.description ?? "",
      phoneNumber: data.phoneNumber ?? "",
      email: data.email ?? "",
      contactPerson: data.contactPerson ?? "",
      address: data.address ?? "",
      children: [],
    };
    addChild(currentParentName, newDSS);
    setIsAddDSSOpen(false);
    setCurrentParentName("");
  };

  const handleEditRoot = (data: UnifiedFormData) => {
    setCompanyProfile({
      ...companyProfile,
      company: data.organizationName ?? companyProfile.company,
      contact: data.contactPerson ?? companyProfile.contact,
      email: data.email ?? companyProfile.email,
      phone: data.phoneNumber ?? companyProfile.phone,
      address: data.address ?? companyProfile.address,
    });
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

  function RenderNode({ node, level }: { node: Node; level: number }) {
    const isExpanded = expanded.has(node.name);

    const toggleExpanded = () => {
      const newExpanded = new Set(expanded);
      if (isExpanded) {
        newExpanded.delete(node.name);
      } else {
        newExpanded.add(node.name);
      }
      setExpanded(newExpanded);
    };

    // Assign icons based on node type
    const Icon = (() => {
      switch (node.type) {
        case "root":
          return Building2;
        case "region":
          return LayoutGrid;
        case "businessHub":
          return Building2;
        case "serviceCenter":
          return Wrench;
        case "substation":
          return Database;
        case "feederLine":
          return Zap;
        case "dss":
          return Lightbulb;
        default:
          return LayoutGrid; // Fallback for unspecified types
      }
    })();

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
              className={`text-gray-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}
            />
            <Icon size={18} className="text-gray-500" />
            <span className="font-medium text-gray-900">{node.name}</span>
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
                    setCurrentParentName(node.name);
                    setIsAddRegionOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <LayoutGrid size={16} />
                  Region
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentName(node.name);
                    setIsAddBusinessHubOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Building2 size={16} />
                  Business Hub
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentName(node.name);
                    setIsAddServiceCenterOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Wrench size={16} />
                  Service Centre
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentName(node.name);
                    setIsAddSubstationOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Database size={16} />
                  Substation
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentName(node.name);
                    setIsAddFeederLineOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Zap size={16} />
                  Feeder Line
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentName(node.name);
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
                setCurrentEditNode(node);
                if (node.type === "root") {
                  setIsEditRootOpen(true);
                } else if (node.type === "businessHub") {
                  setIsEditBusinessHubOpen(true);
                } else if (node.type === "serviceCenter") {
                  setIsEditServiceCenterOpen(true);
                } else if (node.type === "substation") {
                  setIsEditSubstationOpen(true);
                } else if (node.type === "feederLine") {
                  setIsEditFeederLineOpen(true);
                } else if (node.type === "dss") {
                  setIsEditDSSOpen(true);
                } else {
                  console.log(
                    `Editing node: ${node.name} (type ${node.type}, level ${level})`,
                  );
                }
              }}
            >
              <Edit size={28} className="h-24 w-24" />
            </Button>
          </div>
        </div>
        {isExpanded &&
          node.children?.map((child: Node, idx: Key | null | undefined) => (
            <RenderNode key={idx} node={child} level={level + 1} />
          ))}
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
        <p className="text-sm text-gray-500">Manage {companyProfile.company}</p>
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
        {performanceData.summary.map((item, idx) => (
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
                  {companyProfile.company}
                </h2>
                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700"
                >
                  {performanceData.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Registered {performanceData.registered}
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
                      {companyProfile.company}
                    </p>
                    <p className="text-sm font-medium text-gray-400">Company</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Users size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-sm font-bold text-black">
                      {companyProfile.contact}
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
                      {companyProfile.email}
                    </p>
                    <p className="text-sm font-medium text-gray-400">Email</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-sm font-bold text-black">
                      {companyProfile.phone}
                    </p>
                    <p className="text-sm font-medium text-gray-400">Phone</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-sm font-bold text-black">
                      {companyProfile.address}
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
                  node={{ name: "Root", type: "root", children: tree }}
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
            rootName: companyProfile.company,
            contactPerson: companyProfile.contact,
            email: companyProfile.email,
            phoneNumber: companyProfile.phone,
            address: companyProfile.address,
          }}
        />
        <EditBusinessHubDialog
          isOpen={isEditBusinessHubOpen}
          onOpenChange={setIsEditBusinessHubOpen}
          onSubmit={handleEditBusinessHub}
          initialData={
            currentEditNode
              ? {
                  businessHubId: currentEditNode.businessHubId ?? "",
                  businessHubName: currentEditNode.name,
                  phoneNumber: currentEditNode.phoneNumber ?? "",
                  email: currentEditNode.email ?? "",
                  contactPerson: currentEditNode.contactPerson ?? "",
                  address: currentEditNode.address ?? "",
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
                  serviceCenterId: currentEditNode.serviceCenterId ?? "",
                  serviceCenterName: currentEditNode.name,
                  phoneNumber: currentEditNode.phoneNumber ?? "",
                  email: currentEditNode.email ?? "",
                  contactPerson: currentEditNode.contactPerson ?? "",
                  address: currentEditNode.address ?? "",
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
                  substationName: currentEditNode.name,
                  serialNumber: currentEditNode.serialNumber ?? "",
                  assetId: currentEditNode.assetId ?? "",
                  status: currentEditNode.status ?? "Active",
                  voltage: currentEditNode.voltage ?? "330 KV",
                  longitude: currentEditNode.longitude ?? "",
                  latitude: currentEditNode.latitude ?? "",
                  description: currentEditNode.description ?? "",
                  phoneNumber: currentEditNode.phoneNumber ?? "",
                  email: currentEditNode.email ?? "",
                  contactPerson: currentEditNode.contactPerson ?? "",
                  address: currentEditNode.address ?? "",
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
                  feederName: currentEditNode.name,
                  serialNumber: currentEditNode.serialNumber ?? "",
                  assetId: currentEditNode.assetId ?? "",
                  status: currentEditNode.status ?? "Active",
                  voltage: currentEditNode.voltage ?? "330 KV",
                  longitude: currentEditNode.longitude ?? "",
                  latitude: currentEditNode.latitude ?? "",
                  description: currentEditNode.description ?? "",
                  phoneNumber: currentEditNode.phoneNumber ?? "",
                  email: currentEditNode.email ?? "",
                  contactPerson: currentEditNode.contactPerson ?? "",
                  address: currentEditNode.address ?? "",
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
                  substationName: currentEditNode.name,
                  serialNumber: currentEditNode.serialNumber ?? "",
                  assetId: currentEditNode.assetId ?? "",
                  status: currentEditNode.status ?? "Active",
                  voltage: currentEditNode.voltage ?? "330 KV",
                  longitude: currentEditNode.longitude ?? "",
                  latitude: currentEditNode.latitude ?? "",
                  description: currentEditNode.description ?? "",
                  phoneNumber: currentEditNode.phoneNumber ?? "",
                  email: currentEditNode.email ?? "",
                  contactPerson: currentEditNode.contactPerson ?? "",
                  address: currentEditNode.address ?? "",
                }
              : {}
          }
        />
      </div>
    </div>
  );
}
