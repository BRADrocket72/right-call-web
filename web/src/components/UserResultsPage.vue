<template>
<div>
    <LoggedInNavBarVue />
    <div v-if="ready" class="user-results">
        <div class="results-table">
            <table>
                <tr>
                    <th>Lesson Name</th>
                    <th>Score</th>
                </tr>
                <tr v-for="result in results" :key="result">
                    <td>{{result[0].lessonName}}</td>
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