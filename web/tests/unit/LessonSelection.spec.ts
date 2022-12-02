import { mount } from '@vue/test-utils'
import LessonSelection from '@/components/LessonSelection.vue'
import 'jest'
import VideoEditor from '@/components/VideoEditor.vue';
import { setActivePinia, createPinia } from 'pinia'
import { useVideoClipStore } from "@/stores/VideoClipStore";

describe('LessonSelection.vue', () => {
    let newStore = null
    let retrieveAllVideos: any
    let retrieveSpecificVideo: any
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(LessonSelection)
    })

    beforeAll(async () => {
        setActivePinia(createPinia())
      
        // create an instance of the data store
        newStore = useVideoClipStore()
        retrieveAllVideos = await newStore.fetchVideoClips()
        retrieveSpecificVideo = await newStore.fetchVideoClipById('637a61d49db11c5b4dd1b3b8')
      })

    it('renders LessonSelection', async () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders child divs equal to amount of lesson videos', async () => {
        const parentDiv = wrapper.find('div.lesson-div')
        const childDivs = parentDiv.findAll('div.lesson')
        expect(childDivs.length).toEqual(wrapper.vm.videoClips.length)
    })

    it('renders the image for the first lesson', async () => {
        const firstLesson = wrapper.find('div.lesson')
        expect(firstLesson.find('img.lesson-img').exists()).toEqual(true)
    })

    it('opens a video lesson when clicked', async () => {
        const lesson = wrapper.find('a.nav-link')
        await lesson.trigger('click')
        expect(wrapper.findComponent(VideoEditor).exists()).toBe(true)
    })
})