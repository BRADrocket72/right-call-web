<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header" id="modalTitle">
          <slot name="header">Assign New Timestamp</slot>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <p>Current timestamp: {{formattedTimestamp}}</p>
            <p v-if="timestampSaved">Timestamp saved successfully.</p>
            <button type="button" class="btn-green" @click="save()">Save</button>
            <button type="button" class="btn-green" @click="close()">Close</button>
          </slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import {formatTimeForVideo} from '@/util/FormatVideosTime.js'
export default {
    name: 'AssignTimestampsModal',
    data() {
        return {
            timestampSaved: false,
            formattedTimestamp: Number
        }
    },
    props: {
        newTimestamp: Number
    },
    methods: {
        close() {
            this.$emit('close', this.timestampSaved)
        },
        save() {
            this.timestampSaved = true
        },
        convertToReadableTime() {
            this.formattedTimestamp = formatTimeForVideo(this.newTimestamp)
        }
    },
    mounted() {
        this.convertToReadableTime()
    }
    
}
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