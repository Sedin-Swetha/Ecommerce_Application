import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { User } from "@/types/user";
import { users as defaultUsers } from "@/data/user";
import { STORAGE_KEYS } from "@/constants/StorageKeys";
export const userAtom = atomWithStorage<User | null>("session", null);
export const usersAtom = atomWithStorage<User[]>(STORAGE_KEYS.USERS, defaultUsers);
export const isAuthenticatedAtom = atom((get) => get(userAtom) !== null);