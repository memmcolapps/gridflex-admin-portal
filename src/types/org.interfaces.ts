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
  operator: Operator;
  customerCount: number;
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
