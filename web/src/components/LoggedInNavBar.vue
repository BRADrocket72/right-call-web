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
                    <div v-if="isUserAdmin">
                        <router-link class="user-button" type="submit" to="/AdminPage">Admin</router-link>
                    </div>
                    <div v-if="isUserInstructor">
                        <router-link class="user-button-multiline-text" type="submit" to="/InstructorPage">Instructor Page</router-link>
                    </div>
                    <div v-if="isUserStudent"> 
                        <router-link class="user-button-multiline-text" type="submit" to="/UserResultsPage">View My Results</router-link>
                    </div>
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
import webgazer from 'webgazer';

export default {
  name: 'LoggedInNavBar',
  data() {
    return {
        isUserAdmin: false,
        isUserInstructor: false,
        isUserStudent: false
    }
  },
  mounted() {
    let userType = this.$cookies.get("user_session").currentUserType
    if (userType == "Admin") {
        this.isUserAdmin = true
    } else if(userType == "Instructor" ) {
        this.isUserInstructor = true
    } else {
        this.isUserStudent = true
    }
  },
  methods: {
    async logout() {
        if (webgazer.isReady()) {
            webgazer.showPredictionPoints(false)
            webgazer.end()
        }
        var store = useUsersStore();
        store.usersEyeTrackingCalibration == ""
        this.$cookies.remove("user_session")
        await this.$router.push({
          name: "LoginPage"
        })
        window.location.reload();
    }
  },
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

.nav-link {
    min-height: 90px;
}

a.nav-link {
    min-height: 45px;
    font-weight: bold;
    color: #0e333c;
    margin-right: 15px;
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
    text-decoration: none;
    font-weight: normal;
}

.button:hover {
    background: #0e333c;
    color: #FFFFFF;
    animation: fadeInFromNone 0.5s ease-out;
}

.user-button {
    width: 86px;
    height: 40px;
    border: 1px solid #0e333c;
    background: #FFFFFF;
    color: #000000;
    font-weight: normal;
    padding-top: 8px;
    margin-top: 2px;
    text-decoration: none;
}

.user-button:hover {
    background: #0e333c;
    color: #FFFFFF;
    animation: fadeInFromNone 0.5s ease-out;
}

.user-button-multiline-text {
    width: 86px;
    font-size: 13px;
    height: 40px;
    border: 1px solid #0e333c;
    background: #FFFFFF;
    color: #000000;
    font-weight: normal;
    text-decoration: none;
}

.user-button-multiline-text:hover {
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
