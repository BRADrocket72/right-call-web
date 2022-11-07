import { mount, shallowMount } from '@vue/test-utils'
import LessonSelection from '@/components/LessonSelection.vue'
import 'jest'

describe('LessonSelection.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(LessonSelection)
    })

    it('renders LessonSelection', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders child divs equal to amount of lesson videos', () => {
        const parentDiv = wrapper.find('div.lesson-div')
        const childDivs = parentDiv.findAll('div.lesson')
        expect(childDivs.length).toEqual(wrapper.vm.videoClips.length)
    })

    it('renders the image for the first lesson', () => {
        const firstLesson = wrapper.find('div.lesson')
        expect(firstLesson.find('img.lesson-img').exists()).toEqual(true)
    })
})