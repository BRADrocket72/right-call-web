<template>
<div>
    <LoggedInNavBarVue />
    <div v-if="ready" class="user-results">

    </div>
</div>
</template>

<script>
import LoggedInNavBarVue from "./LoggedInNavBar.vue";

export default {
    name: 'UserResultsPage',
    components: { 
        LoggedInNavBarVue
    },
    data() {
        return {
            results: []
        }
    },
    methods: {

    },
    async mounted() {
        var videoClip = useVideoClipStore();
        var store = useUsersStore();
        if (store.currentUserToken.length < 1) {
            this.$router.push({
                name: "LoginPage"
            })
        }
        this.videoClips =  await videoClip.fetchVideoClips();
        this.ready = true;
    }
}
</script>