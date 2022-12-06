import { mount } from '@vue/test-utils'
import Activity from '@/models/Activity'
import 'jest'
import AssignTimestampsModal from '@/components/modals/AssignTimestampsModal.vue';

describe('ActivityPopUp.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(AssignTimestampsModal, {
            props:{
                newTimestamp: 5
            }
        })
    })

    it('renders AssignTimestampModal', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the assign timestamps header', () => {
        expect(wrapper.find('.modal-header').exists()).toBeTruthy
    })

    it('formats the timestamp passed as a parameter correctly', () => {
        expect(wrapper.vm.formattedTimestamp).toEqual("00:05")
    })

    it('displays the formatted timestamp correctly', () => {
        const paragraphs = wrapper.findAll('p')
        expect(paragraphs[0].exists()).toBeTruthy
    })

    it('calls the save and close functions on button click', async () => {
        const button = wrapper.findAll('.btn-green')
        const saveFunction = jest.spyOn(wrapper.vm, 'save')
        const closeFunction = jest.spyOn(wrapper.vm, 'close')
        await button[0].trigger('click')
        expect(saveFunction).toHaveBeenCalled
        await button[1].trigger('click')
        expect(closeFunction).toHaveBeenCalled
    })




    // it('calls the close modal and handle selected answers functions on button click', async () => {
    //     const button = wrapper.find('.btn-green')
    //     const closeFunction = jest.spyOn(wrapper.vm, 'close')
    //     const handleAnswersFunction = jest.spyOn(wrapper.vm, 'handleAnswerSelected')
    //     await button.trigger('click')
    //     expect(closeFunction).toHaveBeenCalled
    //     expect(handleAnswersFunction).toHaveBeenCalled
    // })
})