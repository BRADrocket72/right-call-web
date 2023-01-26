<template>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div class="modal-content" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription" fullscreen>
          <header class="modal-header" id="modalTitle">
            <slot name="header">Eye-tracking Calibration</slot>
          </header>
          <section class="modal-body" id="modalDescription">
            <slot name="body">
              <p class="title_1">Calibration Screen</p>
              <p class="title_2">While looking at the cursor, Click on each button 5 times until each button is Red</p>
              <button type="button" v-if="leftButton == 5 && rightButton == 5 && topLeftButton == 5 && topRightButton == 5 && centerButton == 5" class="btn-green" @click="close()"> Back to Lesson Selection Page </button> 
              <button type="button" id="btn-calibrate-left" class="btn-calibrate-left" @click="checkButtons('btn-calibrate-left')"></button>
              <button type="button" id="btn-calibrate-right" class="btn-calibrate-right" @click="checkButtons('btn-calibrate-right')"></button>
              <button type="button" id="btn-calibrate-topLeft" class="btn-calibrate-topLeft" @click="checkButtons('btn-calibrate-topLeft')"></button>
              <button type="button" id="btn-calibrate-topRight" class="btn-calibrate-topRight" @click="checkButtons('btn-calibrate-topRight')"></button>
              <button type="button" id="btn-calibrate-center" class="btn-calibrate-center" @click="checkButtons('btn-calibrate-center')"></button>
            </slot>
          </section>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
      name: 'WebgazerCalibrationPage',
      data() {
          return {
              returnToVideoSelectionPage: false,
              leftButton: 0,
              rightButton: 0,
              topLeftButton: 0,
              topRightButton: 0,
              centerButton: 0
          }
      },
      methods: {
          close() {
              this.$emit('close')
          },
          checkButtons(buttonClass){
            if (buttonClass == "btn-calibrate-left") {
              this.changeColor(this.leftButton, buttonClass)
              if (this.leftButton != 5) {
                this.leftButton++
              }
            } 
            else if (buttonClass == "btn-calibrate-right") {
              this.changeColor(this.rightButton, buttonClass)
              if (this.rightButton != 5) {
                this.rightButton++
              }
            }
            else if (buttonClass == "btn-calibrate-topRight") {
              this.changeColor(this.topRightButton, buttonClass)
              if (this.topRightButton != 5) {
                this.topRightButton++
              }
            }
            else if (buttonClass == "btn-calibrate-center") {
              this.changeColor(this.centerButton, buttonClass)
              if (this.centerButton != 5) {
                this.centerButton++
              }
            }
            else {
              this.changeColor(this.topLeftButton, buttonClass)
              if (this.topLeftButton != 5) {
                this.topLeftButton++
              }
            }
          },
          changeColor(buttonType, buttonClass) {
            let newCalibrationButton = document.getElementById(buttonClass)
            if (buttonType == 0) {
                newCalibrationButton.style.backgroundColor = "silver"
              }
              else if (buttonType == 1) {
                newCalibrationButton.style.backgroundColor = "blue"
              }
              else if (buttonType == 2) {
                newCalibrationButton.style.backgroundColor = "yellow"
              }
              else if (buttonType == 3) {
                newCalibrationButton.style.backgroundColor = "white"
              }
              else {
                newCalibrationButton.style.backgroundColor = "red"
              }
          }
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
  
  .modal-content {
    background: white;
    width: 95%;
    height: 95%;
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
    height: 40px;
    padding: 10px;
  }
  
  .modal-body {
    position: relative;
    background: white;
    padding: 20px 10px;
  }
  
  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
  }
  .btn-calibrate-left {
    color: white;
    background: #4AAE9B;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
  .btn-calibrate-right {
    color: white;
    background: #4AAE9B;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .btn-calibrate-topRight {
    color: white;
    background: #4AAE9B;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .btn-calibrate-topLeft {
    color: white;
    background: #4AAE9B;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
    position: absolute;
    left: 0;
    top: 0;
  } 
  .btn-calibrate-center {
    color: white;
    background: #4AAE9B;
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 15px;
    margin: 10px;
    position: absolute;
    left: 48.5%;
    top: 50%;
  } 
  .title_1 {
    font-weight: bold;
    font-size:large;
  }
  .title_2 {
    font-weight: bold;
    font-size: medium;
  }
  </style>
