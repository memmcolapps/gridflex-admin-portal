import { handleApiError } from "@/error";
import axios from "axios";
import { env } from "@/env";

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
