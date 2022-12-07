<template>
    <header>
        <nav class="navbar navbar-expand-sm navbar-light">
            <router-link class="navbar-brand" to="/"><img src="../../images/refreps_logo_web.webp"></router-link>
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
                </ul>
            </div>
            <div class="d-inline">
                <router-link class="register-button" type="submit" to="/RegistrationPage">Register</router-link>
            </div>
        </nav>
    </header>

</template>

<script>
import { useUsersStore } from '@/stores/UserStore';

export default {
  name: 'NavBar',
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

.register-button {
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

.register-button:hover {
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
