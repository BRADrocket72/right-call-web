<template>
<div>
    <LoggedInNavBarVue />
    <br/><br/>
    <div v-if="ready" class="assign-timestamps">
        <div class="video-list-div" v-if="isVideoSelected == false">
            <div class="lesson" v-for="video in this.videoClips" :key="video.id">
                <a class="nav-link" @click="videoSelection(video)">
                    <h1>{{video.lessonName}}</h1>
                </a>    
                <p><a :href="video.videoURL" target="_blank">{{video.videoURL}}</a></p>
            </div>
        </div>
        <div v-else class="assign-timestamps-container">
            <div class="main-content-div">
                <video :id="selectedVideo._id" :src="selectedVideo.videoURL" controls/>
                <div class="timestamps-div">
                    <div v-if="timestamps.length >= 1" class="display-timestamps-div">
                        <ul class="timestamp-ul">
                            <li v-for="(timestamp,index) in formattedTimestamps" :key="timestamp">
                                <button id="delete-timestamp-button" @click="deleteTimestamp(index)">X</button>
                                {{timestamp}}
                                <button id="assign-activity-button" @click="toggleAssignActivityModal(index)">Activity</button>
                            </li>
                            <button id="save-timestamps-button" @click="updateAPIandShowModal(selectedVideo._id,timestamps)">Save</button>
                        </ul>
                    </div>
                    <div class="add-button-div">
                        <button id="add-timestamp-button" @click="toggleTimestampsModal()">Add Timestamp Here</button>
                    </div>
                </div>
            </div>
            <AssignTimestampsModal v-if="isTimestampModalVisible" :newTimestamp="newTimestamp" @close="toggleTimestampsModal" />
            <SaveTimestampsModal v-if="isSaveTimestampsModalVisible" @close="toggleSaveTimestampsModal" />
            <AssignActivityModal v-if="isAssignActivityModalVisible" :activities="activities" :index="currentIndex" @close="assignActivityModalReturnArray" @save="assignActivitySaved"/>
        </div>
    </div>
</div>
</template>

<script>
import LoggedInNavBarVue from './LoggedInNavBar.vue';
import VideoClip from '@/models/VideoClip.js'
import AssignActivity from '@/models/AssignActivity.js'
import AssignTimestampsModal from '@/components/modals/AssignTimestampsModal.vue'
import SaveTimestampsModal from '@/components/modals/SaveTimestampsModal.vue'
import AssignActivityModal from '@/components/modals/AssignActivityModal.vue'
import { useVideoClipStore } from "@/stores/VideoClipStore";
import {formatTimeForVideo} from '@/models/FormatVideosTime.js'
//import { useUsersStore } from '@/stores/UserStore';
import { useActivityStore } from '@/stores/ActivityStore';

