import React from 'react'
import { forceDeleteTask, restoreTrashedTask } from '../services/tasksApis'

export default function TrashedTasksComponent({task,setTrashedTasks}) {
    const id=task.id
    const handleRestore=()=>
    {
        restoreTrashedTask(id).then((data)=>
        {
            console.log(data)
            setTrashedTasks((prev)=>prev.filter((tasks)=>tasks.id!==task.id))
        }).catch((err)=>
        {
            console.log(err)
        })
    }
    const handleForceDelete=()=>
      {
          forceDeleteTask(id).then((data)=>
          {
              console.log(data)
              setTrashedTasks((prev)=>prev.filter((tasks)=>tasks.id!==task.id))

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
            <button onClick={handleRestore} className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-200'>
              Restore
            </button>
            <button onClick={handleForceDelete}  className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-200'>
              Delete
            </button>
            
        </div>
      </div>
      )
    }

