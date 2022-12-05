import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useVideoClipStore } from "@/stores/VideoClipStore"
import { useActivityStore } from '@/stores/ActivityStore'
import { useUsersStore } from '@/stores/UserStore'
import AssignTimestamps from '@/components/AssignTimestamps.vue'
import '@/routes.js'
//import AssignTimestampsModal from '@/components/modals/AssignTimestampsModal.vue'
//import AssignActivityModal from '@/components/modals/AssignActivityModal.vue'
//import SaveTimestampsModal from '@/components/modals/SaveTimestampsModal.vue'
import 'jest'

test('renders the selectable videos', async () => {
    setActivePinia(createPinia())
    const mockRoute = { }
    const mockRouter = { 
        push: jest.fn()
    }

    const wrapper = mount(AssignTimestamps, {
        global: {
            mocks: {
                $router: mockRouter,
                $route: mockRoute
            }
        },
    })
    const parentDiv = wrapper.find('div.video-list-div')
    const childDivs = parentDiv.findAll('div.lesson')
    expect(childDivs.length).toEqual(wrapper.vm.videoClips.length)
})