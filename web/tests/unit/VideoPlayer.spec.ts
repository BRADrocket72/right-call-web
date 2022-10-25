import { mount, shallowMount } from '@vue/test-utils'
import VideoEditor from '@/components/VideoEditor.vue'

describe('VideoEditor.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(VideoEditor);
    });

  it('renders props.msg when passed', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
