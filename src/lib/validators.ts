import {LoginInput,RegisterInput} from "@/types/user";

export const validateEmail =(email:string):boolean =>
{
    const emailRegex =/\S+@\S+\.\S+/;
    return emailRegex.test(email);
};
export const validatePassword=(
    password:string):boolean=>
    {
        return password.length>=6;
    };
export const validatePhone =(
    phone:string
):boolean =>
{
    return /^[0-9]{10}$/.test(phone);
};
export const validateLogin =(
    data:LoginInput
):string | null =>{
    if(!data.email || !data.password)
    {
        return "All fields are required";
    }
    if(!validateEmail(data.email))
    {
        return "Invalid email format";
    }
    return null;
};
export const validateRegister =(
    data:RegisterInput
):string | null =>
{
    if(
        !data.name||
        !data.email||
        !data.password||
        !data.phone
    )
    {
        return "All fields are required";
    }

if(!validateEmail(data.email))
{
    return "Invalid email";
}
if(!validatePassword(data.password))
{
    return "Password must be at least 6 characters";
}
if(!validatePhone(data.phone))
{
    return "Invalid phone number";
}
return null;
};
