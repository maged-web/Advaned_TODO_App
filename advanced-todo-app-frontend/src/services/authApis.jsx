import axiosClient from "../axiosConfiguration"

export const registerApi=async(name,email,password,passwordConfirmation)=>
{
    try
    {
    const response =await axiosClient.post('register',{
        name,
        email,
        password,
        password_confirmation:passwordConfirmation
    })
    return response
}catch(err)
{
    throw err
}
}

export const loginApi=async(email,password)=>
{
        try
        {
        const response =await axiosClient.post('login',{
            email,
            password,
        })
        return response
    }catch(err)
    {
        throw err
    }
}

export const logoutApi=async()=>
{
     try
        {
            const response =await axiosClient.post('logout')
            return response
        }catch(err)
        {
            throw err
        }
}