<template>
  <LoggedInNavBar />
  <br/><br/>
  <div class="video-player">
    <h1>{{videoId}}</h1>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <video :id="videoId" :src="currentVideoClip.videoURL"></video>
    <div id="videoControls">
      <button id="playOrPause" @click="playOrPauseVideo">Play</button>
      <span id="videoCurrentTime">00:00</span> / <span id="videoDuration">00:00</span>
    </div>
    <results-page v-if="isResultsPageModalVisible" :answersArray="answers">
    </results-page>
    <activity-pop-up v-if="questionsLoaded && isModalVisible" :allPossibleAnswers="answers"
      :question="currentVideoQuestions[questionIndex]" :questionNumber="questionIndex + 1" @close="closeModal" />
  </div>
</template>

<script>
import ActivityPopUp from '@/components/modals/ActivityPopUp.vue';
import ResultsPage from "@/components/modals/ResultsPage.vue"
import VideoClip from '@/models/VideoClip';
import { retrieveAndCreateAllQuestions } from "@/models/RetrieveAndCreate.js"
import { retrieveAndCreateAllAnswers } from "@/models/RetrieveAndCreate.js"
import { retrieveVideosQuestionsById } from "@/models/RetrieveAndCreate.js"
import { formatTimeForVideo } from "@/models/FormatVideosTime.js"
import { useVideoClipStore } from "@/stores/VideoClipStore";
import { useUsersStore } from '@/stores/UserStore';
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
    }
  },
  data() {
    return {
      isModalVisible: false,
      isResultsPageModalVisible: false,
      currentVideoQuestions: [],
      questionsArray: [],
      questionIndex: 0,
      questionsLoaded: false,
      answers: [],
      questionCounter: 0,
      currentVideoClip: VideoClip
    };
  },
  setup() {
    var VideoClip = useVideoClipStore();
    return VideoClip;
  },
  async mounted() {
    var store = useUsersStore();
    if (store.currentUserToken.length < 1) {
      this.$router.push({
        name: "LoginPage"
      })
    }
    this.currentVideoClip = await this.fetchVideoClipById(this.videoId);
    const video2 = document.getElementById(this.videoId)
    if (video2) {
      video2.addEventListener('timeupdate', () => {
        const videoCurrentTime = document.getElementById("videoCurrentTime")
        const videoDuration = document.getElementById("videoDuration")
        videoCurrentTime.innerHTML = formatTimeForVideo(video2.currentTime);
        videoDuration.innerHTML = formatTimeForVideo(video2.duration)
        this.stopVideoAtTimestamp(video2, this.currentVideoClip.timeStamps)
        if (video2.duration == video2.currentTime) {
          if (video2.duration != this.currentVideoClip.timeStamps[this.currentVideoClip.timeStamps.length-1]){
            this.isResultsPageModalVisible = true;
          }
        }
      })
    }
    this.questionsArray = retrieveAndCreateAllQuestions()
    this.currentVideoQuestions = retrieveVideosQuestionsById(this.videoId, this.questionsArray)
    this.questionsLoaded = true;
    this.answers = retrieveAndCreateAllAnswers()
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
      const video2 = document.getElementById(this.videoId);
      const playOrPauseButton = document.getElementById("playOrPause")
      if (video2.paused) {
        playOrPauseButton.innerHTML = "Pause"
        video2.play()
      }
      else {
        playOrPauseButton.innerHTML = "Play"
        video2.pause()
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
      const video2 = document.getElementById(this.videoId)
      if (video2.duration == video2.currentTime) {
          this.isResultsPageModalVisible = true;
      }
      const playOrPauseButton = document.getElementById("playOrPause")
      playOrPauseButton.innerHTML = "Pause"
      video2.play();
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