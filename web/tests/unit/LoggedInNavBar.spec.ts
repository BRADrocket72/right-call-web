import { mount } from '@vue/test-utils'
import LoggedInNavBar from '@/components/LoggedInNavBar.vue'
import { createPinia, setActivePinia } from 'pinia';
import 'jest'

describe('Navbar.vue', () => {
     let wrapper: any
     let mockRouter: any;
     let mockRoute: any;
     
     beforeEach(() => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        setActivePinia(createPinia())
        wrapper = mount(LoggedInNavBar,
        {
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
            }
        })
     })

    it('renders the navbar', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('renders the navbar', () => {
        expect(wrapper.findAll('.container-fluid').length).toBe(1)
    })

    it('renders the three nav-links', () => {
        expect(wrapper.findAll('.nav-link').length).toBe(3)
    })

    it('renders the router-links', () => {
        expect(wrapper.find('router-link').exists()).toBeTruthy()
    })

    it('logout function is clicked and functions properly', async () => {
        const button = wrapper.find('.button')
        const logoutFunction = jest.spyOn(wrapper.vm, 'logout')
        await button.trigger('click')
        expect(logoutFunction).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith({'name': 'LoginPage'})
    })
})