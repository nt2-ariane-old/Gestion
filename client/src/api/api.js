import axios from 'axios'
const api = axios.create({
    // baseURL: 'http://158.69.26.2:65535/api',
    baseURL: process.env.REACT_APP_API_URL,
})

export const insertTask = payload => api.post(`/projets_web/task`, payload)
export const getAllTasks = () => api.get(`/projets_web/task/all`)
export const updateTaskById = (id, payload) => api.patch(`/projets_web/task/${id}`, payload)
export const deleteTaskById = id => api.delete(`/projets_web/task/${id}`)
export const getTaskById = id => api.get(`/projets_web/task/${id}`)



const apis = {
    insertTask,
    getAllTasks,
    updateTaskById,
    deleteTaskById,
    getTaskById,
}


export default apis