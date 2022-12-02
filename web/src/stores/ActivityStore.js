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
                alert(error)
                console.log(error);
            }
        },
        async postActivities(timestamp,questionText,answers,videoclipId) {
            try {
                await axios.post(`http://localhost:3000/api/activity/post`, 
                { 
                    timestamp: timestamp,
                    questionText: questionText,
                    answers: answers,
                    videoclipId: videoclipId
                })
            } catch(error) {
                alert(error)
                console.log(error)
            }
        },
        async updateActivities(id,timestamp,questionText,answers) {
            try {
                await axios.patch(`http://localhost:3000/api/activity/update/${id}`, 
                { 
                    timestamp: timestamp,
                    questionText: questionText,
                    answers: answers,
                })
            } catch(error) {
                alert(error)
                console.log(error)
            }
        },
        async deleteActivities(id) {
            try {
                await axios.delete(`http://localhost:3000/api/activity/delete/${id}`)
            } catch(error) {
                alert(error)
                console.log(error)
            }
        }
    }
})