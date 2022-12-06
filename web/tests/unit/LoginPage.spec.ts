import { mount } from '@vue/test-utils'
import LoginPage from '@/components/LoginPage.vue'
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
        wrapper = mount(LoginPage, {
             global: {
                 mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
             }
        })
    })
    it('renders LoginPage', () => {
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
    it('renders submit button', () => {
        const submitButton = wrapper.findAll('button')
        expect(submitButton.length).toEqual(1)
    })
    it('calls login function when submit button is clicked', async () => {
        const loginMock = jest.fn()
        wrapper.vm.login = loginMock
        const submitButton = wrapper.find('button')
        await submitButton.trigger('click')
        expect(loginMock).toHaveBeenCalledTimes(1)
    })
})