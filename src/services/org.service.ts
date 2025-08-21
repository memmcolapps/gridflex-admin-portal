import { handleApiError } from "@/error";
import axios from "axios";
import { env } from "@/env";
import type {
  CreateOrgPayload,
  CreateOrgResponse,
  CreateRegionBhubServiceCenterPayload,
  CreateSubstationTransfomerFeederPayload,
  GetOneOrgResponse,
  GetOneOrgResponseData,
  Node,
  NodesResponse,
  OrganizationResponse,
  UpdateRegionBhubServiceCenterPayload,
  UpdateSubstationTransfomerFeederPayload,
} from "@/types/org.interfaces";

const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;
const CUSTOM_HEADER = (env.NEXT_PUBLIC_CUSTOM_HEADER as string) ?? "";

export const createOrgApi = async (
  payload: CreateOrgPayload,
): Promise<{ success: boolean } | { success: boolean; error: string }> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.post<CreateOrgResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/service/organization/create`,
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
