import { mount } from '@vue/test-utils'
import 'jest'
import AdminPage from '@/components/AdminPage.vue';
import { createTestingPinia } from '@pinia/testing'

describe('ResultsPage.vue', () => {
     let wrapper: any;
     let mockRouter: any;
     let mockRoute: any;

     mockRoute = {}
     mockRouter = {
         push: jest.fn()
     }

     beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
    
        wrapper = mount(AdminPage, {
              global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute
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

    it('renders AdminPage', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the two admin router-links and the navbar router-link', () => {
        expect(wrapper.find('router-link').exists()).toBe(true)
        expect(wrapper.findAll('router-link').length).toEqual(4)
    })
    it('router.push is called successfully when no user token is set', async () => {
        expect(mockRouter.push).toHaveBeenCalledWith({'name': 'LoginPage'})
        expect(mockRouter.push).toHaveBeenCalledTimes(1)
    })
})