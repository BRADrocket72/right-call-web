<template>
  <LoggedInNavBar />
  <br/><br/>
  <div class="video-player">
    <h1>{{videoName}}</h1>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <video :id="videoId" :src="currentVideoClip.videoURL"></video>
    <div id="videoControls">
      <button id="playOrPause" @click="playOrPauseVideo">Play</button>
      <span id="videoCurrentTime">00:00</span> / <span id="videoDuration">00:00</span>
    </div>
    <results-page v-if="isResultsPageModalVisible" :answersArray="answers" @close="closeResultsPage">
    </results-page>
    <activity-pop-up v-if="questionsLoaded && isModalVisible" :answersArray="answers"
      :question="currentVideoQuestions[questionIndex]" :questionNumber="questionIndex + 1" @close="closeModal" />
  </div>
</template>

<script>
import ActivityPopUp from '@/components/modals/ActivityPopUp.vue';
import ResultsPage from "@/components/modals/ResultsPage.vue"
import VideoClip from '@/models/VideoClipDto';
import { formatTimeForVideo } from "@/util/FormatVideosTime.js"
import { useVideoClipStore } from "@/stores/VideoClipStore";
import { useUsersStore } from '@/stores/UserStore';
import { useActivityStore } from '@/stores/ActivityStore';
import { useUserResultsStore } from "@/stores/UserResultsStore"
import LoggedInNavBar from './LoggedInNavBar.vue';

export default {
  name: 'VideoEditor',
  components: {
    ActivityPopUp,
    ResultsPage,
    LoggedInNavBar
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
      videoName: ""
    };
  },
  async mounted() {
    var videoClipStore = useVideoClipStore();
    var userStore = useUsersStore();
    if (userStore.currentUserToken.length < 1) {
      this.$router.push({
        name: "LoginPage"
      })
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
      }
    },
    async closeResultsPage(percentageCorrect) {
      var userResults = useUserResultsStore()
      var userStore = useUsersStore()
      await userResults.postUserResults(userStore.currentUserName,percentageCorrect,this.videoId,this.videoName)
      this.$router.push({
        name: "LessonSelection"
      })
    }
  }
}

</script>

<style scoped>
video {
  width: 75%;
  height: 75%;
  display: block;
  margin: 0 auto;
}

#videoControls {
  width: 75%;
  margin: 0 auto;
  background-color: #4AAE9B;
}
</style>