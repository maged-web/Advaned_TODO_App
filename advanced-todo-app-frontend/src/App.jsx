import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import PageNotFound from './pages/PageNotFound'
import Home from './pages/Home'
import AppLayout from './ui/AppLayout'
import CreateTask from './pages/CreateTask'
import EditTask from './pages/EditTask'
import RecylceTasks from './pages/RecylceTasks'

export default function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route element={<AppLayout/>}>
    <Route index element={<Navigate replace to='/home'/>}/>
    <Route path='/home' element={<Home/>} />
    <Route path='/create-task' element={<CreateTask/>} />
    <Route path='/edit-task/:id' element={<EditTask/>} />
    <Route path='/recycle' element={<RecylceTasks/>} />

    </Route>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='*' element={<PageNotFound/>}/>

   </Routes>
   </BrowserRouter>
  )
}
