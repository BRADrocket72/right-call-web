/*import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
//import { useVideoClipStore } from "@/stores/VideoClipStore"
//import { useActivityStore } from '@/stores/ActivityStore'
//import { useUsersStore } from '@/stores/UserStore'
import AssignTimestamps from '@/components/AssignTimestamps.vue'
import '@/routes.js'
//import AssignTimestampsModal from '@/components/modals/AssignTimestampsModal.vue'
//import AssignActivityModal from '@/components/modals/AssignActivityModal.vue'
//import SaveTimestampsModal from '@/components/modals/SaveTimestampsModal.vue'
import 'jest'

describe('AssignTimestamps.vue', () => {
    let wrapper: any
    beforeEach(() => {
        const mockRoute = {}
        const mockRouter = { 
            push: jest.fn()
        }
    
        wrapper = mount(AssignTimestamps, {
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
            },
            plugins: [
                createTestingPinia({
                    initialState: {
                        currentUserToken: ""
                    }
                })
            ]
        })
    })

    it('renders the selectable videos', async () => {
        const parentDiv = wrapper.find('div.video-list-div')
        const childDivs = parentDiv.findAll('div.lesson')
    //const testDiv = wrapper.find('div.assign-timestamps')
    //expect(testDiv.exists()).toBe(true)
        expect(childDivs.length).toEqual(wrapper.videoClips)
    })
})*/