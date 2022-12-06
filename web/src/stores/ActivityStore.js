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
                const data = await axios.get(`http://localhost:3000/api/activity/get/${videoclipId}`)
                this.activityList = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async postActivities(timestamp,questionText,answers,correctAnswer,videoclipId) {
            try {
                const data = await axios.post(`http://localhost:3000/api/activity/post`, 
                { 
                    timestamp: timestamp,
                    questionText: questionText,
                    answers: answers,
                    correctAnswer: correctAnswer,
                    videoclipId: videoclipId
                })
                return data.data
            } catch(error) {
                console.log(error)
            }
        },
        async updateActivities(id,timestamp,questionText,answers,correctAnswer) {
            try {
                const data = await axios.patch(`http://localhost:3000/api/activity/update/${id}`, 
                { 
                    timestamp: timestamp,
                    questionText: questionText,
                    answers: answers,
                    correctAnswer: correctAnswer
                })
                return data.data
            } catch(error) {
                console.log(error)
            }
        },
        async deleteActivities(id) {
            try {
                const data = await axios.delete(`http://localhost:3000/api/activity/delete/${id}`)
                return data.data
            } catch(error) {
                console.log(error)
            }
        }
    }
})