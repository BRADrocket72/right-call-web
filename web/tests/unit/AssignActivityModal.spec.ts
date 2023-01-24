import { mount } from '@vue/test-utils'
import ActivityDto from '@/models/ActivityDto'
import 'jest'
import AssignActivityModal from '@/components/modals/AssignActivityModal.vue';

describe('AssignActivityModal.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(AssignActivityModal, {
            props:{
                activities: [new ActivityDto(4, "What was the call?", ["Yellow Card", "Red Card"], "Yellow Card","123testId")],
                activityIndex: 0
            }
        })
    })

    it('renders AssignActivityModal', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('renders the Assign Activities Div', () => {
        const assignActivityDiv = wrapper.find('div.assign-activity-dv')
        expect(assignActivityDiv.exists()).toBeTruthy
    })
    
})