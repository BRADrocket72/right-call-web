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
              <h4>What videos do you want to add/remove?</h4>
              <br/><br/><br/>
              <div class="video-list" >
                <p class="bold-header">Remove Videos: </p>
                <div class="flex-container">
                  <div class="student-card" v-for="video in currentlyAddedVideos" :key="video.id">
                      <a @click="deleteVideo(video)">
                          <h1>{{video.videoName}}</h1>
                      </a>   
                  </div>
                </div>
              </div>
              <div class="video-list" >
                <p class="bold-header">Available Videos to Add: </p>
                <div class="flex-container">
                  <div class="student-card" v-for="video in videosNotAdded" :key="video.id">
                      <a @click="addVideo(video)">
                          <h1>{{video.videoName}}</h1>
                      </a>   
                  </div>
                </div>
              </div>

              <button type="button" class="btn-green" @click="close()">Exit</button>
              <br/>
            </slot>
          </section>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
// import { useActivityStore } from '@/stores/ActivityStore';
import { useVideoClipStore } from '@/stores/VideoClipStore';
import {useInstructorClassStore} from '@/stores/InstructorClassStore'
// import {retrieveOnlyStudents} from '@/util/RetrieveOnlyStudents'
import InstructorClassDto from '@/models/InstructorClassDto'
  
  export default {
    name: 'AddStudentsModal',
    data() {
      return {
        lessons: [],
        videoIds: [],
        alreadyAdded: false,
        currentlyAddedVideos: []
      }
    },
    props: {
        selectedClass: InstructorClassDto
    },
    async mounted() {
        var videoClipLessons = useVideoClipStore();
        this.lessons = await videoClipLessons.fetchVideoClips();
        this.videoIds = this.selectedClass.videoclipIds
        for (let j=0; j<this.lessons.length; j++) {
          for (let i=0; i<this.videoIds.length; i++) {
            if (this.lessons[j]._id == this.videoIds[i]) {
              this.currentlyAddedVideos.push(this.lessons[j])
            }
          }
        }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async addVideo(video) {
        var classes = useInstructorClassStore();
        for (let i=0; i<this.videoIds.length; i++) {
          if (this.videoIds[i] == video._id){
            this.alreadyAdded = true
          }
        }
        if (!this.alreadyAdded) {
          this.videoIds.push(video._id)
        }
        await classes.addVideoClipToClass(this.selectedClass._id, this.videoIds)
        this.close()
      },
      async deleteVideo(video) {
        var classes = useInstructorClassStore();
        let updatedVideoIds = []
        for (let i=0; i<this.videoIds.length; i++) {
          if (this.videoIds[i] != video._id){
            updatedVideoIds.push(this.videoIds[i])
          }
        }
        await classes.deleteVideoClipFromClass(this.selectedClass._id, updatedVideoIds)
        this.close()
      }
    },
    computed: {
      videosNotAdded() {
        var currentAddedVideoIds = []
        for (let i=0; i<this.currentlyAddedVideos.length; i++) {
          currentAddedVideoIds.push(this.currentlyAddedVideos[i]._id)
        }
        return this.lessons.filter(x => !currentAddedVideoIds.includes(x._id))
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
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
  }

.video-list a {
    cursor: pointer;
    max-width: 300px;
}

.bold-header {
  font-weight: bold;
}
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.student-card {
  border: 1px solid #4AAE9B;
  border-radius: 5px;
  margin: 10px;
  background-color:lightblue;
}

.student-card:hover {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
  </style>