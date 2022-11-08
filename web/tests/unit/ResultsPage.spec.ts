import { mount } from '@vue/test-utils'
import 'jest'
import ResultsPage from '@/components/ResultsPage.vue';

describe('ResultsPage.vue', () => {
    let wrapper: any;
    beforeEach(() => {
        wrapper = mount(ResultsPage, {
            props: {
                answersArray: [Object]
              }
        })
    })

    it('renders ResultsPage', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the percent of questions right', () => {
        expect(wrapper.find('#modalDescription').find('p').exists()).toBe(true)
    })

    it('displays the close button', () => {
        expect(wrapper.findAll('.btn-green').length).toBe(1)
    })

    it('calls the close modal function on button click', async () => {
        const button = wrapper.find('.btn-green')
        const closeFunction = jest.spyOn(wrapper.vm, 'close')
        await button.trigger('click')
        expect(closeFunction).toHaveBeenCalled
    })
})