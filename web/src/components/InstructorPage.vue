<template>
<div>
  <LoggedInNavBar />
  <div class="instructor-container">
    <div class="instructor-buttons">
      <router-link to= "/CreateClassroomPage">
        <button type="button" class="button-selection createClassLink"><span>Create a Classroom</span>
          <p class="create-description">Create a class and assign students to the class.</p>
        </button>
      </router-link>
      <router-link to="/UpdateClassPage">
        <button type="button" class="button-selection updateClassLink"><span>Update Class</span>
          <p class="create-description">Update the students and video lessons within a class.</p>
        </button>
      </router-link>
      <router-link to="/CustomizeLessonMainPage">
        <button type="button" class="button-selection customLessonLink"><span>Create Custom Lesson Packs</span>
          <p class="create-description">Create new timestamps and question activities in lesson videos.</p>
        </button>
      </router-link>
      <router-link to="/UpdateInstructorLessonsPage">
        <button type="button" class="button-selection updateLessonLink"><span>Update Your Lessons</span>
          <p class="create-description">Add timestamps and questions to your lesson packs.</p>
        </button>
      </router-link>
      <router-link to="/SelectStudentResults">
        <button type="button" class="button-selection buttonLinks"><span>Student Results</span>
          <p class="create-description">View the details of students lesson results within a class.</p>
        </button>
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

<style scoped>
.instructor-container {
  margin: auto;
  display: flex;
}

.instructor-buttons {
  display: flex;
  flex: 22%;
  margin: 60px;
  flex-wrap: wrap;
}

.instructor-buttons a {
  display: flex;
  font-weight: bold;
  color: #4AAE9B;
  text-decoration: none;
  margin-bottom: 30px;
}

/* .instructor-container {
  justify-content: center;
} */

.button-selection {
  display: flex;
  align-content: flex-start;
  flex: 25%;
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
  position: absolute;
  max-width: 250px;
  min-width: 250px;
    margin: 150px 0 0 16px;
  font-size: 19px;
  font-weight: normal;
  color: #0e333c;
}

.assign-description {
  opacity: 0;
  position: absolute;
  max-width: 250px;
  min-width: 250px;
  margin: 0 0 0 42px;
  font-size: 19px;
  font-weight: normal;
  color: #0e333c;
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