import api from "../../utils/axios"

export const getMessages = async (id) => {
    try {
        const { data } = await api.get(`/chat/get-message/${id}`)
        return data
    } catch (error) {
        console.error(error)
        return []
    }
}