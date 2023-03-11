import { defineStore } from 'pinia'
import axios from 'axios'

export const useActivityStore = defineStore("Activity", {
    state: () => ({
        activityList: []
    }),
    getters: {
        getActivities(state) {
            return state.activityList
        }
    },
    actions: {
        async fetchActivitiesByVideoclipId(videoclipId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/activity/get/${videoclipId}`)
                this.activityList = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async postActivities(timestamp, questionType, questionText, answers, correctAnswer, videoclipId) {
            try {
                const data = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/activity/post`,
                    {
                        timestamp: timestamp,
                        questionType: questionType,
                        questionText: questionText,
                        answers: answers,
                        correctAnswer: correctAnswer,
                        videoclipId: videoclipId
                    })
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async updateActivities(id, timestamp, questionType, questionText, answers, correctAnswer) {
            try {
                const data = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/activity/update/${id}`,
                    {
                        timestamp: timestamp,
                        questionType: questionType,
                        questionText: questionText,
                        answers: answers,
                        correctAnswer: correctAnswer
                    })
                return data.data
            } catch (error) {
                console.log(error)
            }
        },
        async deleteActivities(id) {
            try {
                const data = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/activity/delete/${id}`)
                return data.data
            } catch (error) {
                console.log(error)
            }
        }
    }
})