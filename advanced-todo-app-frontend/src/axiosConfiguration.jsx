import axios from 'axios'
const axiosClient=axios.create({
    baseURL:'http://127.0.0.1:8000/api/'
})

axiosClient.interceptors.request.use((config)=>
{
    const token=localStorage.getItem('authToken')
    config.headers.Authorization=`Bearer ${token}`
    return config
})

axiosClient.interceptors.response.use((response)=>
{
    return response;
},(err)=>
{
    if(err.response&&err.response.status===401)
    {
        return Promise.reject(err);
    }
    return Promise.reject(err);
})

export default axiosClient;