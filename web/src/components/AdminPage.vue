<template>
  <div>
    <h1>Admin Page</h1>
    <br><br>
    <nav>
        <router-link to="/VideoUpload">Upload Lesson Video</router-link> |
        <router-link to="/AddQuestions">Add Question/s to Video</router-link> |
        <router-link to="/AssignTimestamps">Assign Timestamps to a Video</router-link>
    </nav>
  </div>
</template>

<script>

    
export default {
  name: 'AdminPage',
  mounted() {
    // const videoUrl = document.getElementById("urlUpload")
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

</style>