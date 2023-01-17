<template>
    <div>
        <div v-if="activity != ''" class="activity-info">
            <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" :value="activity.questionText">
            <div v-for="(answer,index) in activity.answers" :key="answer" class="answers-div">
                <label :for="answerIDs[index]">Answer {{index + 1}}: </label><input type="text" :id="answerIDs[index]" :name="answerIDs[index]" :value="answer" :onchange="populateSelectOptions">
            </div>
            <label for="answers">Correct Answer: </label>
            <select id="answers" name="answers">
                <option v-for="(answer,index) in activity.answers" :key="answer" :value="answer" :selected="answer === activity.correctAnswer" :id="optionIds[index]">{{answer}}</option>
            </select>
        </div>
        <div v-else class="activity-info">
            <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text">
            <label for="answer-one">Answer 1: </label><input type="text" id="answer-one" name="answer-one" :onchange="populateSelectOptions">
            <label for="answer-two">Answer 2: </label><input type="text" id="answer-two" name="answer-two" :onchange="populateSelectOptions">
            <label for="answers">Correct Answer: </label>
            <select id="answers" name="answers">
                <option id="option-one" value=""></option>
                <option id="option-two" value=""></option>
            </select> 
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
    name: 'MultipleChoice',
    data() {
        return {
            questionType: 'multiple-choice',
            activityModalData: [],
            allInputsValid: false,
            answerIDs: ['answer-one','answer-two','answer-three','answer-four'],
            optionIds: ['option-one','option-two','option-three','option-four']
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
            let questionText = document.getElementById('question-text')
            let answerOne = document.getElementById('answer-one')
            let answerTwo = document.getElementById('answer-two')
            let option = document.getElementById('answers')
            if(questionText.value != "" && answerOne.value != "" && answerTwo.value != "") {
                this.allInputsValid = true
                this.activityModalData = [this.questionType,questionText.value,[answerOne.value,answerTwo.value],option.value]
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

<style scoped>
.answers-div label {
    width: 100%;
}
</style>