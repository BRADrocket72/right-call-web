import { defineStore } from 'pinia'
import axios from 'axios'

export const useLessonStore = defineStore("Lessons", {
    state: () => ({
        lessons: []
    }),
    getters: {
        getLessons(state) {
            return state.lessons
        }
    },
    actions: {
        async postLesson(name, userType, description, videoClipsArray) {
            try {
                const data = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/lessons/post`,
                    {
                        name: name,
                        userType: userType,
                        description: description,
                        videoClipsArray: videoClipsArray
                    })
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async getAllLessons() {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/lessons/getAll`)
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async deleteLesson(id) {
            try {
                const data = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/lessons/delete/${id}`)
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async updateLessonName(id, name) {
            try {
                const data = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/lessons/update/${id}`, { name: name })
                return data.data
            } catch (error) {
                console.log(error)
            }
        },
        async updateVideoClipsArray(id, videoClipsArray) {
            try {
                const data = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/lessons/updateVideoClipsArray/${id}`, { videoClipsArray: videoClipsArray })
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async getLessonById(id) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/lessons/getAdminLessonById/` + id)
                return data.data
            } catch (error) {
                console.log(error);
            }
        }
    }
})