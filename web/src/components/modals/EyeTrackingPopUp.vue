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
        },
        quadrantSelection(quadrant) {
            console.log(quadrant)
            //this.updatedAnswers = checkAnswer(this.question, this.answersArray, quadrant)
            this.$emit('close', this.updatedAnswers)
        }
    },
    mounted() {
        this.getCoordinates()
        console.log(this.quadrantOneCoords)
        console.log(this.quadrantTwoCoords)
        console.log(this.quadrantThreeCoords)
        console.log(this.quadrantFourCoords)
    }
}
</script>

<style scoped>

.quadrants {
    position: absolute;
    max-width: 1200px;
    min-width: 1200px;
    height: 650px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
}   

.quadrant {
    max-width: 600px;
    min-width: 600px;
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
    width: 100%;
    background: #928787;
    margin: -70px auto;
}

.question h2 {
    color: #ffffff;
    text-shadow: 1px 1px 3px #000000;
}

.question p {
    color: #000000;
}

@media only screen and (min-width: 1200px) {
    .quadrants {
        margin-left: 100px;
    }   
    .question {
        margin-left: 100px;
    }
}

@media only screen and (max-width: 1199px) {
    .quadrants {
        margin-left: 28px;
    }
    .question {
        margin-left: 28px;
    }
}
</style>