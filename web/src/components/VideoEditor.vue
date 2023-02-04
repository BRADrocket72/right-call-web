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
      <div v-if="containsEyeTrackingActivity && isEyeTrackingVisible && !webcamPermissionEnabled" class="quadrants-container">
        <NoWebcamPopUp :answersArray="answers" :question="currentVideoQuestions[questionIndex]" @close="toggleEyeTracking" />
      </div>
      <div v-if="currentQuestion.questionType == 'eye-tracking' && webcamPermissionEnabled" class="question">
          <h2>{{currentQuestion.questionText}}</h2>
          <p>Use your eyes to answer this question.</p>
      </div>
      <div v-if="containsEyeTrackingActivity && isEyeTrackingVisible && webcamPermissionEnabled && predictionReady" class="eye-tracking-container">
        <EyeTrackingPopUp :answersArray="answers" :question="currentVideoQuestions[questionIndex]" :xPrediction="xPrediction" 
        :yPrediction="yPrediction" @close="toggleEyeTracking" />
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
    <webgazer-calibration-page v-if="calibrationReady" @close="closeCalibrationPage"/>
  </div>
</div>
</template>


<script>
import ActivityPopUp from '@/components/modals/ActivityPopUp.vue';
import NoWebcamPopUp from '@/components/modals/NoWebcamPopUp.vue'
import EyeTrackingPopUp from '@/components/modals/EyeTrackingPopUp.vue'
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
    WebgazerCalibrationPage
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
      webcamPermissionEnabled: true,
      isEyeTrackingVisible: false,
      isPlayButtonDisabled: false,
      calibrationReady: false,
      xPrediction: 0,
      yPrediction: 0,
      predictionReady: false,
      currentQuestion: Object
    };
  },
  async mounted() {
    var videoClipStore = useVideoClipStore();
    let cookiesCalibration = this.$cookies.get("user_session").currentEyeTrackingCalibration
    if (cookiesCalibration == "false") {
      this.calibrationReady = true
      this.replaceCookie()
      webgazer.showVideo(false)
      webgazer.showFaceOverlay(false)
      webgazer.showFaceFeedbackBox(false)
      webgazer.showPredictionPoints(true)
      webgazer.begin()
    }
    else {
      webgazer.resume()
    }


    this.currentVideoClip = await videoClipStore.fetchVideoClipById(this.videoId);
    this.videoName = this.currentVideoClip.videoName
    const videoElement = document.getElementById(this.videoId)
    var activityStore = useActivityStore();
    this.currentVideoQuestions = await activityStore.fetchActivitiesByVideoclipId(this.videoId)
    this.currentVideoQuestions.sort((a,b) => a.timestamp - b.timestamp)
    this.questionsLoaded = true;

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
            videoElement.pause()
          }
        }
      })
    }
    this.checkForEyeTrackingActivity()
    this.currentQuestion = this.currentVideoQuestions[this.questionCounter]
  },
  methods: {
    stopVideoAtTimestamp(video, timestamps) {
      var currentTime = video.currentTime;
      if (currentTime >= timestamps[this.questionCounter]) {
        if(this.currentVideoQuestions[this.questionCounter].questionType != 'eye-tracking') {
          this.showModal()
        } else {
          this.toggleEyeTracking()
        }
          this.questionCounter++
          this.playOrPauseVideo()
          this.currentQuestion = this.currentVideoQuestions[this.questionCounter]
      }
    },
    playOrPauseVideo() {
      const videoElement = document.getElementById(this.videoId);
      const playOrPauseButton = document.getElementById("playOrPause")
      if (videoElement.paused) {
        playOrPauseButton.innerHTML = "Pause"
        videoElement.play()
        webgazer.resume()
      }
      else {
        playOrPauseButton.innerHTML = "Play"
        videoElement.pause()
        webgazer.pause()
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
    },
    async toggleEyeTracking(updatedAnswers) {
      this.togglePlayButton()
      this.isEyeTrackingVisible = !this.isEyeTrackingVisible
      if(this.isEyeTrackingVisible) {
        if(this.webcamPermissionEnabled) {
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
      webgazer.pause()
      webgazer.showPredictionPoints(false)
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

.eye-tracking-container {
  position: absolute;
  max-width: 1350px;
  min-width: 1350px;
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

@media only screen and (min-width: 1600px){
  .quadrants-container {
    margin-left: 62px;
  }
}

@media only screen and (min-width: 1400px) and (max-width: 1599px){
  .quadrants-container {
    margin-left: -28px;
  }
  .eye-tracking-container {
    max-width: 1300px;
    min-width: 1300px;
  }
  .question {
    margin: -95px auto auto 162px;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1399px){
  .quadrants-container {
    margin-left: -28px;
  }
  .eye-tracking-container {
    margin-left: -30px;
    max-width: 1170px;
    min-width: 1170px;
  }
  .question {
    margin: -95px auto auto 72px;
  }
}

@media only screen and (max-width: 1200px){
  .quadrants-container {
    margin-left: -28px;
  }
  .eye-tracking-container {
    max-width: 972px;
    min-width: 972px;
    margin-top: 0;
  }
  .question {
    margin: -95px auto auto auto;
  }
}
</style>