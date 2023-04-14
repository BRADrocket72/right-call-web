<template>
    <div>
        <LoggedInNavBar />
        <br/><br/>
        <h1>
            Class Results
        </h1>
        <div v-if="classesEmpty" class="classes-container">
            <div class="empty-classes">
                <h4>You have not created any classes.</h4>
                <p>No Classes Created? <a class="to-class-creation-page" @click="redirectToClassCreationPage" >Create a Class Here</a></p>
            </div>
        </div>
        <div v-else class="classes-container">
            <div class="class-list-div">
                <ul class="class-list">
                    <h4>Select a Class</h4>
                    <li v-for="(instructorClass, index) in instructorClasses" :key="instructorClass" class="class-li" :id="'instructor-class-' + (index + 1)" @click="flipArrow(instructorClass, index)">
                        <p class="class-name">{{instructorClass.className}}</p>
                        <span class="class-info">
                            <p class="student-count"><b>Students: </b>{{instructorClass.studentIds.length}}</p>
                            <p class="lesson-count"><b>Lessons: </b>{{instructorClass.lessonIds.length}}</p>
                        </span>
                        <p class="arrow-p"><i id="arrow" class="arrow-right"></i></p>
                    </li>
                </ul>
            </div>
                <TransitionGroup name="show-lessons">
                    <div v-if="isLessonListVisible && classHasLessons" class="lesson-list-div">
                        <TransitionGroup name="change-lessons" tag="ul" class="lesson-list">
                            <h4>Select a Lesson</h4>
                            <li v-for="lesson in lessonList" :key="lesson" class="lesson-li" @click ="reRouteViewStudent(lesson._id)">
                                <p class="lesson-name">{{lesson.name}}</p>
                                <p class="lesson-description">{{lesson.description}}</p>
                            </li>
                        </TransitionGroup>
                    </div>
                    <div v-else-if="isLessonListVisible && !classHasLessons" class="empty-class">
                        <h2 class="empty-message">This class contains no lessons</h2>
                    </div>
                </TransitionGroup>
        </div>
    </div>
</template>

<script>
import { useUsersStore } from '@/stores/UserStore'
import { useInstructorClassStore } from '@/stores/InstructorClassStore'
import { useInstructorLessonStore } from '@/stores/InstructorLessonStore'
import LoggedInNavBar from './LoggedInNavBar.vue'

export default {
    name: 'SelectStudentResults',
    components: { 
        LoggedInNavBar 
    },
    data() {
        return {
            instructorId: String,
            instructorClasses: [],
            classesEmpty: false,
            lessonList: [],
            isLessonListVisible: false,
            classHasLessons: false,
            selectedElement: HTMLElement,
            selectedClass: Object

        }
    },
    methods: {
        async getInstructorClasses() {
            let userStore = useUsersStore()
            let instructorClassStore = useInstructorClassStore()
            let instructorUsername = this.$cookies.get("user_session").currentUserName
            let instructor = await userStore.getUserByName(instructorUsername)
            this.instructorId = instructor._id
            this.instructorClasses = await instructorClassStore.getClassesByInstructorId(this.instructorId)
            if (this.instructorClasses.length == 0 ) {
              this.classesEmpty = true
            }
        },
        async flipArrow(instructorClass, index) {
            this.selectedClass = instructorClass
            const element = 'instructor-class-' + (index + 1)
            const selected = document.getElementById(element)
            let arrow = selected.querySelector('#arrow')
            if(this.selectedElement !== HTMLElement) {
                if(this.selectedElement === selected) {
                    if(arrow.classList.contains('arrow-right')) {
                        arrow.classList.remove('arrow-right')
                        arrow.classList.add('arrow-left')
                    } else {
                        arrow.classList.remove('arrow-left')
                        arrow.classList.add('arrow-right')
                        this.isLessonListVisible = false
                        this.lessonList = []
                        return
                    } 
                } else {
                    const oldArrow = this.selectedElement.querySelector('#arrow')
                    oldArrow.classList.remove('arrow-left')
                    oldArrow.classList.add('arrow-right')
                    this.lessonList = []
                    arrow.classList.remove('arrow-right')
                    arrow.classList.add('arrow-left')
                }
            } else {
                arrow.classList.remove('arrow-right')
                arrow.classList.add('arrow-left')
            }
            await this.displayLessons(instructorClass.lessonIds)
            this.selectedElement = selected
            this.isLessonListVisible = true
        },
        async displayLessons(lessonIds) {
            let instructorLessonStore = useInstructorLessonStore()
            for(const id of lessonIds) {
                let lessonInfo = await instructorLessonStore.fetchLessonById(id)
                this.lessonList.push(lessonInfo)
            }
            if(this.lessonList.length > 0) {
                this.classHasLessons = true
            } else {
                this.classHasLessons = false
            }
        },
        redirectToClassCreationPage() {
            this.$router.push({
                name: "CreateClassroomPage"
            })
        },
        reRouteViewStudent(lessonId){
            this.$router.push({
                name: "ViewStudentResultsPage",
                params: {
                    lessonId: lessonId,
                    classId: this.selectedClass._id
                }
            });
        }
    },
    mounted() {
        this.getInstructorClasses()
    }
}
</script>

