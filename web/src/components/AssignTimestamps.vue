<template>
<div>
    <LoggedInNavBarVue />
    <br/><br/>
    <div v-if="ready" class="assign-timestamps">
        <div class="lessonNameDiv">
            <div class="update-lesson-name-div">
                <h2 id="lessonNameText">Edit Lesson Name: <input id="lessonNameInput"  v-model="lessonName"/> </h2>
                <button id="customize-lesson-button" @click="saveLessonName()">Update Name</button>
            </div>
            <h5 v-if="isNameUpdated" id="lessonSavedWarning">Lesson Name Updated</h5>
        </div>
        <br/>
        <h5 v-if="isOnInitialAssignTimestampsPage" id="isOnInitialAssignTimestampsPage">Select Quiz to Add Questions to:</h5>
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
                <video :id="selectedVideo._id" :src="selectedVideo.videoURL" />
                <div class="controls" id="controls">
                    <div v-show="isDraggingSeeker" class="video-time-clock">
                        <p>{{videoSeekerTime}}</p>
                    </div>
                    <div class="play-button-div">
                        <button class="play-pause-button" id="play-pause-button" @click="togglePlayVideo()" draggable="false">
                            <img v-show="videoStatus === 'Pause'" src="../../images/play.png">
                            <img v-show="videoStatus === 'Play'" src="../../images/pause.png">
                        </button>
                    </div>
                    <div class="video-time" id="video-time" draggable="false">
                        <span id="video-current-time">00:00</span>
                        <span> / </span> 
                        <span id="video-duration">00:00</span>
                    </div>
                    <div class="progress-div" id="progress-div">
                        <div class="progress-bar" id="progress-bar"></div>
                        <div class="draggable-seeker" id="draggable-seeker"></div>
                    </div>
                    <div class="add-timestamp-div" draggable="false">
                        <button id="add-timestamp-button" @click="newTimestampButtonClick()">
                            Timestamp
                            <TransitionGroup name="toggle-tooltip">
                                <div v-show="timestampMaxExceeded" :key="timestampMaxExceeded" class="show-exceeded-max-timestamps">
                                    <div class="exceeded-max-timestamps">
                                        <p>You have reached the maximum amount of timestamps.</p>
                                    </div>
                                    <div class="exceeded-max-timestamps-tail"></div>
                                </div>
                            </TransitionGroup>
                        </button>
                    </div>
                </div>
                <div class="timestamps-div">
                    <div class="display-timestamps-div">
                        <div class="timestamps">
                            <ul class="timestamp-ul" v-if="timestamps.length >= 1">
                                <li v-for="(timestamp,index) in formattedTimestamps" :key="timestamp">
                                    <button id="delete-timestamp-button" @click="deleteTimestamp(index)">X</button>
                                    {{timestamp}}

                                    <button v-if="activities[index] == ''" class="incomplete-timestamp" id="assign-activity-button" @click="toggleAssignActivityModal(index)" @mouseover="toggleHoverDescription(true, index)" @mouseleave="toggleHoverDescription(false, index)">
                                        <img src="../../images/activity.png">
                                    </button>

                                    <button v-else-if="activities[index] && activities[index] != '' && !checkForId(activities[index])" class="complete-timestamp" id="assign-activity-button" @click="toggleAssignActivityModal(index)" @mouseover="toggleHoverDescription(true, index)" @mouseleave="toggleHoverDescription(false, index)">
                                        <img v-show="activities[index].questionType == 'multiple-choice'" src="../../images/multiple-choice.png">
                                        <img v-show="activities[index].questionType == 'short-answer'" src="../../images/short-answer.png">
                                        <img v-show="activities[index].questionType == 'eye-tracking'" src="../../images/eye-tracking.png">
                                        <img v-show="activities[index].questionType == 'drag-and-drop'" src="../../images/drag-and-drop.png">
                                        <TransitionGroup name="toggle-tooltip">
                                            <div v-show="showHoverDescription && hoverDescriptionIndex === index" class="hover-description" :key="showHoverDescription">
                                                <ActivityHoverDescription :activity="activities[index]"/>
                                                <div class="tail"></div>
                                            </div>
                                        </TransitionGroup>
                                    </button>

                                    <button v-else class="pulled-timestamp" id="assign-activity-button" @click="toggleAssignActivityModal(index)" @mouseover="toggleHoverDescription(true, index)" @mouseleave="toggleHoverDescription(false, index)">
                                        <img v-show="activities[index].questionType == 'multiple-choice'" src="../../images/multiple-choice.png">
                                        <img v-show="activities[index].questionType == 'short-answer'" src="../../images/short-answer.png">
                                        <img v-show="activities[index].questionType == 'eye-tracking'" src="../../images/eye-tracking.png">
                                        <img v-show="activities[index].questionType == 'drag-and-drop'" src="../../images/drag-and-drop.png">
                                        <TransitionGroup name="toggle-tooltip">
                                            <div v-show="showHoverDescription && hoverDescriptionIndex === index" class="hover-description" :key="showHoverDescription">
                                                <ActivityHoverDescription :activity="activities[index]"/>
                                                <div class="tail"></div>
                                            </div>
                                        </TransitionGroup>
                                    </button>
                                    
                                    <button v-if="feedback[index] == ''" class="incomplete-feedback" id="feedback-button" @click="toggleFeedbackModal(index)">
                                        <img src="../../images/feedback.png">
                                    </button>

                                    <button v-else-if="feedback[index] && feedback[index] != '' && !checkForId(feedback[index])" class="complete-feedback" id="feedback-button" @click="toggleFeedbackModal(index)">
                                        <img src="../../images/feedback.png">
                                    </button>

                                    <button v-else class="pulled-feedback" id="feedback-button" @click="toggleFeedbackModal(index)">
                                        <img src="../../images/feedback.png">
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <button id="save-timestamps-button" @click="updateAPI(selectedVideo._id,timestamps)">Save</button>
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
import ActivityHoverDescription from '@/components/ActivityHoverDescription.vue'

