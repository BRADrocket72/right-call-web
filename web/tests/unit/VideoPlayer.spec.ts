import { mount } from '@vue/test-utils'
import VideoEditor from '@/components/VideoEditor.vue'
import 'jest'

describe('VideoEditor.vue', () => {
  let wrapper: any;
    beforeEach(() => {
        wrapper = mount(VideoEditor, {
          props: {
            videoId: "637a61d49db11c5b4dd1b3b8"
          }
        })
    })
      
  it('renders VideoEditor', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders video div', () => {
    expect(wrapper.find('div').classes()).toContain('video-player')
  })

  it('renders the test video object', () => {
    expect(wrapper.vm.video).toMatchObject({id: "637a61d49db11c5b4dd1b3b8", videoUrl: "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul.m4v", timeStamps: [5, 10]})
  })

  it('renders the test video', () => {
    const displayedVideo = wrapper.find('video#637a61d49db11c5b4dd1b3b8')
    expect(displayedVideo.exists()).toBe(true);
  })

  it('variables are set on time', () => {
    expect(wrapper.vm.questionsArray.length).toBe(8)
    expect(wrapper.vm.answers.length).toBe(8)
    expect(wrapper.vm.questionsLoaded).toEqual(true)
  })
  
})