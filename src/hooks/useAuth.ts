"use client";
import {useAtom} from "jotai";
// import {useRouter} from "next/navigation";
import {userAtom} from "@/store/userAtom";
import {users} from "@/data/user";

import {
    saveSession,
    clearSession,
    getSession,
}from "@/lib/storage/session";
import {
  LoginInput,
  RegisterInput,
  User,
} from "@/types/user";

import { UserRole } from "@/types/enums";

export const useAuth =() =>
{
    const [user,setUser] =useAtom(userAtom);
    // const router =useRouter();
    const login =(data:LoginInput):User =>{
        const existingUser =users.find((u)=>
        u.email===data.email &&
     u.password===data.password);
    
    if(!existingUser)
    {
        throw new Error("Invalid credentials");
    }
    if(existingUser.isBlocked)
    {
        throw new Error("User is Blocked");
    }
    setUser(existingUser);
    saveSession(existingUser);
   
    // router.push(existingUser.role===UserRole.ADMIN
    //     ?"/admin"
    //     :"/customer"
    // );
     return existingUser;
    
};
const register =(data:RegisterInput):User=>
{
    const user:User =
    {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: UserRole.USER,
      isBlocked: false,
      createdAt:
        new Date().toISOString(),

    };
    users.push(user);
      setUser(user);
    saveSession(user);
   
    // router.push("/customer");
    return user;
};
const logout =()=>
{
    clearSession();
    setUser(null);
    // router.push("/login");
};
const restoreSession =()=>
{
    const user=getSession();
    if(user)
    {
        setUser(user);
    }
};
return {
user,
login,
logout,
register,
restoreSession,
};
};

