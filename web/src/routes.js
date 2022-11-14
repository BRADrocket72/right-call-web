import LessonSelection from "@/components/LessonSelection.vue";
import LoginPage from "@/components/LoginPage.vue"
import {createRouter, createWebHistory} from 'vue-router'


const routesArray = [
    {
        path: "/",
        name: "LessonSelection",
        component: LessonSelection
    },
    {
        path: "/LoginPage",
        component: LoginPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routesArray
})

export default router