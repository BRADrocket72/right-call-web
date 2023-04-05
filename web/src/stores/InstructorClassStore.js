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
        async postInstructorClass(instructorId, className, lessonIds, studentIds) {
            try {
                const data = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/instructorClass/post`,
                    {
                        instructorId: instructorId,
                        className: className,
                        lessonIds: lessonIds,
                        studentIds: studentIds
                    })
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async getClassesByInstructorId(instructorId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/instructorClass/getById/` + instructorId)
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async addVideoClipToClass(classId, lessonIds) {
            try {
                const data = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/instructorClass/updateVideoClips/${classId}`, { lessonIds: lessonIds })
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async fetchAllInstructorClasses() {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/instructorClass/getall`)
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async updateStudentIdsList(classId, student_Ids) {
            try {
                const data = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/instructorClass/updateStudentIds/${classId}`, { studentIds: student_Ids })
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async getAllByClassId(classId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/instructorClass/getByClassId/` + classId)
                return data.data
            } catch (error) {
                console.error(error)
            }
        }
    }
})