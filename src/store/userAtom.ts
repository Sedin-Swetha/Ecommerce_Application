import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { User } from "@/types/user";

export const userAtom = atomWithStorage<User | null>(
  "session",
  null
);

export const isAuthenticatedAtom = atom(
  (get) => get(userAtom) !== null
);