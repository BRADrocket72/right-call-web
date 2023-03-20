import { mount } from '@vue/test-utils'
import 'jest'
import InstructorPage from '@/components/InstructorPage.vue';
import { createTestingPinia } from '@pinia/testing'

describe('InstructorPage.vue', () => {
     let wrapper: any;
     let mockRouter: any;
     let mockRoute: any;
     let mockCookies: any;

     beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        mockCookies = {
            get: jest.fn()
        }
        mockCookies.get.mockReturnValue({currentUserType: "test"})
    
        wrapper = mount(InstructorPage, {
              global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
                    $cookies: mockCookies
                },
                plugins: [
                    createTestingPinia()
                ]
              }
        })
        
     })
    afterEach(() => {
        wrapper.unmount()
    })

    it('renders InstructorPage', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('Displays the instructors router-links', () => {
        expect(wrapper.find('router-link').exists()).toBe(true)
        expect(wrapper.findAll('router-link').length).toEqual(6) // 6 because it also counts the router-links on the navbar
    })
})