<template>
    <div class="drag-container" id="drag-container">
        <div class="drag-editor">
            <div v-if="activity !== ''" class="question-text-input" ondrop="return false">
                <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" :value="questionText">
            </div>
            <div v-else class="question-text-input" ondrop="return false">
                <label for="question-text">Question Text: </label><input type="text" id="question-text" name="question-text" >
            </div>
            <div class="editor-option" id="text-container">
                <input type="text" class="text-option" :id="'text-option-' + textStartIndex" readonly="readonly" draggable="true">
                <p>Text Input</p>
            </div>
            <div class="editor-option" id="number-container">
                <h2 class="number-option" :id="'number-option-' + numbersStartIndex" draggable="true">{{numbersStartIndex}}</h2>
                <p>Numbers</p>
            </div>
            <div class="reset-div">
                <button type="button" class="reset-button" @click="resetInputs('text')">Reset Inputs</button>
                <button type="button" class="reset-button" @click="resetInputs('number')">Reset Numbers</button>
            </div>
            <div class="button-div">
                <div class="save"><button type="button" class="btn-green" @click="save()">Save</button></div>
                <div class="close"><button type="button" class="btn-green" @click="close()">Close</button></div>
            </div>
        </div>
        <div v-if="activity !== ''" class="drop-zone" id="drop-zone">
            <div v-for="(answer,index) in textInputsFromDb" :key="answer" :id="'text-input-div-' + (index + 1)" :style="{  left: answer[2] + 'px', top: answer[3] + 'px'}">
                <input type="text" class="text-answer" :id="'text-option-' + (index + 1)" :value="answer[0]" draggable="true">
                <button :id="'delete-text-' + (index + 1)" class="delete-button"><p>X</p></button>
            </div>
            <div v-for="(answer,index) in numbersFromDb" :key="answer" :id="'number-div-' + (index + 1)" :style="{ left: answer[2] + 'px', top: answer[3] + 'px'}">
                <h2 class="number-answer" :id="'number-option-' + (index + 1)" draggable="true" >{{index + 1}}</h2>
                <button :id="'delete-number-' + (index + 1)" class="delete-button"><p>X</p></button>
            </div>
        </div>
        <div v-else class="drop-zone" id="drop-zone"></div>
    </div>
</template>

