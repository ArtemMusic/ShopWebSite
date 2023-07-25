import axios from "axios";

const axiosClient = axios.create({
    baseURL: `/api`,
    withCredentials: true,
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('x-xsrf-token')}`
    return config;
})

export default axiosClient;
