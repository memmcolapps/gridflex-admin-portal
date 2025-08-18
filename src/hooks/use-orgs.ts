import { useMutation } from "@tanstack/react-query";
import { createOrgApi } from "../services/org.service";
import type { CreateOrgPayload } from "../services/org.service";
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
