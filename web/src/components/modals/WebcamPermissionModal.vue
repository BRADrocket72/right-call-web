<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">
            Webcam Permission
          </slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <p>This lesson includes eye-tracking questions that need to use your webcam. A webcam is not required to take this lesson.</p>
            <p>If you do plan on using your webcam, please also click "Yes" on the browser pop-up asking to access your webcam.</p>
            <div class="button-div">
              <button type="button" class="btn-green" @click="selectPermission(true)">Accept</button>
              <button type="button" class="btn-green" @click="selectPermission(false)">Decline</button>
            </div>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'WebcamPermissionModal',
  data() {
    return {
        webcamPermission: false
    }
  },
  methods: {
    selectPermission(permission) {
        if(permission) {
            this.webcamPermission = true
            this.$emit('close',this.webcamPermission)
        } else {
            this.$emit('close',this.webcamPermission)
        }
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
  min-width: 600px;
  max-width: 600px;
  min-height: 400px;
  max-height: 400px;
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

.button-div {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>