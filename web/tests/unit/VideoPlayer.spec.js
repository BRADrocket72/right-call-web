import { mount } from '@vue/test-utils'
import 'jest'
import VideoEditor from '@/components/VideoEditor.vue';
import {createPinia, setActivePinia} from 'pinia'

jest.mock('webgazer', () => ({
  setGazeListener: () => Promise.resolve(),
  begin: () => Promise.resolve(),
  isReady: jest.fn()
}))

describe('VideoEditor.vue', () => {
  
    let wrapper;
    let mockRouter;
    let mockRoute;
    let mockGet;
    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }, 
        mockGet = {
          get: jest.fn()
        }
        mockGet.get.mockReturnValue({currentUserType: "testUser"})
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
                    $route: mockRoute,
                    $cookies: mockGet
                }
            }
        })
    })

    it('renders VideoEditor', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders video in video div', async () => {
      const video = wrapper.find('div.video').find('video')
      expect(video.exists()).toBe(true)
    })

     it('sets currentVideoClip correctly', () => {
       expect(wrapper.vm.currentVideoClip._id).toEqual("123test")
       expect(wrapper.vm.currentVideoClip.videoURL).toEqual("youtube.com")
    })

    it('currentVideoQuestions are successfully set', async () => {
      expect(wrapper.vm.currentVideoQuestions).toEqual([{_id: "testId", timestamp: 5, questionText: "What is the call?", answers: ["Traveling","Charge"], correctAnswer: "Traveling", videoclipId: "123test"}])
    })
})