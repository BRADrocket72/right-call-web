import { defineStore } from 'pinia'
import axios from 'axios'

export const useFeedbackStore = defineStore("Feedback", {
    state: () => ({
        feedbackList: []
    }),
    getters: {
        getFeedback(state) {
            return state.feedbackList
        }
    },
    actions: {
        async fetchFeedbackByVideoclipId(videoclipId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/feedback/get/${videoclipId}`)
                this.feedbackList = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async postFeedback(videoclipId, activityId, timestamp, correctFeedback, incorrectFeedback) {
            try {
                const data = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/feedback/post`,
                    {
                        videoclipId: videoclipId,
                        activityId: activityId,
                        timestamp: timestamp,
                        correctFeedback: correctFeedback,
                        incorrectFeedback: incorrectFeedback
                    })
                return data.data
            } catch (error) {
                console.error(error)
            }
        },
        async updateFeedback(id, correctFeedback, incorrectFeedback) {
            try {
                const data = await axios.put(`${process.env.VUE_APP_API_BASE_URL}/feedback/update/${id}`,
                    {
                        correctFeedback: correctFeedback,
                        incorrectFeedback: incorrectFeedback
                    })
                return data.data
            } catch (error) {
                console.log(error)
            }
        },
        async deleteFeedback(id) {
            try {
                const data = await axios.delete(`${process.env.VUE_APP_API_BASE_URL}/feedback/delete/${id}`)
                return data.data
            } catch (error) {
                console.log(error)
            }
        }
    }
})