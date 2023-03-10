<template>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              Lesson Deletion
            </slot>
          </header>
  
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <p>Are you sure you wish to delete this lesson?</p>

              <div v-if="deletionType == 'video'">
                <button type="button" class="btn-green" @click="deleteVideo(selectedVideo)">Yes</button>
              </div>
              <div v-else>
                <button type="button" class="btn-green" @click="deleteLesson(selectedLesson)">Yes</button>
              </div>
              <button type="button" class="btn-green" @click="close()">No, select a different lesson to delete</button>
              <br/>
            </slot>
          </section>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
import { useActivityStore } from '@/stores/ActivityStore';
import { useVideoClipStore } from '@/stores/VideoClipStore';
import { useLessonStore } from '@/stores/LessonsStore';

  
  export default {
    name: 'ResultsPage',
    data() {
      return {
        videosQuestions: [],
        videoClips: []
      }
    },
    props: {
      selectedLesson: Object,
      selectedVideo: Object,
      deletionType: String
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async deleteVideo(video) {
        let lessonStore = useLessonStore()
        let updatedVideoClipsArray = []
        for (let i=0;i<this.selectedLesson.videoClipsArray.length;i++) {
          if(this.selectedLesson.videoClipsArray[i]._id != video._id) {
            updatedVideoClipsArray.push(this.selectedLesson.videoClipsArray[i])
          }
        }
        await lessonStore.updateVideoClipsArray(this.selectedLesson._id, updatedVideoClipsArray)

        let videoId = video._id
        const activityStore = useActivityStore()
        let videosQuestions = await activityStore.fetchActivitiesByVideoclipId(videoId)
        if (videosQuestions.length > 0) {
          for (var question of videosQuestions) {
            await activityStore.deleteActivities(question._id)
          }
        }
        const videoClipStore = useVideoClipStore()
        await videoClipStore.deleteVideoClip(videoId)
        this.$router.push({
          name: "AdminPage"
        })
      },
      async deleteLesson(lesson){
        var videoClip = useVideoClipStore();
        var lessonStore = useLessonStore()
        for (let i=0;i<lesson.videoClipsArray.length;i++) {
            this.videoClips.push(await videoClip.fetchVideoClipById(lesson.videoClipsArray[i]._id))
        }
        for (var video in this.videoClips) {
          this.deleteVideo(this.videoClips[video])
        }        
        await lessonStore.deleteLesson(lesson._id)
        this.$router.push({
          name: "AdminPage"
        })
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
    width: 600px;
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
  
  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
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
  </style>