<style scoped>

.classes-container {
    display: flex;
    flex-direction: row;
    margin: 100px auto auto 200px;
}

.class-list-div {
    display: flex;
    max-width: 450px;
    min-width: 450px;
    margin-right: 30px;
}

.class-list {
    flex-direction: row;
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.class-li {
    display: flex;
    text-align: center;
    min-height: 75px;
    max-height: 75px;
    min-width: 450px;
    max-width: 450px;
    border-top: 1px solid #0e333c;
    border-left: 1px solid #0e333c;
    border-right: 1px solid #0e333c;
}

.class-li .class-name {
    padding: 0;
    margin: auto 0 auto 0;
    min-width: 200px;
    max-width: 200px;
    font-size: 20px;
    color: #0e333c;
}

.class-li .arrow-p {
    display: flex;
    margin: 0;
    padding: 0;
    min-width: 50px;
    max-width: 50px;
    background: #0e333c;
    border-bottom: 1px solid #ffffff;
}

.class-li:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.class-li:first-child .arrow-p{
    border-top-right-radius: 6px;
}

.class-li:last-child {
    border-bottom: 1px solid #0e333c;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}

.class-li:last-child .arrow-p{
    border-bottom-right-radius: 6px;
    border-bottom: none;
}

.class-li:hover {
    background: #e8dede;
    cursor: pointer;
}

.arrow-right {
    display: flex;
    margin: auto;
    padding: 5px;
    border: solid #ffffff;
    border-width: 0 3px 3px 0;
    display: inline-block;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transition: all .35s linear;
}

.arrow-left {
    display: flex;
    margin: auto;
    padding: 5px;
    border: solid #ffffff;
    border-width: 0 3px 3px 0;
    display: inline-block;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    transition: all .35s linear;
}

.class-info {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: auto 0 auto 0;
    min-width: 200px;
    max-width: 200px;
}

.student-count {
    margin: 5px 0 8px 0; 
}

.lesson-count {
    margin: 0;
}

.lesson-list-div {
    display: flex;
    max-width: 450px;
    min-width: 450px;
    backface-visibility: hidden;
    z-index: 1;
}

.change-lessons-enter-active {
    animation: inDiv .25s;
}

.show-lessons-enter-active {
    animation: inDiv .25s;
}

.show-lessons-leave-active {
    animation: outDiv .25s;
}

@keyframes inDiv {
    from {
        transform: scale(0);
    } 
    to {
        transform: scale(1);
    }
}

@keyframes outDiv {
    from {
        transform: scale(1);
    } 
    to {
        transform: scale(0);
    }
}

.lesson-list {
    flex-direction: column;
    width: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.lesson-li {
    display: flex;
    flex-direction: column;
    text-align: center;
    min-height: 75px;
    max-height: 75px;
    min-width: 450px;
    max-width: 450px;
    border-top: 1px solid #0e333c;
    border-left: 1px solid #0e333c;
    border-right: 1px solid #0e333c;
}

.lesson-li:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.lesson-li:last-child {
    border-bottom: 1px solid #0e333c;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
}

.lesson-li:last-child .arrow-p{
    border-bottom-right-radius: 6px;
    border-bottom: none;
}

.lesson-li:hover {
    background: #e8dede;
    cursor: pointer;
}

.lesson-name {
    width: 100%;
    height: 50%;
    margin: 0;
    padding: 0;
    font-weight: bold;
}

.lesson-description {
    width: 100%;
    height: 50%;
    margin: 0;
    padding: 0;
}

.empty-classes {
    display: flex;
    flex-direction: column;
    margin: 100px auto auto 200px;
    border: 1px solid #0e333c;
    border-radius: 8px;
    height: 150px;
    width: 500px;
    padding: 10px;
}

.empty-classes h4 {
    margin-top: 25px;
}

@media only screen and (max-width: 1400px){
    .classes-container {
        margin: 100px auto auto 150px;
    }
}

@media only screen and (max-width: 1200px){
    .classes-container {
        margin: 100px auto auto 100px;
    }
}

@media only screen and (max-width: 1000px){
    .classes-container {
        margin: 100px auto auto 50px;
    }
}
</style>