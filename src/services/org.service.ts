import { handleApiError } from "@/error";
import axios from "axios";
import { env } from "@/env";

const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;
const CUSTOM_HEADER = (env.NEXT_PUBLIC_CUSTOM_HEADER as string) ?? "";

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

interface CreateOrgResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: string;
}

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
