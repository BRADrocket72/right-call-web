<template>
    <div class="drag-container" id="drag-container">
        
    </div>
</template>

<script>
export default {
    name: 'DragAndDrop',
    data() {
        return {
            questionType: 'drag-and-drop',
            activityModalData: [],
            allInputsValid: false,
        }
    },
    props: {
        activity: {},
        activityIndex: Number,
        image: HTMLCanvasElement
    },
    methods: {
        close() {
            this.$emit('close')
        },
        save() {
            this.$emit('save',this.activityModalData)  
        },
    },
    mounted() {
        if(this.image) {
            document.getElementById('drag-container').appendChild(this.image)
        }
    }
}
</script>

<style>
.modal {
    width: 100%;
}

.drag-container {
    width: 900px;
    height: 500px;
}

.drag-container canvas {
    min-width: 900px;
    max-width: 900px;
    min-height: 500px;
    max-height: 500px;
}
</style>