import React from 'react'
import { NavLink } from 'react-router-dom'
import { deleteTask, statusUpdate } from '../services/tasksApis'

export default function TaskComponent({task,onDelete,setTasks}) {
  const handleDelete=()=>
  {
    deleteTask(task.id).then((data)=>
      {
        console.log(data)
        onDelete(task.id)
      }).catch(err=>console.log(err))
  }
  const handleStatusUpdate=()=>
  {
    statusUpdate(task.id).then((data)=>
    {
      setTasks((prev)=>
      prev.map((tasks)=>
        tasks.id==task.id?{...tasks,status:'completed'}:tasks)
      )
      console.log(data)
    }).catch((err)=>
    {
      console.log(err)
    })
  }
  return (
    <div className='flex flex-col justify-start items-start p-4 m-4 bg-sky-700 rounded-lg shadow-md text-white w-full'>
    <div className='text-xl font-semibold mb-2'>
      Title: <span className='font-normal'>{task.title}</span>
    </div>
    <div className='mb-2'>
      Description: <span className='font-normal'>{task.description}</span>
    </div>
    <div className='mb-4'>
      Status: <span className='font-normal capitalize'>{task.status}</span>
    </div>
    <div className='flex justify-between space-x-2 w-full'>
      <NavLink to={`/edit-task/${task.id}`}><button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-200'>
          Edit
        </button>
        </NavLink>
       {task.status=='pending'&& <button onClick={handleStatusUpdate} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200'>
          Mark as Completed
        </button>}
        <button onClick={handleDelete} className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200'>
          Delete
        </button>
        
    </div>
  </div>
  )
}
