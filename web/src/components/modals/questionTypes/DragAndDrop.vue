<template>
    <div class="drag-container" id="drag-container">
        <div class="drag-editor">
            <div class="editor-option">
                <h2>ABC</h2>
                <p>Text Input</p>
            </div>
            <div class="editor-option">
                <h2>123</h2>
                <p>Ordered Numbers</p>
            </div>
        </div>
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
    display: flex;
    width: 900px;
    height: 500px;
}

.drag-container canvas {
    min-width: 900px;
    max-width: 900px;
    min-height: 500px;
    max-height: 500px;
}

.drag-editor {
    position: absolute;
    right: 0;
    padding: 30px 0 0 50px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    min-width: 300px;
    max-width: 300px;
}

.editor-option {
    min-width: 80px;
    max-width: 80px;
    min-height: 100px;
    max-height: 100px;
    text-align: center;
    flex: 1 0 46%;
    margin-right: 40px;
    border-radius: 6px;
}

.editor-option h2 {
    font-weight: bold;
    margin: 0;
}

.editor-option p {
    margin: 0;
    padding: 0;
}

.editor-option:hover {
    border: 1px solid #0e333c;
}
</style>