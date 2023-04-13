<template>
<div>
    <div v-if="activity != ''" class="activity-info">
        <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" :value="activity.questionText">
        <select id="quadrant-select" :onchange="viewSelectedQuadrant">
            <option v-for="(answer,index) in answerIDs" :key="answer" :value="answer" :selected="answer == activity.correctAnswer">Quadrant {{index + 1}}</option>
        </select>
    </div>
    <div v-else class="activity-info">
        <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text">
        <select id="quadrant-select" :onchange="viewSelectedQuadrant">
            <option value="quadrant-one">Quadrant 1</option>
            <option value="quadrant-two">Quadrant 2</option>
            <option value="quadrant-three">Quadrant 3</option>
            <option value="quadrant-four">Quadrant 4</option>
        </select>
    </div>

    <div class="quadrant-type">
        <select id="quadrant-type-select" :onchange="viewSelectedType">
            <option value="corner-quadrants" :selected="selectedType === 'corner-quadrants'">Corner Quadrants</option>
            <option value="vertical-quadrants" :selected="selectedType === 'vertical-quadrants'">Vertical Quadrants</option>
        </select>
    </div>

    <div v-show="selectedType === 'corner-quadrants'" class="corner-quadrants" id="corner-quadrants">
        <div class="quadrant selected" id="quadrant-one"></div>
        <div class="quadrant" id="quadrant-two"></div>
        <div class="quadrant" id="quadrant-three"></div>
        <div class="quadrant" id="quadrant-four"></div>
    </div>
    <div v-show="selectedType === 'vertical-quadrants'" class="vertical-quadrants" id="vertical-quadrants">
        <div class="vertical-quadrant" id="vertical-quadrant-one"></div>
        <div class="vertical-quadrant" id="vertical-quadrant-two"></div>
        <div class="vertical-quadrant" id="vertical-quadrant-three"></div>
        <div class="vertical-quadrant" id="vertical-quadrant-four"></div>
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
    name: "EyeTracking",
    data() {
        return {
            questionType: 'eye-tracking',
            activityModalData: [],
            allInputsValid: false,
            answerIDs: ['quadrant-one','quadrant-two','quadrant-three','quadrant-four'],
            selectedType: 'corner-quadrants',
        }
    },
    props: {
        activity: {}
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
        viewSelectedQuadrant() {
            this.clearQuadrantDivSelectedClass()
            const quadrant = document.getElementById('quadrant-select').value
            if(this.selectedType === 'corner-quadrants') {
                const quadrantDiv = document.getElementById(quadrant)
                quadrantDiv.classList.add('selected')
            } else if(this.selectedType === 'vertical-quadrants') {
                let verticalQuadrant = 'vertical-' + quadrant
                const verticalDiv = document.getElementById(verticalQuadrant)
                verticalDiv.classList.add('selected')
            }
        },
        viewSelectedType() {
            const type = document.getElementById('quadrant-type-select').value
            this.selectedType = type
            this.clearQuadrantDivSelectedClass()
            this.viewSelectedQuadrant()
        },
        clearQuadrantDivSelectedClass() {
            const cornerParent = document.getElementById('corner-quadrants')
            for (const child of cornerParent.children) {
                child.classList.remove('selected')
            }

            const verticalParent = document.getElementById('vertical-quadrants')
            for (const child of verticalParent.children) {
                child.classList.remove('selected')
            }
        },
        checkInputs() {
            const questionText = document.getElementById('question-text')
            const selectedQuadrant = document.getElementById('quadrant-select')
            if(questionText.value != "") {
                this.allInputsValid = true
                this.activityModalData = [this.questionType,questionText.value,[this.answerIDs,this.selectedType],selectedQuadrant.value]
            } else {
                this.allInputsValid = false
            }
        }
    },
    mounted() {
        if(this.activity != '') {
            this.selectedType = this.activity.answers[1]
            this.clearQuadrantDivSelectedClass()
            this.viewSelectedQuadrant()
        }
    }
}
</script>

<style>
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
}

.assign-activity-div input {
  width: 500px;
  background: #e8dede;
  border-radius: 4px;
}

.quadrant-type select {
    width: 250px;
    margin: 10px 0 10px 0;
    background: #e8dede;
    border: 2px solid rgb(10, 10, 10);
    border-radius: 4px;
}

.activity-info select {
    width: 250px;
    margin: 10px 0 10px 0;
    background: #e8dede;
    border: 2px solid rgb(10, 10, 10);
    border-radius: 4px;
}

#invalid-save {
  font-size: 20px;
  font-weight: bold;
  color: #dd2a2a;
}

.activity-info label {
    width: 100%;
}

.corner-quadrants {
    position: absolute;
    max-width: 150px;
    min-width: 150px;
    right: 0;
    left: 50%;
    top: 20%;
    text-align: center;
}

.vertical-quadrants {
    position: absolute;
    max-width: 150px;
    min-width: 150px;
    right: 0;
    left: 50%;
    top: 20%;
    text-align: center;
}

.quadrant {
  max-width: 60px;
  min-width: 60px;
  max-height: 50px;
  min-height: 50px;
  border: 1px solid black;
  float: left;
}

.vertical-quadrant {
    max-width: 30px;
    min-width: 30px;
    max-height: 100px;
    min-height: 100px;
    border: 1px solid black;
    float: left;
}

.selected {
    background: #64d847;
}
</style>