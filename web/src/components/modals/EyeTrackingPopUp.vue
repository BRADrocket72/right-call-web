<template>
<div class="quadrants">
    <div class="quadrant" id="quadrant-one"></div>
    <div class="quadrant" id="quadrant-two"></div>
    <div class="quadrant" id="quadrant-three"></div>
    <div class="quadrant" id="quadrant-four"></div>
</div>
</template>

<script>


export default {
    name: 'EyeTrackingPopUp',
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>


<style scoped>

.quadrants {
    position: absolute;
    z-index: 1;
    max-width: 972px;
    min-width: 972px;
    height: 550px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 34px;
    left: 0;
    right: 0;
    text-align: center;
    
}   

.quadrant {
    max-width: 486px;
    min-width: 486px;
    max-height: 275px;
    min-height: 275px;
    border: 1px solid black;
    float: left;
}

.quadrant:hover {
    backdrop-filter: brightness(150%);
    cursor: pointer;
}
</style>