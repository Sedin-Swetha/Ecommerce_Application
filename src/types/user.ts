import {UserRole} from "./enums";
export interface User
{
    id :string;
    name:string;
    email:string;
    password:string;
    role:UserRole;
    phone:string;
    profileImage?:string;
    isBlocked:boolean;
    createdAt:string;
    updatedAt?:string;
}
export interface LoginInput
{
    email:string
    password:string
}
export interface RegisterInput
{
  name: string
  email: string
  password: string
  phone: string
}
export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}