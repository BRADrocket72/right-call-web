import LessonSelection from "@/components/LessonSelection.vue";
import LoginPage from "@/components/LoginPage.vue"
import AdminPage from "@/components/AdminPage.vue"
import AddQuestions from "@/components/AddQuestions.vue"
import VideoUpload from "@/components/VideoUpload.vue"
import {createRouter, createWebHistory} from 'vue-router'


const routesArray = [
    {
        path: "/",
        name: "LessonSelection",
        component: LessonSelection
    },
    {
        path: "/LoginPage",
        name: "LoginPage",
        component: LoginPage
    },
    {
        path: "/AdminPage",
        name: "AdminPage",
        component: AdminPage
    },
    {
        path: "/VideoUpload",
        name: "VideoUpload",
        component: VideoUpload
    },
    {
        path: "/AddQuestions",
        name: "AddQuestions",
        component: AddQuestions
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routesArray
})

export default router