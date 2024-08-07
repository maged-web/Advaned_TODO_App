import React, { useState } from 'react'
import { ArrowRightEndOnRectangleIcon, TrashIcon, UserIcon } from '@heroicons/react/24/solid'
import { useAuth } from '../contexts/AuthContext'
import { logoutApi } from '../services/authApis'
import { NavLink, useNavigate } from 'react-router-dom'

export default function NavBar() {
    const {logout} = useAuth()
    const navigate = useNavigate()
    const {userName} = useAuth()
    const [dropDownOpen, setDropDownOpen] = useState(false)

    const handeRecyclePage = () => {
        navigate('recycle')
    }
    const handleLogout = async () => {
        await logoutApi()
            .then((data) => console.log(data))
            .catch(err => console.log(err))
        logout()
        navigate('/login')
    }
    const toggleDropDown = () => {
        setDropDownOpen(!dropDownOpen)
    }
    
    return (
        <div className='flex justify-between items-center p-4 bg-gray-900 shadow-md rounded-lg text-white text-xl m-1'>
            <div className='flex space-x-2 items-center'>
                <p>Welcome <span className='text-2xl text-blue-400'>{userName}</span></p>
                <UserIcon className='h-6 w-6 hidden sm:block text-blue-400' />
            </div>
            <NavLink to={`/home`}><h2 className='text-2xl font-semibold'>Todo Tasks</h2></NavLink>
            <div className='relative'>
                <button 
                    className='text-white bg-blue-600 p-2 px-4 cursor-pointer rounded-lg transition duration-200 hover:bg-blue-700' 
                    onClick={toggleDropDown}
                >
                    Menu
                </button>
                {dropDownOpen && (
                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2'>
                      <div  className='text-black hover:bg-gray-100 flex justify-center items-center p-2'>
                        <button 
                            onClick={handeRecyclePage} 
                            className='block w-full text-left px-2 py-1'>
                            Recycle
                        </button>
                        <TrashIcon className='w-6 h-6 text-red-600'/>
                        </div>
                        <div className='text-black hover:bg-gray-100 flex justify-center items-center p-2'>
                        <button 
                            onClick={handleLogout} 
                            className='block w-full text-left px-2 py-1'
                        >
                            Logout
                        </button>
                        <ArrowRightEndOnRectangleIcon className='w-6 h-6'/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
