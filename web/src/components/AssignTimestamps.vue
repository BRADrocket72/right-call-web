<template>
<div>
    <LoggedInNavBarVue />
    <br/><br/>
    <div v-if="ready" class="assign-timestamps">
        <div class="video-list-div" v-if="isVideoSelected == false">
            <div class="lesson" v-for="video in this.videoClips" :key="video.id">
                <a class="nav-link" @click="videoSelection(video)">
                    <img class="lesson-img" :alt="video._id" src="../../images/american-football-referees-1476038_960_720.jpg" />
                    <p>{{ video.videoName }}</p>
                    <p style="font-weight: normal">Timestamps: {{video.timeStamps}}</p>
                </a>    
            </div>
        </div>
        <div v-else class="assign-timestamps-container">
            <div class="main-content-div">
                <video :id="selectedVideo._id" :src="selectedVideo.videoURL" controls/>
                <div class="timestamps-div">
                    <div class="display-timestamps-div">
                        <div class="timestamps">
                            <ul class="timestamp-ul" v-if="timestamps.length >= 1">
                                <li v-for="(timestamp,index) in formattedTimestamps" :key="timestamp">
                                    <button id="delete-timestamp-button" @click="deleteTimestamp(index)">X</button>
                                    {{timestamp}}
                                    <button id="assign-activity-button" @click="toggleAssignActivityModal(index)">Activity</button>
                                </li>
                            </ul>
                        </div>
                        <button id="save-timestamps-button" @click="updateAPI(selectedVideo._id,timestamps)">Save</button>
                    </div>
                    <div class="add-button-div">
                        <button id="add-timestamp-button" @click="newTimestampButtonClick()">Add Timestamp Here</button>
                    </div>
                </div>
            </div>
            <AssignActivityModal v-if="isAssignActivityModalVisible" :activity="activities[currentIndex]" :questionTypeExists="activities[currentIndex].questionType" @close="toggleAssignActivityModal" @save="assignActivityModalSave"/>
        </div>
    </div>
</div>
</template>

<script>
import LoggedInNavBarVue from './LoggedInNavBar.vue'
import VideoClip from '@/models/VideoClip.js'
import AssignActivity from '@/models/AssignActivity.js'
import AssignActivityModal from '@/components/modals/AssignActivityModal.vue'
import { useVideoClipStore } from "@/stores/VideoClipStore"
import {formatTimeForVideo} from '@/models/FormatVideosTime.js'
import { useUsersStore } from '@/stores/UserStore'
import { useActivityStore } from '@/stores/ActivityStore'

