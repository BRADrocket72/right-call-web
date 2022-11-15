<template>
    <h1>Admin Page</h1>
    <br><br>
    <h4>Two Options:</h4>
    <nav>
        <router-link to="/VideoUpload">Upload Lesson Video</router-link> |
        <router-link to="/AddQuestions">Add Question/s to Video</router-link>
    </nav>
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