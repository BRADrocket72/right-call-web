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
                <h2 class="number-option" id="number-option-1" draggable="true">1</h2>
                <p>Numbers</p>
            </div>
            <div class="reset-div">
                <button type="button" class="reset-button" @click="resetTextInputs()">Reset Inputs</button>
                <button type="button" class="reset-button" @click="resetNumbers()">Reset Numbers</button>
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
            textInputIndex: 1,
            numbersIndex: 1,
            currentEvent: Event,
            positionedEventIDs: [],
            textInputIDs: [],
            numberIDs: [],
            currentEventID: String,
            questionText: String,
            modalReturnArray: []
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
            if(this.checkInputs() && this.checkQuestionText()) {
                this.updateAnswersWithValues()
                this.setupModalReturnArray()
                console.log(this.modalReturnArray)
                //this.$emit('save',this.answers) 
            } else {
                alert('Please fill in all of the text fields, including the Question Text')
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
            const numberOption = document.querySelector('#number-option-' + this.numbersIndex)
            numberOption.addEventListener('dragstart', (event) => {
                this.currentEvent = event
                event.currentTarget.classList.add('dragging')
                event.dataTransfer.setData('application/x-moz-node', event.target.id)
                event.dataTransfer.setData('text', event.target.id)
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
                    let dropX = 0
                    let dropY = 0
                    const sourceElementClass = this.currentEvent.srcElement.classList[0]
                    if(sourceElementClass === 'text-option' || sourceElementClass === 'text-answer') {
                        dropX = event.layerX - 50
                        dropY = event.layerY - 15
                        this.newDropEvent(event,dropX,dropY,'text')
                    } else if (sourceElementClass === 'number-option' || sourceElementClass === 'number-answer'){
                        dropX = event.layerX - 20
                        dropY = event.layerY - 20
                        this.newDropEvent(event,dropX,dropY,'number')
                    } else {
                        alert('Something went terribly wrong oh god')
                    }
                } else {
                    alert('Please do not drag the input inside itself. Make sure your cursor is outside the white area.')
                }
            })
        },
        newDropEvent(event,dropX,dropY,type) {
            const data = event.dataTransfer.getData('text')
            const source = document.getElementById(data)
            const existingOption = this.checkIfOptionAlreadyMoved(source)
            let styledSource = ''
            if(existingOption) {
                const parentID = source.parentNode.id
                let deleteButtonID = ''
                if(type === 'text') {
                    deleteButtonID = source.parentElement.querySelector('button').id
                }
                source.parentNode.remove()
                styledSource = this.setupOptionAndCoordinates(source, dropX, dropY, type, parentID, deleteButtonID)
                this.updateCoordinates(this.currentEventID, dropX, dropY)
            } else {
                this.positionedEventIDs.push(source.id)
                styledSource = this.setupOptionAndCoordinates(source, dropX, dropY, type, '', '')
                this.answers.push([this.currentEventID, dropX, dropY])
                if(type === 'text') {
                    this.textInputIDs.push(this.currentEventID)
                    this.createNewTextOption()
                    this.textOptionDragSetup()
                } else if (type === 'number') {
                    this.numberIDs.push(this.currentEventID)
                    this.createNewNumberOption()
                    this.numberOptionDragSetup()
                }
            }
            event.target.appendChild(styledSource)
        },
        setupOptionAndCoordinates(option, dropX, dropY, type, parentID, buttonID) {
            const newDiv = document.createElement('div')
            newDiv.style.cssText = 'position:absolute;'
            newDiv.style.left = dropX + 'px'
            newDiv.style.top = dropY + 'px'
            if(parentID === '') {
                if(type === 'text') {
                    newDiv.id = 'text-input-div-' + this.textInputIndex
                } else if(type === 'number') {
                    newDiv.id = 'number-div-' + this.numbersIndex
                }
            } else {
                newDiv.id = parentID
            }
            this.currentEventID = option.id
            if(type === 'text') {
                option.classList.remove('text-option')
                option.classList.add('text-answer')
                option.autocomplete= 'off'
                option.addEventListener('focusin', (event) => {
                    event.target.removeAttribute('readonly')
                })
                option.addEventListener('focusout', (event) => {
                    event.target.readOnly = 'readonly'
                })
                const newButton = this.createDeleteTextInputButton(buttonID, type)
                newDiv.insertBefore(newButton, newDiv.firstChild)
            } else if (type === 'number'){
                option.classList.remove('number-option')
                option.classList.add('number-answer')
            }
            newDiv.insertBefore(option, newDiv.firstChild)
            return newDiv
        },
        createNewTextOption(reset) {
            if(!reset) {
                this.textInputIndex +=1
            }
            const newInput = document.createElement('input')
            newInput.type = 'text'
            newInput.classList.add('text-option')
            newInput.id = 'text-option-' + this.textInputIndex
            newInput.readOnly = 'readonly'
            newInput.draggable = 'true'
            
            const textContainer = document.querySelector('#text-container')
            textContainer.insertBefore(newInput, textContainer.firstChild)
        },
        createNewNumberOption(reset) {
            if(!reset) {
                this.numbersIndex +=1
            }
            const newNumber = document.createElement('h2')
            newNumber.classList.add('number-option')
            newNumber.id = 'number-option-' + this.numbersIndex
            newNumber.draggable = 'true'
            newNumber.innerHTML = this.numbersIndex

            const numberContainer = document.querySelector('#number-container')
            numberContainer.insertBefore(newNumber, numberContainer.firstChild)
        },
        createDeleteTextInputButton(id) {
            const button = document.createElement('button')
            button.type == 'button'
            if(id === '') {
                button.id = 'delete-text-' + this.textInputIndex
            } else {
                button.id = id
            }
            button.classList.add('delete-button')
            button.addEventListener('mousedown', (event) => {
                event.preventDefault()
                this.deleteOption(button.id, 'text')
            })
            const deleteSymbol = document.createElement('p')
            deleteSymbol.textContent = "X"
            button.appendChild(deleteSymbol, button.firstChild)
            return button
        },
        deleteOption(id, type) {
            const node = document.getElementById(id).parentElement
            node.remove()
            if(type === 'text') {
                const positionedIndex = this.positionedEventIDs.indexOf(id)
                this.positionedEventIDs.splice(positionedIndex, 1)
                const idIndex = this.textInputIDs.indexOf(id)
                this.textInputIDs.splice(idIndex, 1)
            } else if(type === 'number') {
                const positionedIndex = this.positionedEventIDs.indexOf(id)
                this.positionedEventIDs.splice(positionedIndex, 1)
                const idIndex = this.numberIDs.indexOf(id)
                this.numberIDs.splice(idIndex, 1)
            }
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
        checkQuestionText() {
            const questionText = document.getElementById('question-text').value
            if(questionText === '') {
                return false
            } else {
                this.questionText = questionText
                return true
            }
        },
        checkInputs() {
            let count = 0
            for(const row of this.answers) {
                let id = row[0]
                let value = document.getElementById(id).value
                if(value === '') {
                    count +=1
                }
            }
            if(count >= 1) {
                return false
            } else {
                return true
            }
        },
        updateAnswersWithValues() {
            let count = 0
            for(const row of this.answers) {
                let id = row[0]
                let value = document.getElementById(id).value
                this.answers[count][0] = value
                count +=1
            }
        },
        setupModalReturnArray() {
            this.modalReturnArray = [this.questionType, this.questionText, this.answers, '']
        },
        resetTextInputs() {
            let idCount = 0
            for(const id of this.textInputIDs) {
                let element = document.getElementById(id)
                element.cloneNode(true)
                idCount +=1
            }
            for(let i = 0; i < idCount; i++) {
                this.deleteOption(this.textInputIDs[0], 'text')
            }
            this.textInputIDs = []
            this.textInputIndex = 1
            
            const lastID = '#text-option-' + (idCount + 1)
            document.querySelector(lastID).remove()
            this.createNewTextOption(true)
            this.textOptionDragSetup()
        },
        resetNumbers() {
            let idCount = 0
            for(const id of this.numberIDs) {
                let element = document.getElementById(id)
                element.cloneNode(true)
                idCount +=1
            }
            for(let i = 0; i < idCount; i++) {
                this.deleteOption(this.numberIDs[0], 'number')
            }
            this.numberIDs = []
            this.numbersIndex = 1
            
            const lastID = '#number-option-' + (idCount + 1)
            document.querySelector(lastID).remove()
            this.createNewNumberOption(true)
            this.numberOptionDragSetup()
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
    width: 972px;
    height: 550px;
}

.drag-container canvas {
    min-width: 972px;
    max-width: 972px;
    min-height: 550px;
    max-height: 550px;
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

#text-container {
    margin-top: 40px;
}

#number-container {
    margin-top: 31px;
}

#number-container p{
    margin-top: 5px;
}

.text-option {
    width: 70px;
    cursor: move;
    border-radius: 6px;
}

.text-option:hover {
    box-shadow: 2px 3px 3px #d1d1d1;
}

.number-option {
    width: 40px;
    height: 40px;
    cursor: move;
    border-radius: 6px;
    margin-top: 5px;
    margin-left: 15px;
    margin-bottom: 0;
}

.number-option:hover {
    box-shadow: 2px 3px 3px #d1d1d1;
}

.number-option h2 {
    min-width: 80px;
    max-width: 80px;
    height: 30px;
    margin: 0;
}

.dragging {
    opacity: 50%;
}

.reset-button {
    width: 80px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    background: #d8d8d8;
}

.reset-button:hover {
    box-shadow: 2px 2px 2px #e9e9e9;
}

.reset-button:first-child {
    margin-right: 40px;
}

.button-div {
    display: flex;
    flex-direction: row;
    margin-top: 110px;
}

.button-div button {
    width: 80px;
}

.save {
    margin-left: -10px;
    margin-right: 20px;
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

.number-answer{
    width: 40px;
    height: 40px;
    background: #ffffff;
    color: #0e333c;
    text-align: center;
    cursor: move;
    border-radius: 6px;
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