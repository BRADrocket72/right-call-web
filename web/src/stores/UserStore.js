import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore("Users", {
    state: () => ({
        users: [],
        currentUserToken: "",
        currentUserType: "",
        currentUserName: ""
    }),
    getters: {
        getUsers(state) {
            return state.users
        }
    },
    actions: {
        async postUser(userName, password, userType) {
            try{
                const data = await axios.post('http://localhost:3000/api/users/post', { 
                    userName: userName,
                    password: password,
                    userType: userType
                })
                return data.data
            } catch(error) {
                console.log(error)
            }
        },
        async loginUser(userName, password) {
            try{
                const data = await axios.post('http://localhost:3000/api/users/login', { 
                    userName: userName,
                    password: password
                })
                return data.data
            } catch(error) {
                console.log(error)
            }
        }
    }
})