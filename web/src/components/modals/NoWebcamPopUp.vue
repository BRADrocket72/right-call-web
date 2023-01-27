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
    name: 'NoWebcamPopUp',
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
    max-width: 972px;
    min-width: 972px;
    height: 550px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
}   

.quadrant {
    max-width: 486px;
    min-width: 486px;
    max-height: 275px;
    min-height: 275px;
    float: left;
}

.quadrant:hover {
    backdrop-filter: brightness(150%);
    cursor: pointer;
}

@media only screen and (min-width: 1200px) {
    .quadrants {
        margin-left: 100px;
    }   
}

@media only screen and (max-width: 1199px) {
    .quadrants {
        margin-left: 28px;
    }   
}
</style>