import { useEffect, useState } from "react";
import { getTrashedTasks } from "../services/tasksApis";
import TrashedTasksComponent from "../components/TrashedTasksComponent";
import Loading from '../ui/Loading';


export default function RecylceTasks(){

    const[trashedTasks,setTrashedTasks]=useState([])
    const[loading, setLoading] = useState(false);

   useEffect(function()
    {
        setLoading(true);
        getTrashedTasks().then((data)=>
        {
            console.log(data.data.tasks)
            setTrashedTasks(data.data.tasks)
            setLoading(false);

        }).catch((err)=>
        {
            console.log(err)
        })
    },
    [])
return (
  <div className='p-4 flex flex-col items-center bg-gradient-to-r from-cyan-500 to-blue-500 m-2 rounded-xl'>
    {loading?
    (
        <Loading/>
    ):
    <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
            {trashedTasks.length>0?(
            trashedTasks.map((task)=>(
                <TrashedTasksComponent task={task} key={task.id} setTrashedTasks={setTrashedTasks}/>)
            )):(
                <p className='text-gray-500 text-xl'>No tasks deleted recently</p>
              )}
      </div>
}
  </div>
);
}