export default {
    name: 'AssignTimestamps',
    components: { 
        AssignActivityModal,
        LoggedInNavBarVue,
        ActivityFeedbackModal,
        ActivityHoverDescription
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
            currentLesson: Object,
            isNameUpdated: false,
            lessonName: "",
            isOnInitialAssignTimestampsPage: true,
            showHoverDescription: false,
            hoverDescriptionIndex: Number,
            videoStatus: 'Pause',
            videoProgressPercent: 0,
            isDraggingSeeker: false,
            videoSeekerTime: '00:00',
            maxTimestamps: 7,
            timestampMaxExceeded: false
        }
    },
    props: {
        selectedLesson: {
            type: String
        }
        
    },
    methods: {
        async videoSelection(video) {
            this.selectedVideo = video
            await this.getLessonContent()
            this.isOnInitialAssignTimestampsPage = false
            this.isVideoSelected = !this.isVideoSelected
            setTimeout(() => {
                this.setupVideoTimeListeners()
                this.setupProgressBarListeners()
                this.setupSeekerEventListeners()
                this.setupProgressDivClickListener()
                this.resetVideo()
            }, 10)
        },
        returnToVideoSelectionPage(){
            this.isOnInitialAssignTimestampsPage = true
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
            this.videoProgressPercent = 0
            this.$router.push({
                name: "AssignTimestamps"
            })
        },
        setupVideoTimeListeners() {
            const videoElem = document.getElementById(this.selectedVideo._id)
            videoElem.addEventListener('timeupdate', () => {
                const videoCurrentTime = document.getElementById("video-current-time")
                const videoDuration = document.getElementById("video-duration")
                videoCurrentTime.innerHTML = formatTimeForVideo(videoElem.currentTime);
                videoDuration.innerHTML = formatTimeForVideo(videoElem.duration)
                if (videoElem.duration == videoElem.currentTime) {
                    videoElem.pause()
                    this.videoStatus = 'Pause'
                }
            })
        },
        setupProgressBarListeners() {
            const videoElem = document.getElementById(this.selectedVideo._id)
            videoElem.addEventListener('timeupdate', function() {
                let videoPosition = videoElem.currentTime / videoElem.duration
                let barWidth = videoPosition * 100
                const progressBar = document.getElementById('progress-bar')
                const seeker = document.getElementById('draggable-seeker')
                progressBar.style.width =  barWidth + '%'
                seeker.style.left = barWidth + '%'
            })
        },
        setupSeekerEventListeners() {
            const seeker = document.getElementById('draggable-seeker')
            if(seeker) {
                this.seekerMouseDownListener()
                this.seekerMouseUpListener()
                this.setupProgressDivClickListener()
            }
        },
        setupProgressDivClickListener() {
            const seeker = document.getElementById('draggable-seeker')
            const progressDiv = document.getElementById('progress-div')
            const progressDivRect = progressDiv.getBoundingClientRect()
            const progressDivWidth = progressDivRect.width
            progressDiv.addEventListener('click', (event) => {
                event.preventDefault()
                const progressBar = document.getElementById('progress-bar')
                let newX = event.layerX
                this.videoProgressPercent = newX / progressDivWidth
                seeker.style.left = (this.videoProgressPercent * 100) + '%'
                progressBar.style.width = (this.videoProgressPercent * 100) + '%'

                const video = document.getElementById(this.selectedVideo._id)
                video.currentTime = this.videoProgressPercent * video.duration
            })
        },
        seekerMouseDownListener() {
            const seeker = document.getElementById('draggable-seeker')
            const progressDiv = document.getElementById('progress-div')
            const progressDivRect = progressDiv.getBoundingClientRect()
            const progressDivWidth = progressDivRect.width
            seeker.addEventListener('mousedown', () => {
                this.isDraggingSeeker = true
                progressDiv.addEventListener('mousemove', (event) => {
                    event.preventDefault()
                    if(event.target.id == 'progress-div' || event.target.id == 'progress-bar') {
                        const progressBar = document.getElementById('progress-bar')
                        let newX = event.layerX
                        this.videoProgressPercent = newX / progressDivWidth
                        seeker.style.left = (this.videoProgressPercent * 100) + '%'
                        progressBar.style.width = (this.videoProgressPercent * 100) + '%'
                        
                        const video = document.getElementById(this.selectedVideo._id)
                        let seekerProgress =  this.videoProgressPercent * video.duration
                        this.videoSeekerTime = formatTimeForVideo(seekerProgress)
                    }
                })
            })
        },
        seekerMouseUpListener() {
            const seeker = document.getElementById('draggable-seeker')
            const video = document.getElementById(this.selectedVideo._id)
            seeker.addEventListener('mouseup', (event) => {
                event.preventDefault()
                if(event.target.id === 'draggable-seeker') {
                    this.isDraggingSeeker = false
                    video.currentTime = this.videoProgressPercent * video.duration
                    this.replaceVideoControlElements()
                    this.setupSeekerEventListeners() 
                }  
            })

            const videoTimer = document.getElementById('video-time')
            videoTimer.addEventListener('mouseup', (event) => {
                event.preventDefault()
                this.resetVideo()
            })

            const controls = document.getElementById('controls')
            controls.addEventListener('mouseup', (event) => {
                event.preventDefault()
                if(this.isDraggingSeeker === true) {
                    this.isDraggingSeeker = false
                    if(event.layerX <= 145) {
                        video.currentTime = 0
                    } else if(event.layerX >= 836) {
                        video.currentTime = video.duration
                    } else {
                        const progressBar = document.getElementById('progress-bar')
                        const progressDiv = document.getElementById('progress-div')
                        const progressDivRect = progressDiv.getBoundingClientRect()
                        const progressDivWidth = progressDivRect.width
                        let newX = event.layerX - 145
                        this.videoProgressPercent = newX / progressDivWidth
                        seeker.style.left = (this.videoProgressPercent * 100) + '%'
                        progressBar.style.width = (this.videoProgressPercent * 100) + '%'
                        video.currentTime = this.videoProgressPercent * video.duration
                    }
                    this.replaceVideoControlElements()
                    this.setupSeekerEventListeners() 
                }
            })

        },
        replaceVideoControlElements() {
            const seeker = document.getElementById('draggable-seeker')
            const progressDiv = document.getElementById('progress-div')
            const progressBar = document.getElementById('progress-bar')
            const newSeeker = seeker.cloneNode(false)
            const newProgressDiv = progressDiv.cloneNode(false)
            newProgressDiv.appendChild(progressBar)
            newProgressDiv.appendChild(newSeeker)
            progressDiv.replaceWith(newProgressDiv)
        },
        resetVideo() {
            const video = document.getElementById(this.selectedVideo._id)
            const seeker = document.getElementById('draggable-seeker')
            const progressBar = document.getElementById('progress-bar')
            const videoCurrentTime = document.getElementById('video-current-time')
            video.currentTime = 0
            seeker.style.left = 0 + '%'
            progressBar.style.width = 0 + '%'
            videoCurrentTime.innerHTML = '00:00'
        },
        moveVideoToTimestampFrame() {
            const videoElem = document.getElementById(this.selectedVideo._id)
            videoElem.currentTime = this.currentActivityTimestamp

            let videoPosition = videoElem.currentTime / videoElem.duration
            let barWidth = videoPosition * 100
            const progressBar = document.getElementById('progress-bar')
            const seeker = document.getElementById('draggable-seeker')
            progressBar.style.width =  barWidth + '%'
            seeker.style.left = barWidth + '%'
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
        togglePlayVideo() {
            const video = document.getElementById(this.selectedVideo._id)
            if (video.paused) {
                setTimeout(() => {
                    video.play()
                }, 10)
                this.videoStatus = 'Play'
            } else {
                setTimeout(() => {
                    video.pause()
                }, 10)
                this.videoStatus = 'Pause'
            }
        },
        newTimestampButtonClick() {
            if(this.timestamps.length >= this.maxTimestamps) {
                if(this.timestampMaxExceeded === false) {
                    this.timestampMaxExceeded = true
                    setTimeout(() => {
                        this.timestampMaxExceeded = false
                    }, 2000)
                }
            } else {
                const video = document.getElementById(this.selectedVideo._id)
                this.newTimestamp = video.currentTime
                this.createNewTimestamp()
                this.toggleSaveButton()
            }
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
                this.feedback[this.currentFeedbackIndex].correctFeedback = returnedData[2]
                this.feedback[this.currentFeedbackIndex].incorrectFeedback = returnedData[3]
                if(this.updatedFeedback.indexOf(this.feedback[this.currentFeedbackIndex]._id) == -1) {
                    this.updatedFeedback.push(this.feedback[this.currentFeedbackIndex]._id)
                }
            } else {
                this.feedback[this.currentFeedbackIndex] = new FeedbackDto(this.selectedVideo._id, '', returnedData[1], returnedData[2], returnedData[3])
            }
            this.toggleSaveButton()
        },
        toggleHoverDescription(isShown, index) {
            if(isShown) {
                this.hoverDescriptionIndex = index
                this.showHoverDescription = true
            } else {
                this.hoverDescriptionIndex = Number
                this.showHoverDescription = false
            }
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
            this.lessonName = lessonName
            this.isNameUpdated = true
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
    },
    watch: {
        lessonName() {
            this.isNameUpdated = false;
        }
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

.controls {
    display: flex;
    position: absolute;
    flex-wrap: wrap;
    margin-top: 540px;
    background: #0e333c;
    width: 972px;
    height: 50px;
    border-bottom-right-radius: 13px;
    border-bottom-left-radius: 13px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.video-time {
    display: flex;
    flex-direction: row;
    width: 75px;
    margin-right: 10px;
    justify-content: space-between;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
}

.video-time span {
    display: flex;
    align-items: center;
    color: white;
    font-size: 13px;
    text-align: center;
}

.video-time-clock {
    background-image: url('../../images/blank-clock.png');
    background-position: center; 
    background-repeat: no-repeat; 
    background-size: cover;
    height: 85px;
    width: 85px;
    position: absolute;
    margin: -100px 50%;
    text-align: center;
    border: 2px solid #000000;
    border-radius: 50%;
    background-color: #ffffff;
}

.video-time-clock p {
    color: #000000;
    margin: 26px 0 0 0;
    font-size: 17px;
    font-weight: bold;
}

.play-button-div {
    width: 40px;
    height: 40px;
    margin: 9px 5px 0 10px;
}

.play-pause-button {
    width: 30px;
    height: 30px;
    background: #52746d;
    border: none;
    border-radius: 50%;
}

.play-pause-button img {
    width: 25px;
    margin-left: -3px;
}

.play-pause-button:hover {
    background: #415551;
}

.progress-div {
    position: relative;
    margin: 15px 10px 0 5px;
    width: 690px;
    height: 20px;
    background: black;
    border-radius: 6px;
    cursor: pointer;
}

.progress-bar {
    width: 10px;
    height: 20px;
    background: #FFA500;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
}

.draggable-seeker {
    display: flex;
    position: relative;
    width: 10px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #636363;
    border-radius: 6px;
    left: 0%;
    margin: -30px 0 0 0;
    cursor: pointer;
}

.add-timestamp-div {
    width: 117px;
}

#add-timestamp-button {
    float: right;
    text-align: center;
    border: none;
    font-size: 20px;
    text-shadow: 1px 1px #0e333c;
    color: white;
    background: #4AAE9B;
    width: 117px;
    height: 30px;
    border-radius: 10px;
    margin: 9px 0 9px 0;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

#add-timestamp-button:hover {
    background: #349b88;
}

.main-content-div {
    display: flex;
    flex-direction: row;
}

.timestamps-div {
    position: relative;
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
    height: 590px;
    margin-left: 10px;
    background: #0e333c;
    border:  1px solid black;
    border-radius: 10px;
    margin-bottom: 20px;
    font-size: 0;
}

.timestamps {
    width: 320px;
    font-size: 0;
}

ul.timestamp-ul {
    margin-left: auto;
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
    border: 2px solid #4AAE9B;
    border-radius: 5px;
}

#lessonNameInput:hover {
    box-shadow: 0 3px 3px #d1d1d1;
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

#lessonSavedWarning {
    font-weight:300;
    text-align: center;
    color: #0e333c;
}
#lessonSaved {
    left: 50%;
}

