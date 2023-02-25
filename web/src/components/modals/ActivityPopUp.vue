<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Question {{questionNumber}}
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <p class="question-text">{{question.questionText}}</p>
          </slot>
          <div v-if="question.questionType == 'multiple-choice'" class="quiz-buttons">
            <button v-for="answer in question.answers" :key="answer" type="button" class="quiz-answer" @click="handleAnswerSelected(question, answersArray, answer); close()"> <p>{{answer}}</p> </button>
          </div>
          <div v-if="question.questionType == 'short-answer'">
            <input type="text" id="answer" name="answer" class="short-answer-input" autocomplete="off">
            <button type="button" class="btn-green" @click="handleTextAnswer(); close()">Submit</button>
          </div>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import {checkAnswer} from "../../util/GetResults"

  export default {
    name: 'ActivityPopUp',
    data() {
      return {
        updatedAnswers: []
      }
    },
    props:{
      question: Object,
      questionNumber: Number,
      answersArray: [Object]
    },
    methods: {
      close() {
        this.$emit('close', this.updatedAnswers);
      },
      handleAnswerSelected(question, answersArray, answerChoice) {
        this.updatedAnswers = checkAnswer(question, answersArray, answerChoice)
      },
      handleTextAnswer() {
        const answer = document.getElementById('answer').value
        this.handleAnswerSelected(this.question,this.answersArray,answer)
      }
    }
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: darkgray;
    min-width: 650px;
    max-width: 650px;
    min-height: 500px;
    max-height: 500px;
    position: fixed;
    left: auto;
    top: auto;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }
  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #FFFFFF;
    justify-content: space-between;
  }
  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }
  .modal-body {
    position: relative;
    padding: 20px 10px;
  }
  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }
  .btn-green {
    color: white;
    background:#4AAE9B;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
  }

  .question-text {
    font-size: 22px;
  }

  .quiz-buttons {
    display: flex;
    flex-wrap: wrap;
    margin: auto auto auto 30px;
  }

  .quiz-answer {
    display: flex;
    flex-direction: column;
    flex: 1 0 25%;
    min-height: 100px;
    max-height: 130px;
    min-width: 150px;
    max-width: 180px;
    color: white;
    text-shadow: 1px 1px 5px #000000;
    background:#4AAE9B;
    border: none;
    border-radius: 6px;
    padding: 15px;
    margin: 20px 25px 20px 45px;
  }

  .quiz-answer:hover {
    border: 1px solid #0e333c;
    box-shadow: 2px 2px 6px #4AAE9B;
  }

  .quiz-answer p {
    width: 100%;
    word-wrap: break-word;
    font-size: 18px;
    margin: auto;
  }

  .short-answer-input {
    width: 100%;
    height: 40px;
    background: #e9e9e9;
    border: 1px solid #0e333c;
    border-radius: 6px;
    margin-bottom: 20px;
    font-size: 22px;
  }

  .short-answer-input:focus {
  background-color: #ffffff;
  border: 2px solid #0e333c;
}

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>