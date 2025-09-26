import { handleApiError } from "@/error";
import axios from "axios";
import { env } from "@/env";
import type { ApiResponse, ChangePasswordPayload, ProfileResponse, ResetPasswordPayload, ServiceResponse } from "@/types/org.interfaces";

const BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;
const CUSTOM_HEADER = (env.NEXT_PUBLIC_CUSTOM_HEADER as string) ?? "";

interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserInfo {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phoneNo?: string;
  department: string;
  status: boolean;
  active: boolean;
  lastActive: string;
  role: [
    {
      id: string;
      userId: string;
      userRole: string;
    },
  ];
  roles?: [
    {
      id: string;
      userId: string;
      userRole: string;
    },
  ];
  createdAt: string;
  updatedAt: string;
}

interface AuthResponseData {
  access_token: string;
  user_info: UserInfo;
}

interface LoginApiResponse {
  responsecode: string;
  responsedesc: string;
  responsedata: AuthResponseData;
}

export const loginApi = async (
  credentials: LoginCredentials,
): Promise<AuthResponseData | { success: boolean; error: string }> => {
  try {
    const FormData = (await import("form-data")).default;
    const data = new FormData();
    data.append("username", credentials.username);
    data.append("password", credentials.password);

    const response = await axios.post<LoginApiResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/login`,
      data,
      {
        maxBodyLength: Infinity,
        headers: {
          custom: CUSTOM_HEADER,
        },
      },
    );
    if (response.data.responsecode !== "001") {
      return {
        success: false,
        error: response.data.responsedesc,
      };
    }
    return response.data.responsedata;
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "login");
    return {
      success: false,
      error: errorResult.error,
    };
  }
};


export const getProfile = async (id: string): Promise<{
  success: boolean;
  data?: ProfileResponse['responsedata']
  error?: string;
}> => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<ProfileResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id },
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

export const resetPasswordApi = async (params: ResetPasswordPayload): Promise<ServiceResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/forget-password`,
      null,
      {
        params, 
      }
    );

    if (response.data.responsecode === "000") {
      return { success: true, message: response.data.responsedesc };
    } else {
      return { success: false, message: response.data.responsedesc };
    }
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "reset-password");
    return { success: false, message: errorResult.error };
  }
};

export const generateOtpApi = async ({ username }: { username: string }): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post<{
      responsecode: string;
      responsedesc: string;
    }>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/generate-otp`,
      null, 
      { params: { username } }
    );

    if (response.data.responsecode === "000") {
      return { success: true, message: response.data.responsedesc };
    } else {
      return { success: false, message: response.data.responsedesc };
    }
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "generate-otp");
    return { success: false, message: errorResult.error };
  }
};

export const changePasswordApi = async (params: ChangePasswordPayload): Promise<ServiceResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    console.log("Payload sent to backend:", params);
    const response = await axios.post<ApiResponse>(
      `${BASE_URL}/portal/onboard/v1/api/gfPortal/auth/service/change-password`,
      null,
      {
        params, 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.responsecode === "000") {
      return { success: true, message: response.data.responsedesc };
    } else {
      return { success: false, message: response.data.responsedesc };
    }
  } catch (error: unknown) {
    const errorResult = handleApiError(error, "reset-password");
    return { success: false, message: errorResult.error };
  }
};

