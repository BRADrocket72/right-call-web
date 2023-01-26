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
                    <td>{{result.lessonName}}</td>
                    <td>{{result.score}}</td>
                </tr>
            </table>
        </div>
    </div>
</div>
</template>

<script>
import LoggedInNavBarVue from "./LoggedInNavBar.vue";
import { useUserResultsStore } from "@/stores/UserResultsStore"
// import { useUsersStore } from '@/stores/UserStore'

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
        var userResults = useUserResultsStore()
        // var store = useUsersStore();
        // if (store.currentUserToken.length < 1) {
        //     this.$router.push({
        //         name: "LoginPage"
        //     })
        // }
        this.results = await userResults.fetchByUserName(this.$cookies.get("user_session").currentUserName);
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

table {
    padding: 20px;
}

th {
    font-size: 40px;
    padding: 0 25px 0 25px;
}

td {
    text-align: left;
    font-size: 20px;
    padding: 0 25px 0 25px;
}
</style>