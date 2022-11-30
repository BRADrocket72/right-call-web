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
    }
})