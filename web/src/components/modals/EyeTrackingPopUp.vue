<template>
<div>
    <div v-if="quadrantType === 'corner-quadrants'" class="corner-quadrants">
        <div class="quadrant" id="quadrant-one"></div>
        <div class="quadrant" id="quadrant-two"></div>
        <div class="quadrant" id="quadrant-three"></div>
        <div class="quadrant" id="quadrant-four"></div>
    </div>
    <div v-else-if="quadrantType === 'horizontal-quadrants'" class="horizontal-quadrants">
        <div class="horizontal-quadrant" id="quadrant-one"></div>
        <div class="horizontal-quadrant" id="quadrant-two"></div>
        <div class="horizontal-quadrant" id="quadrant-three"></div>
        <div class="horizontal-quadrant" id="quadrant-four"></div>
    </div>
</div> 
</template>

<script>
export default {
    name: 'EyeTrackingPopUp',
    data() {
        return {
            updatedAnswers: [],
            xMin: 0,
            xMax: 0,
            xHalf: 0,
            xQuarterOne: 0,
            xQuarterTwo: 0,
            yMin: 0,
            yMax: 0,
            yHalf: 0,
            xCoordinate: 0,
            yCoordinate: 0,
            guessQuadrant: '',
            answer: '',
            quadrantType: String
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

            if(this.quadrantType === 'corner-quadrants') {
                this.xMin = oneCoords.left
                this.xMax = twoCoords.right
                this.xHalf = oneCoords.right - 1
                this.yMin = oneCoords.top
                this.yMax = threeCoords.bottom
                this.yHalf = fourCoords.top - 1
            } else if(this.quadrantType === 'horizontal-quadrants') {
                this.xMin = oneCoords.left
                this.xQuarterOne = oneCoords.right - 1
                this.xHalf = twoCoords.right - 1
                this.xQuarterTwo = threeCoords.right - 1
                this.xMax = fourCoords.right
                this.yMin = oneCoords.top
                this.yMax = oneCoords.bottom
            }
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
        getCornerQuadrant() {
            if(this.xCoordinate <= this.xHalf) {
                if(this.yCoordinate <= this.yHalf) {
                    this.guessQuadrant = 'quadrant-one'
                } else {
                    this.guessQuadrant = 'quadrant-three'
                }
            } else {
                if(this.yCoordinate <= this.yHalf) {
                    this.guessQuadrant = 'quadrant-two'
                } else {
                    this.guessQuadrant = 'quadrant-four'
                }
            }
        },
        getHorizontalQuadrant() {
            if(this.xCoordinate <= this.xHalf) {
                if(this.xCoordinate <= this.xQuarterOne) {
                    this.guessQuadrant = 'quadrant-one'
                } else {
                    this.guessQuadrant = 'quadrant-two'
                }
            } else {
                if(this.xCoordinate <= this.xQuarterTwo) {
                    this.guessQuadrant = 'quadrant-three'
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
    created() {
        this.quadrantType = this.question.answers[1]
    },
    mounted() {
        this.getCoordinates()
        this.checkPredictionInBounds()
        if(this.quadrantType === 'corner-quadrants') {
            this.getCornerQuadrant()
        } else if(this.quadrantType === 'horizontal-quadrants') {
            this.getHorizontalQuadrant()
        }
        this.checkQuadrant()
        this.close()
    }
}
</script>

<style scoped>

.corner-quadrants {
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

.horizontal-quadrants {
    position: absolute;
    max-width: 972px;
    min-width: 972px;
    height: 550px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
}  

.horizontal-quadrant {
    max-width: 243px;
    min-width: 243px;
    max-height: 550px;
    min-height: 550px;
    float: left;
    border: none;
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