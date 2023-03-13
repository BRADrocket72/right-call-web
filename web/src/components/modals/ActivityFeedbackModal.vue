<template>
<transition name="modal-fade">
    <div class="modal-backdrop">
        <div class="modal" id="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
            <header class="modal-header" id="modalTitle">
                <slot name="header">Question Feedback</slot>
            </header>
            <section class="modal-body" id="modalDescription">
                <slot name="body">
                    <div class="correct-feedback">
                        <label for="correct-textarea">Correct Answer Feedback: </label><textarea id="correct-textarea" class="correct-textarea" maxlength="200" rows="4"></textarea>
                    </div>
                    <div class="incorrect-feedback">
                        <label for="incorrect-textarea">Incorrect Answer Feedback: </label><textarea id="incorrect-textarea" class="incorrect-textarea" maxlength="200" rows="4"></textarea>
                    </div>
                </slot>
            </section>
        </div>
    </div>
</transition>
</template>

<script>

export default {
    name: 'ActivityFeedbackModal',
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
    margin-bottom: 35px;
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
}

#incorrect-textarea {
    resize: none;
    background: #e8dede;
    border: 1px solid #000000;
    border-radius: 6px;
    width: 500px;
}

</style>