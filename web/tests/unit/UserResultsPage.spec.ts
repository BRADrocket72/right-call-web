import { mount } from '@vue/test-utils'
import UserResultsPage from '@/components/UserResultsPage.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'

describe('UserResultsPage.vue', () => {
    let mockRouter: any;
    let mockRoute: any;
    let wrapper: any;
    beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        
        setActivePinia(createPinia())
        wrapper = mount(UserResultsPage, {
             global: {
                 mocks: {
                    $router: mockRouter,
                    $route: mockRoute
                }
             },
             data() {
                return {
                    ready: true
                }
             }
        })
    })
    it('renders UserResultsPage', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('renders users results div', () => {
        const results = wrapper.find('.user-results')
        expect(results.exists).toBeTruthy()
    })
    it('renders users results table', () => {
        const resultsTable = wrapper.find('.results-table')
        expect(resultsTable.exists).toBeTruthy()
    })
})