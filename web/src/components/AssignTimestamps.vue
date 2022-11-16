<template>
    <div class="assign-timestamps">
        <div class="video-list-div" v-if="isVideoSelected == false">
            <div class="lesson" v-for="video in testVideoList" :key="video.id">
                <a class="nav-link" @click="videoSelection(video)">
                    <h1>{{video.id}}</h1>
                    <p><a :href="video.videoUrl" target="_blank">{{video.videoUrl}}</a></p>
                </a>
            </div>
        </div>
        <div v-else>
            <div class="video-div">
                <video :id="selectedVideo.id" :src="selectedVideo.videoUrl" controls/>
            </div>
            <div class="actions-div">
                <button id="add-timestamp-button">Add Timestamp Here</button>
            </div>
        </div>
    </div>
</template>

<script>
import VideoClip from '@/models/VideoClip.js'
import AssignTimestampsModal from '@/components/AssignTimestampsModal.vue'
import {retrieveAndCreateAllVideos} from '@/models/RetrieveAndCreate.js'

export default {
    name: 'AssignTimestamps',
    data() {
        return {
            isVideoSelected: false,
            selectedVideo: VideoClip,
            testVideoList: [],
            isTimestampModalVisible: false
        }
    },
    methods: {
        videoSelection(video) {
            this.selectedVideo = video
            this.isVideoSelected = !this.isVideoSelected
        },
        closeVideo() {
            this.selectedVideo = null
        }
    },
    mounted() {
        this.testVideoList = retrieveAndCreateAllVideos()

    }
}
</script>

<style scoped>
.assign-timestamps {
    text-align: left;
}

.video-list-div {
    display: flex;
    flex-direction: row;
    width: 100%;
     margin: 0 auto;
}

.lesson {
     margin: 0 2% 0 2%;
    text-align: left;
    height: 300px;
    width: 285px;
    box-shadow: 0 10px 10px #d1d1d1;
}

.video-list-div a {
    cursor: pointer;
    max-width: 300px;
}

.video-list-div p {
  max-width: 300px;
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
  font-weight: bold;
}

.nav-link a {
    width: 100px;
}

video {
  width: 75%;
  height: 75%;
  display: block;
  margin: 0 auto;
}
</style>