<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <slot name="header">
            Question {{questionNumber}}
          </slot>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <slot name="body">
            <p>{{question.questionText}}</p>
            <br>
            <br>
          </slot>
            <button type = "button" class="btn-green" @click="handleAnswerSelected(question, answersArray, question.answers[0]); close()"> {{question.answers[0]}} </button>
            
            <button type = "button" class="btn-green" @click="handleAnswerSelected(question, answersArray, question.answers[1]); close()">  {{question.answers[1]}}</button>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import {checkAnswer} from "@/models/GetResults.js"

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
      }
    }
  };
</script>

<style>
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
    width: 600px;
    height: 300px;
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
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
</style>