<template>
<div>
    <div v-if="activity" class="activity-info">
    
    </div>
    <div v-else class="activity-info">
        <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text">
        <select>
            <option value="quadrant-one">Quadrant 1</option>
            <option value="quadrant-two">Quadrant 2</option>
            <option value="quadrant-three">Quadrant 3</option>
            <option value="quadrant-four">Quadrant 4</option>
        </select>
    </div>
    <div class="quadrants">
        <div class="quadrant-one quadrant selected"></div>
        <div class="quadrant-two quadrant"></div>
        <div class="quadrant-three quadrant"></div>
        <div class="quadrant-four quadrant"></div>
    </div>
    <div class="button-div">
        <div class="save"><button type="button" class="btn-green" @click="save()">Save</button></div>
        <div class="close"><button type="button" class="btn-green" @click="close()">Close</button></div>
    </div>
</div>
</template>

<script>

export default {
    name: "EyeTracking",
    data() {
        return {

        }
    },
    props: {
        activity: {}
    },
    methods: {

    }
}
</script>

<style>
.activity-info label {
    width: 100%;
}



.quadrants {
    position: absolute;
    max-width: 120px;
    min-width: 120px;
    right: 0;
    left: 50%;
    top: 20%;
    text-align: center;
}

.quadrant {
  max-width: 60px;
  min-width: 60px;
  max-height: 50px;
  min-height: 50px;
  border: 1px solid black;
  float: left;
}

.selected {
  padding-right: 3px;
}
</style>