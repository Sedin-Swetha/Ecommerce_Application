import {User} from "@/types/user";
const SESSION_KEY ="currentUser";

export const saveSession =(user:User) :void =>
{
    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(user)

    );
};

export const getSession =() :User|null =>
{
    const data =localStorage.getItem(SESSION_KEY);
    if(!data) return null;
    return JSON.parse(data);
};
export const clearSession =():void =>
{
    localStorage.removeItem(SESSION_KEY);
};