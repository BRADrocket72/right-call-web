<template>
    <div>
        <div v-if="currentActivity != ''" class="activity-info">
            <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" :value="currentActivity.questionText">
            <div v-for="(answer,index) in currentActivity.answers" :key="answer" class="answers-div">
                <div v-if="index < minAnswers">
                    <label :for="answerIDs[index]">Answer {{index + 1}}: </label><input type="text" :id="answerIDs[index]" :name="answerIDs[index]" :value="answer" :onchange="populateSelectOptions">
                </div>

                <div v-if="currentAnswers >= 3 && index > 1" class="add-answers-input">
                    <label :for="answerIDs[index]">Answer {{index + 1}}: </label><input type="text" :id="answerIDs[index]" :name="answerIDs[index]" :value="answer" :onchange="populateSelectOptions">
                    <button v-if="(index + 1) > minAnswers" type="button" class="delete-answer" @click="deleteAnswer()">X</button>
                </div>

            </div>
            <div v-if="currentAnswers == minAnswers" class="add-answers-button">
                <button type="button" class="add-answer" @click="addAnswer()">+ Add New Answer</button>
            </div>
            <div v-if="currentAnswers >= minAnswers && currentAnswers < maxAnswers" class="add-answers-button">
                <button type="button" class="add-answer" @click="addAnswer()">+ Add New Answer</button>
            </div>

            <label for="answers">Correct Answer: </label>
            <select id="answers" name="answers">
                <option v-for="(answer,index) in currentActivity.answers" :key="answer" :value="answer" :selected="answer === currentActivity.correctAnswer" :id="optionIds[index]">{{answer}}</option>
            </select>
        </div>

        <div v-else class="activity-info">
            <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text">
            <label for="answer-one">Answer 1: </label><input type="text" id="answer-one" name="answer-one" :onchange="populateSelectOptions">
            <label for="answer-two">Answer 2: </label><input type="text" id="answer-two" name="answer-two" :onchange="populateSelectOptions">
            
            <div v-if="currentAnswers >= 3" class="add-answers-input">
                <label for="answer-three">Answer 3: </label><input type="text" id="answer-three" name="answer-three" :onchange="populateSelectOptions">
                <button type="button" class="delete-answer" @click="deleteAnswer()">X</button>
            </div>
            <div v-else class="add-answers-button">
                <button type="button" class="add-answer" @click="addAnswer()">+ Add New Answer</button>
            </div>

            <div v-if="currentAnswers == 4" class="add-answers-input">
                <label for="answer-four">Answer 4: </label><input type="text" id="answer-four" name="answer-four" :onchange="populateSelectOptions">
                <button type="button" class="delete-answer" @click="deleteAnswer()">X</button>
            </div>
            <div v-else class="add-answers-button">
                <button type="button" class="add-answer" @click="addAnswer()">+ Add New Answer</button>
            </div>

            <label for="answers">Correct Answer: </label>
            <select id="answers" name="answers">
                <option id="option-one" value=""></option>
                <option id="option-two" value=""></option>
                <option v-if="currentAnswers >= 3" id="option-three" value=""></option>
                <option v-if="currentAnswers == 4" id="option-four" value=""></option>
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
            currentAnswers: 2,
            minAnswers: 2,
            maxAnswers: 4,
            answerIDs: ['answer-one','answer-two','answer-three','answer-four'],
            optionIds: ['option-one','option-two','option-three','option-four'],
            currentActivity: {}
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
            let answerOne = document.getElementById('answer-one').value
            let answerTwo = document.getElementById('answer-two').value
            let option = document.getElementById('answers')
            let answers = [answerOne, answerTwo]

            if(this.currentAnswers >= 3) {
                let answerThree = document.getElementById('answer-three').value
                answers.push(answerThree)
            }
            if(this.currentAnswers == 4) {
                let answerFour = document.getElementById('answer-four').value
                answers.push(answerFour)
            }

            let invalidCount = 0
            for(const answer of answers) {
                if(answer == "") {
                    invalidCount++
                }
            }

            if(questionText.value != "" && invalidCount == 0) {
                this.allInputsValid = true
                this.activityModalData = [this.questionType, questionText.value, answers, option.value]
            } else {
                this.allInputsValid = false
            }
        },
        populateSelectOptions() {
            let answerOne = document.getElementById('answer-one')
            let answerTwo = document.getElementById('answer-two')
            if(answerOne && answerOne.value) {
                let optionOne = document.getElementById('option-one')
                optionOne.value = answerOne.value
                optionOne.innerHTML = answerOne.value
            }
            if(answerTwo && answerTwo.value) {
                let optionTwo = document.getElementById('option-two')
                optionTwo.value = answerTwo.value
                optionTwo.innerHTML = answerTwo.value
            }
            if(this.currentAnswers >= 3) {
                let answerThree = document.getElementById('answer-three')
                if(answerThree && answerThree.value) {
                    let optionThree = document.getElementById('option-three')
                    optionThree.value = answerThree.value
                    optionThree.innerHTML = answerThree.value
                    if(this.currentActivity.answers) {
                        this.currentActivity.answers[2] == answerThree.value
                    }
                }
            }
            if(this.currentAnswers == 4) {
                let answerFour = document.getElementById('answer-four')
                if(answerFour && answerFour.value) {
                    let optionFour = document.getElementById('option-four')
                    optionFour.value = answerFour.value
                    optionFour.innerHTML = answerFour.value
                }
            }
        },
        addAnswer() {
            if(this.currentActivity.answers) {
                const answersLength = this.currentActivity.answers.length
                this.currentActivity.answers.splice(answersLength+1,0,"")
            }
            if(this.currentAnswers < this.maxAnswers) {
                this.currentAnswers += 1
            }
        },
        deleteAnswer() {
            if(this.currentActivity.answers) {
                this.currentActivity.answers.pop()
            }
            if(this.currentAnswers > this.minAnswers) {
                this.currentAnswers -= 1
            }
        }
    },
    mounted() {
        this.currentActivity = this.activity
        if(this.currentActivity.answers) {
            this.currentAnswers = this.currentActivity.answers.length
        }
    }
}
</script>

<style scoped>
.answers-div label {
    width: 100%;
}

.add-answers-button {
    margin-top: 8px;
}

.add-answers-input label {
    width: 100%;
}

.button-div {
    margin-top: 150px;
}

.add-answers-button button{
    border: none;
    background: #ffffff;
    font-weight: bold;
    color: #2e9784;
}

.add-answers-button button:hover{
    text-decoration: underline;
}

.delete-answer {
    margin-left: 5px;
    border: none;
    background: none;
    font-weight: bold;
    color: #B22222;
}
</style>