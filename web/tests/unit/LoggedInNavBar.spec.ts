import { mount } from '@vue/test-utils'
import LoggedInNavBar from '@/components/LoggedInNavBar.vue'
import { createPinia, setActivePinia } from 'pinia';
import 'jest'

describe('Navbar.vue', () => {
     let wrapper: any
     let mockRouter: any;
     let mockRoute: any;
     let mockCookies: any;

     beforeEach(() => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        mockCookies = {
            get: jest.fn()
        }
        mockCookies.get.mockReturnValue({ currentUserType: "test" })
        setActivePinia(createPinia())
        wrapper = mount(LoggedInNavBar,
        {
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
                    $cookies: mockCookies
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

    it('router.push is not called unless logout is called', async () => {
        expect(mockRouter.push).toHaveBeenCalledTimes(0)
    })
})