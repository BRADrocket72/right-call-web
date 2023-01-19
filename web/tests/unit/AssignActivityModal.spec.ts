import { mount } from '@vue/test-utils'
import ActivityDto from '@/models/ActivityDto'
import 'jest'
import AssignActivityModal from '@/components/modals/AssignActivityModal.vue';

describe('ActivityPopUp.vue', () => {
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

    it('renders the actual input options (question and answer options)', () => {
        const inputOptions = wrapper.findAll('input[type="text"]')
        const selectInput = wrapper.find('select')
        expect(inputOptions.length).toEqual(3)
        expect(selectInput.exists()).toBeTruthy
    })
    it('displays the already existing activity values (question and answers)', () => {
        const inputOptions = wrapper.findAll('input[type="text"]')
        expect(inputOptions[0].element.value).toBe('What was the call?')
        expect(inputOptions[1].element.value).toBe('Yellow Card')
        expect(inputOptions[2].element.value).toBe('Red Card')
    })
    it('calls the buttons that call functions correctly', async () => {
        const button = wrapper.find('.close').find('button')
        const closeFunction = jest.spyOn(wrapper.vm, 'close')
        await button.trigger('click')
        expect(closeFunction).toHaveBeenCalled
    })
})