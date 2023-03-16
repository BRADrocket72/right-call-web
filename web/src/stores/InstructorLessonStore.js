import { defineStore } from 'pinia'
import axios from 'axios'

export const useInstructorLessonStore = defineStore("InstructorLessons", {
    state: () => ({
        instructorLessons: []
    }),
    getters: {
        getInstructorLessons(state) {
            return state.instructorLessons
        }
    },
    actions: {
        async postInstructorLesson(name, instructorId, description, videoClipsArray) {
            try {
                const data = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/instructorLessons/post`,
                    {
                        name: name,
                        instructorId: instructorId,
                        description: description,
                        videoClipsArray: videoClipsArray
                    })
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async getAllInstructorLessons() {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/instructorLessons/getAll`)
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async getLessonsByInstructorId(instructorId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/instructorLessons/getById/` + instructorId)
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async updateInstructorLessonName(id, name) {
            try {
                const data = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/instructorLessons/updateLessonName/${id}`, { name: name })
                return data.data
            } catch (error) {
                console.log(error)
            }
        },
        async fetchLessonById(lessonId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/instructorLessons/getLessonById/` + lessonId)
                return data.data
            } catch (error) {
                console.log(error);
            }
        }
    }
})