<template>
<div>
    <div class="question">
        <h2>{{question.questionText}}</h2>
        <p>Hover and click on an area in the video to answer this question.</p>
    </div>
    <div class="quadrants">
        <div class="quadrant" id="quadrant-one"></div>
        <div class="quadrant" id="quadrant-two"></div>
        <div class="quadrant" id="quadrant-three"></div>
        <div class="quadrant" id="quadrant-four"></div>
    </div>
</div> 
</template>

<script>

export default {
    name: 'EyeTrackingPopUp',
    data() {
        return {
            updatedAnswers: [],
            //coordinates: Top(Y Min), Right(X Max), Bottom(Y Max), Left(X Min)
            quadrantOneCoords: [],
            quadrantTwoCoords: [],
            quadrantThreeCoords: [],
            quadrantFourCoords: [],
            xMin: 0,
            xMax: 0,
            yMin: 0,
            yMax: 0
        }
    },
    props:{
        question: Object,
        answersArray: [Object]
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

            this.quadrantOneCoords = [oneCoords.top, oneCoords.right, oneCoords.bottom, oneCoords.left]
            this.quadrantTwoCoords = [twoCoords.top, twoCoords.right, twoCoords.bottom, twoCoords.left]
            this.quadrantThreeCoords = [threeCoords.top, threeCoords.right, threeCoords.bottom, threeCoords.left]
            this.quadrantFourCoords = [fourCoords.top, fourCoords.right, fourCoords.bottom, fourCoords.left]

            //left-most coordinate of quadrant one
            this.xMin = this.quadrantOneCoords[3]
            //right-most coordinate of quadrant two
            this.xMax = this.quadrantTwoCoords[1]
            //top-most coordinate of quadrant one
            this.yMin = this.quadrantOneCoords[0]
            //bottom-most coordinate of quadrant three
            this.yMax = this.quadrantThreeCoords[2]
        },
        quadrantSelection(quadrant) {
            console.log(quadrant)
            //this.updatedAnswers = checkAnswer(this.question, this.answersArray, quadrant)
            this.$emit('close', this.updatedAnswers)
        }
    },
    mounted() {
        this.getCoordinates()
        console.log(this.xMin)
        console.log(this.xMax)
        console.log(this.yMin)
        console.log(this.yMax)
    }
}
</script>

<style scoped>

.quadrants {
    position: absolute;
    max-width: 1350px;
    min-width: 1350px;
    max-height: 650px;
    min-height: 650px;
    margin-left: 0px;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
}   

.quadrant {
    max-width: 675px;
    min-width: 675px;
    max-height: 325px;
    min-height: 325px;
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