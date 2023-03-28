<template>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              Create Custom Lesson Confirmation
            </slot>
          </header>
  
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <br>
              <p>Do you want to create your own version of this lesson?</p>
  
              <button type="button" class="btn-green" @click="close('true')">  Yes </button>
              <button type="button" class="btn-green" @click="close('false')">  Exit </button>
            </slot>
          </section>
        </div>
      </div>
    </transition>
  </template>
  
  <script>  
  export default {
    name: 'LessonCustomizationConfirmation',
    data() {
      return {
        numberOfQuestions: 0,
        percentageCorrect: "",
        isLessonConfirmed: "",
        newLesson: ""
      }
    },
    props: {
      lesson: Object      
    },
    mounted() {
      this.newLesson = this.lesson
    },
    methods: {
      close(boolean) {
        this.isLessonConfirmed = boolean
        this.$emit('close', this.isLessonConfirmed, this.newLesson)
      },
      
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
    background: white;
    width: 600px;
    height: 300px;
    border-radius: 2px;
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
    background-color: #4AAE9B;
    justify-content: space-between;
    border-radius: 2px 2px 0px 0px;
  
  }
  
  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
  }
  
  .modal-body {
    position: relative;
    background: white;
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
    background: #4AAE9B;
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