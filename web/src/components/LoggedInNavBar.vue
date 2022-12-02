<template>
    <header>
        <nav class="navbar navbar-expand-sm navbar-light">
            <router-link class="navbar-brand" to="/LessonSelection"><img src="../../images/refreps_logo_web.webp"></router-link>
            <div class="container-fluid">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Explore</a>
                    </li>
                    <li class="nav-item active">
                        <a href="#" class="nav-link">The Team</a>
                    </li>
                    <li class="nav-item">
                       <a href="#" class="nav-link">Contact Us</a>
                    </li>
                    <router-link class="button" type="submit" to="/AdminPage">Admin Page</router-link>
                    <router-link class="button" type="submit" to="/UserResultsPage">View My Results</router-link>
                </ul>
            </div>
            <div class="d-inline">
                <button class="button" type="submit" @click="logout">Logout</button>
            </div>
        </nav>
    </header>

</template>

<script>
import { useUsersStore } from '@/stores/UserStore';

export default {
  name: 'LoggedInNavBar',
  methods: {
    logout() {
        var store = useUsersStore();
        store.currentUserToken = ""
        store.currentUserType = ""
        this.$router.push({
          name: "LoginPage"
        })
    }
  },
  components: {
  }
}
</script>

<style>
.content-container {
  margin: 0 auto;
}

nav.navbar {
    width: 100%;
    height: 96px;
    border-bottom: 1px solid #d3d3d3;
    box-shadow: 5px 6px 8px #d1d1d1;
    padding-left: 20%;
}

a.nav-link {
    font-weight: bold;
    color: #0e333c;
}

.container {
    margin: auto;
}

.d-inline {
    padding-right: 20%;
}

.button {
    width: 86px;
    height: 40px;
    border: 1px solid #0e333c;
    background: #FFFFFF;
}

.button:hover {
    background: #0e333c;
    color: #FFFFFF;
    animation: fadeInFromNone 0.5s ease-out;
}

@keyframes fadeInFromNone {
    0% {
        opacity: 0;
    }
    1% {
        opacity: 0;
    }
    45% {
        opacity: 1;
    }
    100% {
        opacity: 1;
    }
}

.video-container {
  padding-top: 20px;
}
</style>
