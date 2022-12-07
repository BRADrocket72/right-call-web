import { mount } from '@vue/test-utils'
import VideoClip from '@/models/Activity'
import { createPinia, setActivePinia } from 'pinia';
import 'jest'
import SaveTimestampsModal from '@/components/modals/SaveTimestampsModal.vue';

describe('ActivityPopUp.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(SaveTimestampsModal)
    })

    it('renders SaveTimestampsModal', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the Modal Header', () => {
        const modalHeader = wrapper.find('.modal-header')
        expect(modalHeader.exists()).toBeTruthy
    })

    it('renders the modal body', async () => {
        const modalBody = wrapper.find('.modal-body')
        expect(modalBody.exists()).toBeTruthy
        const buttons = wrapper.findAll('.btn-green')
        const returnFunction = jest.spyOn(wrapper.vm, 'returnToVideoSelection')
        await buttons[1].trigger('click')
        expect(returnFunction).toHaveBeenCalled
    })
})