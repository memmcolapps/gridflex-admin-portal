import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAdminApi,
  createOrgApi,
  createRegionBhubServiceCenter,
  createSubstationTransfomerFeeder,
  getAdmin,
  getAllNodes,
  getAnalytics,
  getAuditLog,
  getOneOrg,
  getOrgs,
  getRecentActivities,
  suspendAdminApi,
  updateRegionBhubServiceCenter,
  updateSubstationTransfomerFeeder,
} from "../services/org.service";
import type {
  CreateAdminPayload,
  CreateOrgPayload,
  SuspendAdminPayload,
  CreateRegionBhubServiceCenterPayload,
  CreateSubstationTransfomerFeederPayload,
  UpdateRegionBhubServiceCenterPayload,
  UpdateSubstationTransfomerFeederPayload,
} from "@/types/org.interfaces";

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

export const useGetAdminResponse = () => {
  return useQuery({
    queryKey: ["admin"], 
    queryFn: () => getAdmin(),
  });
};

export const useGetRecentActiviy = () => {
  return useQuery({
    queryKey: ['recentactivity'],
    queryFn: () => getRecentActivities()
  })
}

export const useGetAuditLog = () => {
  return useQuery({
    queryKey: ['auditlog'],
    queryFn: () => getAuditLog()
  })
}

export const useCreateAdmin = () => {
  return useMutation({
    mutationFn: async (admin: CreateAdminPayload) => {
      const response = await createAdminApi(admin);
      if (!response.success && 'error' in response){
        throw new Error(response.error)
      }
      return response;
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
  });
};
