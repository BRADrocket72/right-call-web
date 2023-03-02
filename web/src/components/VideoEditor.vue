<template>
  <div>
    <LoggedInNavBar />
    <br/><br/>
    <div class="video-player">
      <h1>{{videoName}}</h1>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div class="video">
        <video :id="videoId" :src="currentVideoClip.videoURL"></video>
        <div v-if="containsEyeTrackingActivity && isEyeTrackingVisible && !webcamPermission" class="quadrants-container">
          <NoWebcamPopUp :answersArray="answers" :question="currentVideoQuestions[questionIndex]" @close="toggleEyeTracking" />
        </div>
        <div v-if="currentQuestion && currentQuestion.questionType == 'eye-tracking' && webcamPermission" class="question">
            <h2>{{currentQuestion.questionText}}</h2>
            <p>Use your eyes to answer this question.</p>
        </div>
        <div v-if="containsEyeTrackingActivity && isEyeTrackingVisible && webcamPermission && predictionReady" class="overlay-video-container">
          <EyeTrackingPopUp :answersArray="answers" :question="currentVideoQuestions[questionIndex]" :xPrediction="xPrediction" 
          :yPrediction="yPrediction" @close="toggleEyeTracking" />
        </div>
        <div v-if="currentQuestion && currentQuestion.questionType == 'drag-and-drop' && dragAndDropReady" class="drag-and-drop-container">
          <DragAndDropPopUp :answersArray="answers" :question="currentVideoQuestions[questionIndex]" @close="toggleDragAndDrop"/>
        </div>
      </div>
      <div id="videoControls">
        <button id="playOrPause" @click="playOrPauseVideo">Play</button>
        <span id="videoCurrentTime">00:00</span> / <span id="videoDuration">00:00</span>
      </div>
      <results-page v-if="isResultsPageModalVisible" :answersArray="answers" @close="closeResultsPage">
      </results-page>
      <activity-pop-up v-if="questionsLoaded && isModalVisible" :answersArray="answers"
        :question="currentVideoQuestions[questionIndex]" :questionNumber="questionIndex + 1" @close="closeModal" />
      <webgazer-calibration-page v-if="calibrationReady && webcamPermission" @close="closeCalibrationPage"/>
      <WebcamPermissionModal v-if="permissionModalVisible" @close="togglePermissionModal"/>
    </div>
  </div>
