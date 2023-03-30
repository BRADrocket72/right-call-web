import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserResultsStore = defineStore("UserResults", {
    state: () => ({
        results: [],
        questionTime: []
    }),
    getters: {
        getResults(state) {
            return state.results
        }
    },
    actions: {
        async postUserResults(username, score, lessonId, lessonName) {
            try {
                const data = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/userResults/post`,
                    {
                        username: username,
                        score: score,
                        lessonId: lessonId,
                        lessonName: lessonName
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
        async getByLessonId(lessonId) {
            try {
                const data = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/userResults/getByLessonId/${lessonId}`)
                return data.data
            } catch (error) {
                console.log(error);
            }
        }
    }
})