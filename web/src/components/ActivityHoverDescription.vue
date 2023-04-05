<template>
    <div class="description-container">
        <div v-if="activity.questionType === 'multiple-choice'" class="activity-description">

        </div>
        <div v-else-if="activity.questionType === 'short-answer'" class="activity-description">

        </div>
        <div v-else-if="activity.questionType === 'eye-tracking'" class="activity-description">

        </div>
        <div v-else class="activity-description">
            <h2>Question Type: </h2>
            <p>Drag and Drop</p>
            <h2>Question Text: </h2>
            <p>{{activity.questionText}}</p>
            <h2>Answers: </h2>
            <span class="answers-span">
                <p v-for="(answer, index) in activity.answers" :key="answer">{{answer[0]}}<span v-if="index+1 < activity.answers.length">, </span></p>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ActivityHoverDescription',
    data() {
        return {

        }
    },
    props: {
        activity: {}
    },
}
</script>

<style scoped>
.description-container {
    position: absolute;
    min-width: 210px;
    max-width: 210px;
    min-height: 120px;
    max-height: 120px;
    background: #ffffff;
    color: black;
    margin-top: -126px;
    margin-left: 90px;
    font-size: 15px;
    font-weight: normal;
    text-shadow: none;
    text-align: left;
    overflow-x: hidden;
    overflow-y: scroll;
}

.activity-description {
    margin: 0;
    padding: 0;
}

.activity-description h2 {
    margin: 3px 0 0 5px;
    padding: 0;
    font-size: 15px;
    font-weight: bold;
}

.activity-description p {
    margin: 2px 0 0 5px;
    padding: 0;
    font-size: 15px;
}

.answers-span {
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0;
    text-align: left;
}


</style>