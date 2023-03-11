<template>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal-content" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              Update Lessons your Students Can Take
            </slot>
          </header>
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <h4>What lessons do you want to add/remove?</h4>
              <br/><br/><br/>
              <div class="video-list" >
                <div class="flex-container-1">
                  <p class="bold-header">Remove Lessons: </p>
                  <div class="student-card" v-for="video in currentlyAddedLessons" :key="video.id">
                      <a class="removeVideo" @click="deleteLesson(video)">
                          <h1>{{video.name}}</h1>
                      </a>   
                  </div>
                </div>
              </div>
              <div class="video-list" >
                <div class="flex-container-2">
                  <p class="bold-header">Available Lessons to Add: </p>
                  <div class="student-card" v-for="video in lessonsNotAdded" :key="video.id">
                      <a class="addVideo" @click="addLesson(video)">
                          <h1>{{video.name}}</h1>
                      </a>   
                  </div>
                </div>
              </div>
              <br/><br/><br/>
              <button type="button" class="btn-green" @click="close()">Exit</button>
              <br/>
            </slot>
          </section>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
import {useInstructorClassStore} from '@/stores/InstructorClassStore'
import {useInstructorLessonStore} from '@/stores/InstructorLessonStore'
import {useUsersStore} from '@/stores/UserStore'

  
  export default {
    name: 'AddStudentsModal',
    data() {
      return {
        lessons: [],
        lessonIds: [],
        alreadyAdded: false,
        currentlyAddedLessons: [],
        instructorId: ""
      }
    },
    props: {
        selectedClass: Object
    },
    async mounted() {
        var userStore = useUsersStore();
        let instructorUsername = this.$cookies.get("user_session").currentUserName
        let instructor =  await userStore.getUserByName(instructorUsername)
        this.instructorId = instructor._id
        var instructorLessonStore = useInstructorLessonStore()
        this.lessons = await instructorLessonStore.getLessonsByInstructorId(this.instructorId);
        this.lessonIds = this.selectedClass.lessonIds
        for (let j=0; j<this.lessons.length; j++) {
          for (let i=0; i<this.lessonIds.length; i++) {
            if (this.lessons[j]._id == this.lessonIds[i]) {
              this.currentlyAddedLessons.push(this.lessons[j])
            }
          }
        }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async addLesson(lesson) {
        var classes = useInstructorClassStore();
        for (let i=0; i<this.lessonIds.length; i++) {
          if (this.lessonIds[i] == lesson._id){
            this.alreadyAdded = true
          }
        }
        if (!this.alreadyAdded) {
          this.lessonIds.push(lesson._id)
        }
        await classes.addVideoClipToClass(this.selectedClass._id, this.lessonIds)
        this.close()
      },
      async deleteLesson(lesson) {
        var classes = useInstructorClassStore();
        let updatedVideoIds = []
        for (let i=0; i<this.lessonIds.length; i++) {
          if (this.lessonIds[i] != lesson._id){
            updatedVideoIds.push(this.lessonIds[i])
          }
        }
        await classes.deleteVideoClipFromClass(this.selectedClass._id, updatedVideoIds)
        this.close()
      }
    },
    computed: {
      lessonsNotAdded() {
        var currentAddedLessonIds = []
        for (let i=0; i<this.currentlyAddedLessons.length; i++) {
          currentAddedLessonIds.push(this.currentlyAddedLessons[i]._id)
        }
        return this.lessons.filter(x => !currentAddedLessonIds.includes(x._id))
      }
    }
  };
  </script>
  
  <style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: white;
    width: 900px;
    height: 300px;
    border-radius: 2px;
    position: fixed;
    left: auto;
    top: auto;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
  
  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    background-color: #4AAE9B;
    justify-content: space-between;
    border-radius: 2px 2px 0px 0px;
  
  }
  
  .modal-body {
    position: relative;
    background: white;
    padding: 20px 10px;
  }
  
  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
  
  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
  }
  
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }
  
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
  .video-list {
    display:inline-grid;
  gap: 75px;
    
  }

.video-list a {
    cursor: pointer;
    max-width: 300px;
}

.bold-header {
  font-weight: bold;
}
.flex-container-1 {
  grid-row-start: 1;
  grid-column-start: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 3px solid #4AAE9B;
  height: 450px;
  width: 250px;
  overflow: auto;
  margin-right:  50px;
  border-radius: 6px;
}

.flex-container-2 {
  grid-row-start: 1;
  grid-column-start: 3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 3px solid #4AAE9B;
  height: 450px;
  width: 250px;
  overflow: auto;
  margin-right:  50px;
  border-radius: 6px;
}

.student-card {
  border: 1px solid #4AAE9B;
  border-radius: 5px;
  margin: 10px;
  background-color:lightblue;
  height:fit-content;
}

.student-card h1{
  font-size:larger;
}

.student-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.flex-container-1 div {
  background-color:#4AAE9B;
}

.flex-container-2 div {
  background-color:#4AAE9B;
}
  </style>