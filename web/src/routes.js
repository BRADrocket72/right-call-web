import LessonSelection from "@/components/LessonSelection.vue";
import VideoEditor from "@/components/VideoEditor.vue";
import LoginPage from "@/components/RegistrationPage.vue"
import RegistrationPage from "@/components/RegistrationPage.vue";
import AdminPage from "@/components/AdminPage.vue"
import AddQuestions from "@/components/AddQuestions.vue"
import VideoUpload from "@/components/VideoUpload.vue"
import AssignTimestamps from "@/components/AssignTimestamps.vue"
import UserResultsPage from "@/components/UserResultsPage.vue"
import { createRouter, createWebHistory } from 'vue-router'


const routesArray = [
    {
        path: "/",
        name: "LessonSelection",
        component: LessonSelection
    },
    {
        path: "/VideoEditor:videoId",
        name: "VideoEditor",
        component: VideoEditor,
        props: true
    },
    {
        path: "/RegistrationPage",
        name: "RegistrationPage",
        component: RegistrationPage,
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
    },
    {
        path: "/AssignTimestamps",
        name: "AssignTimestamps",
        component: AssignTimestamps
    },
    {
        path: "/UserResultsPage",
        name: "UserResultsPage",
        component: UserResultsPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routesArray
})

export default router