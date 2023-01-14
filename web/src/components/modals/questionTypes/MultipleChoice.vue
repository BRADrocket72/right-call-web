<template>
    <div>
        <div v-if="activity != ''" class="activity-info">
            <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" :value="activity.questionText">
            <label for="question-text">Answer 1: </label><input type="text" id="answer-one" name="answer-one" :value="activity.answers[0]" :onchange="populateSelectOptions">
            <label for="question-text">Answer 2: </label><input type="text" id="answer-two" name="answer-two" :value="activity.answers[1]" :onchange="populateSelectOptions">
            <label for="answers">Correct Answer: </label>
            <select id="answers" name="answers">
                <option v-for="(answer,index) in activity.answers" :key="answer" v-bind:value="answer" :selected="answer === activity.correctAnswer" v-bind:id="optionIds[index]">{{answer}}</option>
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
            activityModalArray: [],
            allInputsValid: false,
            activitySaved: false,
            optionIds: ['option-one','option-two']
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
                this.activitySaved = true
                this.$emit('save',this.activityModalArray)
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
                this.activityModalArray = [this.questionType,questionText.value,questionOne.value,questionTwo.value,option.value]
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

</style>