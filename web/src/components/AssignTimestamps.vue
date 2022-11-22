<template>
    <div v-if="ready" class="assign-timestamps">
        <div class="video-list-div" v-if="isVideoSelected == false">
            <div class="lesson" v-for="video in this.videoClips" :key="video.id">
                <a class="nav-link" @click="videoSelection(video)">
                    <h1>{{video._id}}</h1>
                </a>    
                <p><a :href="video.videoURL" target="_blank">{{video.videoURL}}</a></p>
            </div>
        </div>
        <div v-else>
            <div class="video-div">
                <video :id="selectedVideo._id" :src="selectedVideo.videoURL" controls/>
            </div>
            <div class="actions-div">
                <div class="button-div">
                    <button id="add-timestamp-button" @click="toggleTimestampsModal()">Add Timestamp Here</button>
                </div>
                <div v-if="timestamps.length >= 1" class="timestamps-div">
                    <ul class="timestamp-ul">
                        <li v-for="timestamp in formattedTimestamps" :key="timestamp">
                            {{timestamp}}
                            <button id="delete-timestamp-button" @click="deleteTimestamp(timestamp)">Delete</button>
                        </li>
                    </ul>
                </div>
            </div>
            <AssignTimestampsModal v-if="isTimestampModalVisible" :currentTimestamp="currentTimestamp" @close="toggleTimestampsModal" />
        </div>
    </div>
</template>

<script>
import VideoClip from '@/models/VideoClip.js'
import AssignTimestampsModal from '@/components/AssignTimestampsModal.vue'
import { useVideoClipStore } from "@/stores/VideoClipStore";
import {formatTimeForVideo} from '@/models/FormatVideosTime.js'

export default {
    name: 'AssignTimestamps',
    components: { 
        AssignTimestampsModal 
    },
    data() {
        return {
            isVideoSelected: false,
            selectedVideo: VideoClip,
            videoClips: [],
            isTimestampModalVisible: false,
            currentTimestamp: Number,
            timestamps: [],
            formattedTimestamps: [],
            ready: false
        }
    },
    methods: {
        videoSelection(video) {
            this.selectedVideo = video
            if(this.selectedVideo.timeStamps) {
                this.timestamps = this.selectedVideo.timeStamps
                for(var timestamp of this.timestamps) {
                    this.formattedTimestamps.push(formatTimeForVideo(timestamp))
                }
            }
            this.isVideoSelected = !this.isVideoSelected
        },
        closeVideo() {
            this.selectedVideo = null
        },
        toggleTimestampsModal(timestampSaved) {
            this.isTimestampModalVisible = !this.isTimestampModalVisible
            if(this.isTimestampModalVisible) {
                this.modalData()
            } else {
                if(timestampSaved == true) {
                    this.updateTimestampsList(timestampSaved)
                } 
            }
        },
        modalData() {
            const video = document.getElementById(this.selectedVideo._id)
            this.currentTimestamp = video.currentTime
        },
        updateTimestampsList(timestampSaved) {
            if(timestampSaved) {
                let count = 0
                for(const timestamp of this.timestamps) {
                    if(timestamp > this.currentTimestamp) {
                        this.timestamps.splice(count,0,this.currentTimestamp)
                        this.formattedTimestamps.splice(count,0,formatTimeForVideo(this.currentTimestamp)) 
                        break
                    } else {
                        count++
                        console.log(count)
                    }
                }
                console.log(this.timestamps)
            }
        },
        deleteTimestamp(deletedTimestamp) {
            let deleted = this.formattedTimestamps.indexOf(deletedTimestamp)
            this.timestamps.splice(deleted,1)
            this.formattedTimestamps.splice(deleted,1)
        }
    },
    setup() {
        var VideoClip = useVideoClipStore();
        return VideoClip;
    },
    async mounted() {
        await this.fetchVideoClips();
        this.VideoClips = this.clips;
        this.ready = true;
    }
}
</script>

<style scoped>
.assign-timestamps {
    text-align: left;
}

.nav-link {
    min-height: 150px;
}

.nav-link h1 {
    height: 150px;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-weight: bold;
    white-space: normal;
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
    background: #0e333c;
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

.lesson p {
    margin: 20px 0 0 0;
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

video {
  width: 75%;
  height: 75%;
  display: block;
  margin: 0 auto;
}

.actions-div {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 30px auto;
    justify-content: space-around;
}

#add-timestamp-button {
    text-align: center;
    border: none;
    font-size: 30px;
    color: white;
    text-shadow: 2px 1px 1px black;
    box-shadow: 0 6px 6px #d1d1d1;
    background: #4AAE9B;
    min-width: 100px;
    min-height: 80px;
    border-radius: 15px;
}

#add-timestamp-button:hover {
    background: #349b88;
    box-shadow: 0 10px 10px #d1d1d1;
}

.timestamps-div {
    min-width: 250px;
    min-height: 200px;
    background: #0e333c;
    border:  1px solid black;
    border-radius: 10px;
    margin-bottom: 20px;
}

.timestamp-ul {
    margin: 0 0 0 0;
    list-style-type: none;
}

.timestamp-ul li{
    color: white;
    margin: 15px 10px 0 0;
    font-size: 40px;
    min-width: 80px;
    min-height: 55px;
}

#delete-timestamp-button {
    float: right;
    margin: 0 10px 10px 10px;
    text-align: center;
    border: none;
    color: white;
    text-shadow: 1px 1px 1px black;
    box-shadow: 0 6px 6px #000000;
    background: #4AAE9B;
    min-width: 80px;
    min-height: 55px;
    border-radius: 15px;
}

#delete-timestamp-button:hover {
    background: #349b88;
    box-shadow: 0 8px 8px #000000;
}
</style>