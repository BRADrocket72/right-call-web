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
        async postLesson(name, userType, description , videoClipsArray) {
            try {
                const data = await axios.post(`http://localhost:3000/api/lessons/post`, 
                { 
                    name: name,
                    userType: userType,
                    description: description,
                    videoClipsArray: videoClipsArray
                })
                return data.data
            } catch(error) {
                console.error(error)
            }
        },
        async getAllLessons() {
            try {
                const data = await axios.get('http://localhost:3000/api/lessons/getAll')
                return data.data
            } catch(error) {
                console.error(error)
            }
        },
        async deleteLesson(id) {
            try {
                const data = await axios.delete(`http://localhost:3000/api/delete/${id}`)
                return data.data
            } catch(error) {
                console.error(error)
            }
        }
    }
})