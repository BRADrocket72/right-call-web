<template>
  <div>
      <LoggedInNavBar />
      <div v-if="studentsEmpty" class="students-container">
          <div class="empty-classes">
              <h4>There are no students assigned to this lesson.</h4>
              <p>No Students? <a students="to-class-creation-page" @click="redirectToClassCreationPage" >Add Students Here</a></p>
          </div>
      </div>
      <div v-else class="students-container">
          <div class="class-list-div">
              <ul class="class-list">
                  <li v-for="student in studentList" :key="student" class="class-li" :id="'instructor-class-'" @click="flipArrow(student, index)">
                      <p class="student-name">{{student.userName}}</p>
                      <p> {{  student._id }}</p>
                      <p class="arrow-p"><i id="arrow" class="arrow-right"></i></p>
                  </li>
              </ul>
          </div>
          
              <!-- <TransitionGroup name="show-lessons">
                  <div v-if="isLessonResultsVisible && StudentHasResults" class="lesson-list-div">
                      <TransitionGroup name="change-lessons" tag="ul" class="lesson-list">
                          <li v-for="lesson in lessonList" :key="lesson" class="lesson-li">
                              <p class="lesson-name">{{lesson.name}}</p>
                              <p class="lesson-description">{{lesson.description}}</p>
                          </li>
                      </TransitionGroup>
                  </div>
                  <div v-else-if="isLessonResultsVisible && !StudentHasResults" class="empty-class">
                      <h2 class="empty-message">This class contains no lessons</h2>
                  </div>
              </TransitionGroup> -->

      </div>

    <div> 
        <div v-for="student in studentList" :key="student._id"  > 
            <p> {{student.userName}} </p>
        </div>
    </div>

  </div>
</template>

<script>
import LoggedInNavBar from './LoggedInNavBar.vue'
import { useUserResultsStore } from '@/stores/UserResultsStore';
import { useUsersStore } from '@/stores/UserStore';
import { useInstructorClassStore } from '@/stores/InstructorClassStore';


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

      studentsEmpty: false,
      isLessonResultsVisible: false,
      StudentHasResults: false,

    }
  },
  methods: {

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
  },
  async mounted() {
    var userResultsStore = useUserResultsStore();
    var instructorClassStore = useInstructorClassStore();
    var userStore = useUsersStore();

    this.currentClass = await instructorClassStore.getAllByClassId(this.classId);
    this.lessonsStudents = this.currentClass.studentIds;

    let studentList = [];

    for (var i =0 ; i< this.lessonsStudents.length; i++ ) {
        let currentStudent = await userStore.getUserById(this.lessonsStudents[i])
        studentList.push(currentStudent)
    }
    console.log(studentList)
    if (this.lessonsStudents.length == 0) { 
        this.studentsEmpty = true
    }

    this.studentResults = await userResultsStore.getByLessonId(this.lessonId);
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