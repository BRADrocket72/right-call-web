import { mount } from '@vue/test-utils'
import EyeTrackingFeedbackModal from '@/components/modals/EyeTrackingFeedbackModal.vue'
import 'jest'

describe('EyeTrackingFeedbackModal.vue', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(EyeTrackingFeedbackModal, {
            props:{
                answer: 'Correct',
                correctAnswer: 'quadrant-one'
            }
        })
    })

    it('renders EyeTrackingFeedbackModal', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the proper div for a Correct answer', () => {
        const div = wrapper.find('.feedback-div').find('h2').text()
        expect(div).toBe('Nice Job!')
    })

    it('renders the proper div for an Incorrect answer', () => {
        wrapper = mount(EyeTrackingFeedbackModal, {
            props:{
                answer: 'Incorrect',
                correctAnswer: 'quadrant-two'
            }
        })
        const div = wrapper.find('.feedback-div').find('h2').text()
        expect(div).toBe('Almost')
    })
})