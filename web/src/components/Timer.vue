<template>
    <div class="Timer">
        <p><span id="seconds">00</span>:<span id="tens">00</span></p>
    </div>
</template>

<script>
import { useUserResultsStore } from '@/stores/UserResultsStore'


export default {
    name: 'TimerCountdown',
    data() {
        return {
            seconds: 0,
            tens:0,
            interval: ""
        }
    },
    methods: {
        startTimer() {
            var resultStore = useUserResultsStore()
            var appendTens = document.getElementById("tens")
            var appendSeconds = document.getElementById("seconds")
            if(!appendTens || !appendSeconds){
                return
            }

            this.tens++;

            if (this.tens <= 9) {
                appendTens.innerHTML = "0" + this.tens;
            }

            if (this.tens > 9) {
                appendTens.innerHTML = this.tens;
            }

            if (this.tens > 99) {
                this.seconds++;
                appendSeconds.innerHTML = "0" + this.seconds;
                this.tens = 0;
                appendTens.innerHTML = "0" + 0;
            }

            if (this.seconds > 9) {
                appendSeconds.innerHTML = this.seconds;
            }
            resultStore.questionTime = this.seconds + ":" + this.tens
        },

    },
    mounted() {
        this.interval = setInterval(this.startTimer, 10);

    },
    unmounted(){
        clearInterval(this.interval)
    }
}
// }
</script>
    
    
  
    