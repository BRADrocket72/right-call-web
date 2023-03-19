<template>
<transition name="modal-fade">
    <div class="modal-backdrop">
        <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <header class="modal-header" id="modalTitle">
                <slot name="header">Feedback</slot>
            </header>
            <section class="modal-body" id="modalDescription">
                <slot name="body">
                    <div v-if="answer == 'Correct'" class="feedback-div">
                      <h2>Nice!</h2>
                      <p id="correct-feedback"></p>
                    </div>
                    <div v-else class="feedback-div">
                      <h2>Almost!</h2>
                      <p id="incorrect-feedback"></p>
                    </div>
                    <button type="button" class="btn-green" @click="close()">Close</button>
                </slot>
            </section>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    name: 'QuizFeedbackModal',
    props: {
        answer: String,
        feedback: {}
    },
    methods: {
        close() {
            this.$emit('close')
        },
        checkAnswer() {
          if(this.answer === 'Correct') {
            const correctFeedback = document.getElementById('correct-feedback')
            correctFeedback.innerText = this.feedback.correctFeedback
          } else {
            const incorrectFeedback = document.getElementById('incorrect-feedback')
            incorrectFeedback.innerText = this.feedback.incorrectFeedback
          }
        }
    },
    mounted() {
        this.checkAnswer()
    }
}
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
</style>