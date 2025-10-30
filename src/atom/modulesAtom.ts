import { atomWithStorage } from "jotai/utils";

export const selectedModulesAtom = atomWithStorage<Record<string, string[]>>(
  "selected-modules",
  {}
);
