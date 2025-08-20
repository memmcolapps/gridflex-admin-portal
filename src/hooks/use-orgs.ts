import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createOrgApi,
  createRegionBhubServiceCenter,
  createSubstationTransfomerFeeder,
  getAllNodes,
  getOneOrg,
  getOrgs,
  updateRegionBhubServiceCenter,
  updateSubstationTransfomerFeeder,
} from "../services/org.service";
import type {
  CreateOrgPayload,
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
