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
  FolderRoot,
  CircleCheckBig,
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
  useUpdateRegionBhubServiceCenter,
  useUpdateSubstationTransfomerFeeder,
} from "@/hooks/use-orgs";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { selectedModulesAtom } from "@/atom/modulesAtom";
import { icons } from "./icons";
import { EditRegionDialog } from "../utility-companies-dialogs/edit-region-dialog";
import { useUpdateOrg } from "@/hooks/use-orgs";

const NODE_TYPES = {
  REGION: "region",
  BUSINESS_HUB: "business hub",
  SERVICE_CENTER: "service center",
  SUBSTATION: "substation",
  FEEDER_LINE: "feeder line",
  DSS: "dss",
} as const;

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
  const [isEditRegionOpen, setIsEditRegionOpen] = useState(false);
  const [isEditBusinessHubOpen, setIsEditBusinessHubOpen] = useState(false);
  const [isEditServiceCenterOpen, setIsEditServiceCenterOpen] = useState(false);
  const [isEditSubstationOpen, setIsEditSubstationOpen] = useState(false);
  const [isEditFeederLineOpen, setIsEditFeederLineOpen] = useState(false);
  const [isEditDSSOpen, setIsEditDSSOpen] = useState(false);
  const [currentParentId, setCurrentParentId] = useState<string>("");
  const [currentEditNode, setCurrentEditNode] = useState<ApiNode | null>(null);
  const queryClient = useQueryClient();
  const [regionDialogData, setRegionDialogData] = useState<
    Partial<UnifiedFormData>
  >({});
  const [businessHubDialogData, setBusinessHubDialogData] = useState<
    Partial<UnifiedFormData>
  >({});
  const [serviceCenterDialogData, setServiceCenterDialogData] = useState<
    Partial<UnifiedFormData>
  >({});
  const [substationDialogData, setSubstationDialogData] = useState<
    Partial<UnifiedFormData>
  >({});
  const [feederDialogData, setFeederDialogData] = useState<
    Partial<UnifiedFormData>
  >({});
  const [dssDialogData, setDssDialogData] = useState<Partial<UnifiedFormData>>(
    {},
  );
  const [rootDialogData, setRootDialogData] = useState<
    Partial<UnifiedFormData>
  >({});
  const { data: performanceData } = useGetOneOrg(id);
  const { mutate: updateOrg } = useUpdateOrg();

  const { mutate: createRegionBhubServiceCenter } =
    useCreateRegionBhubServiceCenter();
  const { mutate: createSubstationTransfomerFeeder } =
    useCreateSubstationTransfomerFeeder();
  const [expanded, setExpanded] = useState(
    new Set([performanceData?.businessName]),
  );

  const { mutate: updateRegionBhubServiceCenter } =
    useUpdateRegionBhubServiceCenter();

  const { mutate: updateSubstationTransfomerFeeder } =
    useUpdateSubstationTransfomerFeeder();

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

  const [modulesByOrg] = useAtom(selectedModulesAtom);
  const selectedModules = modulesByOrg[id] ?? [];

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
          toast.error(error.message || "Error creating region");
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
        regionId: data.businessHubId ?? `BH-${Date.now()}`,
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
        regionId: data.serviceCenterId ?? `SC-${Date.now()}`,
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
        serialNo: data.serialNumber ?? "",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        assetId: data.assetId ?? "",
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
        serialNo: data.serialNumber ?? "",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        assetId: data.assetId ?? "",
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
        serialNo: data.serialNumber ?? "",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        assetId: data.assetId ?? "",
        type: "dss",
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
    if (!performanceData) {
      console.error("No performance data available");
      return;
    }

    updateOrg(
      {
        id: performanceData.id,
        businessName: data.rootName ?? performanceData.businessName,
        postalCode: performanceData.postalCode,
        address: data.address ?? performanceData.address,
        country: performanceData.country,
        state: performanceData.state,
        city: performanceData.city,
        userId: performanceData.userId,
        firstName: performanceData.operator.firstname,
        lastName: performanceData.operator.lastname,
        email: data.email ?? performanceData.operator.email,
        password: "",
        phoneNumber: data.phoneNumber ?? "",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsEditRootOpen(false);
          toast.success("Organization updated successfully");
        },
        onError: (error) => {
          console.error("Error updating organization:", error);
          toast.error("Error updating organization");
        },
      },
    );
  };

  const handleEditRegion = (data: UnifiedFormData) => {
    if (!currentEditNode) {
      console.error("No parent ID set for updating region");
      return;
    }

    updateRegionBhubServiceCenter(
      {
        orgId: id,
        nodeId: currentEditNode?.id,
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
          console.log("Region updated successfully");
          toast.success("Region updated successfully");
        },
        onError: (error) => {
          console.error("Error updating region:", error);
          toast.error("Error updating region");
        },
      },
    );
  };

  const handleEditBusinessHub = (data: UnifiedFormData) => {
    if (!currentEditNode) {
      console.error("No parent ID set for adding business hub");
      return;
    }

    updateRegionBhubServiceCenter(
      {
        nodeId: currentEditNode?.id,
        orgId: id,
        regionId: data.businessHubId ?? `BH-${Date.now()}`,
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
          console.log("Business hub updated successfully");
          toast.success("Business hub updated successfully");
        },
        onError: (error) => {
          console.error("Error updating business hub:", error);
          toast.error("Error updating business hub");
        },
      },
    );
  };

  const handleEditServiceCenter = (data: UnifiedFormData) => {
    if (!currentEditNode) {
      console.error("No parent ID set for adding service center");
      return;
    }

    updateRegionBhubServiceCenter(
      {
        nodeId: currentEditNode?.id,
        orgId: id,
        regionId: data.serviceCenterId ?? `SC-${Date.now()}`,
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
          console.log("Service center updated successfully");
          toast.success("Service center updated successfully");
        },
        onError: (error) => {
          console.error("Error updating service center:", error);
          toast.error("Error updating service center");
        },
      },
    );
  };

  const handleEditSubstation = (data: UnifiedFormData) => {
    if (!currentEditNode) {
      console.error("No parent ID set for adding substation");
      return;
    }

    updateSubstationTransfomerFeeder(
      {
        nodeId: currentEditNode?.id,
        orgId: id,
        name: data.substationName ?? "Unnamed Substation",
        serialNo: data.serialNumber ?? "",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        assetId: data.assetId ?? "",
        type: "substation",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddSubstationOpen(false);
          setCurrentParentId("");
          console.log("Substation updated successfully");
          toast.success("Substation updated successfully");
        },
        onError: (error) => {
          console.error("Error updating substation:", error);
          toast.error("Error updating substation");
        },
      },
    );
  };

  const handleEditFeederLine = (data: UnifiedFormData) => {
    if (!currentEditNode) {
      console.error("No parent ID set for adding feeder line");
      return;
    }

    updateSubstationTransfomerFeeder(
      {
        nodeId: currentEditNode?.id,
        orgId: id,
        name: data.feederName ?? "Unnamed Feeder Line",
        serialNo: data.serialNumber ?? "",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        assetId: data.assetId ?? "",
        type: "feeder line",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddFeederLineOpen(false);
          setCurrentParentId("");
          console.log("Feeder line updated successfully");
          toast.success("Feeder line updated successfully");
        },
        onError: (error) => {
          console.error("Error updating feeder line:", error);
          toast.error("Error updating feeder line");
        },
      },
    );
  };

  const handleEditDSS = (data: UnifiedFormData) => {
    if (!currentEditNode) {
      console.error("No parent ID set for adding DSS");
      return;
    }

    updateSubstationTransfomerFeeder(
      {
        nodeId: currentEditNode?.id,
        orgId: id,
        name: data.substationName ?? "Unnamed Distribution Substation (DSS)",
        serialNo: data.serialNumber ?? "",
        phoneNo: data.phoneNumber ?? "",
        email: data.email ?? "",
        contactPerson: data.contactPerson ?? "",
        address: data.address ?? "",
        status: data.status === "Active" || data.status === "true",
        voltage: data.voltage ?? "330 KV",
        latitude: data.latitude ?? "",
        longitude: data.longitude ?? "",
        description: data.description ?? "",
        assetId: data.assetId ?? "",
        type: "dss",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["nodes", id] });
          queryClient.invalidateQueries({ queryKey: ["org", id] });
          setIsAddDSSOpen(false);
          setCurrentParentId("");
          console.log("DSS updated successfully");
          toast.success("DSS updated successfully");
        },
        onError: (error) => {
          console.error("Error updating DSS:", error);
          toast.error("Error updating DSS");
        },
      },
    );
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

    let Icon;

    if (node.nodeInfo?.type === "region") {
      Icon = LayoutGrid;
    } else if (node.nodeInfo?.type === "business hub") {
      Icon = Building2;
    } else if (node.nodeInfo?.type === "service center") {
      Icon = Wrench;
    } else if (node.nodeInfo?.type === "substation") {
      Icon = Database;
    } else if (node.nodeInfo?.type === "feeder line") {
      Icon = Zap;
    } else if (node.nodeInfo?.type === "DSS") {
      Icon = Lightbulb;
    } else {
      Icon = FolderRoot;
    }

    return (
      <>
        <div
          className="flex items-center justify-between"
          style={{ paddingLeft: `${level * 24}px` }}
        >
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={toggleExpanded}
          >
            <ChevronRight
              size={10}
              className={`text-gray-500 transition-transform ${isExpanded ? "rotate-90" : ""} ${node.nodesTree?.length === 0 ? "invisible" : ""}`}
            />
            <Icon size={10} className="text-gray-500" />
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
                  <Plus size={10} className="h-24 w-24" />
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
                  <Building2 size={10} />
                  Business Hub
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddServiceCenterOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Wrench size={10} />
                  Service Centre
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddSubstationOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Database size={10} />
                  Substation
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddFeederLineOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Zap size={10} />
                  Feeder Line
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentParentId(nodeId);
                    setIsAddDSSOpen(true);
                  }}
                  className="cursor-pointer"
                >
                  <Lightbulb size={10} />
                  Distribution Substation (DSS)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="lg"
              className="cursor-pointer px-1 text-black hover:text-gray-700"
              onClick={() => {
                console.log("=== EDIT BUTTON CLICKED ===");
                console.log("Node ID:", nodeId);
                console.log("Node Info:", node.nodeInfo);

                const fullNodeData: ApiNode = {
                  id: nodeId,
                  orgId: node.orgId,
                  name: nodeName,
                  nodeInfo: {
                    id: node.nodeInfo?.id ?? nodeId,
                    nodeId: node.nodeInfo?.nodeId ?? nodeId,
                    name: node.nodeInfo?.name ?? nodeName,
                    phoneNo: node.nodeInfo?.phoneNo ?? "",
                    email: node.nodeInfo?.email ?? "",
                    contactPerson: node.nodeInfo?.contactPerson ?? "",
                    address: node.nodeInfo?.address ?? "",
                    createdAt: node.nodeInfo?.createdAt ?? "",
                    updatedAt: node.nodeInfo?.updatedAt ?? "",
                    regionId: node.nodeInfo?.regionId ?? "",
                    bhubId: node.nodeInfo?.bhubId ?? "",
                    serviceCenterId: node.nodeInfo?.serviceCenterId ?? "",
                    serialNo: node.nodeInfo?.serialNo,
                    status: node.nodeInfo?.status,
                    voltage: node.nodeInfo?.voltage,
                    latitude: node.nodeInfo?.latitude,
                    longitude: node.nodeInfo?.longitude,
                    description: node.nodeInfo?.description,
                  },
                };

                setCurrentEditNode(fullNodeData);

                const nodeType = node.nodeInfo?.type;

                if (nodeType === "root") {
                  const data = {
                    rootId: node.nodeInfo?.regionId ?? "",
                    rootName: node.nodeInfo?.name ?? "",
                    contactPerson: node.nodeInfo?.contactPerson ?? "",
                    email: node.nodeInfo?.email ?? "",
                    phoneNumber: node.nodeInfo?.phoneNo ?? "",
                    address: node.nodeInfo?.address ?? "",
                  };
                  console.log("Opening Root Dialog with data:", data);
                  setRootDialogData(data);
                  setIsEditRootOpen(true);
                } else if (nodeType === NODE_TYPES.REGION) {
                  const data = {
                    regionId: node.nodeInfo?.regionId ?? "",
                    regionName: node.nodeInfo?.name ?? nodeName,
                    phoneNumber: node.nodeInfo?.phoneNo ?? "",
                    email: node.nodeInfo?.email ?? "",
                    contactPerson: node.nodeInfo?.contactPerson ?? "",
                    address: node.nodeInfo?.address ?? "",
                  };
                  console.log("Opening Region Dialog with data:", data);
                  setRegionDialogData(data);
                  setIsEditRegionOpen(true);
                } else if (nodeType === NODE_TYPES.BUSINESS_HUB) {
                  const data = {
                    businessHubId: node.nodeInfo?.regionId ?? "",
                    businessHubName: node.nodeInfo?.name ?? nodeName,
                    phoneNumber: node.nodeInfo?.phoneNo ?? "",
                    email: node.nodeInfo?.email ?? "",
                    contactPerson: node.nodeInfo?.contactPerson ?? "",
                    address: node.nodeInfo?.address ?? "",
                  };
                  console.log("Opening Business Hub Dialog with data:", data);
                  setBusinessHubDialogData(data);
                  setIsEditBusinessHubOpen(true);
                } else if (nodeType === NODE_TYPES.SERVICE_CENTER) {
                  const data = {
                    serviceCenterId: node.nodeInfo?.regionId ?? "",
                    serviceCenterName: node.nodeInfo?.name ?? nodeName,
                    phoneNumber: node.nodeInfo?.phoneNo ?? "",
                    email: node.nodeInfo?.email ?? "",
                    contactPerson: node.nodeInfo?.contactPerson ?? "",
                    address: node.nodeInfo?.address ?? "",
                  };
                  console.log("Opening Service Center Dialog with data:", data);
                  setServiceCenterDialogData(data);
                  setIsEditServiceCenterOpen(true);
                } else if (nodeType === NODE_TYPES.SUBSTATION) {
                  const data = {
                    substationName: node.nodeInfo?.name ?? nodeName,
                    serialNumber: node.nodeInfo?.serialNo ?? "",
                    assetId: node.nodeInfo?.assetId ?? "",
                    status: node.nodeInfo?.status ? "Active" : "Inactive",
                    voltage: node.nodeInfo?.voltage ?? "330 KV",
                    longitude: node.nodeInfo?.longitude ?? "",
                    latitude: node.nodeInfo?.latitude ?? "",
                    description: node.nodeInfo?.description ?? "",
                    phoneNumber: node.nodeInfo?.phoneNo ?? "",
                    email: node.nodeInfo?.email ?? "",
                    contactPerson: node.nodeInfo?.contactPerson ?? "",
                    address: node.nodeInfo?.address ?? "",
                  };
                  console.log("Opening Substation Dialog with data:", data);
                  setSubstationDialogData(data);
                  setIsEditSubstationOpen(true);
                } else if (nodeType === NODE_TYPES.FEEDER_LINE) {
                  const data = {
                    feederName: node.nodeInfo?.name ?? nodeName,
                    serialNumber: node.nodeInfo?.serialNo ?? "",
                    assetId: node.nodeInfo?.assetId ?? "",
                    status: node.nodeInfo?.status ? "Active" : "Inactive",
                    voltage: node.nodeInfo?.voltage ?? "330 KV",
                    longitude: node.nodeInfo?.longitude ?? "",
                    latitude: node.nodeInfo?.latitude ?? "",
                    description: node.nodeInfo?.description ?? "",
                    phoneNumber: node.nodeInfo?.phoneNo ?? "",
                    email: node.nodeInfo?.email ?? "",
                    contactPerson: node.nodeInfo?.contactPerson ?? "",
                    address: node.nodeInfo?.address ?? "",
                  };
                  console.log("Opening Feeder Line Dialog with data:", data);
                  setFeederDialogData(data);
                  setIsEditFeederLineOpen(true);
                } else if (
                  nodeType === "dss" ||
                  nodeType === "DSS" ||
                  nodeType === NODE_TYPES.DSS
                ) {
                  const data = {
                    substationName: node.nodeInfo?.name ?? nodeName,
                    serialNumber: node.nodeInfo?.serialNo ?? "",
                    assetId: node.nodeInfo?.assetId ?? "",
                    status: node.nodeInfo?.status ? "Active" : "Inactive",
                    voltage: node.nodeInfo?.voltage ?? "330 KV",
                    longitude: node.nodeInfo?.longitude ?? "",
                    latitude: node.nodeInfo?.latitude ?? "",
                    description: node.nodeInfo?.description ?? "",
                    phoneNumber: node.nodeInfo?.phoneNo ?? "",
                    email: node.nodeInfo?.email ?? "",
                    contactPerson: node.nodeInfo?.contactPerson ?? "",
                    address: node.nodeInfo?.address ?? "",
                  };
                  console.log("Opening DSS Dialog with data:", data);
                  setDssDialogData(data);
                  setIsEditDSSOpen(true);
                } else {
                  setIsEditRootOpen(true);
                }
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
    <div className="space-y-6 bg-white pt-4">
      <div className="mb-10">
        <h1 className="text-2xl font-medium text-gray-900">
          Performance Overview
        </h1>
        <p className="mt-1 text-lg text-gray-500">
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
          <Card
            key={idx}
            className="border border-gray-200 bg-white shadow-none"
          >
            <CardContent className="pt-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="mb-2 text-base font-normal text-gray-700">
                    {item.title}
                  </p>
                  <p className="mb-1 text-xl font-medium text-gray-900">
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
                  className={`mt-2 rounded-lg border border-gray-200 bg-gray-50 p-3 ${item.iconBg}`}
                >
                  {item.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="h-30 border border-gray-200 bg-white shadow-none">
        <CardContent className="flex h-full items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
              <Building2 size={24} className="text-gray-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <h2 className="text-lg font-medium text-gray-900">
                    {performanceData?.businessName}
                  </h2>
                  <div>
                    {performanceData?.status === true ? (
                      <Badge
                        variant="secondary"
                        className="rounded-sm bg-green-50 px-2 py-1 font-normal text-green-700 hover:bg-green-50"
                      >
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="rounded-sm bg-red-50 px-2 py-1 font-normal text-red-700 hover:bg-red-50"
                      >
                        Suspended
                      </Badge>
                    )}
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className="bg-green-50 text-green-700"
                >
                  {performanceData?.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-900">
                Registered {performanceData?.createdAt}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="cursor-pointer border-gray-200 bg-white text-black hover:bg-white"
            onClick={() => {
              const data = {
                rootId: performanceData?.id ?? "",
                rootName: performanceData?.businessName ?? "",
                contactPerson:
                  (performanceData?.operator?.firstname ?? "") +
                  " " +
                  (performanceData?.operator?.lastname ?? ""),
                email: performanceData?.operator?.email ?? "",
                phoneNumber: "",
                address: performanceData?.address ?? "",
              };
              console.log("Opening Root Dialog with data:", data);
              setRootDialogData(data);
              setIsEditRootOpen(true);
            }}
          >
            <Edit size={16} className="text-black" />
            Edit Info
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-10">
        <div className="space-y-6 lg:col-span-3">
          <Card className="w-full border border-gray-200 bg-white shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                <Building2 size={18} className="text-gray-500" />
                <span>Company Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-normal text-gray-900">
                Company Information
              </h3>
              <div className="w-full border border-gray-100 px-0"></div>

              <ul className="space-y-1">
                <li className="flex items-center gap-3">
                  <Building2 size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-base font-medium text-black">
                      {performanceData?.businessName}
                    </p>
                    <p className="text-gray-400">Company</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Users size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-base font-medium text-black">
                      {performanceData?.operator?.firstname +
                        " " +
                        performanceData?.operator?.lastname}
                    </p>
                    <p className="text-gray-400">Contact Person</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-base font-medium text-black">
                      {performanceData?.operator?.email}
                    </p>
                    <p className="text-gray-400">Email</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-base font-medium text-black">
                      {performanceData?.phoneNo || ""}
                    </p>
                    <p className="text-gray-400">Phone</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-500" />
                  <div className="mt-2 space-y-0">
                    <p className="text-base font-medium text-black">
                      {performanceData?.address}
                    </p>
                    <p className="text-gray-400">Address</p>
                  </div>
                </li>
              </ul>

              {selectedModules.length > 0 && (
                <div>
                  <div className="mt-4 flex items-center gap-2">
                    <CircleCheckBig size={18} className="text-black" />
                    <span className="text-lg font-medium">
                      Assigned Modules
                    </span>
                  </div>

                  <ul className="space-y-4 px-4 py-3">
                    {selectedModules.map((module) => (
                      <li key={module} className="flex items-center gap-2">
                        {icons[module]}
                        <span>{module}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Organization (70%) */}
        <div className="lg:col-span-7">
          {/* Organizational Hierarchy */}
          <Card className="border border-gray-200 bg-white shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-medium">
                Organizational Hierarchy
              </CardTitle>
              <p className="text-gray-500">Build the organization structure</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <RenderNode
                  node={{
                    id: performanceData?.nodes?.id || "root",
                    orgId: id,
                    name: performanceData?.businessName || "Root",
                    nodeInfo: performanceData?.nodes?.nodeInfo,
                    nodesTree: performanceData?.nodes?.nodesTree || [],
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
          initialData={rootDialogData}
        />
        <EditRegionDialog
          isOpen={isEditRegionOpen}
          onOpenChange={setIsEditRegionOpen}
          onSubmit={handleEditRegion}
          initialData={regionDialogData}
        />
        <EditBusinessHubDialog
          isOpen={isEditBusinessHubOpen}
          onOpenChange={setIsEditBusinessHubOpen}
          onSubmit={handleEditBusinessHub}
          initialData={businessHubDialogData}
        />
        <EditServiceCenterDialog
          isOpen={isEditServiceCenterOpen}
          onOpenChange={setIsEditServiceCenterOpen}
          onSubmit={handleEditServiceCenter}
          initialData={serviceCenterDialogData}
        />
        <EditSubstationDialog
          isOpen={isEditSubstationOpen}
          onOpenChange={setIsEditSubstationOpen}
          onSubmit={handleEditSubstation}
          initialData={substationDialogData}
        />
        <EditFeederLineDialog
          isOpen={isEditFeederLineOpen}
          onOpenChange={setIsEditFeederLineOpen}
          onSubmit={handleEditFeederLine}
          initialData={feederDialogData}
        />
        <EditDistributionSubstationDialog
          isOpen={isEditDSSOpen}
          onOpenChange={setIsEditDSSOpen}
          onSubmit={handleEditDSS}
          initialData={dssDialogData}
        />
      </div>
    </div>
  );
}
