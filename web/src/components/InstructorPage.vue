<template>
<div>
  <LoggedInNavBar />
  <br/><br/>
  <div>
    <h1>Instructor Page</h1>
    <br><br>
    <nav>
      <router-link to= "/CreateClassroomPage">
        <button type="button" class="buttonLink">
          <h2 class="short-h2">Create Classroom Page</h2>
        </button>
      </router-link>
      <router-link to="/AssignTimestamps">
        <button type="button" class="buttonLink">
          <h2 class="long-h2">Assign Timestamps and Questions to a Video</h2>
        </button>
      </router-link>
      <router-link to="/UpdateClassPage">
        <button type="button" class="buttonLink">
          <h2 class="short-h2">Update Class</h2>
        </button>
      </router-link>
    </nav>
  </div>
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

.buttonLink {
  display: inline-block;
  min-height: 250px;
  max-height: 250px;
  min-width: 285px;
  max-width: 285px;
  margin-right: 20px;
  border: 1px solid #0e333c;
  background: #2C3E50;
  color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 10px 10px #D1D1D1;
}

.buttonLink:hover {
  box-shadow: 0 15px 15px #D1D1D1;
  text-shadow: 0 3px 3px #000000;
}

.buttonLink h2 {
  position: relative;
  text-align: center;
  min-height: 150px;
  max-height: 150px;
}

.short-h2 {
  top: 40px;
}

</style>