import { mount, shallowMount } from '@vue/test-utils'
import VideoEditor from '@/components/VideoEditor.vue'
import VideoClip from '@/models/VideoClip.js'
import 'jest'

describe('VideoEditor.vue', () => {
  let wrapper: any;
    beforeEach(() => {
        wrapper = mount(VideoEditor, {
          props: {
            video: new VideoClip("Basketball Lesson One", 60, "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul.m4v", [2.2, 6.8])
          },
          mounted() {
            const video2 = document.getElementById(this.video.id);
            video2?.addEventListener('timeupdate', () => {    //listen for when the video's time changes
                this.stopVideoAtTimestamp(video2, this.video.timestamps)
            })
          }
        }as any)
    })
      
  it('renders VideoEditor', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders video div', () => {
    expect(wrapper.find('div').classes()).toContain('video-player')
  })

  it('renders the test video', () => {
    expect(wrapper.vm.video).toMatchObject({id: "Basketball Lesson One", videoLength: 60, videoUrl: "https://d2vue776t14pjd.cloudfront.net/basketball/REG-SE-BSK-PCK-4-DLC/gameplay/P15_Shooting_Foul.m4v", timestamps: [2.2, 6.8]})
  })
})