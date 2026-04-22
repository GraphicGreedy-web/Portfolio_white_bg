import axios from "axios"
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})
const authHeaders = () => {
    const token = localStorage.getItem("cmsToken")
    return token ? { Authorization: `Bearer ${token}` } : {}
}
export const brandRoute = () => api.get("/api/brands")
export const singleBrandRoute = (brandId) => api.get(`/api/brands/${brandId}`)
export const createBrandRoute = (payload) => api.post("/api/brands", payload, { headers: authHeaders() })
export const updateBrandRoute = (brandId, payload) => api.patch(`/api/brands/${brandId}`, payload, { headers: authHeaders() })
export const deleteBrandRoute = (brandId) => api.delete(`/api/brands/${brandId}`, { headers: authHeaders() })
export const commentRoute = () => api.get("/api/comments")
export const contactRoute = () => api.get("/api/contacts")
export const videoRoute = () => api.get("/api/videos")
export const createVideoRoute = (payload) => api.post("/api/videos", payload, { headers: authHeaders() })
export const updateVideoRoute = (videoId, payload) => api.patch(`/api/videos/${videoId}`, payload, { headers: authHeaders() })
export const deleteVideoRoute = (videoId) => api.delete(`/api/videos/${videoId}`, { headers: authHeaders() })
export const visualCommRoute = () => api.get("/api/visualComms")
export const singleVisualCommRoute = (visualId) => api.get(`/api/visualComms/${visualId}`)
export const createVisualCommRoute = (payload) => api.post("/api/visualComms", payload, { headers: authHeaders() })
export const updateVisualCommRoute = (visualId, payload) => api.patch(`/api/visualComms/${visualId}`, payload, { headers: authHeaders() })
export const deleteVisualCommRoute = (visualId) => api.delete(`/api/visualComms/${visualId}`, { headers: authHeaders() })
export const cmsLoginRoute = (payload) => api.post("/api/cms/login", payload)
export const cloudinaryUploadRoute = (formData) =>
    api.post("/api/uploads/cloudinary", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            ...authHeaders(),
        },
    })
