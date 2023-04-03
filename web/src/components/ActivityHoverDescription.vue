<template>
    <div class="description-container">
        <div v-if="activity.questionType === 'multiple-choice'" class="activity-description">

        </div>
        <div v-else-if="activity.questionType === 'short-answer'" class="activity-description">

        </div>
        <div v-else-if="activity.questionType === 'eye-tracking'" class="activity-description">

        </div>
        <div v-else class="activity-description">
            <p>Question Type: Drag and Drop</p>
            <p>Question Text: {{activity.questionText}}</p>
            <span class="answers-span">
                <p>Answers:</p>
                <p v-for="answer in activity.answers" :key="answer">{{answer[0]}}</p>
            </span>
        </div>
        <div class="tail"></div>
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
    font-size: 15px;
    font-weight: normal;
    text-align: left;
}

.tail {
    position: absolute;
    bottom: -18px;
    left: 43%;
    width: 0;
    height: 0;
    border-color:#f9f9f9 transparent transparent transparent;
    border-width:10px;
    border-style: solid;
}

.activity-description {
    margin: 0;
    padding: 0;
}

.activity-description p {
    margin: 0;
    padding: 0;
}

.answers-span {
    display: flex;
    justify-content: space-between;
}
</style>