</template>
  
  
  <script>
  import ActivityPopUp from '@/components/modals/ActivityPopUp.vue';
  import NoWebcamPopUp from '@/components/modals/NoWebcamPopUp.vue'
  import EyeTrackingPopUp from '@/components/modals/EyeTrackingPopUp.vue'
  import DragAndDropPopUp from '@/components/modals/DragAndDropPopUp.vue'
  import WebcamPermissionModal from '@/components/modals/WebcamPermissionModal.vue'
  import ResultsPage from "@/components/modals/ResultsPage.vue"
  import VideoClip from '@/models/VideoClipDto';
  import WebgazerCalibrationPage from './modals/WebgazerCalibrationPage.vue';
  import { formatTimeForVideo } from "@/util/FormatVideosTime.js"
  import { useVideoClipStore } from "@/stores/VideoClipStore";
  import { useActivityStore } from '@/stores/ActivityStore';
  import { useUserResultsStore } from "@/stores/UserResultsStore"
  import LoggedInNavBar from './LoggedInNavBar.vue';
  import webgazer from 'webgazer';
  
  export default {
    name: 'VideoEditor',
    components: {
      ActivityPopUp,
      ResultsPage,
      LoggedInNavBar,
      NoWebcamPopUp,
      EyeTrackingPopUp,
      WebgazerCalibrationPage,
      WebcamPermissionModal,
      DragAndDropPopUp
    },
    props: {
      videoId: {
        type: String
      },
    },
    data() {
      return {
        isModalVisible: false,
        isResultsPageModalVisible: false,
        currentVideoQuestions: [],
        questionIndex: 0,
        questionCounter: 0,
        questionsLoaded: false,
        answers: [],
        currentVideoClip: VideoClip,
        percentageCorrect: "",
        videoName: "",
        containsEyeTrackingActivity: false,
        webcamPermission: false,
        isEyeTrackingVisible: false,
        isPlayButtonDisabled: false,
        calibrationReady: false,
        xPrediction: 0,
        yPrediction: 0,
        predictionReady: false,
        currentQuestion: Object,
        permissionModalVisible: true,
        dragAndDropReady: false
      };
    },
    async mounted() {
      this.videoAndQuestionDataSetup()
      const videoElement = document.getElementById(this.videoId)
      if (videoElement) {
        videoElement.addEventListener('timeupdate', () => {
          const videoCurrentTime = document.getElementById("videoCurrentTime")
          const videoDuration = document.getElementById("videoDuration")
          videoCurrentTime.innerHTML = formatTimeForVideo(videoElement.currentTime);
          videoDuration.innerHTML = formatTimeForVideo(videoElement.duration)
          this.stopVideoAtTimestamp(videoElement, this.currentVideoClip.timeStamps)
          if (videoElement.duration == videoElement.currentTime) {
            if (videoElement.duration != this.currentVideoClip.timeStamps[this.currentVideoClip.timeStamps.length-1]){
              this.isResultsPageModalVisible = true;
              webgazer.pause()
              videoElement.pause()
            }
          }
        })
      }
    },
    methods: {
      togglePermissionModal(permission) {
        if(permission) {
            this.webcamPermission = true
            this.webgazerSetup()
        }
        this.permissionModalVisible = false
      },
      webgazerSetup() {
        let cookiesCalibration = this.$cookies.get("user_session").currentEyeTrackingCalibration
        if (cookiesCalibration == "false" || !webgazer.isReady()) {
          this.calibrationReady = true
          this.replaceCookie()
          webgazer.showVideo(false)
          webgazer.showFaceOverlay(false)
          webgazer.showFaceFeedbackBox(false)
          webgazer.showPredictionPoints(true)
          webgazer.begin()
        }
        else {
          webgazer.showPredictionPoints(true)
          webgazer.resume()
        }
      },
      async videoAndQuestionDataSetup() {
        var videoClipStore = useVideoClipStore()
        var activityStore = useActivityStore()
        this.currentVideoClip = await videoClipStore.fetchVideoClipById(this.videoId);
        this.videoName = this.currentVideoClip.videoName
        this.currentVideoQuestions = await activityStore.fetchActivitiesByVideoclipId(this.videoId)
        this.currentVideoQuestions.sort((a,b) => a.timestamp - b.timestamp)
        this.questionsLoaded = true
        this.checkForEyeTrackingActivity()
      },
      stopVideoAtTimestamp(video, timestamps) {
        var currentTime = video.currentTime;
        if (currentTime >= timestamps[this.questionCounter]) {
          if(this.currentVideoQuestions[this.questionCounter].questionType === 'eye-tracking') {
            this.toggleEyeTracking()
          } else if(this.currentVideoQuestions[this.questionCounter].questionType === 'drag-and-drop') {
            this.toggleDragAndDrop()
          } else {
            this.showModal()
          }
            this.currentQuestion = this.currentVideoQuestions[this.questionCounter]
            this.questionCounter++
            this.playOrPauseVideo()
        }
      },
      playOrPauseVideo() {
        const videoElement = document.getElementById(this.videoId);
        const playOrPauseButton = document.getElementById("playOrPause")
        if (videoElement.paused) {
          playOrPauseButton.innerHTML = "Pause"
          videoElement.play()
          if(this.webcamPermission) {
            webgazer.resume() 
          }
        }
        else {
          playOrPauseButton.innerHTML = "Play"
          videoElement.pause()
          if(this.webcamPermission) {
            webgazer.pause()  
          }
        }
      },
      showModal() {
        this.isModalVisible = true;
        const playOrPauseButton = document.getElementById("playOrPause")
        playOrPauseButton.innerHTML = "Play"
      },
      closeModal(updatedAnswers) {
        this.isModalVisible = false;
        this.answers = updatedAnswers
        const videoElement = document.getElementById(this.videoId)
        if (videoElement.duration == videoElement.currentTime) {
            this.isResultsPageModalVisible = true;
            videoElement.pause()
        } else{
            const playOrPauseButton = document.getElementById("playOrPause")
            playOrPauseButton.innerHTML = "Pause"
            videoElement.play();
        }
        this.questionIndex++
        if(this.webcamPermission) {
          webgazer.resume()    
        }
      },
      async toggleEyeTracking(updatedAnswers) {
        this.togglePlayButton()
        this.isEyeTrackingVisible = !this.isEyeTrackingVisible
        if(this.isEyeTrackingVisible) {
          if(this.webcamPermission) {
            await this.getCoordinatePrediction()
            this.predictionReady = true
          }
        } else {
          this.answers = updatedAnswers
          this.questionIndex++
          this.playOrPauseVideo()
          this.predictionReady = false
        }
      },
      toggleDragAndDrop(updatedAnswers) {
        this.dragAndDropReady = !this.dragAndDropReady
        if(this.dragAndDropReady) {
          this.togglePlayButton()
          
        } else {
          this.answers = updatedAnswers
          this.questionIndex++
          this.playOrPauseVideo()
        }
      },
      togglePlayButton() {
        this.isPlayButtonDisabled = !this.isPlayButtonDisabled
        const button = document.getElementById('playOrPause')
        if(this.isPlayButtonDisabled) {
          button.disabled = true
        } else {
          button.disabled = false
        }
        
      },
      async closeResultsPage(percentageCorrect) {
        var userResults = useUserResultsStore()
        await userResults.postUserResults(this.$cookies.get("user_session").currentUserName,percentageCorrect,this.videoId,this.videoName)
        this.$router.push({
          name: "LessonSelection"
        })
        if(this.webcamPermission) {
          webgazer.showPredictionPoints(false)    
        }
      },
      checkForEyeTrackingActivity() {
        for(const activity of this.currentVideoQuestions) {
          if(activity.questionType == 'eye-tracking') {
            this.containsEyeTrackingActivity = true
          }
        }
      },
      closeCalibrationPage() {
        this.calibrationReady = false
      },
      replaceCookie() {
        var currentCookie = this.$cookies.get("user_session")
        var userName = currentCookie.currentUserName
        var userType = currentCookie.currentUserType
        var accessToken = currentCookie.currentUserToken
        this.$cookies.remove("user_session")
        var user = { currentUserName: userName, currentUserType: userType, currentUserToken: accessToken, currentEyeTrackingCalibration: "true"}
        this.$cookies.set("user_session",user, "3d")
      },
      async getCoordinatePrediction() {
        let prediction = await webgazer.getCurrentPrediction()
        if (prediction) {
          this.xPrediction = prediction.x
          this.yPrediction = prediction.y
        } else {
          this.xPrediction = 0
          this.yPrediction = 0
        }
      }
    }
  }
  
  </script>
  
  <style scoped>
  
  .video {
    display: flex;
    width: 100%;
    height: 100%;
  }
  
  .video video {
    max-width: 972px;
    min-width: 972px;
    max-height: 550px;
    min-height: 550px;
    margin: 0 auto;
  }
  
  #videoControls {
    max-width: 972px;
    min-width: 972px;
    margin: 0 auto;
    background-color: #4AAE9B;
  }
  
  .quadrants-container {
    position: absolute;
    max-width: 972px;
    min-width: 972px;
    max-height: 550px;
    min-height: 550px;
    margin: 0 auto;
  }
  
  .overlay-video-container {
    position: absolute;
    border: 1px solid black;
    margin-left: 161px;
    min-width: 972px;
    max-width: 972px;
    max-height: 550px;
    min-height: 550px;
  }
  
  .question {
    position: absolute;
    text-align: center;
    min-width: 972px;
    max-width: 972px;
    min-height: 60px;
    background: #928787;
    margin: -95px auto auto 162px;
  }
  
  .question h2 {
    padding-top: 10px;
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
  }
  
  .question p {
      color: #000000;
  }

  .drag-and-drop-container {
    position: absolute;
    margin: 0;
    padding: 0;
    min-width: 1150px;
    max-width: 1150px;
    min-height: 550px;
    max-height: 550px;
  }
  
  @media only screen and (min-width: 1600px){
    .quadrants-container {
      margin-left: 162px;
    }
    .drag-and-drop-container {
      margin-left: 162px;
    }
  }
  
  @media only screen and (min-width: 1400px) and (max-width: 1599px){
    .quadrants-container {
      margin-left: 162px;
    }
    .drag-and-drop-container {
      margin-left: 162px;
    }
    .question {
      margin: -95px auto auto 162px;
    }
  }
  
  @media only screen and (min-width: 1200px) and (max-width: 1399px){
    .quadrants-container {
      margin-left: 72px;
    }
    .overlay-video-container {
      margin-left: 72px;
    }
    .drag-and-drop-container {
      margin-left: 72px;
    }
    .question {
      margin: -95px auto auto 72px;
    }
  }
  
  @media only screen and (max-width: 1200px){
    .quadrants-container {
      margin-left: 0;
    }
    .overlay-video-container {
      margin: 0;
    }
    .question {
      margin: -95px auto auto auto;
    }
  }
  </style>