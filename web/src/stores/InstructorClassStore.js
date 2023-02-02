import { defineStore } from 'pinia'
import axios from 'axios'

export const useInstuctorClassStore = defineStore("InstructorClass", {
    state: () => ({
        instructorClasses: []
    }),
    getters: {
        getClasses(state) {
            return state.instructorClasses
        }
    },
    actions: {
    async postInstructorClass(instructorId , videoclipIds , studentIds,) {
            try {
                const data = await axios.post(`http://localhost:3000/api/instructorClass/post`, 
                { 
                    instructorId: instructorId,
                    videoclipIds: videoclipIds,
                    studentIds: studentIds
                })
                return data.data
            } catch(error) {
                console.error(error)
            }
        }
    }
})