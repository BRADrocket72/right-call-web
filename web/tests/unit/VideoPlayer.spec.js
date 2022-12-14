import { mount } from '@vue/test-utils'
import 'jest'
import VideoEditor from '@/components/VideoEditor.vue';
import {createPinia, setActivePinia} from 'pinia'

describe('VideoEditor.vue', () => {
  
    let wrapper;
    let mockRouter;
    let mockRoute;
    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }, 
        setActivePinia(createPinia())
        wrapper = mount(VideoEditor, {
            props: {
              videoId: "123test"
            },
            data() {
              return {
                currentVideoClip: {_id: "123test", videoURL: "youtube.com", videoName: "Football Lesson One", timeStamps: [5]},
                currentVideoQuestions: [{_id: "testId", timestamp: 5, questionText: "What is the call?", answers: ["Traveling","Charge"], correctAnswer: "Traveling", videoclipId: "123test"}],
                answers: [],
                questionsLoaded: true
              }
            },
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
            }
        })
    })

    it('renders VideoEditor', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders video div', async () => {
      expect(wrapper.find('div').classes()).toContain('video-player')
    })

     it('sets currentVideoClip correctly', () => {
       expect(wrapper.vm.currentVideoClip._id).toEqual("123test")
       expect(wrapper.vm.currentVideoClip.videoURL).toEqual("youtube.com")
    })

    it('currentVideoQuestions are successfully set', async () => {
      expect(wrapper.vm.currentVideoQuestions).toEqual([{_id: "testId", timestamp: 5, questionText: "What is the call?", answers: ["Traveling","Charge"], correctAnswer: "Traveling", videoclipId: "123test"}])
    })
})