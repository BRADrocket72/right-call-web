<template>
  <div>
      <LoggedInNavBar />
      <div v-if="studentsEmpty" class="students-container">
          <div class="empty-classes">
              <h4>There are no students assigned to this lesson.</h4>
              <p>No Students? <a class="to-class-creation-page" @click="redirectToUpdateClassPage" >Add Students Here</a></p>
          </div>
      </div>
      <div v-else class="students-container">
        <div class="class-list-div">
            <ul class="class-list">
                 <li v-for="(student, index) in studentList" :key="student" class="class-li" :id="'instructor-class-' + (index+1)" @click="flipArrow(student, index)">
                    <p class="student-name">Student Name:</p>
                        <span class="class-info">
                            <p class="student-count"><b> </b>{{student.userName}}</p>
                        </span>
                    <p class="arrow-p"><i id="arrow" class="arrow-right"></i></p>
                </li>
            </ul>
        </div>
          
              <TransitionGroup name="show-results">
                  <div v-if="isLessonResultsVisible && StudentHasResults" class="lesson-list-div">
                      <TransitionGroup name="change-lessons" tag="ul" class="lesson-list">
                          <li v-for="results in studentsResultsForLesson" :key="results" class="lesson-li">
                              <p class="lesson-name">{{results.quizName}}</p>
                              <p class="lesson-description">{{results.score}}</p>
                          </li>
                      </TransitionGroup>
                  </div>
                  <div v-else-if="isLessonResultsVisible && !StudentHasResults" class="empty-class">
                      <h2 class="empty-message">This student has not taken this lesson yet ..</h2>
                  </div>
              </TransitionGroup>

      </div>
  </div>
</template>

<script>
import LoggedInNavBar from './LoggedInNavBar.vue'
import { useUserResultsStore } from '@/stores/UserResultsStore';
import { useUsersStore } from '@/stores/UserStore';
import { useInstructorClassStore } from '@/stores/InstructorClassStore';
import { useInstructorLessonStore } from '@/stores/InstructorLessonStore';


export default {
  name: 'ViewStudentResults',
  components: { 
    LoggedInNavBar 
  },

  props: {
    lessonId: { 
      type: String
    },
    classId: {
      type: String
    }
  },

  data() {
    return {
      currentClass: [],

      lessonsStudents: [],

      studentResults: [],
      
      studentList: [],

      selectedElement: HTMLElement,
      selectedStudent: Object,

      studentsResultsForLesson: [],

      studentsEmpty: false,
      isLessonResultsVisible: false,
      StudentHasResults: false,

    }
  },
  methods: {

    async flipArrow(studentList, index) {
            this.selectedStudent = studentList
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
                        this.isLessonResultsVisible = false
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
            await this.displayStudentResults(studentList)
            this.selectedElement = selected
            this.isLessonResultsVisible = true
        },

        async displayStudentResults(student) {
            this.studentsResultsForLesson = [];
            var userResultsStore = useUserResultsStore();
            let highest_results = await userResultsStore.getHighestResults(student.userName)
            var instructorLessonStore = useInstructorLessonStore();
            let lesson = await instructorLessonStore.fetchLessonById(this.lessonId);

            for (let i = 0 ; i < lesson.videoClipsArray.length ; i++ ) {
                for (let j = 0 ; j < highest_results.length ; j++ ) {
                    if (lesson.videoClipsArray[i]._id == highest_results[j][0].quizId ){
                        this.studentsResultsForLesson.push(highest_results[j][0])
                    }
                }
            }

            if(this.studentsResultsForLesson.length > 0) {
                this.StudentHasResults = true
            } else {
                this.StudentHasResults = false
            }
        },
        redirectToUpdateClassPage() {
            this.$router.push({
            name: "UpdateClassPage"
          })
        }
  },

  async mounted() {
    var instructorClassStore = useInstructorClassStore();
    var userStore = useUsersStore();
    var userResults = useUserResultsStore();

    this.currentClass = await instructorClassStore.getAllByClassId(this.classId);
    this.lessonsStudents = this.currentClass.studentIds;
    this.results = await userResults.getHighestResults(this.$cookies.get("user_session").currentUserName)
        
    for (var i =0 ; i< this.lessonsStudents.length; i++ ) {
        let currentStudent = await userStore.getUserById(this.lessonsStudents[i])
        this.studentList.push(currentStudent)
    }
    
    if (this.lessonsStudents.length == 0) { 
        this.studentsEmpty = true
    }



  }
}

</script>

<style scoped>

.students-container {
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

.class-li .student-name {
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

.show-results-enter-active {
    animation: inDiv .25s;
}

.show-results-leave-active {
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
    .students-container {
        margin: 100px auto auto 150px;
    }
}

@media only screen and (max-width: 1200px){
    .students-container {
        margin: 100px auto auto 100px;
    }
}

@media only screen and (max-width: 1000px){
    .students-container {
        margin: 100px auto auto 50px;
    }
}
</style>