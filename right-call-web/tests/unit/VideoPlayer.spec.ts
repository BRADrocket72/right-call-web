import { mount, shallowMount } from '@vue/test-utils'
import VideoEditor from '@/components/VideoEditor.vue'
import VideoClip from "@/models/VideoClip.js"
import 'jest'

describe('VideoEditor.vue', () => {
  let wrapper: any;
    beforeEach(() => {
        wrapper = mount(VideoEditor, {
          props: {
            video: new VideoClip("Basketball Lesson", 125, "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", [3.7, 14.2, 30.3])
          }
        })
    });  
      
  it('renders VideoEditor', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders video div', () => {
    expect(wrapper.find('div').classes()).toContain('video-player')
  })

  it('renders the test video', () => {
    expect(wrapper.props().video).toEqual({"id": "Basketball Lesson", "timestamps": [3.7, 14.2, 30.3], "videoLength": 125, "videoUrl": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"})
  })

})