export default {
    name: 'AssignTimestamps',
    components: { 
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
            activityModalData: [],
            activities: [],
            currentIndex: Number,
            deletedActivities: [],
            updatedActivities: []
        }
    },
    methods: {
        videoSelection(video) {
            this.selectedVideo = video
            this.getVideoTimestampsAndActivities()
            this.isVideoSelected = !this.isVideoSelected
        },
        returnToVideoSelectionPage(){
            this.isVideoSelected = false
            this.timestamps = []
            this.formattedTimestamps = []
            this.deletedActivities = []
            this.updatedActivities = []
            this.activityModalData = []
            this.activities = []
            this.$router.push({
                name: "AssignTimestamps"
            })
            
        },
        getVideoTimestampsAndActivities() {
            if(this.selectedVideo.timeStamps) {
                this.timestamps = this.selectedVideo.timeStamps
                for(var timestamp of this.timestamps) {
                    this.formattedTimestamps.push(formatTimeForVideo(timestamp))
                }
            }
            this.getFromActivityStore()
        },
        orderActivitiesByTimestamp() {
            this.activities.sort((a,b) => a.timestamp - b.timestamp)
        },
        async getFromActivityStore() {
            var store = useActivityStore()
            await store.fetchActivitiesByVideoclipId(this.selectedVideo._id)
            this.activities = store.activityList
            this.orderActivitiesByTimestamp()
        },
        newTimestampButtonClick() {
            const video = document.getElementById(this.selectedVideo._id)
            this.newTimestamp = video.currentTime
            this.createNewTimestampAndActivity()
            this.toggleSaveButton()
        },
        toggleSaveButton() {
            let count = 0
            for(const activity of this.activities) {
                if(activity === '') {
                    count++
                }
            }
            if(count > 0) {
                document.getElementById('save-timestamps-button').disabled = true
            } else {
                document.getElementById('save-timestamps-button').disabled = false
            }
        },
        toggleAssignActivityModal(activityIndex) {
            this.isAssignActivityModalVisible = !this.isAssignActivityModalVisible
            if(this.isAssignActivityModalVisible) {
                this.currentIndex = activityIndex
                this.currentActivityTimestamp = this.timestamps[activityIndex]
            } 
            this.toggleSaveButton()
        },
        assignActivityModalSave(returnedArray) {
            this.activityModalData = returnedArray
            this.toggleAssignActivityModal()
            let answers = []
            for(const answer of this.activityModalData[2]) {
                answers.push(answer)
            }
            if(this.activities[this.currentIndex]._id){
                this.activities[this.currentIndex].timestamp = this.currentActivityTimestamp
                this.activities[this.currentIndex].questionType = this.activityModalData[0]
                this.activities[this.currentIndex].questionText = this.activityModalData[1]
                this.activities[this.currentIndex].answers = answers
                this.activities[this.currentIndex].correctAnswer = this.activityModalData[3]
                if(this.updatedActivities.indexOf(this.activities[this.currentIndex]._id) == -1) {
                    this.updatedActivities.push(this.activities[this.currentIndex]._id)
                }
            } else {
                this.activities[this.currentIndex] = new AssignActivity(this.currentActivityTimestamp,this.activityModalData[0],this.activityModalData[1],answers,this.activityModalData[3],this.selectedVideo._id)
            }
            this.toggleSaveButton()
        },
        createNewTimestampAndActivity() {
            if(this.timestamps.length > 0) {
                let count = 0
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
            this.toggleSaveButton()
        },
        deleteTimestamp(deletedTimestampIndex) {
            this.timestamps.splice(deletedTimestampIndex,1)
            this.formattedTimestamps.splice(deletedTimestampIndex,1)
            if((this.activities[deletedTimestampIndex]._id) && (this.deletedActivities.indexOf(this.activities[deletedTimestampIndex]._id != -1))){
                this.deletedActivities.push(this.activities[deletedTimestampIndex]._id)
            }
            if((this.activities[deletedTimestampIndex]._id) && (this.updatedActivities.indexOf(this.activities[deletedTimestampIndex]._id != -1))){
                const removeFromUpdatedList = this.updatedActivities.indexOf(this.activities[deletedTimestampIndex]._id)
                this.updatedActivities.splice(removeFromUpdatedList,1)
            }
            this.activities.splice(deletedTimestampIndex,1)
            this.toggleSaveButton()
        },
        async postActivitiesAPI() {
            var store = useActivityStore()
            for(const activity of this.activities) {
                if(!activity._id) {
                    await store.postActivities(activity.timestamp,activity.questionType,activity.questionText,activity.answers,activity.correctAnswer,activity.videoclipId)
                } 
            }
        },
        async updateActivitiesAPI() {
            var store = useActivityStore()
            for(const id of this.updatedActivities) {
                var index = this.activities.findIndex(activity => {
                    return activity._id === id
                })
                if(index != -1 || index != undefined) {
                    await store.updateActivities(this.activities[index]._id,this.activities[index].timestamp,this.activities[index].questionType,this.activities[index].questionText,this.activities[index].answers,this.activities[index].correctAnswer)
                }
            }
        },
        async deleteActivitiesAPI() {
            var store = useActivityStore()
            for(const activity of this.deletedActivities) {
                await store.deleteActivities(activity)
            }
        },
        async updateAPI(id, timestamps) {
            var videoClipStore = useVideoClipStore();
            await videoClipStore.updateTimestamps(id,timestamps)
            this.postActivitiesAPI()
            this.updateActivitiesAPI()
            this.deleteActivitiesAPI()
            this.returnToVideoSelectionPage()
            
        }
    },
    async mounted() {
        var videoClip = useVideoClipStore();
        var store = useUsersStore();
        if (store.currentUserToken.length < 1) {
            this.$router.push({
                name: "LoginPage"
            })
        }
        this.videoClips =  await videoClip.fetchVideoClips();
        this.ready = true;
    }
}
</script>

<style scoped>
.assign-timestamps {
    text-align: left;
}

.nav-link {
    min-height: 350px;
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
    flex-wrap: wrap;
    width: 100%;
    margin: 0 auto;
}

.lesson {
  flex: 1 0 25%;
  margin: 0 30px 30px 0;
  text-align: left;
  height: 350px;
  max-height: 350px;
  width: 285px;
  max-width: 285px;
  border-radius: 6px;
  box-shadow: 0 10px 10px #d1d1d1;
}

.lesson:hover {
    box-shadow: 0 15px 15px #d1d1d1;
}

.lesson-img {
  margin: none;
  width: 285px;
  height: 170px;
  border-radius: 6px 6px 0 0;
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
.video-link {
  margin: none;
  width: 285px;
  height: 170px;
}
.display-timestamps-div {
    position: relative;
    width: 310px;
    height: 400px;
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

.timestamps {
    overflow-y: auto;
    width: 310px;
    height: 300px;
    font-size: 0;
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
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 20px 10px;
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

#save-timestamps-button:disabled {
    background: #52746d;
    color: #cfcccc
}
</style>