import { useMutation, useQuery } from "@tanstack/react-query";
import { createOrgApi, getAllNodes, getOrgs } from "../services/org.service";
import type { CreateOrgPayload } from "@/types/org.interfaces";

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