<script>
export default {
    name: 'DragAndDrop',
    data() {
        return {
            questionType: 'drag-and-drop',
            answersWithIDs: [],
            answers: [],
            textInputIndex: 1,
            textStartIndex: 1,
            numbersIndex: 1,
            numbersStartIndex: 1,
            currentEvent: Event,
            positionedEventIDs: [],
            IDsToDelete: [],
            textInputsFromDb: [],
            numbersFromDb: [],
            currentEventID: String,
            questionText: String,
            activityModalData: []
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
                this.updateAnswersWithValues()
                this.setupModalReturnArray()
                this.$emit('save',this.activityModalData) 
            } else {
                alert('Please fill in all of the text fields, including the Question Text. Also make sure there is at least one option.')
            }
        },
        textOptionDragSetup() {
            const textOption = document.querySelector('#text-option-' + this.textInputIndex)
            if(textOption) {
                textOption.addEventListener('dragstart', (event) => {
                    this.currentEvent = event
                    this.currentIndex = this.textInputIndex
                    event.currentTarget.classList.add('dragging')
                    event.dataTransfer.setData('application/x-moz-node', event.target.id)
                    event.dataTransfer.setData('text', event.target.id)
                })
                textOption.addEventListener('dragend', (event) =>
                    event.target.classList.remove('dragging')
                )
            }
        },
        numberOptionDragSetup() {
            const numberOption = document.querySelector('#number-option-' + this.numbersIndex)
            if(numberOption){
                numberOption.addEventListener('dragstart', (event) => {
                    this.currentEvent = event
                    this.currentIndex = this.numbersIndex
                    event.currentTarget.classList.add('dragging')
                    event.dataTransfer.setData('application/x-moz-node', event.target.id)
                    event.dataTransfer.setData('text', event.target.id)
                })
                numberOption.addEventListener('dragend', (event) =>
                    event.target.classList.remove('dragging')
                )
            }
        },
        deleteButtonClickSetup(button, currentIndex, type) {
            if(button) {
                button.addEventListener('mousedown', (event) => {
                    event.preventDefault()
                    let id = ''
                    if(type === 'text') {
                        id = 'text-option-' + currentIndex
                    } else if(type === 'number') {
                        id = 'number-option-' + currentIndex
                    }
                    this.deleteOption(id)
                    if(type === 'number') {
                        this.decreaseNumberOptions(currentIndex)
                    }
                })
            }
        },
        dropZoneSetup() {
            const dropZone = document.querySelector('#drop-zone')
            if(dropZone) {
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
                            alert('There was a problem setting up the drop zone.')
                        }
                    } else {
                        alert('Please do not drag the input inside itself. Make sure your cursor is outside the white area.')
                    }
                })
            }
        },
        newDropEvent(event,dropX,dropY,type) {
            if(event){
                const data = event.dataTransfer.getData('text')
                const source = document.getElementById(data)
                this.currentEventID = source.id
                const existingOption = this.checkIfOptionAlreadyMoved(source)
                let positionedSource = ''
                if(existingOption) {
                    let children = []
                    for(const child of source.parentNode.children) {
                        children.push(child)
                    }
                    source.parentNode.remove()
                    positionedSource = this.setupOptionAndCoordinates(source, dropX, dropY, type, true)
                    for(const child of children) {
                        positionedSource.appendChild(child)
                    }
                    this.updateCoordinates(this.currentEventID, dropX, dropY)
                } else {
                    this.positionedEventIDs.push(source.id)
                    positionedSource = this.setupOptionAndCoordinates(source, dropX, dropY, type, false)
                    this.answersWithIDs.push([this.currentEventID, type, dropX, dropY])
                    if(type === 'text') {
                        this.createNewTextOption(false)
                        this.textOptionDragSetup()
                    } else if (type === 'number') {
                        this.createNewNumberOption(false)
                        this.numberOptionDragSetup()
                    } else {
                        alert('There was a problem dropping the input.')
                    }
                }
                event.target.appendChild(positionedSource)
            }
        },
        setupOptionAndCoordinates(source, dropX, dropY, type, existing) {
            if(source) { 
                const newDiv = document.createElement('div')
                newDiv.style.left = dropX + 'px'
                newDiv.style.top = dropY + 'px'

                if(existing) {
                    return newDiv
                } else {
                    if(type === 'text') {
                    source.classList.remove('text-option')
                    source.classList.add('text-answer')
                    source.autocomplete= 'off'
                    source.addEventListener('focusin', (event) => {
                        event.target.removeAttribute('readonly')
                    })
                    source.addEventListener('focusout', (event) => {
                        event.target.readOnly = 'readonly'
                    })
                    } else if (type === 'number'){
                        source.classList.remove('number-option')
                        source.classList.add('number-answer')
                    }
                    const newButton = this.createDeleteButton(type)
                    newDiv.insertBefore(newButton, newDiv.firstChild)
                    newDiv.insertBefore(source, newDiv.firstChild)
                    return newDiv
                }
            }
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
        createDeleteButton(type) {
            const button = document.createElement('button')
            let currentIndex = 0
            if(type === 'text') {
                currentIndex = this.textInputIndex
                button.id = 'delete-text-' + currentIndex
            } else if(type === 'number') {
                currentIndex = this.numbersIndex
                button.id = 'delete-number-' + currentIndex
            } else {
                alert('There was a problem creating a delete button of type ' + type)
            }
            button.type == 'button'
            button.classList.add('delete-button')
            this.deleteButtonClickSetup(button, currentIndex, type)
            const deleteSymbol = document.createElement('p')
            deleteSymbol.textContent = "X"
            button.appendChild(deleteSymbol, button.firstChild)
            return button
        },
        deleteOption(id) {
            if(id) {
                const element = document.getElementById(id)
                const parent = element.parentElement
                parent.remove()
                const positionedIndex = this.positionedEventIDs.indexOf(id)
                this.positionedEventIDs.splice(positionedIndex, 1)

                let count = 0
                for(const answer of this.answersWithIDs) {
                    if(answer[0] === id) {
                        this.answersWithIDs.splice(count, 1)
                    } else {
                        count +=1
                    }
                }
            }
        },
        decreaseNumberOptions(currentIndex) {
            let exists = true
            let iterator = 1
            let elementID = 'number-option-' + (currentIndex + iterator)
            let numberElement = document.getElementById(elementID)
            let buttonID = 'delete-number-' + (currentIndex + iterator)
            let buttonElement = document.getElementById(buttonID)
            do {
                if(numberElement && buttonElement) {
                    this.updateNumberOptionContent(currentIndex, iterator, numberElement, buttonElement)
                    iterator +=1
                    elementID = 'number-option-' + (currentIndex + iterator)
                    numberElement = document.getElementById(elementID)
                    buttonID = 'delete-number-' + (currentIndex + iterator)
                    buttonElement = document.getElementById(buttonID)
                } else {
                    this.numbersIndex = (currentIndex - 1) + iterator
                    numberElement.innerHTML = this.numbersIndex
                    numberElement.id = 'number-option-' + this.numbersIndex
                    exists = false
                }
            } while(exists === true)
        },
        updateNumberOptionContent(currentIndex, iterator, numberElement, buttonElement) {
            let index = (currentIndex - 1) + iterator
            this.updateNumberIDs(numberElement.id, index)
            numberElement.id = 'number-option-' + index
            numberElement.innerHTML = index
            buttonElement.id = 'delete-number-' + index
            let newButton = buttonElement.cloneNode(true)
            buttonElement.parentNode.replaceChild(newButton, buttonElement)
            this.deleteButtonClickSetup(newButton, index, 'number')
        },
        updateNumberIDs(id, newIndex) {
            const positionedIndex = this.positionedEventIDs.indexOf(id)
            this.positionedEventIDs.splice(positionedIndex, 0, 'number-option-' + newIndex)
            this.positionedEventIDs.splice(positionedIndex+1, 1)

            let count = 0
            for(const answer of this.answersWithIDs) {
                if(answer[0] === id) {
                    this.answersWithIDs[count][0] = 'number-option-' + newIndex
                } else {
                    count +=1
                }
            }
        },
        updateCoordinates(id, dropX, dropY) {
            let count = 0
            for(const row of this.answersWithIDs) {
                if(row[0] === id) {
                    this.answersWithIDs.splice(count, 0, [id, row[1], dropX, dropY])
                    this.answersWithIDs.splice(count+1, 1)
                } 
                count +=1
            }
        },
        checkIfOptionAlreadyMoved(source) {
            for(const id of this.positionedEventIDs) {
                if(id === source.id) {
                    return true
                } 
            }
            return false
        },
        checkInputs() {
            const questionText = document.getElementById('question-text').value
            if(questionText === '') {
                return false
            } else {
                this.questionText = questionText
            }
            if(this.positionedEventIDs.length === 0) {
                return false
            } else {
                for(const id of this.positionedEventIDs) {
                    let element = document.getElementById(id)
                    if(element.tagName === 'INPUT') {
                        let value = element.value
                        if(value === '') {
                            return false
                        }
                    }
                }
            }
            return true
        },
        updateAnswersWithValues() {
            for(const answer of this.answersWithIDs) {
                let id = answer[0]
                if(answer[1] === 'text') {
                    let value = document.getElementById(id).value
                    this.answers.push([value,answer[1],answer[2],answer[3]])
                } else if(answer[1] === 'number') {
                    let text = document.getElementById(id).innerText
                    this.answers.push([text,answer[1],answer[2],answer[3]])
                }
            }
        },
        setupModalReturnArray() {
            let longCorrectAnswerString = ''
            for(const answer of this.answers) {
                for(const row of answer) {
                    longCorrectAnswerString = longCorrectAnswerString.concat(row, ', ')
                }
            }
            this.activityModalData = [this.questionType, this.questionText, this.answers, longCorrectAnswerString]
        },
        resetInputs(type) {
            let idCount = 1
            for(const answer of this.answersWithIDs) {
                if(answer[1] === type) {
                    let answerID = answer[0]
                    this.IDsToDelete.push(answerID)
                    idCount +=1
                }
            }
            for(const id of this.IDsToDelete) {
                this.deleteOption(id)
            }
            this.IDsToDelete = []
            if(type === 'text') {
                const lastID = '#text-option-' + idCount
                document.querySelector(lastID).remove()
                this.textInputIndex = 1
                this.createNewTextOption(true)
                this.textOptionDragSetup()
            } else if(type === 'number') {
                const lastID = '#number-option-' + idCount
                document.querySelector(lastID).remove()
                this.numbersIndex = 1
                this.createNewNumberOption(true)
                this.numberOptionDragSetup()
            } else {
                alert('There was an error resetting the inputs.')
            }
        },
        dataFromActivity() {
            let textCount = 0
            let numberCount = 0
            for(const answer of this.activity.answers) {
                if(answer[1] === 'text') {
                    this.textInputsFromDb.push(answer)
                    textCount +=1
                } else if(answer[1] === 'number') {
                    this.numbersFromDb.push(answer)
                    numberCount +=1
                } else {
                    alert('There was a problem loading the activity.')
                }
            }
            this.textStartIndex= this.textInputIndex + textCount
            this.numbersStartIndex = this.numbersIndex + numberCount
        },
        setupEventListeners() {
            for(const answer of this.activity.answers) {
                if(answer[1] === 'text') {
                    this.textOptionDragSetup()
                    let textID = 'text-option-' + this.textInputIndex
                    let buttonID = 'delete-text-' + this.textInputIndex
                    let button = document.getElementById(buttonID)
                    this.deleteButtonClickSetup(button, this.textInputIndex, 'text')
                    this.answersWithIDs.push([textID,answer[1],answer[2],answer[3]])
                    this.positionedEventIDs.push(textID)
                    this.textInputIndex +=1
                } else if(answer[1] === 'number') {
                    this.numberOptionDragSetup()
                    let numberID = 'number-option-' + this.numbersIndex
                    let buttonID = 'delete-number-' + this.numbersIndex
                    let button = document.getElementById(buttonID)
                    this.deleteButtonClickSetup(button, this.numbersIndex, 'number')
                    this.answersWithIDs.push([numberID,answer[1],answer[2],answer[3]])
                    this.positionedEventIDs.push(numberID)
                    this.numbersIndex +=1
                } else {
                    alert('There was a problem loading the activity.')
                }
            }
            this.textOptionDragSetup()
            this.numberOptionDragSetup()
        }
    },
    created() {
        if(this.activity !== '') {
            this.questionText = this.activity.questionText
            this.dataFromActivity()
        }
    },
    mounted() {
        if(this.image) {
            document.getElementById('drag-container').appendChild(this.image)
            if(this.activity !== '') {
                this.setupEventListeners()
            } else {
                this.textOptionDragSetup()
                this.numberOptionDragSetup()
            }
            this.dropZoneSetup()
        } else {
            alert('There was a problem, drag & drop is not available for this timestamp.')
            this.close()
        }
    }
}
</script>

<style>
.assign-activity-div input {
    background: #ffffff;
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
    max-width: 70px;
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
    min-width: 970px;
    max-width: 970px;
    min-height: 550px;
    max-height: 550px;
}

.drop-zone div {
    position: absolute;
}

.text-answer {
    max-width: 110px;
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
    margin-top: -1px;
    font-size: 9px;
}
</style>