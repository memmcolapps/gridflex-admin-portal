export interface CreateOrgPayload {
  businessName: string;
  postalCode: string;
  address: string;
  country: string;
  state: string;
  city: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface CreateOrgResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: string;
}

export interface OrganizationResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: {
    overallBilling: number;
    organizations: Organization[];
    totalActiveOrganizations: number;
    totalOrganizations: number;
    overallCustomers: number;
    overallVending: number;
  };
}

interface Organization {
  id: string;
  businessName: string;
  postalCode: string;
  address: string;
  country: string;
  state: string;
  city: string;
  status: boolean;
  nodes: {
    id: string;
    orgId: string;
    name: string;
    nodeInfo?: {
      id: string;
      nodeId: string;
      regionId?: string;
      name: string;
      phoneNo: string;
      email: string;
      contactPerson: string;
      address: string;
      type: string;
      assetId?: string;
      serialNo?: string;
      status?: boolean;
      voltage?: string;
      description?: string;
      latitude?: string;
      longitude?: string;
      createdAt: string;
      updatedAt: string;
    };
    nodesTree: NodeTree[];
  };
  operator: Operator;
  totalCustomer: number;
  totalVending: number;
  totalBilling: number;
  createdAt: string;
  updatedAt: string;
}

interface Operator {
  id: string;
  orgId: string;
  nodeId: string;
  firstname: string;
  lastname: string;
  email: string;
  status: boolean;
  active: boolean;
  lastActive?: string;
  groups?: {
    id: string;
    orgId: string;
    groupTitle: string;
    modules: Module[];
    permissions: {
      id: string;
      orgId: string;
      view: boolean;
      edit: boolean;
      approve: boolean;
      disable: boolean;
    };
  };

  createdAt: string;
  updatedAt: string;
}

interface Module {
  id: string;
  orgId: string;
  name: string;
  access: boolean;
  groupId: string;
  subModules: {
    id: string;
    orgId: string;
    name: string;
    access: boolean;
    moduleId: string;
  }[];
}

interface NodeTree {
  id: string;
  orgId: string;
  name: string;
  parentId?: string;
  nodeInfo?: {
    id: string;
    nodeId: string;
    regionId?: string;
    assetId?: string;
    name: string;
    phoneNo: string;
    email: string;
    contactPerson: string;
    address: string;
    type: string;
    serialNo?: string;
    status?: boolean;
    voltage?: string;
    description?: string;
    latitude?: string;
    longitude?: string;
    createdAt: string;
    updatedAt: string;
  };
  nodesTree: NodeTree[];
}

export interface CreateRegionBhubServiceCenterPayload {
  orgId: string;
  parentId: string;
  regionId: string;
  name: string;
  phoneNo: string;
  email: string;
  contactPerson: string;
  address: string;
  type: "business hub" | "region" | "service center";
}

export interface UpdateRegionBhubServiceCenterPayload {
  nodeId: string;
  regionId: string;
  name: string;
  phoneNo: string;
  email: string;
  contactPerson: string;
  address: string;
  type: "business hub" | "region" | "service center";
}

export interface CreateSubstationTransfomerFeederPayload {
  orgId: string;
  parentId: string;
  name: string;
  serialNo: string;
  phoneNo: string;
  email: string;
  contactPerson: string;
  address: string;
  status: boolean;
  voltage: string;
  latitude: string;
  longitude: string;
  description: string;
  type: "feeder line" | "substation" | "dss";
}

export interface UpdateSubstationTransfomerFeederPayload {
  nodeId: string;
  name: string;
  serialNo: string;
  phoneNo: string;
  email: string;
  contactPerson: string;
  address: string;
  status: boolean;
  voltage: string;
  latitude: string;
  longitude: string;
  description: string;
  type: "feeder line" | "substation" | "dss";
}

interface NodeInfo {
  id: string;
  nodeId: string;
  regionId?: string; // Optional as it's missing in some objects
  name: string;
  phoneNo: string;
  email: string;
  contactPerson: string;
  address: string;
  bhubId?: string; // Optional field
  serialNo?: string; // Optional field
  status?: boolean; // Optional field
  voltage?: string; // Optional field
  description?: string; // Optional field
  latitude?: string; // Optional field
  longitude?: string; // Optional field
  createdAt: string;
  updatedAt: string;
}

export interface Node {
  id: string;
  orgId: string;
  name: string;
  parentId?: string; // Optional as root node doesn't have parentId
  nodeInfo: NodeInfo;
}

