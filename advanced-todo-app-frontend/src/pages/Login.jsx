import React, { useState } from 'react'
import { loginApi } from '../services/authApis'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Login() {
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const [error,setError] =useState({ __html:''})

  const {auth,login}=useAuth()
  const navigate=useNavigate()
const handleRegisterPage=(e)=>
{
  e.preventDefault()
  navigate('/register')

}
  const handleLogin=(e)=>
  {
    e.preventDefault()
    loginApi(email,password).then((data)=>
      {
        const token=data.data.token
        const userName=data.data.user.name
        login(token,userName)
        navigate('/')
      }).catch((err)=>
      {
       if(!err.response.data.errors)
       {
        setError({__html:err.response.data.message})
       }
       else
       {
        const finalErrors=Object.values(err.response.data.errors).reduce((accum,next)=>[...next,...accum],[])
        setError({__html:finalErrors.join('<br>')}) 
       }     
      })
  }

  if(auth)
    return <Navigate to='/'/>
  return (
    
    <div className='flex justify-center items-center h-lvh bg-no-repeat	bg-cover bg-center p-20 register-container '>
      <div className='flex-grow'></div>

      <form onSubmit={handleLogin} className='p-3 max-w-md w-full items-end rounded-lg register-form'>
      {error.__html&&<div className='mb-5 text-center text-red-500 font-bold' dangerouslySetInnerHTML={error}></div>}

        <div className='mb-4'>
        <label className='block mb-2 font-bold text-sm' htmlFor='email'>Email</label>
        <input className='p-2 w-full border-none' id='email' name='email' placeholder='Enter your email' type='email' onChange={(e)=>setemail(e.target.value)}/>
        </div>
        <div className='mb-4' >
        <label className='block mb-2 font-bold text-sm' htmlFor='password'>Password</label>
        <input className='p-2  w-full border-none' id='password' name='password' placeholder='Enter your password' type='password' onChange={(e)=>setpassword(e.target.value)} />
        </div>
        <button className='w-full p-2 hover:bg-sky-800 hover:opacity-70 hover:ease-in	border-none text-white bg-sky-600	rounded-sm mt-5 cursor-pointer text-lg' type='submit'>Login</button>
        <button onClick={handleRegisterPage} className='w-full p-2 hover:bg-green-800 hover:opacity-70 hover:ease-in	border-none text-white bg-green-600	rounded-sm mt-5 cursor-pointer text-lg' type='submit'>Register</button>

      </form>
    </div>
  )
}
