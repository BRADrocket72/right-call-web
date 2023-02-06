<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">Assign New Activity</slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div v-if="questionTypeSelected || questionTypeExists" class="assign-activity-div">
                <div v-if="questionType=='multiple-choice' || questionTypeExists=='multiple-choice'">
                  <MultipleChoice :activity="activity" @close="close" @save="save"/>
                </div>
                <div v-if="questionType=='short-answer' || questionTypeExists=='short-answer'">
                  <ShortAnswer :activity="activity" @close="close" @save="save"/>
                </div>
                <div v-if="questionType=='eye-tracking' || questionTypeExists=='eye-tracking'">
                  <EyeTracking :activity="activity" @close="close" @save="save"/>
                </div>
            </div>
            <div v-else class="assign-activity-div">
              <p>Select a question type: </p>
              <select id="question-type" name="question-type">
                <option id="multiple-choice" value="multiple-choice">Multiple Choice</option>
                <option id="short-answer" value="short-answer">Short Answer</option>
                <option id="eye-tracking" value="eye-tracking">Eye Tracking</option>
              </select>
              <div class="save"><button type="button" class="btn-green" @click="questionTypeSelection()">Select</button></div>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import MultipleChoice from '@/components/modals/questionTypes/MultipleChoice.vue'
import ShortAnswer from '@/components/modals/questionTypes/ShortAnswer.vue'
import EyeTracking from '@/components/modals/questionTypes/EyeTracking.vue'

export default {
    name: 'AssignActivityModal',
    components: { 
        MultipleChoice,
        ShortAnswer,
        EyeTracking
    },
    data() {
        return {
            questionTypeSelected: false,
            questionType: String,
            activityModalData: []
        }
    },
    props: {
        activity: {},
        questionTypeExists: String
    },
    methods: {
        close() {
          this.$emit('close')
        },
        save(activityArray) {
          this.activityModalData = activityArray
          this.$emit('save',this.activityModalData)
        },
        questionTypeSelection() {
          const option = document.getElementById('question-type').value
          this.questionType = option
          this.questionTypeSelected = true
        }
    }
}
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  min-width: 600px;
  max-width: 600px;
  min-height: 550px;
  border-radius: 2px;
  position: fixed;
  left: auto;
  top: auto;
  box-shadow: 2px 2px 20px 1px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  background-color: #4AAE9B;
  justify-content: space-between;
  border-radius: 2px 2px 0px 0px;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  background: white;
  padding: 20px 10px;
}

.button-div {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}


.btn-green {
  margin: 0 auto;
  color: white;
  background: #4AAE9B;
  border: 1px solid #eeeeee;
  width: 100px;
  border-radius: 2px;
  padding: 15px;
  margin: 10px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}

.activity-info {
  display: flex;
  flex-direction: column;
  height: 200px;
}

.activity-info select {
  width: 250px;
  margin: 10px 0 10px 0;
}

.assign-activity-div input {
  width: 500px;
  background: #e8dede;
  border-radius: 4px;
}

.activity-info select {
  background: #e8dede;
  border: 2px solid rgb(10, 10, 10);
  border-radius: 4px;
}

#invalid-save {
  font-size: 20px;
  font-weight: bold;
  color: #dd2a2a;
}
</style>