import axiosClient from "../axiosConfiguration"

export const getAllTasks=async(page=1,search='',sortField = 'created_at', sortOrder = 'desc',filterWithStatus,filterWithCategory)=>
{
    try
    {
         const response =await axiosClient.get(`tasks`,{
            params:{
            page,
            search,
            sortField,
            sortOrder,
            filterWithStatus,
            filterWithCategory
            }
         })
         return response
    }catch(err)
    {
        throw err
    }
}

export const getAllCategories=async()=>
{
    try
    {
        const response =await axiosClient.get('categories')
        return response
    }catch(err)
    {
        throw err
    }
}
export const creatNewTask=async( title, description, status,category_id,)=>
{
    try
    {
        const response =await axiosClient.post('tasks',{title,description,status,category_id})
        return response
    }catch(err)
    {
            throw err
    }
}   
export const deleteTask=async(id)=>
{
    try
    {
        const response =await axiosClient.delete(`tasks/${id}`,{id})
        return response
    }catch(err)
    {
        throw err
    }
}         
export const getTask=async(id)=>
{
    try
    {
         const response =await axiosClient.get(`tasks/${id}`,{id})
        return response
    }catch(err)
    {
        throw err
    } 
} 
export const updateTask=async(id,title,description,status,category_id)=>
{
    try
    {
        const response =await axiosClient.put(`tasks/${id}`,{id,title,description,status,category_id})
        return response
    }catch(err)
    {
        throw err
    } 
} 

export const getTrashedTasks=async()=>
    {
        try
        {
             const response =await axiosClient.get('trashedTasks')
            return response
        }catch(err)
        {
            throw err
        } 
    } 
    export const restoreTrashedTask=async(id)=>
        {
            try
            {
                 const response =await axiosClient.post(`/tasks/${id}/restore`,{id})
                return response
            }catch(err)
            {
                throw err
            } 
        } 
        export const forceDeleteTask=async(id)=>
            {
                try
                {
                     const response =await axiosClient.delete(`/tasks/${id}/forceDelete`,{id})
                    return response
                }catch(err)
                {
                    throw err
                } 
            } 
            export const statusUpdate=async(id)=>
                {
                    try
                    {
                         const response =await axiosClient.put(`/tasks/${id}/status`,{id})
                        return response
                    }catch(err)
                    {
                        throw err
                    } 
                }