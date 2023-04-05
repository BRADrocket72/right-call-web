<template>
<div>
    <LoggedInNavBarVue />
    <div v-if="ready" class="user-results">
        <div class="results-table">
            <table>
                <tr>
                    <th>Lesson</th>
                    <th>Quiz Name</th>
                    <th>Score</th>
                </tr>
                <tr v-for="result in results" :key="result">
                    <td>{{ result[0].lessonName }}</td>
                    <td>{{result[0].quizName}}</td>
                    <td>{{result[0].score}}% (Attempts: {{result.length}})</td>
                </tr>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import LoggedInNavBarVue from "./LoggedInNavBar.vue";
import { useUserResultsStore } from "@/stores/UserResultsStore"
import { useInstructorLessonStore } from "@/stores/InstructorLessonStore"

import webgazer from 'webgazer';

export default {
    name: 'UserResultsPage',
    components: { 
        LoggedInNavBarVue
    },
    data() {
        return {
            results: [],
            ready: false
        }
    },
    methods: {

    },
    async mounted() {
        webgazer.showPredictionPoints(false)
        webgazer.pause()
        var userResults = useUserResultsStore()
        this.results = await userResults.getHighestResults(this.$cookies.get("user_session").currentUserName)
        const quizIds = []
        for (let i=0; i<this.results.length; i++) {
            quizIds.push(this.results[i][0].quizId)
        }
        const instructorLessons = useInstructorLessonStore()
        const lessons = await instructorLessons.getAllInstructorLessons()
        for (let x=0; x<this.results.length; x++) {
            for (let i =0; i< lessons.length; i++) {
                for (let j=0; j<lessons[i].videoClipsArray.length; j++) {
                    if (lessons[i].videoClipsArray[j]._id == this.results[x][0].quizId) {
                        this.results[x][0].lessonName = lessons[i].name
                    }
                }
            }
        }
        this.ready = true;
    }
}
</script>

<style scoped>
.user-results {
    display: flex;
    width: 100%;
}

.results-table {
    display: flex;
    width: 100%;
    margin-top: 30px;
}

.results-table table {
    margin: 0 auto;
    padding: 10px;
}

.results-table {
    padding: 20px;
}

.results-table th {
    font-size: 40px;
    padding: 0 25px 0 25px;
}

.results-table td {
    text-align: left;
    font-size: 20px;
    padding: 0 25px 0 25px;
}
</style>