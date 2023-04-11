<template>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
          <header class="modal-header" id="modalTitle">
            <slot name="header">
              Eye Tracking Question Incoming
            </slot>
          </header>
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <div class="instructions">
                <p>The following question involves using eye tracking software to guage your understanding of the subject.</p>
                <p>By clicking ok, you understand that this question will track your eye movements, which will contribute to your quiz results.</p>
              </div>
              <div class="question">
                <h2>Question: </h2>
                <p class="questionText"> {{ question.questionText }} </p>
                <button type="button" class="btn-green" @click="close()">OK</button>
              </div>
            </slot>
          </section>
        </div>
      </div>
    </transition>
  </template>
<script>
export default {
  name: 'EyeTrackingConfirm',
  props: {
    question: Object
  },
  methods: {
    close() {
        this.$emit('close');
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
  background: white;
  width: 600px;
  height: 400px;
  border-radius: 2px;
  position: fixed;
  left: auto;
  top: auto;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.modal-header {
  position: relative;
  border-bottom: 1px solid #EEEEEE;
  background-color: #4AAE9B;
  justify-content: space-between;
  border-radius: 2px 2px 0px 0px;
  color: white
}
.modal-footer {
  border-top: 1px solid #EEEEEE;
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
  color: black;
  background: #EEEEEE;
  border: 1px solid #EEEEEE;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  font-weight: bold;
}
.btn-green p {
  font-size: larger;
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity .5s ease;
}
.instructions {
  border-radius: 10px;
}
.question {
  background-color: #4AAE9B;
  color: white;
  border-radius: 10px;
}
.question h2 {
  font-weight: bold;
}
.questionText {
  font-size: 22px;
}
</style>