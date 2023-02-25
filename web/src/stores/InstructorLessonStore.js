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
        async postInstructorLesson(name, instructorId, description , videoClipsArray) {
            try {
                const data = await axios.post(`http://localhost:3000/api/instructorLessons/post`, 
                { 
                    name: name,
                    instructorId: instructorId,
                    description: description,
                    videoClipsArray: videoClipsArray
                })
                return data.data
            } catch(error) {
                console.error(error)
            }
        },
        async getAllInstructorLessons() {
            try {
                const data = await axios.get('http://localhost:3000/api/instructorLessons/getAll')
                return data.data
            } catch(error) {
                console.error(error)
            }
        }
    }
})