<template>
<div>
    <div class="question">
        <h2>{{question.questionText}}</h2>
        <p>Hover and click on an area in the video to answer this question.</p>
    </div>

    <div v-if="quadrantType === 'corner-quadrants'" class="corner-quadrants">
        <div class="quadrant" id="quadrant-one" @click="quadrantSelection('quadrant-one')"></div>
        <div class="quadrant" id="quadrant-two" @click="quadrantSelection('quadrant-two')"></div>
        <div class="quadrant" id="quadrant-three" @click="quadrantSelection('quadrant-three')"></div>
        <div class="quadrant" id="quadrant-four" @click="quadrantSelection('quadrant-four')"></div>
    </div>
    <div v-else-if="quadrantType === 'vertical-quadrants'" class="vertical-quadrants">
        <div class="vertical-quadrant" id="quadrant-one" @click="quadrantSelection('quadrant-one')"></div>
        <div class="vertical-quadrant" id="quadrant-two" @click="quadrantSelection('quadrant-two')"></div>
        <div class="vertical-quadrant" id="quadrant-three" @click="quadrantSelection('quadrant-three')"></div>
        <div class="vertical-quadrant" id="quadrant-four" @click="quadrantSelection('quadrant-four')"></div>
    </div>
</div>
</template>

<script>
import {checkAnswer} from "../../util/GetResults"

export default {
    name: 'NoWebcamPopUp',
    data() {
        return {
            updatedAnswers: [],
            quadrantType: String
        }
    },
    props:{
        question: Object,
        answersArray: [Object]
    },
    methods: {
        quadrantSelection(quadrant) {
            this.updatedAnswers = checkAnswer(this.question, this.answersArray, quadrant)
            this.$emit('close', this.updatedAnswers)
        }
    },
    mounted() {
        this.quadrantType = this.question.answers[1]
    }
}
</script>


<style scoped>

.corner-quadrants {
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

.quadrant {
    max-width: 486px;
    min-width: 486px;
    max-height: 275px;
    min-height: 275px;
    float: left;
    border: none;
}

.quadrant:hover {
    backdrop-filter: brightness(150%);
    cursor: pointer;
}

.vertical-quadrants {
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

.vertical-quadrant {
    max-width: 243px;
    min-width: 243px;
    max-height: 550px;
    min-height: 550px;
    float: left;
    border: none;
}

.vertical-quadrant:hover {
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


</style>