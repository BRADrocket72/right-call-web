import { mount } from '@vue/test-utils'
import AssignActivity from '@/models/AssignActivity'
import 'jest'
import AssignActivityModal from '@/components/modals/AssignActivityModal.vue';

describe('AssignActivityModal.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(AssignActivityModal, {
            props:{
                activities: [new AssignActivity(2, "multiple-choice", "What was the call ?", ["Traveling", "Double Dribble"], "Traveling", "123")],
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