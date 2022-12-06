import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserResultsStore = defineStore("UserResults", {
    state: () => ({
        results: [],
        allUserResults: []
    }),
    getters: {
        getActivities(state) {
            return state.results
        }
    },
    actions: {
        async postUserResults(username,score,lessonId) {
            try {
                await axios.post(`http://localhost:3000/api/activity/post`, 
                { 
                    username: username,
                    score: score,
                    lessonId: lessonId
                })
            } catch(error) {
                console.log(error)
            }
        },
        async fetchUserResults() {
            try {
                const data = await axios.get('http://localhost:3000/api/userResults/getall')
                this.allUserResults = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchByUserName(username) {
            try {
                const data = await axios.get(`http://localhost:3000/api/userResults/get/${username}`)
                this.userResults = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
    }
})