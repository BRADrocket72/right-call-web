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
import { useUsersStore } from '@/stores/UserStore'

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
        var store = useUsersStore();
        if (store.currentUserToken.length < 1) {
            this.$router.push({
                name: "LoginPage"
            })
        }
        this.results = await userResults.fetchByUserName(store.currentUserName);
        this.ready = true;
    }
}
</script>