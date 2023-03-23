<template>
    <div>
      <LoggedInNavBar />
      <div class="admin-container">
        <br/>
        <h1>Select Admin Lesson to Customize</h1>
        <div class="admin-buttons">
            <div v-for="lesson in allLessons" :key="lesson._id">
                <button type="button" class="button-selection buttonLink" @click="confirmCustomization(lesson)"><span>{{lesson.name}}</span></button>
                <p class="upload-description">{{lesson.description}}<br/><br/>Content: {{ lesson.videoClipsArray.length }} videos</p>
            </div>
        </div>
      </div>
      <LessonCustomizationConfirmation v-if="isCustomizationConfirmed" :lesson="selectedLesson" @close="closeModal"/>
    </div>
    </template>
    
    <script>
    import LoggedInNavBar from './LoggedInNavBar.vue';
    import { useLessonStore } from '@/stores/LessonsStore';
    import LessonCustomizationConfirmation from '@/components/modals/LessonCustomizationConfirmation.vue';
    import { useVideoClipStore } from "@/stores/VideoClipStore";
    import { useUsersStore } from "@/stores/UserStore";
    import { useInstructorLessonStore } from "@/stores/InstructorLessonStore";
    import { useActivityStore } from '@/stores/ActivityStore';
    import { useFeedbackStore } from '@/stores/FeedbackStore';
    
        
    export default {
        name: "CustomizeLessonMainPage",
        components: { 
          LoggedInNavBar,
          LessonCustomizationConfirmation
        },
        data() {
            return {
                allLessons: [],
                isCustomizationConfirmed: false,
                uploadedInstructorVideos: [],
                selectedLesson: "",
                activityArray: []
            }
        },
        async mounted() {
            let lessonStore = useLessonStore()
            this.allLessons = await lessonStore.getAllLessons()
        },
        methods: {
            confirmCustomization(lesson) {
              this.isCustomizationConfirmed = true
              this.selectedLesson = lesson
            },
            async closeModal(isLessonConfirmed, lesson) {
              if (isLessonConfirmed == "true") {
                this.isCustomizationConfirmed = false
                let videoClipStore = useVideoClipStore()
                for (let i=0; i<lesson.videoClipsArray.length; i++) {
                  let currentVideosTimestamps = await videoClipStore.fetchVideoClipById(lesson.videoClipsArray[i]._id)
                  this.uploadedInstructorVideos.push(await videoClipStore.postInstructorsCustomizedVideo(lesson.videoClipsArray[i].videoName, lesson.videoClipsArray[i].videoURL, currentVideosTimestamps.timeStamps))
                  let videoId = lesson.videoClipsArray[i]._id
                  let activityStore = useActivityStore()
                  let videosActivities = await activityStore.fetchActivitiesByVideoclipId(videoId)
                  for (let j=0; j<currentVideosTimestamps.timeStamps.length; j++) {
                    for (let x=0; x<videosActivities.length; x++) {
                      if (currentVideosTimestamps.timeStamps[j] == videosActivities[x].timestamp) {
                        this.activityArray.push(await activityStore.postActivities(videosActivities[x].timestamp, videosActivities[x].questionType, videosActivities[x].questionText, videosActivities[x].answers, videosActivities[x].correctAnswer, this.uploadedInstructorVideos[i]._id))
                      }
                    }
                  } 

                  videosActivities.sort((a,b) => a.timestamp - b.timestamp)
                  let feedbackStore = useFeedbackStore()
                  for (let p=0; p<videosActivities.length;p++) {
                    let currentFeedback = await feedbackStore.fetchFeedbackByActivityId(videosActivities[p]._id)
                    await feedbackStore.postFeedback(this.uploadedInstructorVideos[i]._id, this.activityArray[p]._id, currentFeedback[0].timestamp, currentFeedback[0].correctFeedback, currentFeedback[0].incorrectFeedback)
                  }
                  this.activityArray = []
                }

                let instructorLessonStore = useInstructorLessonStore();
                var userStore = useUsersStore();
                let instructorUsername = this.$cookies.get("user_session").currentUserName
                let instructor =  await userStore.getUserByName(instructorUsername)
                this.instructorId = instructor._id
                let postedLesson = await instructorLessonStore.postInstructorLesson(lesson.name, this.instructorId, lesson.description, this.uploadedInstructorVideos)
                this.$router.push({
                  name: "AssignTimestamps",
                  params: {
                      selectedLesson: postedLesson._id
                  }
              })
              } else {
                this.isCustomizationConfirmed = false
              }
            },

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
      box-shadow: 5px 5px 10px #d3d3d3;
    }
    
    .button-selection span {
      margin: 20px auto;
      font-size: 25px;
      font-weight: bold;
    }
    
    .upload-description {
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
    
    .upload-description:hover {
      visibility: visible;
      opacity: 1;
    }
    
    .button-selection:hover + .upload-description {
      visibility: visible;
      opacity: 1;
    }
    
    .delete-description {
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
    
    .delete-description:hover {
      visibility: visible;
      opacity: 1;
    }
    
    .button-selection:hover + .delete-description {
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
    
    .admin-buttons {
      display: flex;
      margin-top: 60px;
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
    
    @media only screen and (min-width: 1200px) and (max-width: 1399px){
      .admin-buttons {
        margin-left: 100px;
      }
    }
    
    @media only screen and (max-width: 1199px){
      .admin-buttons {
        margin-left: 0;
      }
    }
    </style>