export default {
    name: 'AssignTimestamps',
    components: { 
        AssignTimestampsModal,
        SaveTimestampsModal,
        AssignActivityModal,
        LoggedInNavBarVue
    },
    data() {
        return {
            isVideoSelected: false,
            selectedVideo: VideoClip,
            videoClips: [],
            isTimestampModalVisible: false,
            isSaveTimestampsModalVisible: false,
            isAssignActivityModalVisible: false,
            newTimestamp: Number,
            currentActivityTimestamp: Number,
            timestamps: [],
            formattedTimestamps: [],
            ready: false,
            returnToVideoSelectionPage: false,
            activityModalArray: [],
            activities: [],
            currentIndex: Number,
            activitySaved: false,
            deletedActivities: [],
            updatedActivities: []
        }
    },
    methods: {
        videoSelection(video) {
            this.selectedVideo = video
            if(this.selectedVideo.timeStamps) {
                this.timestamps = this.selectedVideo.timeStamps
                for(var timestamp of this.timestamps) {
                    this.formattedTimestamps.push(formatTimeForVideo(timestamp))
                    this.activities.push('')
                }
            }
            this.getFromActivityStore()
            this.isVideoSelected = !this.isVideoSelected
        },
        closeVideo() {
            this.selectedVideo = null
        },
        async getFromActivityStore() {
            var store = useActivityStore()
            await store.fetchActivitiesByVideoclipId(this.selectedVideo._id)
            this.activities = store.activityList
        },
        toggleTimestampsModal(timestampSaved) {
            this.isTimestampModalVisible = !this.isTimestampModalVisible
            if(this.isTimestampModalVisible) {
                this.timestampsModalData()
            } else {
                if(timestampSaved == true) {
                    this.updateTimestampsAndActivitiesList(timestampSaved)
                } 
            }
        },
        toggleSaveTimestampsModal(returnToVideoSelectionPage) {
            this.isSaveTimestampsModalVisible = !this.isSaveTimestampsModalVisible
            if(returnToVideoSelectionPage) {
                this.isVideoSelected = false
                this.timestamps = []
                this.formattedTimestamps = []
                this.$router.push({
                    name: "AssignTimestamps"
                })
            }
        },
        toggleAssignActivityModal(activityIndex) {
            this.isAssignActivityModalVisible = !this.isAssignActivityModalVisible
            if(this.isAssignActivityModalVisible) {
                this.currentIndex = activityIndex
                this.currentActivityTimestamp = this.timestamps[activityIndex]
            } else {
                if(this.activitySaved) {
                    console.log(this.updatedActivities.indexOf(this.activities[this.currentIndex]))
                    if((this.activities[this.currentIndex]._id) && (this.updatedActivities.indexOf(this.activities[this.currentIndex]._id))){
                        this.updatedActivities.push(this.activities[this.currentIndex]._id)
                        console.log(this.updatedActivities)
                    }
                    this.activities[this.currentIndex] = new AssignActivity(this.currentActivityTimestamp,this.activityModalArray[0],[this.activityModalArray[1],this.activityModalArray[2]],this.selectedVideo._id)
                    this.activitySaved = false
                }
            }
        },
        timestampsModalData() {
            const video = document.getElementById(this.selectedVideo._id)
            this.newTimestamp = video.currentTime
        },
        assignActivityModalReturnArray(returnedArray) {
            if(returnedArray != undefined) {
                this.activityModalArray = returnedArray
            }
            this.toggleAssignActivityModal()
        },
        assignActivitySaved(activitySaved) {
            this.activitySaved = activitySaved
        },
        updateTimestampsAndActivitiesList(timestampSaved) {
            if(timestampSaved) {
                let count = 0
                if(this.timestamps.length > 0) {
                    for(const timestamp of this.timestamps) {
                        if(timestamp > this.newTimestamp) {
                            this.timestamps.splice(count,0,this.newTimestamp)
                            this.formattedTimestamps.splice(count,0,formatTimeForVideo(this.newTimestamp))
                            this.activities.splice(count,0,'')
                            break
                        } else if(count == this.timestamps.length-1) {
                            this.timestamps.splice(count+1,0,this.newTimestamp)
                            this.formattedTimestamps.splice(count+1,0,formatTimeForVideo(this.newTimestamp))
                            this.activities.splice(count+1,0,'')
                            break
                        }else {
                            count++
                        }
                    }
                } else {
                    this.timestamps.splice(0,0,this.newTimestamp)
                    this.formattedTimestamps.splice(0,0,formatTimeForVideo(this.newTimestamp))
                    this.activities.splice(0,0,'')
                }
            }
        },
        deleteTimestamp(deletedTimestamp) {
            this.timestamps.splice(deletedTimestamp,1)
            this.formattedTimestamps.splice(deletedTimestamp,1)
            if(this.activities[deletedTimestamp]._id && !this.deletedActivities.indexOf(this.activities[deletedTimestamp]._id)){
                this.deletedActivities.push(this.activities[deletedTimestamp]._id)
            }
            this.activities.splice(deletedTimestamp,1)
        },
        async updateAPIandShowModal(id, timestamps) {
            await this.updateTimestamps(id,timestamps)
            this.toggleSaveTimestampsModal(this.returnToVideoSelectionPage)
        }
    },
    setup() {
        var VideoClip = useVideoClipStore();
        return VideoClip;
    },
    async mounted() {
        /*var store = useUsersStore();
        if (store.currentUserToken.length < 1) {
            this.$router.push({
                name: "LoginPage"
            })
        }*/
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
  width: 900px;
  height: 500px;
  display: block;
  margin: 0;
}

.main-content-div {
    display: flex;
    flex-direction: row;
}

.actions-div {
    width: 100%;
    margin: 30px auto;
    justify-content: space-around;
}

#add-timestamp-button {
    text-align: center;
    margin-left: 22px;
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
    flex-direction: column;
    height: 600px;
}

.display-timestamps-div {
    width: 310px;
    height: 400px;
    overflow-y: auto;
    margin-left: 10px;
    background: #0e333c;
    border:  1px solid black;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 0;
}

.display-timestamps-div ul{
    margin-left: auto;
}

ul.timestamp-ul {
    padding: 0 0 0 7px;
}

.timestamp-ul li{
    display: flex;
    flex-direction: row;
    color: white;
    margin: 15px 10px 0 0;
    font-size: 35px;
}

#delete-timestamp-button {
    margin: 0 6px 0 6px;
    text-align: center;
    border: none;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 1px black;
    box-shadow: 0 6px 6px #000000;
    background: #B22222;
    min-width: 55px;
    min-height: 55px;
    border-radius: 15px;
}

#delete-timestamp-button:hover {
    background: #8B0000;
    box-shadow: 0 8px 8px #000000;
}

#assign-activity-button {
    margin: 0 15px 0 25px;
    text-align: center;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 1px black;
    box-shadow: 0 6px 6px #000000;
    background: #4AAE9B;
    min-width: 85px;
    min-height: 55px;
    border-radius: 15px;
}

#assign-activity-button:hover {
    background: #349b88;
    box-shadow: 0 8px 8px #000000;
}

#save-timestamps-button {
    float: left;
    margin: 20px 10px 10px 0;
    text-align: center;
    font-size: 35px;
    border: none;
    color: white;
    text-shadow: 1px 1px 1px black;
    box-shadow: 0 6px 6px #000000;
    background: #4AAE9B;
    width: 130px;
    height: 60px;
    border-radius: 15px;
}

#save-timestamps-button:hover {
    background: #349b88;
    box-shadow: 0 8px 8px #000000;
}
</style>