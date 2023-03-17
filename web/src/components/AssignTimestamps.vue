<template>
<div>
    <LoggedInNavBarVue />
    <br/><br/>
    <div v-if="ready" class="assign-timestamps">
        <div class="update-lesson-name-div">
            <h2 id="lessonNameText">Edit Lesson Name: <input id="lessonNameInput" :value="lessonName"/> </h2>
            <button id="customize-lesson-button" @click="saveLessonName()">Save</button>
        </div>
        <div class="video-list-div" v-if="isVideoSelected == false">
            <div class="lesson" v-for="video in this.videoClips" :key="video._id">
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
                                    <button v-if="activities[index] == ''" class="incomplete-timestamp" id="assign-activity-button" @click="toggleAssignActivityModal(index)"><img src="../../images/activity.png"></button>
                                    <button v-else-if="activities[index] && activities[index] != '' && !checkForId(activities[index])" class="complete-timestamp" id="assign-activity-button" @click="toggleAssignActivityModal(index)"><img src="../../images/activity.png"></button>
                                    <button v-else class="pulled-timestamp" id="assign-activity-button" @click="toggleAssignActivityModal(index)"><img src="../../images/activity.png"></button>
                                    
                                    <button v-if="feedback[index] == ''" class="incomplete-feedback" id="feedback-button" @click="toggleFeedbackModal(index)"><img src="../../images/feedback.png"></button>
                                    <button v-else-if="feedback[index] && feedback[index] != '' && !checkForId(feedback[index])" class="complete-feedback" id="feedback-button" @click="toggleFeedbackModal(index)"><img src="../../images/feedback.png"></button>
                                    <button v-else class="pulled-feedback" id="feedback-button" @click="toggleFeedbackModal(index)"><img src="../../images/feedback.png"></button>
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
            <AssignActivityModal v-if="isAssignActivityModalVisible" :activity="activities[currentActivityIndex]" :questionTypeExists="activities[currentActivityIndex].questionType" :timestamp="currentActivityTimestamp" @close="toggleAssignActivityModal" @save="assignActivityModalSave"/>
            <ActivityFeedbackModal v-if="isFeedbackModalVisible" :feedback="feedback[currentFeedbackIndex]" :activityId="activities[currentFeedbackIndex]._id" :timestamp="currentFeedbackTimestamp" @close="toggleFeedbackModal" @save="feedbackModalSave"/>
        </div>
    </div>
</div>
</template>

<script>
import LoggedInNavBarVue from './LoggedInNavBar.vue'
import VideoClipDto from '@/models/VideoClipDto.js'
import AssignActivityDto from '@/models/AssignActivityDto.js'
import FeedbackDto from '@/models/FeedbackDto.js'
import AssignActivityModal from '@/components/modals/AssignActivityModal.vue'
import { useVideoClipStore } from "@/stores/VideoClipStore"
import {formatTimeForVideo} from '@/util/FormatVideosTime.js'
import { useActivityStore } from '@/stores/ActivityStore'
import { useFeedbackStore } from '@/stores/FeedbackStore'
import { useUsersStore } from '@/stores/UserStore'
import ActivityFeedbackModal from '@/components/modals/ActivityFeedbackModal.vue'
import { useInstructorLessonStore } from '@/stores/InstructorLessonStore'
import { useLessonStore } from '@/stores/LessonsStore'

