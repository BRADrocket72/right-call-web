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
      <div class="quadrants-container">
        <NoWebcamPopUp v-if="containsEyeTrackingActivity && isEyeTrackingVisible" :answersArray="answers"
        :question="currentVideoQuestions[questionIndex]" @close="toggleEyeTracking"/>
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
      questionsLoaded: false,
      answers: [],
      questionCounter: 0,
      currentVideoClip: VideoClip,
      percentageCorrect: "",
      videoName: "",
      containsEyeTrackingActivity: false,
      isEyeTrackingVisible: false,
      isPlayButtonDisabled: false,
      calibrationReady: false
    };
  },
  async mounted() {
    var videoClipStore = useVideoClipStore();
    let cookiesCalibration = this.$cookies.get("user_session").currentEyeTrackingCalibration
    if (cookiesCalibration == "false") {
      this.calibrationReady = true
      this.replaceCookie()
      webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null) {
            return;
        }
        var xprediction = data.x; //these x coordinates are relative to the viewport
        var yprediction = data.y; //these y coordinates are relative to the viewport
        console.log(xprediction, yprediction); //elapsed time is based on time since begin was called
        console.log(elapsedTime)
      })
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
  },
  methods: {
    stopVideoAtTimestamp(video, timestamps) {
      var currentTime = video.currentTime;
      if (currentTime >= timestamps[this.questionCounter]) {
        if(this.currentVideoQuestions[this.questionCounter].questionType != 'eye-tracking') {
          this.showModal();
        } else {
          this.toggleEyeTracking()
        }
          video.pause();
          this.questionCounter++
      }
    },
    playOrPauseVideo() {
      const videoElement = document.getElementById(this.videoId);
      const playOrPauseButton = document.getElementById("playOrPause")
      if (videoElement.paused) {
        playOrPauseButton.innerHTML = "Pause"
        videoElement.play()
      }
      else {
        playOrPauseButton.innerHTML = "Play"
        videoElement.pause()
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
      this.questionIndex++;
      const videoElement = document.getElementById(this.videoId)
      if (videoElement.duration == videoElement.currentTime) {
          this.isResultsPageModalVisible = true;
          videoElement.pause()
      } else{
          const playOrPauseButton = document.getElementById("playOrPause")
          playOrPauseButton.innerHTML = "Pause"
          videoElement.play();
          webgazer.resume()
      }
    },
    toggleEyeTracking(updatedAnswers) {
      this.isEyeTrackingVisible = !this.isEyeTrackingVisible
      this.playOrPauseVideo()
      this.togglePlayButton()
      if(!this.isEyeTrackingVisible) {
        this.answers = updatedAnswers
        this.questionIndex++;
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
  margin-left: 100px;
}

@media only screen and (min-width: 1400px){
  .quadrants-container {
    margin-left: 62px;
  }
}

@media only screen and (max-width: 1399px){
  .quadrants-container {
    margin-left: -28px;
  }
}
</style>