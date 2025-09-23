import { handleApiError } from "@/error";
import axios from "axios";
import { env } from "@/env";
import type {
  Admins,
  AnalyticsResponse,
  AuditLog,
  AdminPayload,
  CreateAdminResponse,
  CreateOrgPayload,
  CreateOrgResponse,
  CreateRegionBhubServiceCenterPayload,
  CreateSubstationTransfomerFeederPayload,
  GetOneOrgResponse,
  GetOneOrgResponseData,
  Node,
  NodesResponse,
  OrganizationResponse,
  RecentActivities,
  UpdateRegionBhubServiceCenterPayload,
  UpdateSubstationTransfomerFeederPayload,
  IncidentReport,
  Contact,
} from "@/types/org.interfaces";

const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;
const CUSTOM_HEADER = (env.NEXT_PUBLIC_CUSTOM_HEADER as string) ?? "";

export const createOrgApi = async (
  payload: CreateOrgPayload,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const FormData = (await import("form-data")).default;
    const data = new FormData();
    data.append("businessName", payload.businessName);
    data.append("postalCode", payload.postalCode);
    data.append("email", payload.email);
    data.append("address", payload.address);
    data.append("password", payload.password);
    data.append("country", payload.country);
    data.append("state", payload.state);
    data.append("city", payload.city);
    data.append("firstName", payload.firstName);
    data.append("lastName", payload.lastName);
    data.append("phoneNumber", payload.phoneNumber);
    const token = localStorage.getItem("access_token");
    const response = await axios.post<CreateOrgResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/service/organization/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "createOrg");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const getOrgs = async (): Promise<{
  success: boolean;
  data?: OrganizationResponse["responsedata"];
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<OrganizationResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/service/organization/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
      data: response.data.responsedata,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "getOrgs");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const createRegionBhubServiceCenter = async (
  payload: CreateRegionBhubServiceCenterPayload,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post<CreateOrgResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/node/service/create/node/region-bhub-service-center`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(
      error,
      "CreateRegionBhubServiceCenterPayload",
    );
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const updateRegionBhubServiceCenter = async (
  payload: UpdateRegionBhubServiceCenterPayload,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.put<CreateOrgResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/node/service/update/node/region-bhub-service-center`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "updateRegionBhubServiceCenter");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const createSubstationTransfomerFeeder = async (
  payload: CreateSubstationTransfomerFeederPayload,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post<CreateOrgResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/node/service/create/node/substation-transformer-feeder-line`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(
      error,
      "createSubstationTransfomerFeeder",
    );
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const updateSubstationTransfomerFeeder = async (
  payload: UpdateSubstationTransfomerFeederPayload,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.put<CreateOrgResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/node/service/update/node/substation-transformer-feeder-line`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(
      error,
      "updateSubstationTransfomerFeeder",
    );
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const getAllNodes = async (
  orgId: string,
): Promise<{
  success: boolean;
  data?: Node[];
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<NodesResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/node/service/all?orgId=${orgId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
      data: response.data.responsedata,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "getAllNodes");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const getOneOrg = async (
  orgId: string,
): Promise<{
  success: boolean;
  data?: GetOneOrgResponseData;
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<GetOneOrgResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/service/organization/single?id=${orgId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    console.log("Organization data:", response.data.responsedata);

    return {
      success: true,
      data: response.data.responsedata,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "getOneOrg");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const getAnalytics = async (year: number, month: number): Promise<{
  success: boolean;
  data?: AnalyticsResponse["responsedata"];
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<AnalyticsResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/analytic/service/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
        params: {
          year,
          month
        }
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
      data: response.data.responsedata,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "getAnalytics");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const getAdmin = async (): Promise<{
  success: boolean;
  data?: Admins['responsedata']
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<Admins>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    return { success: true, data: response.data.responsedata };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};

export const getRecentActivities = async (): Promise<{
  success: boolean;
  data?: RecentActivities['responsedata'];
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<RecentActivities>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/recent/activity`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    return { success: true, data: response.data.responsedata };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};

export const getAuditLog = async (): Promise<{
  success: boolean;
  data?: AuditLog['responsedata'];
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<AuditLog>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/audit-log/service/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    return { success: true, data: response.data.responsedata };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};

export const createAdminApi = async (
  payload: AdminPayload,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {

    const token = localStorage.getItem("access_token");
    const response = await axios.post<CreateAdminResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/create`,
      {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        department: payload.department,
        password: payload.defaultPassword,
        phoneNo: payload.phoneNo,
        role: payload.role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "createAdmin");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const suspendAdminApi = async (
  id: string,
  status: boolean
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.patch(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/change-status`,
      null,
      {
        params: { id, status },
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    return { success: true };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "suspendAdmin");
    return { success: false, error: errorResult.error };
  }
};

export const suspendUtility = async (
  id: string,
  status: boolean
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.patch(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/service/organization/suspend`,
      null,
      {
        params: { id, status },
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    return { success: true };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "suspendUtility");
    return { success: false, error: errorResult.error };
  }
};

export const updateAdminApi = async (
  payload: AdminPayload,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.patch<CreateAdminResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/update`,
      {
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email,
        id: payload.id,
        // department: payload.department,
        password: payload.defaultPassword,
        phoneNo: payload.phoneNo,
        role: payload.role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "updateAdmin");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const getIncidentReports = async (
  status?: boolean
): Promise<{
  success: boolean;
  data?: IncidentReport['responsedata'];
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<IncidentReport>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/analytic/service/incident/report`,
      {
        params: { status },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    // Fix: Return the actual data
    return {
      success: true,
      data: response.data.responsedata
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "incidentReport");
    return { success: false, error: errorResult.error };
  }
};

export const resolveIncident = async (
  id: string,
  status: boolean
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.patch(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/analytic/service/incident/report/resolve`,
      null,
      {
        params: { id, status },
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    return { success: true };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "resolveIncident");
    return { success: false, error: errorResult.error };
  }
};

export const getDashboardAnalytics = async (year?: number, month?: number): Promise<{
  success: boolean;
  data?: AnalyticsResponse["responsedata"];
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<AnalyticsResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/analytic/service/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
        params: {
          year,
          month
        }
      },
    );

    if (response.data.responsecode !== "000") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }

    return {
      success: true,
      data: response.data.responsedata,
    };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "getDashboard");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};

export const getContactMessages = async (): Promise<{
  success: boolean;
  data?: Contact['responsedata']
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<Contact>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/service/message/get`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    return { success: true, data: response.data.responsedata };
  } catch {
    return { success: false, error: "Something went wrong" };
  }
};

export const markContactApi = async (
  id: string,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/service/message/read`,
      null,
      {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
          custom: CUSTOM_HEADER,
        },
      }
    );

    if (response.data.responsecode !== "000") {
      return { success: false, error: response.data.responsedesc };
    }

    return { success: true };
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "markContact");
    return { success: false, error: errorResult.error };
  }
};