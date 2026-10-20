import { useDispatch } from "react-redux";
import { register,login,getme } from "../services/auth.services";

import { setUser,setError,setLoading } from "../auth.slice";

export function useAuth(){
    const dispatch = useDispatch()

    async function HandleRegister ({email,username,password}){

        try{
            dispatch(setLoading(true))
            const data = await register({email,username,password})
            
        }catch(error){
            dispatch(setError(error.response?.data?.message || "registration failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function HandleLogin({email,password}){
        try{
            dispatch(setLoading(true))
            const data = await login({email,password});
            dispatch(setUser(data.user))
        }catch(error){
            dispatch(setError(error.response?.data?.message || "login failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    
     async function Handlegetme(){
        try{
            dispatch(setLoading(false))
            const data = await getme();
            dispatch(setUser(data.user))
        }catch(error){
            dispatch(setError(error.response?.data?.message || "failed to fetch the get me details"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    return {
        HandleRegister,
        HandleLogin,
        Handlegetme,
    }
    
    
}