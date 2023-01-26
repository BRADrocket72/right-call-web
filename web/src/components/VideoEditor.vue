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
      <div class="quadrants">
        <div class="quadrant-one quadrant "></div>
        <div class="quadrant-two quadrant"></div>
        <div class="quadrant-three quadrant"></div>
        <div class="quadrant-four quadrant"></div>
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
      calibrationReady: false
    };
  },
  async mounted() {
    var videoClipStore = useVideoClipStore();
    // var userStore = useUsersStore();
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
    //turn off red dot:
    // webgazer.showPredictionPoints(false)


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
  },
  methods: {
    stopVideoAtTimestamp(video, timestamps) {
      var currentTime = video.currentTime;
      if (currentTime >= timestamps[this.questionCounter]) {
        video.pause();
        this.questionCounter++
        this.showModal();
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
    async closeResultsPage(percentageCorrect) {
      var userResults = useUserResultsStore()
      // var userStore = useUsersStore()
      await userResults.postUserResults(this.$cookies.get("user_session").currentUserName,percentageCorrect,this.videoId,this.videoName)
      this.$router.push({
        name: "LessonSelection"
      })
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

.quadrants {
  position: absolute;
  max-width: 972px;
  min-width: 972px;
  height: 60%;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
.quadrant {
  max-width: 486px;
  min-width: 486px;
  max-height: 275px;
  min-height: 275px;
  border: 1px solid black;
  float: left;
}
</style>