export interface NodesResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: Node[];
}

export interface GetOneOrgResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: GetOneOrgResponseData;
}

export interface GetOneOrgResponseData {
  id: string;
  userId: string;
  businessName: string;
  postalCode: string;
  address: string;
  country: string;
  state: string;
  city: string;
  status: boolean;
  image: string;
  nodes: GetOneNode;
  operator: GetOneOrgOperator;
  totalCustomer: number;
  totalFeeder: number;
  totalVending: number;
  totalBilling: number;
  createdAt: string;
  updatedAt: string;
}

interface GetOneOrgOperator {
  id: string;
  orgId: string;
  nodeId: string;
  firstname: string;
  lastname: string;
  email: string;
  status: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetOneNode {
  id: string;
  orgId: string;
  name: string;
  nodeInfo?: {
    address: string;
    contactPerson: string;
    createdAt: string;
    email: string;
    id: string;
    name: string;
    nodeId: string;
    phoneNo: string;
    regionId: string;
    type: string;
    updatedAt: string;
  };
  nodesTree: GetOneNode[];
}

export interface DashboardResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: {
    analytics: string[];
    data: {
      content: {
        id: string;
        creator: Creator[];
        description: string;
        type: string;
        ipAddress: string;
        userAgent: string;
        createdAt: string;
      }
    }
  }
}

export interface Creator {
  id: string;
  orgId: string;
  firstname: string;
  lastname: string;
  position: string;
  location: string;
  status: boolean;
  permission: boolean;
  active: boolean;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

export interface AnalyticsResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: ResponseData;
}

export interface ResponseData {
  monthlySummaries: MonthlySummary[];
  activeUtilityCompany: number;
  totalDailySummary: Summary;
  dailyReports: DailyReport[];
  averageRecoveryTime: number;
  totalUtilityCompany: number;
  monthlyReports: MonthlyReport[];
  totalMonthlySummary: Summary;
  incidentReport: number;
  dailySummaries: DailySummary[];
}

export interface MonthlySummary {
  uptimeMinutes: number;
  month: string;
  uptimePercent: number;
  downtimeMinutes: number;
  services: string[];
  downtimePercent: number;
}

export interface Summary {
  uptimeMinutes: number;
  uptimePercent: number;
  downtimeMinutes: number;
  services: string[];
  downtimePercent: number;
}

export interface DailyReport {
  id: string;
  serviceName: string;
  reportType: "DAILY";
  createdAt: string;
  uptimePercent: number;
  downtimePercent: number;
  uptimeMinutes: number;
  downtimeMinutes: number;
}

export interface MonthlyReport {
  id: string;
  serviceName: string;
  reportType: "MONTHLY";
  month: string;
  uptimePercent: number;
  downtimePercent: number;
  uptimeMinutes: number;
  downtimeMinutes: number;
}

export interface DailySummary {
  date: string;
  uptimeMinutes: number;
  uptimePercent: number;
  downtimeMinutes: number;
  services: string[];
  downtimePercent: number;
}


export interface AdminPayload {
  id?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  defaultPassword?: string;
  department?: string;
  phoneNo?: string;
  role?: string;
}

export interface CreateAdminResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: string;
}

export interface Role {
  id: string;
  userId: string;
  userRole: string;
}

export interface Admin {
  id: string;
  defaultPassword?: string;
  firstname: string;
  lastname: string;
  department: string;
  email: string;
  status: boolean;
  active: boolean;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
  phoneNo: string;
}

export interface AdminResponse {
  responsecode: string;
  responsedata: Admin[];
  responsedesc: string;
}

export interface Admins {
  responsecode: string;
  responsedesc: string;
  responsedata: {
    totalInActiveAdmins: number;
    operators: Admin[];
    totalActiveAdmins: string;
    totalPortalUsers: string;
    totalSuspendedAdmins: string;
  }
}


export interface RecentActivities {
  responsecode: string;
  responsedesc: string;
  responsedata: {
    id: string;
    creator: Admin[];
    description: string;
    type: string;
    userAgent: string;
    ipAddress: string;
    createdAt: string;
  }[]
}

export interface User {
  id: string;
  type: string;
  username: string;
  email: string;
  activity: string;
  userAgent: string;
  ipAddress: string;
  role: string;
  timeStamp: string;
}

export interface AuditLog {
  responsecode: string;
  responsedesc: string;
  responsedata: {
    data: User[];
  }
}

export type SuspendAdminPayload = {
  id: string;
  status: boolean;
};