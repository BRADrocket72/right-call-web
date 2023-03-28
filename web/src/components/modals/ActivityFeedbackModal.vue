<template>
<transition name="modal-fade">
    <div class="modal-backdrop">
        <div class="modal" id="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <header class="modal-header" id="modalTitle">
                <slot name="header">Question Feedback</slot>
            </header>
            <section class="modal-body" id="modalDescription">
                <slot name="body">
                    <div v-if="feedback !== ''" class="correct-feedback">
                        <label for="correct-textarea">Correct Answer Feedback: </label><textarea id="correct-textarea" class="correct-textarea" maxlength="250" rows="4" :value="feedback.correctFeedback"></textarea>
                    </div>
                    <div v-else class="correct-feedback">
                        <label for="correct-textarea">Correct Answer Feedback: </label><textarea id="correct-textarea" class="correct-textarea" maxlength="250" rows="4"></textarea>
                    </div>
                    <div v-if="feedback !== ''" class="incorrect-feedback">
                        <label for="incorrect-textarea">Incorrect Answer Feedback: </label><textarea id="incorrect-textarea" class="incorrect-textarea" maxlength="250" rows="4" :value="feedback.incorrectFeedback"></textarea>
                    </div>
                    <div v-else class="incorrect-feedback">
                        <label for="incorrect-textarea">Incorrect Answer Feedback: </label><textarea id="incorrect-textarea" class="incorrect-textarea" maxlength="250" rows="4"></textarea>
                    </div>
                    <div class="button-div">
                        <button type="button" class="btn-green" @click="save()">Save</button>
                        <button type="button" class="btn-green" @click="close()">Close</button>
                    </div>
                    <p id="invalid-save"></p>
                </slot>
            </section>
        </div>
    </div>
</transition>
</template>

<script>

export default {
    name: 'ActivityFeedbackModal',
    data() {
        return {
            allInputsValid: false,
            feedbackModalData: []
        }
    },
    props: {
        feedback: {},
        activityId: String,
        timestamp: Number
    },
    methods: {
        close() {
            this.$emit('close')
        },
        save() {
            let invalid = document.getElementById('invalid-save')
            this.checkInputs()
            if(this.allInputsValid) {
                invalid.innerHTML = ""
                this.$emit('save', this.feedbackModalData)
            } else {
                invalid.innerHTML = "Please fill out all fields."
                this.feedbackModalData = []
            }
        },
        checkInputs() {
            const correctTextArea = document.getElementById('correct-textarea')
            const incorrectTextArea = document.getElementById('incorrect-textarea')
            if(correctTextArea.value != "" && incorrectTextArea.value != "") {
                this.allInputsValid = true
                this.feedbackModalData = [this.activityId, this.timestamp, correctTextArea.value, incorrectTextArea.value]
            } else {
                this.allInputsValid = false
            }
        }
    }
}
</script>

<style scoped>
.body {
    display: flex;
    flex-direction: column;
}

.modal {
  background: white;
  height: 500px;
  width: 700px;
  border-radius: 2px;
  position: fixed;
  left: auto;
  top: auto;
  box-shadow: 2px 2px 20px 1px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.correct-feedback {
    display: flex;
    flex-direction: column;
    margin: 0 0 35px 10px;
}

#correct-textarea {
    resize: none;
    background: #e8dede;
    border: 1px solid #000000;
    border-radius: 6px;
    width: 500px;
}

.incorrect-feedback {
    display: flex;
    flex-direction: column;
    margin: 0 0 0 10px;
}

#incorrect-textarea {
    resize: none;
    background: #e8dede;
    border: 1px solid #000000;
    border-radius: 6px;
    width: 500px;
}

.button-div {
    margin: 10px 0;
}

#invalid-save {
    margin-left: 10px;
}
</style>