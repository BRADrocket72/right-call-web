<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">Assign New Activity</slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div class="assign-activity-div">
                <div v-if="activities[index] != ''" class="activity-info"> 
                    <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" :value="activities[index].questionText">
                    <label for="question-text">Answer 1: </label><input type="text" id="answer-one" name="answer-one" :value="activities[index].answers[0]">
                    <label for="question-text">Answer 2: </label><input type="text" id="answer-two" name="answer-two" :value="activities[index].answers[1]">
                </div>
                <div v-else class="activity-info">
                    <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text">
                    <label for="question-text">Answer 1: </label><input type="text" id="answer-one" name="answer-one">
                    <label for="question-text">Answer 2: </label><input type="text" id="answer-two" name="answer-two">
                </div>
                    <button type="button" class="btn-green" @click="save()">Save</button>
                    <button type="button" class="btn-green" @click="close()">Close</button>
                <p id="invalid-save"></p>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: 'AssignActivityModal',
    data() {
        return {
            activityModalArray: [],
            allInputsValid: false,
            activitySaved: false
        }
    },
    props: {
        activities: Array,
        index: Number
    },
    methods: {
        close() {
            this.$emit('close')
        },
        save() {
            let invalid = document.getElementById('invalid-save')
            this.checkInputs()
            if(this.allInputsValid) {
                invalid.innerHTML = ""
                this.activitySaved = true
                this.$emit('save',this.activitySaved)
                this.$emit('close',this.activityModalArray)
            } else {
                invalid.innerHTML = "Please fill out all fields."
                this.activityModalArray = []
            }
        },
        checkInputs() {
            let questionText = document.getElementById('question-text')
            let questionOne = document.getElementById('answer-one')
            let questionTwo = document.getElementById('answer-two')
            if(questionText.value != "" && questionOne.value != "" && questionTwo.value != "") {
                this.allInputsValid = true
                this.activityModalArray = [questionText.value,questionOne.value,questionTwo.value]
            } else {
                this.allInputsValid = false
            }
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
  width: 600px;
  height: 400px;
  border-radius: 2px;
  position: fixed;
  left: auto;
  top: auto;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
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

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4AAE9B;
  background: transparent;
}

.btn-green {
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

.assign-activity-div div{
    display: flex;
    flex-direction: column;
}

.activity-info {
    flex-direction: row;
    height: 200px;
}

.assign-activity-div input {
    width: 400px;
    background: #e8dede;
    border-radius: 4px;
}

#invalid-save {
    font-size: 20px;
    font-weight: bold;
    color: #dd2a2a;
}
</style>