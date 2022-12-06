import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserResultsStore = defineStore("UserResults", {
    state: () => ({
        results: []
    }),
    getters: {
        getResults(state) {
            return state.results
        }
    },
    actions: {
        async postUserResults(username,score,lessonId) {
            try {
                await axios.post(`http://localhost:3000/api/userResults/post`, 
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
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchByUserName(username) {
            try {
                const data = await axios.get(`http://localhost:3000/api/userResults/get/${username}`)
                this.results = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
    }
})