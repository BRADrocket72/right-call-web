<template>
  <LoggedInNavBar />
  <br/><br/>
  <div>
    <h1>Instructor Page</h1>
    <br><br>
    <nav>
      <router-link to= "/CreateClassroomPage">
        <button type="button" class="buttonLinks">
          Create Classroom Page
        </button>
      </router-link>  |
      <router-link to="/AssignTimestamps">
        <button type="button" class="buttonLinks">
          Assign Timestamps and Questions to a Video
        </button>
      </router-link>  |
      <router-link to="/UpdateClassPage">
        <button type="button" class="buttonLinks">
          Update Class
        </button>
      </router-link>
    </nav>
  </div>
</template>

<script>
import LoggedInNavBar from './LoggedInNavBar.vue';

    
export default {
    name: "InstructorPage",
    components: { LoggedInNavBar },
    mounted() {
    }
}
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #4AAE9B;
}

.buttonLinks {
    border: 1px solid #0e333c;
    background: #FFFFFF;
    color:  #4AAE9B;

}

.buttonLinks:hover {
    box-shadow: 0 15px 15px #D1D1D1;
}

</style>