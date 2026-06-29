import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { User } from "@/types/user";
import { users as defaultUsers } from "@/data/user";
export const userAtom = atomWithStorage<User | null>("session", null);
export const usersAtom = atomWithStorage<User[]>("users", defaultUsers);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);