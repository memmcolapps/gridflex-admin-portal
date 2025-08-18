import { handleApiError } from "@/error";
import axios from "axios";
import { env } from "@/env";
import type {
  CreateOrgPayload,
  CreateOrgResponse,
  OrganizationResponse,
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
