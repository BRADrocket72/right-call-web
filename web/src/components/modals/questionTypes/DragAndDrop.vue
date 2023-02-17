<template>
    <div class="drag-container" id="drag-container">
        <div class="drag-editor">
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
            <div class="button-div">
                <div class="save"><button type="button" class="btn-green" @click="save()">Save</button></div>
                <div class="close"><button type="button" class="btn-green" @click="close()">Close</button></div>
            </div>
        </div>
        <div class="drop-zone" id="drop-zone">

        </div>
    </div>
</template>

<script>
export default {
    name: 'DragAndDrop',
    data() {
        return {
            questionType: 'drag-and-drop',
            answers: [],
            allInputsValid: false,
            textInputIndex: 1,
            orderedNumbersIndex: 1,
            currentEvent: Event,
            positionedEventIDs: [],
            currentInputID: String
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
            if(this.checkInputs()) {
                this.updateReturnArrayWithValues()
                //this.$emit('save',this.answers) 
            } else {
                alert('Please fill in all of the text fields.')
            }
        },
        textOptionDragSetup() {
            const textOption = document.querySelector('#text-option-' + this.textInputIndex)
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
                    alert('Please do not drag the input inside itself. Make sure your cursor is outside the white area.')
                }
            })
        },
        textOptionEvent(event,dropX,dropY) {
            const data = event.dataTransfer.getData('text')
            const source = document.getElementById(data)
            const existingOption = this.checkIfOptionAlreadyMoved(source)
            if(existingOption) {
                const parentID = source.parentNode.id
                const deleteButtonID = source.parentElement.querySelector('button').id
                source.parentNode.remove()
                const styledSource = this.setupTextOptionCoordinates(source, dropX, dropY, parentID, deleteButtonID)
                this.updateCoordinates(this.currentInputID, dropX, dropY)
                event.target.appendChild(styledSource)
            } else {
                this.positionedEventIDs.push(source.id)
                const styledSource = this.setupTextOptionCoordinates(source, dropX, dropY, '', '')
                this.answers.push([this.currentInputID, dropX, dropY])
                event.target.appendChild(styledSource)
                this.createNewTextOption()
                this.textOptionDragSetup()
            }
        },
        setupTextOptionCoordinates(option, dropX, dropY, parentID, buttonID) {
            const newDiv = document.createElement('div')
            newDiv.style.cssText = 'position:absolute;'
            newDiv.style.left = (dropX - 50) + 'px'
            newDiv.style.top = (dropY - 15) + 'px'
            if(parentID === '') {
                newDiv.id = 'text-input-div-' + this.textInputIndex
            } else {
                newDiv.id = parentID
            }
            this.currentInputID = option.id
            option.classList.remove('text-option')
            option.classList.add('text-answer')
            option.addEventListener('focusin', (event) => {
                event.target.removeAttribute('readonly')
            })
            option.addEventListener('focusout', (event) => {
                event.target.readOnly = 'readonly'
            })
            
            const newButton = this.createDeleteTextInputButton(buttonID)
            newDiv.insertBefore(newButton, newDiv.firstChild)
            newDiv.insertBefore(option, newDiv.firstChild)
            return newDiv
        },
        createNewTextOption() {
            this.textInputIndex +=1
            const newInput = document.createElement('input')
            newInput.type = 'text'
            newInput.classList.add('text-option')
            newInput.id = 'text-option-' + this.textInputIndex
            newInput.readOnly = 'readonly'
            newInput.draggable = 'true'
            
            const textContainer = document.querySelector('#text-container')
            textContainer.insertBefore(newInput, textContainer.firstChild)
        },
        createDeleteTextInputButton(id) {
            const button = document.createElement('button')
            button.type == 'button'
            if(id === '') {
                button.id = this.textInputIndex
            } else {
                button.id = id
            }
            button.classList.add('delete-button')
            button.addEventListener('mousedown', (event) => {
                event.preventDefault()
                this.deleteTextInput(button.id)
            })
            const deleteSymbol = document.createElement('p')
            deleteSymbol.textContent = "X"
            button.appendChild(deleteSymbol, button.firstChild)
            return button
        },
        deleteTextInput(id) {
            const node = document.getElementById(id).parentElement
            node.remove()
            const positionedID = 'text-option-' + id
            const index = this.positionedEventIDs.indexOf(positionedID)
            this.positionedEventIDs.splice(index, 1)
        },
        updateCoordinates(id, dropX, dropY) {
            let count = 0
            for(const row of this.answers) {
                if(row[0] === id) {
                    this.answers.splice(count, 0, [id, dropX, dropY])
                    this.answers.splice(count+1, 1)
                } 
                count +=1
            }
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
        },
        checkInputs() {
            return true
        },
        updateReturnArrayWithValues() {
            let count = 0
            for(const row of this.answers) {
                let id = row[0]
                let value = document.getElementById(id).value
                this.answers[count][0] = value
                count +=1
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

.button-div {
    display: flex;
    flex-direction: row;
    margin-top: 150px;
}

.button-div button {
    width: 80px;
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
    height: 14px;
    width: 14px;
    margin: -7px -7px 0 0;
    padding: 0;
    border-radius: 100%;
    background: #ff0000;
    color: #ffffff;
    font-size: 12px;
}

.delete-button p {
    margin: 0;
    font-size: 9px;
}
</style>