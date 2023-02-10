<template>
<div>
  <LoggedInNavBar />
  <div class="admin-container">
    <br><br>
    <div class="admin-buttons">
      <router-link to= "/VideoUpload">
        <button type="button" class="button-selection buttonLink"><span>Upload Lesson Video</span></button>
        <p class="upload-description">Upload new Lesson videos to the database.</p>
      </router-link>
      <router-link to="/LessonDeletion">
        <button type="button" class="button-selection buttonDeleteLink"><span>Delete Lesson</span></button>
        <p class="delete-description">Delete lesson videos from the database. <br><b>Note:</b> This cannot be undone.</p>
      </router-link>
      <router-link to="/AssignTimestamps">
        <button type="button" class="button-selection buttonLink"><span>Create Video Timestamps and Questions</span></button>
        <p class="assign-description">Create new timestamps and question activities in lesson videos.</p>
      </router-link>
    </div>
  </div>
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

.button-selection {
  display: inline-flex;
  align-content: flex-start;
  flex: 1 0 0;
  height: 300px;
  width: 300px;
  margin: auto 20px auto;
  border: 4px solid #0e333c;
  color: #0e333c;
  background: #e9e9e9;
  border-radius: 10px;
}

.button-selection span {
  margin: 20px auto;
  font-size: 25px;
  font-weight: bold;
}

.upload-description {
  display: none;
  position: absolute;
  max-width: 250px;
  margin: -150px 0 0 42px;
  font-size: 19px;
  font-weight: normal;
  color: #0e333c;
}

.upload-description:hover {
  display: block;
}

.button-selection:hover + .upload-description {
  display: block;
}

.delete-description {
  display: none;
  position: absolute;
  max-width: 250px;
  margin: -150px 0 0 42px;
  font-size: 19px;
  font-weight: normal;
  color: #0e333c;
}

.delete-description:hover {
  display: block;
}

.button-selection:hover + .delete-description {
  display: block;
}

.assign-description {
  display: none;
  position: absolute;
  max-width: 250px;
  margin: -150px 0 0 42px;
  font-size: 19px;
  font-weight: normal;
  color: #0e333c;
}

.assign-description:hover {
  display: block;
}

.button-selection:hover + .assign-description {
  display: block;
}

.admin-buttons {
  display: flex;
  margin-top: 30px;
}

.admin-buttons a {
  font-weight: bold;
  color: #4AAE9B;
  text-decoration: none;
}

@media only screen and (min-width: 1400px) {
  .admin-buttons {
    margin-left: 175px;
  }
}

@media only screen and (max-width: 1399px){
  .admin-buttons {
    margin-left: 100px;
  }
}
</style>