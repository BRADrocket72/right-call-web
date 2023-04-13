import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserResultsStore = defineStore("UserResults", {
    state: () => ({
        results: [],
        questionTime: "",
        questionTimes: []
    }),
    getters: {
        getResults(state) {
            return state.results
        }
    },
    actions: {
        async postUserResults(username, score, quizId, quizName) {
            try {
                const data = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/userResults/post`,
                    {
                        username: username,
                        score: score,
                        quizId: quizId,
                        quizName: quizName
                    })
                return data.data
            } catch (error) {
                console.log(error)
            }
        },
        async fetchUserResults() {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/userResults/getall`)
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async fetchByUserName(username) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/userResults/get/${username}`)
                this.results = data.data
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async getByQuizId(quizId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/userResults/getByQuizId/${quizId}`)
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async getHighestResults(userName) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/userResults/getAllHighest/${userName}`)
                return data.data
            } catch (error) {
                console.log(error);
            }
        }
    }
})