import { mount } from '@vue/test-utils'
import QuizFeedbackModal from '@/components/modals/QuizFeedbackModal.vue'
import 'jest'

describe('QuizFeedbackModal.vue', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(QuizFeedbackModal, {
            props:{
                answer: 'Correct',
                correctAnswer: 'quadrant-one'
            }
        })
    })

    it('renders QuizFeedbackModal', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the proper div for a Correct answer', () => {
        const div = wrapper.find('.feedback-div').find('h2').text()
        expect(div).toBe('Nice Job!')
    })

    it('renders the proper div for an Incorrect answer', () => {
        wrapper = mount(QuizFeedbackModal, {
            props:{
                answer: 'Incorrect',
                correctAnswer: 'quadrant-two'
            }
        })
        const div = wrapper.find('.feedback-div').find('h2').text()
        expect(div).toBe('Almost')
    })
})