import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { useVideoClipStore } from "@/stores/VideoClipStore"
import { useActivityStore } from '@/stores/ActivityStore'
import { useUsersStore } from '@/stores/UserStore'
import AssignTimestamps from '@/components/AssignTimestamps.vue'
//import AssignTimestampsModal from '@/components/modals/AssignTimestampsModal.vue'
//import AssignActivityModal from '@/components/modals/AssignActivityModal.vue'
//import SaveTimestampsModal from '@/components/modals/SaveTimestampsModal.vue'
import 'jest'

describe('AssignTimestamps.vue', () => {
    let wrapper: any
    //let videoStore = null
    //let activityStore = null
    //let retrieveAllVideos: any
    //let retrieveSpecificVideo: any
    beforeAll(async () => {
        setActivePinia(createPinia())
        
        // create an instance of the data stores
        //videoStore = useVideoClipStore()
        //activityStore = useActivityStore()
        //retrieveAllVideos = await videoStore.fetchVideoClips()
        //retrieveSpecificVideo = await videoStore.fetchVideoClipById('637a61d49db11c5b4dd1b3b8')
        wrapper = mount(AssignTimestamps, {
            mocks: {
                //$route
            },
            setup() {
                var VideoClip = useVideoClipStore();
                return VideoClip;
            },
            async mounted() {
                var store = useUsersStore();
                if (store.currentUserToken.length < 1) {
                    this.$router.push({
                        name: "LoginPage"
                    })
                }
                await this.fetchVideoClips();
                this.VideoClips = this.clips;
                this.ready = true;
            }
        }as any)
      })
    it.only('renders videos in the selection list, equal to videoclips in db', () => {
        const parentDiv = wrapper.find('div.video-list-div')
        const childDivs = parentDiv.findAll('div.lesson')
        expect(childDivs.length).toEqual(wrapper.vm.videoClips.length)
    })
})