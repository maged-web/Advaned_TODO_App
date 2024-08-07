import React, { useEffect, useState } from 'react'
import { registerApi } from '../services/authApis'
import { useAuth } from '../contexts/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import '../index.css'
import authBack from '../assets/authback.jpg'
export default function Register() {
  const[name,setName]=useState('')
  const[email,setemail]=useState('')
  const[password,setpassword]=useState('')
  const[passwordConfirmation,setpasswordConfirmation]=useState('')
  const [error,setError] =useState({ __html:''})
  const {auth,register}=useAuth()
  const navigate=useNavigate()

  const handleLoginPage=(e)=>
    {
      e.preventDefault()
      navigate('/login')
    
    }
  const handleRegister=(e)=>
  {
    e.preventDefault()
    registerApi(name,email,password,passwordConfirmation)
    .then((data)=>
    {
      const token=data.data.token
      const userName=data.data.user.name
      console.log(userName)
      register(token,userName)
      navigate('/')
    })
    .catch((err)=>
      {
        console.log(err)
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
    <div className='flex justify-center items-center h-lvh bg-no-repeat	bg-cover bg-center p-20 register-container'>
      <div className='flex-grow'></div>
      <form onSubmit={handleRegister} className='p-3 max-w-md w-full rounded-lg items-end register-form'  method='POST'>
      {error.__html&&<div className='mb-5 text-center text-red-500 font-bold' dangerouslySetInnerHTML={error}></div>}
        <div className='mb-4'>
        <label className='block mb-2 font-bold text-sm' htmlFor='name'>Full name</label>
        <input className='p-2  w-full border-none' id='name' name='name' placeholder='Enter your full name' type='text' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='mb-4'>
        <label className='block mb-2 font-bold text-sm' htmlFor='email'>Email</label>
        <input className='p-2 w-full border-none' id='email' name='email' placeholder='Enter your full name' type='email' onChange={(e)=>setemail(e.target.value)}/>
        </div >
        <div className='mb-4'>
        <label className='block mb-2 font-bold text-sm' htmlFor='password'>Password</label>
        <input className='p-2 w-full border-none' id='password' name='password' placeholder='Enter your password' type='password' onChange={(e)=>setpassword(e.target.value)}/>
        </div>
        <div className='mb-4'>
        <label className='block mb-2 font-bold text-sm' htmlFor='password'>Password Confirmation</label>
        <input className='p-2 w-full border-none' id='password_confirmation' name='password_confirmation' placeholder='Enter your password' type='password' onChange={(e)=>setpasswordConfirmation(e.target.value)}/>
        </div>

        <button className='w-full p-2 hover:bg-sky-800 hover:opacity-70 hover:ease-in	border-none text-white bg-sky-600	rounded-sm mt-5 cursor-pointer text-lg' type='submit'>Register</button>
        <button onClick={handleLoginPage} className='w-full p-2 hover:bg-green-800 hover:opacity-70 hover:ease-in	border-none text-white bg-green-600	rounded-sm mt-5 cursor-pointer text-lg' type='submit'>Login</button>

      </form>
    </div>
  )
}
