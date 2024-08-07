import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
    <NavBar />
    <div className="flex-grow">
      <Outlet />
    </div>
    <Footer />
  </div>
  )
}