export default {
    name: 'AssignTimestamps',
    components: { 
        AssignActivityModal,
        LoggedInNavBarVue,
        ActivityFeedbackModal
    },
    data() {
        return {
            isVideoSelected: false,
            selectedVideo: VideoClipDto,
            videoClips: [],
            isTimestampModalVisible: false,
            isSaveTimestampsModalVisible: false,
            isAssignActivityModalVisible: false,
            isFeedbackModalVisible: false,
            newTimestamp: Number,
            currentActivityTimestamp: Number,
            currentFeedbackTimestamp: Number,
            timestamps: [],
            formattedTimestamps: [],
            ready: false,
            activityModalData: [],
            activities: [],
            deletedActivities: [],
            updatedActivities: [],
            feedback: [],
            deletedFeedback: [],
            updatedFeedback: [],
            currentActivityIndex: Number,
            currentFeedbackIndex: Number,
            currentUserType: [],
            lessonId: "",
            currentLesson: Object
        }
    },
    props: {
        selectedLesson: {
            type: String
        }
        
    },
    methods: {
        videoSelection(video) {
            this.selectedVideo = video
            this.getLessonContent()
            this.isVideoSelected = !this.isVideoSelected
        },
        returnToVideoSelectionPage(){
            this.isVideoSelected = false
            this.timestamps = []
            this.formattedTimestamps = []
            this.activities = []
            this.deletedActivities = []
            this.updatedActivities = []
            this.feedback = []
            this.deletedFeedback = []
            this.updatedFeedback = []
            this.activityModalData = []
            this.$router.push({
                name: "AssignTimestamps"
            })
        },
        moveVideoToTimestampFrame() {
            const video = document.getElementById(this.selectedVideo._id)
            video.currentTime = this.currentActivityTimestamp
        },
        async getLessonContent() {
            if(this.selectedVideo.timeStamps) {
                this.timestamps = this.selectedVideo.timeStamps
                for(var timestamp of this.timestamps) {
                    this.formattedTimestamps.push(formatTimeForVideo(timestamp))
                }
            }
            await this.getFromActivityStore()
            await this.getFromFeedbackStore()
        },
        orderActivitiesByTimestamp() {
            this.activities.sort((a,b) => a.timestamp - b.timestamp)
        },
        sortFeedback() {
            let feedbackList = this.feedback
            let fromIndex = 0
            for(const feedback of this.feedback) {
                let toIndex = 0
                for(const activity of this.activities) {
                    if(feedback.activityId === activity._id) {
                        if(fromIndex !== toIndex) {
                            feedbackList.splice(fromIndex, 1)
                            feedbackList.splice(toIndex, 0, feedback)
                        }
                    }
                    toIndex +=1
                }
                fromIndex +=1
            }
            this.feedback = feedbackList
        },
        async getFromActivityStore() {
            var store = useActivityStore()
            await store.fetchActivitiesByVideoclipId(this.selectedVideo._id)
            this.activities = store.activityList
            this.orderActivitiesByTimestamp()
        },
        async getFromFeedbackStore() {
            var store = useFeedbackStore()
            await store.fetchFeedbackByVideoclipId(this.selectedVideo._id)
            this.feedback = store.feedbackList
            if(this.feedback.length > 0) {
                this.sortFeedback()
            }
        },
        newTimestampButtonClick() {
            const video = document.getElementById(this.selectedVideo._id)
            this.newTimestamp = video.currentTime
            this.createNewTimestamp()
            this.toggleSaveButton()
        },
        createNewTimestamp() {
            if(this.timestamps.length > 0) {
                let count = 0
                for(const timestamp of this.timestamps) {
                    if(timestamp > this.newTimestamp) {
                        this.timestamps.splice(count,0,this.newTimestamp)
                        this.formattedTimestamps.splice(count,0,formatTimeForVideo(this.newTimestamp))
                        this.activities.splice(count,0,'')
                        this.feedback.splice(count,0,'')
                        break
                    } else if(count == this.timestamps.length-1) {
                        this.timestamps.splice(count+1,0,this.newTimestamp)
                        this.formattedTimestamps.splice(count+1,0,formatTimeForVideo(this.newTimestamp))
                        this.activities.splice(count+1,0,'')
                        this.feedback.splice(count+1,0,'')
                        break
                    }else {
                        count++
                    }
                }
            } else {
                this.timestamps.splice(0,0,this.newTimestamp)
                this.formattedTimestamps.splice(0,0,formatTimeForVideo(this.newTimestamp))
                this.activities.splice(0,0,'')
                this.feedback.splice(0,0,'')
            }
            this.toggleSaveButton()
        },
        toggleSaveButton() {
            let count = 0
            for(const activity of this.activities) {
                if(activity === '') {
                    count++
                }
            }
            for(const feedback of this.feedback) {
                if(feedback === '') {
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
                this.currentActivityIndex = activityIndex
                this.currentActivityTimestamp = this.timestamps[activityIndex]
                const video = document.getElementById(this.selectedVideo._id)
                video.pause()
                this.moveVideoToTimestampFrame()
            } 
            this.toggleSaveButton()
        },
        assignActivityModalSave(returnedData) {
            this.activityModalData = returnedData
            this.toggleAssignActivityModal()
            let answers = []
            for(const answer of this.activityModalData[2]) {
                answers.push(answer)
            }
            if(this.activities[this.currentActivityIndex]._id) {
                this.activities[this.currentActivityIndex].timestamp = this.currentActivityTimestamp
                this.activities[this.currentActivityIndex].questionType = this.activityModalData[0]
                this.activities[this.currentActivityIndex].questionText = this.activityModalData[1]
                this.activities[this.currentActivityIndex].answers = this.activityModalData[2]
                this.activities[this.currentActivityIndex].correctAnswer = this.activityModalData[3]
                if(this.updatedActivities.indexOf(this.activities[this.currentActivityIndex]._id) == -1) {
                    this.updatedActivities.push(this.activities[this.currentActivityIndex]._id   )
                }
            } else {
                this.activities[this.currentActivityIndex] = new AssignActivityDto(this.currentActivityTimestamp,this.activityModalData[0],this.activityModalData[1],this.activityModalData[2],this.activityModalData[3],this.selectedVideo._id)
            }
            this.toggleSaveButton()
        },
        toggleFeedbackModal(feedbackIndex) {
            this.isFeedbackModalVisible = !this.isFeedbackModalVisible
            if(this.isFeedbackModalVisible) {
                this.currentFeedbackIndex = feedbackIndex
                this.currentFeedbackTimestamp = this.timestamps[feedbackIndex]
                const video = document.getElementById(this.selectedVideo._id)
                video.pause()
            } 
            this.toggleSaveButton()
        },
        feedbackModalSave(returnedData) {
            this.toggleFeedbackModal()
            if(this.feedback[this.currentFeedbackIndex]._id) {
                this.feedback[this.currentFeedbackIndex].correctFeedback = returnedData[1]
                this.feedback[this.currentFeedbackIndex].incorrectFeedback = returnedData[2]
                if(this.updatedFeedback.indexOf(this.feedback[this.currentFeedbackIndex]._id) == -1) {
                    this.updatedFeedback.push(this.feedback[this.currentFeedbackIndex]._id)
                }
            } else {
                this.feedback[this.currentFeedbackIndex] = new FeedbackDto(this.selectedVideo._id, '', returnedData[1], returnedData[2], returnedData[3])
            }
            this.toggleSaveButton()
        },
        checkForId(object) {
            if(object._id) {
                return true
            } else {
                return false
            }
        },
        deleteTimestamp(deletedTimestampIndex) {
            this.timestamps.splice(deletedTimestampIndex,1)
            this.formattedTimestamps.splice(deletedTimestampIndex,1)
            if((this.activities[deletedTimestampIndex]._id) && (this.deletedActivities.indexOf(this.activities[deletedTimestampIndex]._id != -1))){
                this.deletedActivities.push(this.activities[deletedTimestampIndex]._id)
            }
            if((this.feedback[deletedTimestampIndex]._id) && (this.deletedFeedback.indexOf(this.feedback[deletedTimestampIndex]._id != -1))){
                this.deletedFeedback.push(this.feedback[deletedTimestampIndex]._id)
            }
            if((this.activities[deletedTimestampIndex]._id) && (this.updatedActivities.indexOf(this.activities[deletedTimestampIndex]._id != -1))){
                const removeFromUpdatedList = this.updatedActivities.indexOf(this.activities[deletedTimestampIndex]._id)
                this.updatedActivities.splice(removeFromUpdatedList,1)
            }
            if((this.feedback[deletedTimestampIndex]._id) && (this.updatedFeedback.indexOf(this.feedback[deletedTimestampIndex]._id != -1))){
                const removeFromUpdatedList = this.updatedFeedback.indexOf(this.feedback[deletedTimestampIndex]._id)
                this.updatedFeedback.splice(removeFromUpdatedList,1)
            }
            this.activities.splice(deletedTimestampIndex, 1)
            this.feedback.splice(deletedTimestampIndex, 1)
            this.toggleSaveButton()
        },
        async postActivitiesAPI() {
            var store = useActivityStore()
            let index = 0
            for(const activity of this.activities) {
                if(!activity._id) {
                    await store.postActivities(activity.timestamp,activity.questionType,activity.questionText,activity.answers,activity.correctAnswer,activity.videoclipId)
                    let newActivity = store.newActivity
                    let id = newActivity._id
                    this.feedback[index].activityId = id
                }
                index +=1
            }
        },
        async updateActivitiesAPI() {
            var store = useActivityStore()
            const activitiesList = this.activities
            for(const id of this.updatedActivities) {
                var index = activitiesList.findIndex(activity => activity._id == id)
                await store.updateActivities(activitiesList[index]._id,activitiesList[index].timestamp,activitiesList[index].questionType,activitiesList[index].questionText,activitiesList[index].answers,activitiesList[index].correctAnswer)
            }
        },
        async deleteActivitiesAPI() {
            var store = useActivityStore()
            for(const id of this.deletedActivities) {
                await store.deleteActivities(id)
            }
        },
        async postFeedbackAPI() {
            var store = useFeedbackStore()
            for(const feedback of this.feedback) {
                if(!feedback._id) {
                    console.log(feedback.timestamp)
                    await store.postFeedback(feedback.videoclipId, feedback.activityId, feedback.timestamp, feedback.correctFeedback, feedback.incorrectFeedback)
                }
            }
        },
        async updateFeedbackAPI() {
            var store = useFeedbackStore()
            const feedbackList = this.feedback
            for(const id of this.updatedFeedback) {
                var index = feedbackList.findIndex(feedback => feedback._id == id)
                await store.updateFeedback(feedbackList[index]._id, feedbackList[index].correctFeedback, feedbackList[index].incorrectFeedback)
            }
        },
        async deleteFeedbackAPI() {
            var store = useFeedbackStore()
            for(const id of this.deletedFeedback) {
                await store.deleteFeedback(id)
            }
        },
        async updateAPI(id, timestamps) {
            var videoClipStore = useVideoClipStore();
            await videoClipStore.updateTimestamps(id,timestamps)
            await this.postActivitiesAPI()
            await this.postFeedbackAPI()
            await this.updateActivitiesAPI()
            await this.updateFeedbackAPI()
            await this.deleteActivitiesAPI()
            await this.deleteFeedbackAPI()
            this.returnToVideoSelectionPage()
        },
        async saveLessonName() {
            let lessonName = document.getElementById('lessonNameInput').value
            let instructorLessons = useInstructorLessonStore();
            let lessons = useLessonStore()
            if (this.userType == "Admin") {
                await lessons.updateLessonName(this.lessonId, lessonName)
            } else if (this.userType == "Instructor") {
                await instructorLessons.updateInstructorLessonName(this.lessonId, lessonName)
            }
        }
    },
    async mounted() {
        var lessonStore = useLessonStore()
        var instructorLessonStore = useInstructorLessonStore()
        this.userType = this.$cookies.get("user_session").currentUserType
        if (this.userType == "Admin") {
            this.currentLesson = await lessonStore.getLessonById(this.selectedLesson)
        } else if (this.userType == "Instructor") {
            this.currentLesson = await instructorLessonStore.fetchLessonById(this.selectedLesson)
        }
        var userStore = useUsersStore();
        let instructorUsername = this.$cookies.get("user_session").currentUserName
        let instructor =  await userStore.getUserByName(instructorUsername)
        this.instructorId = instructor._id
        var videoClip = useVideoClipStore();
        this.lessonName = this.currentLesson.name
        this.lessonId = this.selectedLesson
        let videoIdsArray = this.currentLesson.videoClipsArray
        for (let i=0;i<videoIdsArray.length;i++) {
            this.videoClips.push(await videoClip.fetchVideoClipById(videoIdsArray[i]._id))
        }
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

.nav-link p {
    padding-left: 10px;
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
  width: 972px;
  height: 550px;
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
    width: 320px;
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
    overflow-x: none;
    overflow-y: auto;
    width: 320px;
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

.timestamp-ul img {
    max-height: 35px;
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
    margin: 0 5px 0 15px;
    text-align: center;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 1px black;
    box-shadow: 0 6px 6px #000000;
    min-width: 55px;
    min-height: 55px;
    border-radius: 15px;
}

#assign-activity-button:hover {
    box-shadow: 0 8px 8px #000000;
}

#feedback-button {
    margin: 0 0 0 5px;
    text-align: center;
    border: none;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 1px black;
    box-shadow: 0 6px 6px #000000;
    min-width: 55px;
    min-height: 55px;
    border-radius: 15px;
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

.pulled-timestamp {
    background-color: #4AAE9B;
}

.pulled-timestamp:hover {
    background-color: #349b88;
}

.incomplete-timestamp {
    background-color: #ff0000;
}

.incomplete-timestamp:hover {
    background-color: #e20000;
}

.complete-timestamp {
    background-color: #0fb842;
}

.complete-timestamp:hover {
    background-color: #0ea83d;
}

.pulled-feedback {
    background-color: #4AAE9B;
}

.pulled-feedback:hover {
    background-color: #349b88;
}

.incomplete-feedback {
    background-color: #ff0000;
}

.incomplete-feedback:hover {
    background-color: #e20000;
}

.complete-feedback {
    background-color: #0fb842;
}

.complete-feedback:hover {
    background-color: #0ea83d;
}

#lessonNameText {
        text-align: center;
}

#lessonNameInput {
    border: 3px solid #4AAE9B;
    border-radius: 5px;
}
#customize-lesson-button {
    text-align: center;
    margin-left: 22px;
    border: none;
    font-size: 25px;
    color: white;
    text-shadow: 1px 1px 1px black;
    box-shadow: 0 6px 6px #d1d1d1;
    background: #4AAE9B;
    min-width: 100px;
    min-height: 40px;
    border-radius: 15px;
}
    
#customize-lesson-button:hover {
    background: #349b88;
    box-shadow: 0 10px 10px #d1d1d1;
}

.update-lesson-name-div {
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
    margin-bottom: 20px;
}

.update-lesson-name-div button {
    margin-bottom: 10px;
}

@media only screen and (max-width: 1399px){
    .main-content-div {
        margin-left: -75px;
    }
}
</style>