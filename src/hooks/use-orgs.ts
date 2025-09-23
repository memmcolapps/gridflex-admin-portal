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
} from "@/types/org.interfaces";
import { queryClient } from "@/lib/queryClient";
import { getProfile } from "@/services/auth.service";

export const useCreateOrg = () => {
  return useMutation({
    mutationFn: async (org: CreateOrgPayload) => {
      const response = await createOrgApi(org);
      if (!response.success && "error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
  });
};

export const useGetOrgs = () => {
  return useQuery({
    queryKey: ["orgs"],
    queryFn: async () => {
      const response = await getOrgs();
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

export const useGetAnalytics = (year: number, month: number) => {
  return useQuery({
    queryKey: ["analytics", year, month],
    queryFn: () => getAnalytics(year,month),
  });
};

export const useGetDashboard = (year?: number, month?: number) => {
  return useQuery({
    queryKey: ["dashboard", year, month],
    queryFn: () => getDashboardAnalytics(year,month),
  });
};

export const useGetAdminResponse = () => {
  return useQuery({
    queryKey: ["admin"], 
    queryFn: () => getAdmin(),
  });
};

export const useGetContactMessages = () => {
  return useQuery({
    queryKey: ["contactInfo"], 
    queryFn: () => getContactMessages(),
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

export const useIncidentReports = (status?: boolean) => {
  return useQuery({
    queryKey: ['incidentReport', status],
    queryFn: () => getIncidentReports(status)
  })
}

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

export const useGetAuditLog = () => {
  return useQuery({
    queryKey: ['auditlog'],
    queryFn: () => getAuditLog()
  })
}

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getProfile(id)
  })
}

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




