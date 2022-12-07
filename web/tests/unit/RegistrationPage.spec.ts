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
        const userType = wrapper.findAll('#userType')
        expect(userType.length).toEqual(3)
    })
    it('renders register button', () => {
        const registerButton = wrapper.findAll('button')
        expect(registerButton.length).toEqual(1)
    })
    it('calls login function when submit button is clicked', async () => {
        const registerMock = jest.fn()
        wrapper.vm.uploadUsers = registerMock
        const registerButton = wrapper.find('button')
        await registerButton.trigger('click')
        expect(registerMock).toHaveBeenCalledTimes(1)
    })
})