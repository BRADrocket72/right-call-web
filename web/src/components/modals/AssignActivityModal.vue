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
                <div v-if="activities.length >= 1 && activities[activityIndex] != ''" class="activity-info"> 
                    <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" :value="activities[activityIndex].questionText">
                    <label for="question-text">Answer 1: </label><input type="text" id="answer-one" name="answer-one" :value="activities[activityIndex].answers[0]" :onchange="populateSelectOptions">
                    <label for="question-text">Answer 2: </label><input type="text" id="answer-two" name="answer-two" :value="activities[activityIndex].answers[1]" :onchange="populateSelectOptions">
                    <label for="answers">Correct Answer: </label>
                    <select id="answers" name="answers">
                        <option v-for="(answer,index) in activities[activityIndex].answers" :key="answer" v-bind:value="answer" :selected="answer === activities[activityIndex].correctAnswer" v-bind:id="optionIds[index]">{{answer}}</option>
                    </select>
                </div>
                <div v-else class="activity-info">
                    <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text">
                    <label for="question-text">Answer 1: </label><input type="text" id="answer-one" name="answer-one" :onchange="populateSelectOptions">
                    <label for="question-text">Answer 2: </label><input type="text" id="answer-two" name="answer-two" :onchange="populateSelectOptions">
                    <label for="answers">Correct Answer: </label>
                    <select id="answers" name="answers">
                        <option id="option-one" value=""></option>
                        <option id="option-two" value=""></option>
                        {{activityIndex}}
                    </select> 
                </div>
                <div class="button-div">
                    <div class="save"><button type="button" class="btn-green" @click="save()">Save</button></div>
                    <div class="close"><button type="button" class="btn-green" @click="close()">Close</button></div>
                </div>
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
            activitySaved: false,
            optionIds: ['option-one','option-two']
        }
    },
    props: {
        activities: Array,
        activityIndex: Number
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
            let option = document.getElementById('answers')
            if(questionText.value != "" && questionOne.value != "" && questionTwo.value != "") {
                this.allInputsValid = true
                this.activityModalArray = [questionText.value,questionOne.value,questionTwo.value,option.value]
            } else {
                this.allInputsValid = false
            }
        },
        populateSelectOptions() {
            let optionOne = document.getElementById('option-one')
            let optionTwo = document.getElementById('option-two')
            let answerOne = document.getElementById('answer-one').value
            let answerTwo = document.getElementById('answer-two').value
            optionOne.value = answerOne
            optionOne.innerHTML = answerOne
            optionTwo.value = answerTwo
            optionTwo.innerHTML = answerTwo
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
  height: 450px;
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

/*.assign-activity-div div{
    
}*/

.activity-info {
    display: flex;
    flex-direction: column;
    height: 200px;
}

.activity-info select {
  width: 200px;
  margin: 10px 0 10px 0;
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