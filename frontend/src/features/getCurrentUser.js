import api from "../../utils/axios"

export const getCurrentUser = async () => {
    try {
        const {data} = await api.get("/me")
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}