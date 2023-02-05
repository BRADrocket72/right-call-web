<template>
  <LoggedInNavBar />
  <br/><br/>
  <div>
    <h1>Admin Page</h1>
    <br><br>
    <nav>
      <router-link to= "/VideoUpload">
        <button type="button" class="buttonLink">
          Upload Lesson Video
        </button>
      </router-link>  |
      <router-link to="/LessonDeletion">
        <button type="button" class="buttonLink">
          Delete Lesson
        </button>
      </router-link>  |
      <router-link to="/AssignTimestamps">
        <button type="button" class="buttonLink">
          Assign Timestamps and Questions to a Video
        </button>
      </router-link>
    </nav>
  </div>
</template>

<script>
import LoggedInNavBar from './LoggedInNavBar.vue';

    
export default {
    name: "AdminPage",
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
    border: 1px solid #0e333c;
    background: #FFFFFF;
    color: #4AAE9B;

}

.buttonLink:hover {
    box-shadow: 0 15px 15px #D1D1D1;
}

</style>