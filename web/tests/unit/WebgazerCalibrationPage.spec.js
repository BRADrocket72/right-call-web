import { mount } from '@vue/test-utils'
import WebgazerCalibrationPage from '@/components/modals/WebgazerCalibrationPage.vue'
import 'jest'
import {createPinia, setActivePinia} from 'pinia'

describe('UserResultsPage.vue', () => {
    let mockRouter;
    let mockRoute;
    let wrapper;
    let mockCookies;
    beforeEach(async () => {
        mockRoute = {}
        mockRouter = {
            push: jest.fn()
        }
        mockCookies = {
            get: jest.fn()
        }
        mockCookies.get.mockReturnValue({ currentUserType: "testUser" })
        setActivePinia(createPinia())
        wrapper = mount(WebgazerCalibrationPage, {
             global: {
                 mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
                    $cookies: mockCookies
                }
             },
             data() {
                return {
                    ready: true
                }
             }
        })
    })
    it('renders Calibration Page', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('displays Calibration instructions', () => {
        expect(wrapper.find('.modal-header').exists()).toBe(true)
        expect(wrapper.find('.title_1').exists()).toBe(true)
        expect(wrapper.find('.title_2').exists()).toBe(true)
    })
    it('displays all 5 calibration buttons', () => {
        expect(wrapper.find(".btn-calibrate-left").exists()).toBe(true)
        expect(wrapper.find(".btn-calibrate-right").exists()).toBe(true)
        expect(wrapper.find(".btn-calibrate-topRight").exists()).toBe(true)
        expect(wrapper.find(".btn-calibrate-topLeft").exists()).toBe(true)
        expect(wrapper.find(".btn-calibrate-center").exists()).toBe(true)
    })
    it('clicking on a calibration button correctly calls change color and checkButtons functions', async () => {
        wrapper.vm.checkButtons = jest.fn()
        const checkButtonsFunction = jest.spyOn(wrapper.vm, 'checkButtons')
        expect(checkButtonsFunction).toHaveBeenCalled
        wrapper.vm.changeColor = jest.fn()
        const changeColorFunction = jest.spyOn(wrapper.vm, 'changeColor')
        expect(changeColorFunction).toHaveBeenCalled
    })
})