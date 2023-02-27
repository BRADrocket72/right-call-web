<template>
<div>
  <LoggedInNavBar />
  <div class="instructor-container">
    <div class="instructor-buttons">
      <router-link to= "/CreateClassroomPage">
        <button type="button" class="button-selection buttonLinks"><span>Create a Classroom</span></button>
        <p class="create-description">Create a class and assign students to the class.</p>
      </router-link>
      <router-link to="/UpdateClassPage">
        <button type="button" class="button-selection buttonLinks"><span>Update Class</span></button>
        <p class="create-description">Update the students and video lessons within a class.</p>
      </router-link>
      <router-link to="/CustomizeLessonMainPage">
        <button type="button" class="button-selection buttonLinksSecond"><span>Create Custom Lesson Packs</span></button>
        <p class="assign-description">Create new timestamps and question activities in lesson videos.</p>
      </router-link>
      <router-link to="/UpdateInstructorLessonsPage">
        <button type="button" class="button-selection buttonLinks"><span>Update Your Lessons</span></button>
        <p class="create-description">Add timestamps and questions to your lesson packs.</p>
      </router-link>
    </div>
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
.instructor-buttons {
  display: flex;
  margin-top: 60px;
  justify-content:center
}

.instructor-buttons a {
  font-weight: bold;
  color: #4AAE9B;
  text-decoration: none;
}

/* .instructor-container {
  justify-content: center;
} */

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
  box-shadow: 5px 5px 10px #d3d3d3;
}

.button-selection span {
  margin: 20px auto;
  font-size: 25px;
  font-weight: bold;
}

.create-description {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  max-width: 250px;
  margin: -150px 0 0 42px;
  font-size: 19px;
  font-weight: normal;
  color: #0e333c;
  transition: visibility 0s, opacity 0.3s linear;
}

.create-description:hover {
  visibility: visible;
  opacity: 1;
}

.button-selection:hover + .create-description {
  visibility: visible;
  opacity: 1;
}

.assign-description {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  max-width: 250px;
  margin: -150px 0 0 42px;
  font-size: 19px;
  font-weight: normal;
  color: #0e333c;
  transition: visibility 0s, opacity 0.3s linear;
}

.assign-description:hover {
  visibility: visible;
  opacity: 1;
}

.button-selection:hover + .assign-description {
  visibility: visible;
  opacity: 1;
}


@media only screen and (min-width: 1400px) {
  .instructor-buttons {
    margin-left: 175px;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1399px){
  .instructor-buttons {
    margin-left: 100px;
  }
}

@media only screen and (max-width: 1199px){
  .instructor-buttons {
    margin-left: 0;
  }
}
</style>