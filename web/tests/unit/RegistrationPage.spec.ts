import { mount } from '@vue/test-utils'
import RegistrationPage from '@/components/RegistrationPage.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'

describe('LessonSelection.vue', () => {
    let mockRouter: any;
    let mockRoute: any;
    let wrapper: any;
    beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        
        setActivePinia(createPinia())
        wrapper = mount(RegistrationPage, {
             global: {
                 mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
             }
        })
        wrapper.vm.checkInputs = jest.fn()
    })
    it('renders RegistrationPage', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('renders username input box', () => {
        const username = wrapper.find('#username')
        expect(username.exists).toBeTruthy()
    })
    it('renders password input box', () => {
        const password = wrapper.find('#password')
        expect(password.exists).toBeTruthy()
    })
    it('renders usertype radio buttons', () => {
        const userType = wrapper.findAll('.input-radio')
        expect(userType.length).toEqual(3)
    })
    it('renders register button', () => {
        const registerButton = wrapper.findAll('.submit')
        expect(registerButton.length).toEqual(1)
    })
    it('checks user input when submit button is clicked', async () => {
        const registerButton = wrapper.find('button')
        await registerButton.trigger('click')
        expect(wrapper.vm.checkInputs).toHaveBeenCalledTimes(1)
    })
})