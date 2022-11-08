<template>
  <div class="video-player">
      <h1>{{video.id}}</h1>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <video :id="video.id" :src="video.videoUrl"/>
      <div id="videoControls">
        <button id="playOrPause" @click="playOrPauseVideo">Play</button> 
        <span id="videoCurrentTime">00:00</span> / <span id="videoDuration">00:00</span> 
      </div>
      <results-page v-if="isResultsPageModalVisible" :answersArray="answers" @close="closeResultsPageModal"></results-page>
      <activity-pop-up v-if="questionsLoaded && isModalVisible" :allPossibleAnswers="answers" :question="currentVideoQuestions[questionIndex]" :questionNumber="questionIndex + 1" @close="closeModal" />  </div>
</template>

<script>
import ActivityPopUp from '@/components/ActivityPopUp.vue';
import ResultsPage from "@/components/ResultsPage.vue"
import {retrieveAndCreateAllQuestions} from "@/models/RetrieveAndCreate.js"
import {retrieveAndCreateAllAnswers} from "@/models/RetrieveAndCreate.js"
import {retrieveVideosQuestionsById} from "@/models/RetrieveAndCreate.js"
import {formatTimeForVideo} from "@/models/FormatVideosTime.js"

import VideoClip from '@/models/VideoClip';


export default {
  name: 'VideoEditor',
  components: {
    ActivityPopUp,
    ResultsPage
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
        questionCounter: 0
      };
    },
  props: {
    video: VideoClip
  },
  mounted() {
    const video2 = document.getElementById(this.video.id)
    if(video2) {
      video2.addEventListener('timeupdate', () => {   
      const videoCurrentTime = document.getElementById("videoCurrentTime")
      const videoDuration = document.getElementById("videoDuration")
      videoCurrentTime.innerHTML = formatTimeForVideo(video2.currentTime);
      videoDuration.innerHTML = formatTimeForVideo(video2.duration)
      this.stopVideoAtTimestamp(video2, this.video.timestamps)
      })
      video2.addEventListener('ended', () => { 
        this.showModal();
        this.questionCounter++
      })
    }
    this.questionsArray = retrieveAndCreateAllQuestions()  
    this.currentVideoQuestions = retrieveVideosQuestionsById(this.video.id, this.questionsArray)  
    this.questionsLoaded = true;
    this.answers = retrieveAndCreateAllAnswers()
  },
  methods: {
    stopVideoAtTimestamp(video, timestamps) {
      var currentTime = video.currentTime;
      if (timestamps[this.questionCounter] == timestamps[timestamps.length-1]) {
        return
      }
      else {
        if (currentTime >= timestamps[this.questionCounter]) {
          video.pause();
          this.questionCounter++
          this.showModal();
        }
      }
    },
    playOrPauseVideo() {
      const video2 = document.getElementById(this.video.id);
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
      
      if (this.questionCounter  == this.video.timestamps.length) {
        this.isResultsPageModalVisible = true;
      }
    },
    closeResultsPageModal() {
      this.isResultsPageModalVisible = false;
      this.close()
    },
    close() {
      this.$emit('close');
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