import LessonSelection from "@/components/LessonSelection.vue";
import {createRouter, createWebHistory} from 'vue-router'


const routesArray = [
    {
        path: "/",
        name: "LessonSelection",
        component: LessonSelection
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routesArray
})

export default router