import React, { useEffect, useState } from 'react';
import { creatNewTask, getAllCategories } from '../services/tasksApis';
import { Navigate, useNavigate } from 'react-router-dom'

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error,setError] =useState({ __html:''})

  const navigate=useNavigate()

useEffect(function()
{
  getAllCategories().then((data)=>
    {
      setCategory(data.data)
      
      setSelectedCategory(data.data[0].id);
    })
    .catch(err=>console.log(err))
},[])
  const handleSubmit = (e) => {
    e.preventDefault();
    creatNewTask(title,description,status,selectedCategory).then((data)=>
      {
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
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 m-2">
      <h2 className="text-center font-bold text-lg p-3 rounded-lg bg-slate-700 m-4 text-white w-auto">
        Create New Task
      </h2>
      <form onSubmit={handleSubmit} className="p-6 max-w-md w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg">
      {error.__html&&<div className='mb-5 text-center text-red-800 font-bold' dangerouslySetInnerHTML={error}></div>}

        <div className="mb-4">
          <label className="block mb-2 text-white font-bold">Title</label>
          <input
            type="text"
            className="p-3 w-full rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white font-bold">Description</label>
          <input
            type="text"
            className="p-3 w-full rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-white font-bold">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-3 w-full rounded-lg"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-white font-bold">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 w-full rounded-lg"
          >
          {category.map((category)=>(
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
          </select>
        </div>
        <button className="w-full text-white bg-green-500 p-3 rounded-lg font-bold transition duration-300 hover:bg-green-600">
          Create New Task
        </button>
      </form>
    </div>
  );
}
