import { mount } from '@vue/test-utils'
import 'jest'
import LessonCustomizationConfirmation from '@/components/modals/LessonCustomizationConfirmation.vue';

describe('LessonCustomizationConfirmation.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(LessonCustomizationConfirmation, {
            props:{
                lesson: {name: "testLesson", userType:"Admin", description:"test description", videoClipsArray: ["test"]}
            }
        })
    })

    it('renders LessonCustomizationConfirmation', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the header', () => {
        expect(wrapper.find('.modal-header').exists()).toBe(true)
    })

    it('asks the user if they want to create a custom lesson', () => {
        expect(wrapper.find('p').text()).toBe("Do you want to create your own version of this lesson?")
    })

    it('renders the lesson passed as a prop to the componetn', () => {
        expect(wrapper.vm.lesson.name).toEqual("testLesson")
    })

    it('renders the two buttons and they function correctly', async () => {
        const button = wrapper.find('.btn-green')
        wrapper.vm.close = jest.fn()
        const closeFunction = jest.spyOn(wrapper.vm, 'close')
        await button.trigger('click')
        expect(closeFunction).toHaveBeenCalled
    })
})