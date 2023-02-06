import { mount } from '@vue/test-utils'
import NoWebcamPopUp from '@/components/modals/NoWebcamPopUp.vue'
import 'jest'

describe('NoWebcamPopUp.vue', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(NoWebcamPopUp, {
            data() {
                return {
                    updatedAnswers: ['Incorrect','Correct']
                }
            },
            props:{
                question: {
                    questionType:'eye-tracking',
                    questionText:'Where is the ball?',
                    answers:['quadrant-one','quadrant-two','quadrant-three','quadrant-four'],
                    correctAnswer: 'quadrant-four'
                },
                answersArray: []
            }
        })
    })

    it('renders NoWebcamPopUp', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('returns an answer when a quadrant is clicked', async () => {
        wrapper.vm.quadrantSelection = jest.fn()
        const guess = jest.spyOn(wrapper.vm, 'quadrantSelection')
        const quadrant = wrapper.find('#quadrant-one')
        await quadrant.trigger('click')
        expect(guess).toHaveBeenCalled
    })
})