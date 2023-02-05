import { defineStore } from 'pinia'
import axios from 'axios'

export const useInstructorClassStore = defineStore("InstructorClass", {
    state: () => ({
        instructorClasses: []
    }),
    getters: {
        getClasses(state) {
            return state.instructorClasses
        }
    },
    actions: {
        async postInstructorClass(instructorId, className, videoclipIds , studentIds) {
            try {
                const data = await axios.post(`http://localhost:3000/api/instructorClass/post`, 
                { 
                    instructorId: instructorId,
                    className: className,
                    videoclipIds: videoclipIds,
                    studentIds: studentIds
                })
                return data.data
            } catch(error) {
                console.error(error)
            }
        },
        async getClassesByInstructorId(instructorId) {
            try {
                const data = await axios.get('http://localhost:3000/api/instructorClass/getById/' + instructorId)
                return data.data
            } catch(error) {
                console.error(error)
            }
        },
        async addVideoClipToClass(classId, videoClipIds) {
            try {
                const data = await axios.patch(`http://localhost:3000/api/instructorClass/addVideoClip/${classId}`,  {videoclipIds: videoClipIds})
                return data.data
            } catch(error) {
                console.error(error)
            }
        },
        async deleteVideoClipFromClass(classId, videoClipIds) {
            try {
                const data = await axios.patch(`http://localhost:3000/api/instructorClass/addVideoClip/${classId}`,  {videoclipIds: videoClipIds})
                return data.data
            } catch(error) {
                console.error(error)
            }
        },
        async fetchAllInstructorClasses() {
            try {
                const data = await axios.get('http://localhost:3000/api/instructorClass/getall')
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async updateStudentIdsList(classId, student_Ids) {
            try {
                const data = await axios.patch(`http://localhost:3000/api/instructorClass/updateStudentIds/${classId}`, {studentIds: student_Ids})
                return data.data
            } catch (error) {
                console.log(error);
            }
        }
    }
})