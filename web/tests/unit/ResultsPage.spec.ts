import { mount } from '@vue/test-utils'
import 'jest'
import ResultsPage from '@/components/modals/ResultsPage.vue';

describe('ResultsPage.vue', () => {
    let wrapper: any;
    let mockRouter: any;
    let mockRoute: any;
    beforeEach(() => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        wrapper = mount(ResultsPage, {
            props: {
                answersArray: ["Correct", "Incorrect"]
              },
              global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
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

    it('variables are set on time', () => {
        expect(wrapper.vm.numberOfQuestions).toEqual(2)
        expect(wrapper.vm.percentageCorrect).toEqual("50.00%")
    })
   
    it('calls the close modal function and sends to the router on button click', async () => {
        const button = wrapper.find('.btn-green')
        const closeFunction = jest.spyOn(wrapper.vm, 'close')
        await button.trigger('click')
        expect(closeFunction).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith({"name": "LessonSelection"})
    })
})