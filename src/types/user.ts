import { UserRole } from "./enums";
export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	role: UserRole;
	phone: string;
	profileImage?: string;
	isBlocked: boolean;
	createdAt: string;
	updatedAt?: string;
}
export type { LoginInput, RegisterInput } from "@/lib/schemas/authSchemas";
export interface AuthState {
	user: User | null
	isLoading: boolean
	error: string | null
}