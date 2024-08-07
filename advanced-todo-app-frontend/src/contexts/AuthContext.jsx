import { createContext, useContext, useState } from "react";

const AuthContext=createContext()


export const AuthProvider=({children})=>
{
    const [auth,setAuth]=useState(()=>
    {
        const token=localStorage.getItem('authToken');
        return token?true:false;
    })
    const [userName, setUserName] = useState(()=>
    {
        const storedUserName=localStorage.getItem('userName');
        return storedUserName||'';
    });

    const register=(token,userName)=>{
        localStorage.setItem('authToken',token);
        localStorage.setItem('userName',userName);
        setAuth(true)
        setUserName(userName)
    }
    const login=(token,userName)=>{
        localStorage.setItem('authToken',token);
        localStorage.setItem('userName',userName);
        setUserName(userName)
        setAuth(true)
    }
    const logout=()=>{
        localStorage.removeItem('authToken');
        setAuth(false)
    }
return (
    <AuthContext.Provider value={{auth,userName,register,login,logout}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth=()=>useContext(AuthContext);