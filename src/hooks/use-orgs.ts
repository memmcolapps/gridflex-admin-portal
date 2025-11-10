import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAdminApi,
  createOrgApi,
  createRegionBhubServiceCenter,
  createSubstationTransfomerFeeder,
  getAdmin,
  getAllNodes,
  getAnalytics,
  getAuditLog,
  getContactMessages,
  getDashboardAnalytics,
  getIncidentReports,
  getOneOrg,
  getOrgs,
  getRecentActivities,
  markContactApi,
  resolveIncident,
  suspendAdminApi,
  suspendUtility,
  updateAdminApi,
  updateOrgApi,
  updateRegionBhubServiceCenter,
  updateSubstationTransfomerFeeder,
} from "../services/org.service";
import type {
  AdminPayload,
  CreateOrgPayload,
  SuspendAdminPayload,
  CreateRegionBhubServiceCenterPayload,
  CreateSubstationTransfomerFeederPayload,
  UpdateRegionBhubServiceCenterPayload,
  UpdateSubstationTransfomerFeederPayload,
  resolveIncidentPayload,
  MarkContactPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
  UpdateOrgPayload,
  SearchParams,
} from "@/types/org.interfaces";
import { queryClient } from "@/lib/queryClient";
import { changePasswordApi, generateOtpApi, getProfile, resetPasswordApi } from "@/services/auth.service";

export const useCreateOrg = () => {
  return useMutation({
    mutationFn: async (org: CreateOrgPayload) => {
      const response = await createOrgApi(org);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orgs']})
    }
  });
};

export const useUpdateOrg = () => {
  return useMutation({
    mutationFn: async (org: UpdateOrgPayload) => {
      const response = await updateOrgApi(org);
      if (!response.success && 'error' in response){
        throw new Error(response.error)
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orgs']})
    }
  })
}

export const useGetOrgs = (params?: SearchParams) => {
  return useQuery({
    queryKey: ["orgs", params],
    queryFn: async () => {
      const response = await getOrgs(params);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });
};

export const useGetAllNodes = (orgId: string) => {
  return useQuery({
    queryKey: ["nodes", orgId],
    queryFn: async () => {
      const response = await getAllNodes(orgId);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });
};

export const useGetOneOrg = (orgId: string) => {
  return useQuery({
    queryKey: ["org", orgId],
    queryFn: async () => {
      const response = await getOneOrg(orgId);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });
};

export const useCreateRegionBhubServiceCenter = () => {
  return useMutation({
    mutationFn: async (payload: CreateRegionBhubServiceCenterPayload) => {
      const response = await createRegionBhubServiceCenter(payload);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useUpdateRegionBhubServiceCenter = () => {
  return useMutation({
    mutationFn: async (payload: UpdateRegionBhubServiceCenterPayload) => {
      const response = await updateRegionBhubServiceCenter(payload);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useCreateSubstationTransfomerFeeder = () => {
  return useMutation({
    mutationFn: async (payload: CreateSubstationTransfomerFeederPayload) => {
      const response = await createSubstationTransfomerFeeder(payload);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useUpdateSubstationTransfomerFeeder = () => {
  return useMutation({
    mutationFn: async (payload: UpdateSubstationTransfomerFeederPayload) => {
      const response = await updateSubstationTransfomerFeeder(payload);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useGetAnalytics = (year?: number, month?: number, params?: SearchParams) => {
  return useQuery({
    queryKey: ["analytics", year, month, params],
    queryFn: () => getAnalytics(year,month,params),
  });
};

export const useGetDashboard = (year?: number, month?: number) => {
  return useQuery({
    queryKey: ["dashboard", year, month],
    queryFn: () => getDashboardAnalytics(year,month),
  });
};

export const useGetAdminResponse = (params?: SearchParams) => {
  return useQuery({
    queryKey: ["admin", params], 
    queryFn: () => getAdmin(params),
  });
};

export const useGetContactMessages = (params?: SearchParams) => {
  return useQuery({
    queryKey: ["contactInfo", params], 
    queryFn: () => getContactMessages(params),
  });
};

export const useMarkContact = () => {
  return useMutation({
    mutationFn: async ({ id }: MarkContactPayload) => {
      const response = await markContactApi(id);
      if (!response.success && 'error' in response){
        throw new Error(response.error)
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactInfo']})
    }
  });
};

export const useGetRecentActiviy = () => {
  return useQuery({
    queryKey: ['recentactivity'],
    queryFn: () => getRecentActivities()
  })
}

export const useIncidentReports = (
  page: number,
  size: number,
  status?: boolean
) => {
  return useQuery({
    queryKey: ['incidentReport', page, size, status],
    queryFn: () => getIncidentReports(page, size, status),
  });
};


export const useResolveIncidents = () => {
  return useMutation({
    mutationFn: async ({ id, status }: resolveIncidentPayload) => {
      const response = await resolveIncident(id, status);
      if (!response.success && 'error' in response){
        throw new Error(response.error)
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidentReport']})
    }
  });
};

export const useGetAuditLog = (params?: SearchParams) => {
  return useQuery({
    queryKey: ['auditlog', params],
    queryFn: () => getAuditLog(params)
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getProfile(id)
  })
}


export const useResetPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPasswordApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.error("Reset password failed:", error);
    },
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePasswordApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (error) => {
      console.error("Reset password failed:", error);
    },
  });
};

export const useGenerateOtp = () => {
  return useMutation({
    mutationFn: generateOtpApi,
    onError: (error) => {
      console.error("Generate OTP failed:", error);
    },
  });
};

export const useCreateAdmin = () => {
const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (admin: AdminPayload) => {
      const response = await createAdminApi(admin);
      if (!response.success && 'error' in response){
        throw new Error(response.error)
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin']})
    }
  })
}

export const useUpdateAdmin = () => {
  return useMutation({
    mutationFn: async (admin: AdminPayload) => {
      const response = await updateAdminApi(admin);
      if (!response.success && 'error' in response){
        throw new Error(response.error)
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin']})
    }
  })
}


export const useUpdateProfile = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (admin: AdminPayload) => {
      const response = await updateAdminApi(admin);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
    },
  });
};


export const useSuspendAdmin = () => {
  return useMutation({
    mutationFn: async ({ id, status }: SuspendAdminPayload) => {
      const response = await suspendAdminApi(id, status);
      if (!response.success && 'error' in response){
        throw new Error(response.error)
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin']})
    }
  });
};

export const useSuspendUtility = () => {
  return useMutation({
    mutationFn: async ({ id, status }: SuspendAdminPayload) => {
      const response = await suspendUtility(id, status);
      if (!response.success && 'error' in response){
        throw new Error(response.error)
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orgs']})
    }
  });
};




