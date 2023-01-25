import { mount } from '@vue/test-utils'
import VideoClip from '@/models/ActivityDto'
import { createPinia, setActivePinia } from 'pinia';
import 'jest'
import LessonDeletionModal from '@/components/modals/LessonDeletionModal.vue';

describe('ActivityPopUp.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(LessonDeletionModal, {
            props:{
                selectedVideo: [new VideoClip("123TestVideo", "youtube.com", "Soccer Lesson Five", [1,2,3])]
            }
        })
    })

    it('renders LessonDeletionModal', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the Modal Header', () => {
        const modalHeader = wrapper.find('.modal-header')
        expect(modalHeader.exists()).toBeTruthy
    })

    it('renders the modal body', async () => {
        const modalBody = wrapper.find('.modal-body')
        const buttons = wrapper.findAll('button')
        expect(modalBody.exists()).toBeTruthy
        expect(buttons.at(0).exists()).toBeTruthy
        
        const button = buttons.at(1)
        const deleteFunction = jest.spyOn(wrapper.vm, 'deleteLesson')
        await button.trigger('click')
        expect(deleteFunction).toHaveBeenCalled
    })
})