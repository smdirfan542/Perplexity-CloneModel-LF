import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

 
  const navigate = useNavigate();
  
  const {HandleLogin}=useAuth()
  
  
  const submitForm =async (event)=>{
    event.preventDefault();

    const payload={
      email,password,
    }

    await HandleLogin(payload)
    navigate('/')
    console.log('login payload' , payload)
  }

  if(!loading && user){
  return <Navigate to="/" replace/>
  }
  
  
  
  return (
    <div className='bg-gradient-to-br from-gray-900 via-gray-900 to-rose-950/70 min-h-screen min-w-screen text-white p-2 '>
      <h1 className='ml-5  text-red-500 font-bold text-4xl '>Login Page</h1>
      <div className='bg-gradient-to-br from-gray-900 via-gray-900 to-rose-950/70 min-h-screen min-w-screen text-white flex justify-center items-center'>
    <form onSubmit={submitForm} className='flex flex-col  border-2 border-white/10 bg-gradient-to-br from-gray-900 via-gray-900 to-rose-950/70 
     shadow-2xl shadow-[6px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shadow-red-950/30 backdrop-blur-xl text-white gap-4 rounded-2xl w-full max-w-md   p-6 sm:p-8 '>
      <h1 className='font-bold text-3xl text-red-500'>Welcome Back</h1>
      <p>Sign in with your email and password</p>
    {/* <label htmlFor="username">Username</label>
    <input type="text" className='w-[90%] ml-3 outline rounded p-2' name="username" id="" /> */}
    <label htmlFor="Email">Email</label>
    <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='You@gmail.com' className='w-[90%] ml-3 outline rounded p-2' name="" id="" />
    <label htmlFor="password">Password</label>
    <input type="password" placeholder='Enter your password' onChange={(e)=>{setPassword(e.target.value)}} className='w-[90%] ml-3 outline rounded p-2' name="" id="" />
    <input type="submit" className='cursor-pointer active:scale-90 bg-red-500 w-[90%] ml-3 p-2 rounded-md font-bold mb-2  ' value="Login" />


    </form>
    </div>
    </div>
    
  )
}

export default Login