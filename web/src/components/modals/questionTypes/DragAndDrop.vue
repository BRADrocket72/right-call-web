<template>
    <div class="drag-container" id="drag-container">
        <div v-if="activity === ''" class="drag-editor">
            <div class="question-text-input" ondrop="return false">
                <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text">
            </div>
            <div class="editor-option" id="text-container">
                <input type="text" class="text-option" id="text-option-1" readonly="readonly" draggable="true">
                <p>Text Input</p>
            </div>
            <div class="editor-option" id="number-container">
                <h2 id="number-option" draggable="true">{{orderedNumbersIndex}}</h2>
                <p>Ordered Numbers</p>
            </div>
        </div>
        <div v-else class="drag-editor">

        </div>
        <div class="drop-zone" id="drop-zone"></div>
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
            textInputIndex: 1,
            orderedNumbersIndex: 1,
            currentEvent: Event,
            positionedEventIDs: [],
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
        textOptionDragSetup() {
            const index = this.textInputIndex
            const textOption = document.querySelector('#text-option-' + index)
            textOption.addEventListener('dragstart', (event) => {
                this.currentEvent = event
                event.currentTarget.classList.add('dragging')
                event.dataTransfer.setData('application/x-moz-node', event.target.id)
                event.dataTransfer.setData('text', event.target.id)
            })
            textOption.addEventListener('dragend', (event) =>
                event.target.classList.remove('dragging')
            )
        },
        numberOptionDragSetup() {
            const numberOption = document.querySelector('#number-option')
            numberOption.addEventListener('dragstart', (event) => {
                event.currentTarget.classList.add('dragging')
            })
            numberOption.addEventListener('dragend', (event) =>
                event.target.classList.remove('dragging')
            )
        },
        dropZoneSetup() {
            const dropZone = document.querySelector('#drop-zone')
            dropZone.addEventListener('dragover', (event) => {
                event.preventDefault()
                event.dataTransfer.setData('text', event.target.id)
            })
            dropZone.addEventListener('drop', (event) => {
                event.preventDefault()
                const target = event.target
                if(target.classList[0] === 'drop-zone') {
                    const dropX = event.layerX
                    const dropY = event.layerY
                    const sourceElementClass = this.currentEvent.srcElement.classList[0]
                    if(sourceElementClass === 'text-option' || sourceElementClass === 'text-answer') {
                        this.textOptionEvent(event,dropX,dropY)
                    } else {
                        alert('alerting')
                    }
                } else {
                    alert('Options can only be dragged within the area of the image.')
                }
            })
        },
        textOptionEvent(event,dropX,dropY) {
            const data = event.dataTransfer.getData('text')
            const source = document.getElementById(data)
            const existingOption = this.checkIfOptionAlreadyMoved(source)
            if(existingOption) {
                const styledSource = this.setupOptionCoordinates(source, dropX, dropY)
                event.target.appendChild(styledSource)
            } else {
                this.positionedEventIDs.push(source.id)
                const styledSource = this.setupOptionCoordinates(source, dropX, dropY)
                event.target.appendChild(styledSource)
                this.createNewInputOption('text-option')
                this.textOptionDragSetup()
            }
        },
        setupOptionCoordinates(option, dropX, dropY) {
            option.style.cssText = 'position:absolute;'
            option.style.left = dropX + 'px'
            option.style.top = dropY + 'px'
            option.classList.remove('text-option')
            option.classList.add('text-answer')
            option.addEventListener('focusin', (event) => {
                event.target.removeAttribute('readonly')
            })
            option.addEventListener('focusout', (event) => {
                event.target.readOnly = 'readonly'
            })
            if(option.querySelector('.delete-button') === null) {
                const newButton = this.createDeleteInputButton
                option.insertBefore(newButton, option.firstChild)
            }
            return option
        },
        createNewInputOption(optionType) {
            if(optionType === 'text-option') {
                this.textInputIndex +=1
                const newInput = document.createElement('input')
                newInput.type = 'text'
                newInput.classList.add('text-option')
                newInput.id = 'text-option-' + this.textInputIndex
                newInput.readOnly = 'readonly'
                newInput.draggable = 'true'
               
                const textContainer = document.querySelector('#text-container')
                textContainer.insertBefore(newInput, textContainer.firstChild)
            }
        },
        createDeleteInputButton() {
            const index = this.textInputIndex
            const button = document.createElement('button')
            button.type == 'button'
            button.classList.add('delete-button')
            button.onclick = this.deleteInput(index)
            return button
        },
        deleteInput(index) {
            console.log(index)
        },
        checkIfOptionAlreadyMoved(source) {
            let count = 0
            for(const id of this.positionedEventIDs) {
                if(id === source.id) {
                    count +=1
                } 
            }
            if(count >= 1) {
                return true
            } else {
                return false
            }
        }
        
    },
    mounted() {
        if(this.image) {
            document.getElementById('drag-container').appendChild(this.image)
            this.textOptionDragSetup()
            this.numberOptionDragSetup()
            this.dropZoneSetup()
        } else {
            alert('There was a problem, drag & drop is not available for this timestamp.')
            this.close()
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
    padding: 20px 0 0 50px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    min-width: 300px;
    max-width: 300px;
}

.question-text-input label {
    margin-left: -24px;
}

.question-text-input input {
    min-width: 250px;
    max-width: 250px;
    min-height: 30px;
    min-height: 30px;
    margin-left: -24px;
    margin-bottom: 20px;
    background: #e9e9e9;
    border: 1px solid #0e333c;
    border-radius: 6px;
    font-size: 18px;
}

.question-text-input input:focus {
    background-color: #ffffff;
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


.editor-option p {
    margin: 10px 0 0 0;
    padding: 0;
}

[draggable="true"] {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}

.text-option {
    width: 70px;
    cursor: move;
    border-radius: 6px;
}

.text-option:hover {
    box-shadow: 2px 3px 3px #d1d1d1;
}

.dragging {
    opacity: 50%;
}

.drop-zone {
    position: absolute;
    min-width: 900px;
    max-width: 900px;
    min-height: 500px;
    max-height: 500px;
}

.text-answer {
    width: 100px;
    cursor: move;
}

.delete-button {
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    border-radius: 100%;
    background: #ff0000;
    color: #ffffff;
}
</style>