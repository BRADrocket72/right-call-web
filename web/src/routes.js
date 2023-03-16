import LessonSelection from "@/components/LessonSelection.vue";
import VideoEditor from "@/components/VideoEditor.vue";
import LoginPage from "@/components/LoginPage.vue"
import RegistrationPage from "@/components/RegistrationPage.vue";
import InstructorPage from "@/components/InstructorPage.vue"
import AdminPage from "@/components/AdminPage.vue"
import VideoUpload from "@/components/VideoUpload.vue"
import AssignTimestamps from "@/components/AssignTimestamps.vue"
import UserResultsPage from "@/components/UserResultsPage.vue"
import LessonDeletion from "@/components/LessonDeletion.vue"
import CreateClassRoomPage from "@/components/CreateClassroomPage.vue"
import UpdateClassPage from "@/components/UpdateClassPage.vue"
import CreateLessonPage from "@/components/CreateLessonPage.vue"
import UpdateLessonsPage from "@/components/UpdateLessonsPage.vue"
import CustomizeLessonMainPage from "@/components/CustomizeLessonMainPage.vue"
import UpdateInstructorLessonsPage from "@/components/UpdateInstructorLessonsPage.vue"
import VideoSelectionPage from "@/components/VideoSelectionPage.vue"
import StudentResultsPage from "@/components/ViewStudentResultsPage.vue"
import { createRouter, createWebHistory } from 'vue-router'


const routesArray = [
    {
        path: "/LessonSelection",
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
        path: "/",
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
        path: "/InstructorPage",
        name: "InstructorPage",
        component: InstructorPage
    },
    {
        path: "/AssignTimestamps:lessonPack",
        name: "AssignTimestamps",
        component: AssignTimestamps,
        props: true
    },
    {
        path: "/UserResultsPage",
        name: "UserResultsPage",
        component: UserResultsPage
    },
    {
        path: "/ViewStudentResultsPage",
        name: "ViewStudentResultsPage",
        component: StudentResultsPage
    },
    {
        path: "/LessonDeletion",
        name: "LessonDeletion",
        component: LessonDeletion
    },
    {
        path: "/CreateClassroomPage",
        name: "CreateClassroomPage",
        component: CreateClassRoomPage
    },
    {
        path: "/UpdateClassPage",
        name: "UpdateClassPage",
        component: UpdateClassPage
    },
    {
        path: "/CreateLessonPage",
        name: "CreateLessonPage",
        component: CreateLessonPage
    },
    {
        path: "/UpdateLessonsPage",
        name: "UpdateLessonsPage",
        component: UpdateLessonsPage
    },
    {
        path: "/CustomizeLessonMainPage",
        name: "CustomizeLessonMainPage",
        component: CustomizeLessonMainPage
    },
    {
        path: "/UpdateInstructorLessonsPage",
        name: "UpdateInstructorLessonsPage",
        component: UpdateInstructorLessonsPage
    },
    {
        path: "/VideoSelectionPage:lessonId",
        name: "VideoSelectionPage",
        component: VideoSelectionPage,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routesArray
})

export default router