<template>
    <div class="Timer">
        <p><span id="seconds">00</span>:<span id="tens">00</span></p>
    </div>
</template>

<script>



var seconds = 0
var tens = 0

var interval;

export default {
    name: 'TimerCountdown',
    data() {
        return {
            seconds: Number,
            maxSeconds: 5,
            reset: this.needsToReset
        }

    },
    props: {
        needsToReset : Boolean,
    },

    methods: {
        endTimer() {
            clearInterval(interval)
            this.$emit('endTimer',seconds)
        },

        startTimer() {
            console.log(this.needsToReset)

            var appendTens = document.getElementById("tens")
            var appendSeconds = document.getElementById("seconds")
            if(!appendTens || !appendSeconds){
                return
            }

            tens++;

            if (tens <= 9) {
                appendTens.innerHTML = "0" + tens;
            }

            if (tens > 9) {
                appendTens.innerHTML = tens;
            }

            if (tens > 99) {
                console.log("seconds");
                seconds++;
                appendSeconds.innerHTML = "0" + seconds;
                tens = 0;
                appendTens.innerHTML = "0" + 0;
            }

            if (seconds > 9) {
                appendSeconds.innerHTML = seconds;
            }

        },

    },
    mounted() {
        seconds =0;
        tens = 0;
        interval = setInterval(this.startTimer, 10);

    },
    watch: {
      'needsToReset': function() {
        clearInterval(interval)
        this.endTimer();
      }
    }
}
</script>
    
    
  
    