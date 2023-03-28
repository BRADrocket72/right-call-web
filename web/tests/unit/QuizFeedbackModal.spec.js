import { mount } from '@vue/test-utils'
import QuizFeedbackModal from '@/components/modals/QuizFeedbackModal.vue'
import FeedbackDto from '@/models/FeedbackDto'
import 'jest'

describe('QuizFeedbackModal.vue', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(QuizFeedbackModal, {
            props:{
                answer: 'Correct',
                feedback: new FeedbackDto('123abc', '456def', 2, 'Nice Job!', 'Almost')
            },
            mounted() {

            }
        })
    })

    it('renders QuizFeedbackModal', () => {
        wrapper.vm.checkAnswer = jest.fn()
        expect(wrapper.exists()).toBe(true)
    })

    it('calls the function to display feedback', () => {
        const answer = wrapper.vm.checkAnswer
        expect(answer).toBeTruthy
    })
})