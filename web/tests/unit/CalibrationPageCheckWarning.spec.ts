import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import InstructorClassDto  from '@/models/InstructorClassDto'
import 'jest'
import CalibrationPageCheckWarning from '@/components/modals/CalibrationPageCheckWarning.vue';

describe('CalibrationPageCheckWarning.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(CalibrationPageCheckWarning)
    })

    it('renders CalibrationPageCheckWarning', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the header div', () => {
        const modalHeader = wrapper.find('.modal-header')
        expect(modalHeader.exists()).toBeTruthy
    })

    it('displays the modal body of information', () => {
        const modalBody = wrapper.find('.modal-body')
        expect(modalBody.exists()).toBeTruthy
    })

    it('displays the explanations of what the user should do', () => {
        const explanationText = wrapper.findAll('.explanation-text')
        expect(explanationText.length).toEqual(2)
        expect(explanationText[1].text()).toEqual("If the red dot isn't accurate enough, recalibrate.")
    })

     it('Displays the close button and closes the modal when clicked', async () => {
        const closeButton = wrapper.find('.btn-green')
        const closeModalFunction = jest.spyOn(wrapper.vm, 'close')
        await closeButton.trigger('click') 
        expect(closeModalFunction).toHaveBeenCalled()

    })
    
})