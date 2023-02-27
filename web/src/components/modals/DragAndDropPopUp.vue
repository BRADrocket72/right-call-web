<template>
    <div>
        <div v-for="answer in question.answers" :key="answer">

        </div>
    </div>
</template>

<script>
export default {
    name: 'DragAndDropPopUp',
    data() {
        return {
        
        }
    },
    props:{
        question: Object,
        answersArray: [Object]
    },
    methods: {
        close() {
            this.$emit('close', this.updatedAnswers);
        },
        mounted() {
            console.log(this.question.answers)
        }
    }
}
</script>

<style scoped>

</style>