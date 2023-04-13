import { mount } from '@vue/test-utils'
import EyeTrackingPopUp from '@/components/modals/EyeTrackingPopUp.vue'
import 'jest'

describe('EyeTrackingPopUp.vue', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(EyeTrackingPopUp, {
            props:{
                question: {
                    questionType:'multiple-choice',
                    questionText:'What was the call?',
                    answers:['quadrant-one','quadrant-two','quadrant-three','quadrant-four'],
                    correctAnswer: 'quadrant-four'
                },
                answersArray: ['Charge','Traveling','Shooting Foul'],
                xPrediction: 330,
                yPrediction: 450
            },
            data() {
                return {
                    updatedAnswers: ['Correct','Incorrect'],
                    xMin: 100,
                    xMax: 500,
                    xHalf: 300,
                    yMin: 100,
                    yMax: 500,
                    yHalf: 300,
                    xCoordinate: Number,
                    yCoordinate: Number,
                    guessQuadrant: '',
                    answer: ''
                }
            },
            mounted() {

            }
        })
    })

    it('renders EyeTrackingFeedbackModal', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('sees that the Predictions are within the bounds, and sets the Coordinates', () => {
        wrapper.vm.checkPredictionInBounds()
        expect(wrapper.vm.xCoordinate).toEqual(330)
        expect(wrapper.vm.yCoordinate).toEqual(450)
    })

    it('gets the correct quadrant based on the coordinates', () => {
        wrapper.vm.getCornerQuadrant()
        expect(wrapper.vm.guessQuadrant).toEqual('quadrant-four')
    })

    it('checks if the guess is equal to the correct answer', () => {
        wrapper.vm.guessQuadrant = 'quadrant-four'
        wrapper.vm.checkQuadrant()
        expect(wrapper.vm.answer).toBe('Correct')
    })

})