.lessonNameDiv {
    border: 3px solid #52746d;
    padding: 10px;
    border-radius: 8px;
}

.hover-description {
    position: relative;
}

.tail {
    position: absolute;
    bottom: 30px;
    left: 12px;
    width: 0;
    height: 0;
    border-color:#f9f9f9 transparent transparent transparent;
    border-width: 10px;
    border-style: solid;
}

.show-exceeded-max-timestamps {
    position: relative;
}

.exceeded-max-timestamps {
    position: absolute;
    width: 150px;
    height: 100px;
    background: #ffffff;
    margin-top: -140px;
    margin-left: -25px;
    box-shadow: 0 0 15px #141414
}

.exceeded-max-timestamps p {
    color: #000000;
    text-shadow: none;
    font-size: 16px;
}

.exceeded-max-timestamps-tail {
    position: absolute;
    bottom: 20px;
    right: 44px;
    width: 0;
    height: 0;
    border-color: #f9f9f9 transparent transparent transparent;
    border-width: 10px;
    border-style: solid;
}

::-webkit-scrollbar {
    width: 13px;
}
  
::-webkit-scrollbar-track {
    background: #ffffff; 
}
   
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px; 
}
  
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}

.toggle-tooltip-leave-from,
.toggle-tooltip-enter-to  {
    opacity: 1;
}

.toggle-tooltip-leave-to,
.toggle-tooltip-enter-from {
    opacity: 0;
}

.toggle-tooltip-leave-active {
  transition: all .1s ease-in-out;
}

.toggle-tooltip-enter-active {
  transition: all .25s ease-in-out;
}

</style>