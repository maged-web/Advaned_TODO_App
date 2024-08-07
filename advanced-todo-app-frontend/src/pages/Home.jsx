import React, { useEffect, useState } from 'react';
import { getAllCategories, getAllTasks } from '../services/tasksApis';
import TaskComponent from '../components/TaskComponent';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../ui/Loading';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const[updateAfterDelete,setUpdateAfterDelete]=useState(false)
  const[search,setSearch]=useState('')
  const[sortField,setSortField]=useState('')
  const[sortOrder,setSortOrder]=useState('')
  const[filterStatus,setFilterStatus]=useState('')
  const[filterCategory,setFilterCategory]=useState('')
  const [categories, setCategories] = useState([]);



  const navigate = useNavigate();
  const { userName } = useAuth();

  useEffect(() => {
    setUpdateAfterDelete(false)
    setLoading(true);
    getAllTasks(currentPage,search,sortField,sortOrder,filterStatus,filterCategory)
      .then((data) => {
        console.log(data)
        setTasks(data.data.data);
        setCurrentPage(data.data.current_page);
        setLastPage(data.data.last_page);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage,updateAfterDelete,search,sortField,sortOrder,filterStatus,filterCategory]);

  useEffect(function()
  {
    getAllCategories().then((data)=>
      {
        setCategories(data.data)
              })
      .catch(err=>console.log(err))
  },[])

  const handleDelete = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    if(currentPage>=lastPage&&currentPage!=1)
    {
      handleBackPage()
    }
    setUpdateAfterDelete(true)
  };

  const handleNextPage = () => {
    setCurrentPage((curr) => curr + 1);
  };

  const handleBackPage = () => {
    setCurrentPage((curr) => curr - 1);
  };

  const searchTasks= tasks.filter((task)=>
    {
    return(
      task.title.toLowerCase().includes(search.toLowerCase())||task.description.toLowerCase().includes(search.toLowerCase())
    )})
  
  return (
    <div className='p-4 flex flex-col items-center bg-gradient-to-r from-cyan-500 to-blue-500 m-2 rounded-xl'>
      <div className='flex flex-col justify-center items-center bg-cyan-800 p-2 m-2 rounded-xl flex-wrap'>
      <input type='text' id='search' value={search} placeholder="Search tasks..."className='w-full rounded-lg border-none outline-none p-1 my-2' name='search' onChange={(e)=>setSearch(e.target.value)}></input>
      <div>
      <label className='text-white text-lg'>Sort by :  </label>
     <select  className='p-1 m-2 rounded-lg' value={sortField} onChange={(e)=>setSortField(e.target.value)}>
        <option  value='Title'>Title</option>
        <option value='Description'>Description</option>
        <option value='created_at'>Date</option>
      </select>
      
      <select className='p-1 m-2 rounded-lg' value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)}>
        <option value='ASC'>ASC</option>
        <option value='DESC'>DESC</option>
      </select>
      </div>
      <div className='flex flex-col sm:flex-row justify-center items-center gap-2 '>
      <label className='text-white text-lg'>Filter by Status:  </label>
      <select className='p-1 m-2 rounded-lg' value={filterStatus} onChange={(e)=>setFilterStatus(e.target.value)}>
        <option value=''>All</option>
        <option value='pending'>Pending</option>
        <option value='completed'>Completed</option>
      </select>

      <label className='text-white text-lg'>Filter by Category:  </label>
      <select  className='p-1 m-2 rounded-lg' value={filterCategory} onChange={(e)=>setFilterCategory(e.target.value)}>
        <option value=''>All categories</option>
        {categories.map((category)=>(
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <NavLink className='self-end' to='/create-task'>
            <button className='bg-green-500 hover:bg-green-600 text-white p-3 rounded-md mb-4'>
              Create New Task
            </button>
          </NavLink>
          <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md'>
            {searchTasks.length > 0 ? (
              searchTasks.map((task) => (
                <TaskComponent task={task} key={task.id} onDelete={handleDelete} setTasks={setTasks} />
              ))
            ) : (
              <p className='text-gray-500'>No tasks available</p>
            )}
          </div>
          <div className='flex gap-16 flex-row justify-between items-center'>
            <button
              className='bg-red-600 text-white p-2 text-xl rounded-lg m-2 w-full'
              disabled={currentPage === 1}
              onClick={handleBackPage}
            >
              Back
            </button>
            <p className='text-white text-xl'>{currentPage}/{lastPage}</p>
            <button
              className='bg-sky-600 text-white p-2 rounded-lg text-xl m-2 w-full'
              disabled={currentPage === lastPage}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
