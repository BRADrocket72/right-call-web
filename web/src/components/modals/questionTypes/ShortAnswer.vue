<template>
    <div>
        <div v-if="activity != ''" class="activity-info">
            <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" :value="activity.questionText">
            <label for="answer-one">Answer: </label><input type="text" id="answer-one" name="answer-one" :value="activity.answers[0]">
        </div>
        <div v-else class="activity-info">
            <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text">
            <label for="answer-one">Answer: </label><input type="text" id="answer-one" name="answer-one">
        </div>
        <div class="button-div">
            <div class="save"><button type="button" class="btn-green" @click="save()">Save</button></div>
            <div class="close"><button type="button" class="btn-green" @click="close()">Close</button></div>
        </div>
        <p id="invalid-save"></p>
    </div>
</template>

<script>
export default {
    name: 'ShortAnswer',
    data() {
        return {
            questionType: 'short-answer',
            activityModalData: [],
            allInputsValid: false,
        }
    },
    props: {
        activity: {},
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
                this.$emit('save',this.activityModalData)
            } else {
                invalid.innerHTML = "Please fill out all fields."
                this.activityModalData = []
            }
        },
        checkInputs() {
            const questionText = document.getElementById('question-text')
            const answer = document.getElementById('answer-one')
            if(questionText.value != "" && answer.value != "") {
                this.allInputsValid = true
                this.activityModalData = [this.questionType,questionText.value,[answer.value],answer.value]
            } else {
                this.allInputsValid = false
            }
        }
    }
}
</script>

<style scoped>
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