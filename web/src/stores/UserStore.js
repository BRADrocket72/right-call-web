import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore("Users", {
    state: () => ({
        users: [],
        currentUserToken: "",
        currentUserType: "",
        currentUserName: "",
        usersEyeTrackingCalibration: ""
    }),
    getters: {
        getUsers(state) {
            return state.users
        }
    },
    actions: {
        async postUser(userName,email, password, userType) {
            try{
                const data = await axios.post('http://localhost:3000/api/users/post', { 
                    userName: userName,
                    email:email,
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
        },
        async getUserByName(userName){
            try {
                const data = await axios.get('http://localhost:3000/api/users/getOne/' + userName)
                return data.data
            } catch (error) {
                console.log(error);
            }
        },
        async getAllUsers(){
            try{
                const data = await axios.get('http://localhost:3000/api/users/getAll')
                return data.data
            } catch(error) {
                console.log(error)
            }
        },
        async getUserById(userId) {
            try {
                const data = await axios.get('http://localhost:3000/api/users/getById/' + userId)
                return data.data
            } catch (error) {
                console.log(error);
            }
        }
    }
})