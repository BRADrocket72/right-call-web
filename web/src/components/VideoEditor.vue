<template>
  <div class="video-player">
      <h1>{{video.id}}</h1>
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <video :id="video.id" :src="video.videoUrl" controls />
      <!-- put the results page tag here with the updatedAnswers in it to send to it -->
      <activity-pop-up v-if="questionsLoaded && isModalVisible" :allPossibleAnswers="answers" :question="currentVideoQuestions[questionIndex]" :questionNumber="questionIndex + 1" @close="closeModal" />  </div>
</template>

<script>
import ActivityPopUp from '@/components/ActivityPopUp.vue';
import {createQuestions} from "@/models/RetrieveAndCreate.js"
import {retrieveAnswers} from "@/models/RetrieveAndCreate.js"
import {retrieveVideosQuestions} from "@/models/RetrieveAndCreate.js"
import VideoClip from '@/models/VideoClip';


export default {
  name: 'VideoEditor',
  components: {
    ActivityPopUp: ActivityPopUp
  },
  data() {
      return {
        isModalVisible: false,
        currentVideoQuestions: [],
        questionsArray: [],
        questionIndex: 0,
        questionsLoaded: false,
        answers: []
      };
    },
  props: {
    video: VideoClip
  },
  mounted() {
    const video2 = document.getElementById(this.video.id);
    video2.addEventListener('timeupdate', () => {    //listen for when the video's time changes
      this.stopVideoAtTimestamp(video2, this.video.timestamps)
    })
    this.questionsArray = createQuestions()  //Retrieve all of the questions
    this.currentVideoQuestions = retrieveVideosQuestions(this.video.id, this.questionsArray)  //set currentVideoQuestions to an array of this specific video's questions
    this.questionsLoaded = true;
    this.answers = retrieveAnswers()
  },
  methods: {
    stopVideoAtTimestamp(video, timestamps) {
      var currentTime = video.currentTime;
      if (currentTime >= timestamps[0]) {
        timestamps.shift()   // remove first timestamp
        video.pause();
        this.showModal();
      }
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal(updatedAnswers) {
      this.isModalVisible = false;
      this.answers = updatedAnswers
      this.questionIndex++;
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
video {
  width: 75%;
  height: 75%;
  display: block;
  margin: 0 auto;
}
</style>