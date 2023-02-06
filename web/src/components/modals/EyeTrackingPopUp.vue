<template>
<div>
    <div class="quadrants">
        <div class="quadrant" id="quadrant-one"></div>
        <div class="quadrant" id="quadrant-two"></div>
        <div class="quadrant" id="quadrant-three"></div>
        <div class="quadrant" id="quadrant-four"></div>
    </div>
    <EyeTrackingFeedbackModal :answer="answer" :correctAnswer="this.question.correctAnswer" @close="close"/>
</div> 
</template>

<script>
import EyeTrackingFeedbackModal from './EyeTrackingFeedbackModal.vue'
export default {
    name: 'EyeTrackingPopUp',
    components: {
        EyeTrackingFeedbackModal
    },
    data() {
        return {
            updatedAnswers: [],
            xMin: 0,
            xMax: 0,
            xHalf: 0,
            yMin: 0,
            yMax: 0,
            yHalf: 0,
            xCoordinate: 0,
            yCoordinate: 0,
            guessQuadrant: '',
            answer: ''
        }
    },
    props:{
        question: Object,
        answersArray: [Object],
        xPrediction: Number,
        yPrediction: Number
    },
    methods: {
        getCoordinates() {
            const quadrantOne = document.getElementById('quadrant-one')
            const quadrantTwo = document.getElementById('quadrant-two')
            const quadrantThree = document.getElementById('quadrant-three')
            const quadrantFour = document.getElementById('quadrant-four')

            const oneCoords = quadrantOne.getBoundingClientRect()
            const twoCoords = quadrantTwo.getBoundingClientRect()
            const threeCoords = quadrantThree.getBoundingClientRect()
            const fourCoords = quadrantFour.getBoundingClientRect()

            this.xMin = oneCoords.left
            this.xMax = twoCoords.right
            this.xHalf = oneCoords.right-1
            this.yMin = oneCoords.top
            this.yMax = threeCoords.bottom
            this.yHalf = fourCoords.top-1
        },
        checkPredictionInBounds() {
            if(this.xPrediction < this.xMin) {
                this.xCoordinate = this.xMin
            } else if(this.xPrediction > this.xMax) {
                this.xCoordinate = this.xMax
            } else {
                this.xCoordinate = this.xPrediction
            }

            if(this.yPrediction < this.yMin) {
                this.yCoordinate = this.yMin
            } else if(this.yPrediction > this.yMax) {
                this.yCoordinate = this.yMax
            } else {
                this.yCoordinate = this.yPrediction
            }
        },
        getQuadrant() {
            if(this.xPrediction <= this.xHalf) {
                if(this.yPrediction <= this.yHalf) {
                    this.guessQuadrant = 'quadrant-one'
                } else {
                    this.guessQuadrant = 'quadrant-three'
                }
            } else {
                if(this.yPrediction <= this.yHalf) {
                    this.guessQuadrant = 'quadrant-two'
                } else {
                    this.guessQuadrant = 'quadrant-four'
                }
            }
        },
        checkQuadrant() {
            if(this.guessQuadrant == this.question.correctAnswer) {
                this.answer = 'Correct'
            } else {
                this.answer = 'Incorrect'
            }
            this.updatedAnswers = this.answersArray
            this.updatedAnswers.push(this.answer)
        },
        close() {
            this.$emit('close',this.updatedAnswers)
        }
    },
    mounted() {
        this.getCoordinates()
        this.checkPredictionInBounds()
        this.getQuadrant()
        this.checkQuadrant()
    }
}
</script>

<style scoped>

.quadrants {
    position: absolute;
    max-width: 1350px;
    min-width: 1350px;
    height: 550px;
    margin-left: 0px;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
}   

.quadrant {
    max-width: 675px;
    min-width: 675px;
    max-height: 275px;
    min-height: 275px;
    float: left;
    border: none;
}

.quadrant:hover {
    backdrop-filter: brightness(150%);
    cursor: pointer;
}

.question {
    text-align: center;
    width: 972px;
    background: #928787;
    margin: 30px auto auto 20px;
}

.question h2 {
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
}

.question p {
    color: #000000;
}

@media only screen and (min-width: 1600px) {  
    .question {
        margin-left: 161px;
    }
}

@media only screen and (min-width: 1400px) and (max-width: 1599px) {
    .quadrants {
        max-width: 1300px;
        min-width: 1300px;
    }
    .quadrant {
        max-width: 650px;
        min-width: 650px;
    }
    .question {
        margin-left: 161px;
    }
}

@media only screen and (min-width: 1200px) and (max-width: 1399px) {
    .quadrants {
        max-width: 1200px;
        min-width: 1200px;
    }
    .quadrant {
        max-width: 585px;
        min-width: 585px;
    }
    .question {
        margin-left: 101px;
    }
}

@media only screen and (max-width: 1200px){
    .quadrants {
        position: absolute;
        max-width: 972px;
        min-width: 972px;
        max-height: 550px;
        min-height: 550px;
    }   

    .quadrant {
        max-width: 486px;
        min-width: 486px;
        max-height: 275px;
        min-height: 275px;
        float: left;
        border: none;
    }

    .question {
        margin: -72px auto auto -1px;
    }
}
</style>