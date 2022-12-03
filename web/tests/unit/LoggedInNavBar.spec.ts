import { mount } from '@vue/test-utils'
import LoggedInNavBar from '@/components/LoggedInNavBar.vue'
import Router from 'vue-router'
import { createPinia, setActivePinia } from 'pinia';
import 'jest'


// const mockRouter = jest.fn();

// jest.mock('vue-router', () => ({
//   useRouter: () => ({
//     push: mockRouter,
//   }),
// }));

describe('Navbar.vue', () => {
     let wrapper: any
     beforeEach(() => {
        // jest.resetAllMocks();
        setActivePinia(createPinia())
        wrapper = mount(LoggedInNavBar)
     })

    it('renders the navbar', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('renders the navbar', () => {
        expect(wrapper.findAll('.container-fluid').length).toBe(1)
    })
    it('calls the logout function on button click', async () => {
        const button = wrapper.find('.button')
        const logoutFunction = jest.spyOn(wrapper.vm, 'logout')
        await button.trigger('click')
        expect(logoutFunction).toHaveBeenCalled
    })
    // it('login function runs correctly', async () => {
    //     // const mockRouter = {
    //     //     push: jest.fn()
    //     // }
    //     // setActivePinia(createPinia())
    //     const wrapper = mount(LoggedInNavBar)
    //     const button = wrapper.find('.button')
    //     await button.trigger('click')
    //     expect(mockRouter).toBeCalled()
    //     // const push = jest.fn();
    //     // const $router = {
    //     //     push: jest.fn(),
    //     // }
       
    //     //     mocks: {
    //     //       $router
    //     //     }
        
    //     // wrapper.vm.logout()
    //     // jest.mock('next/router', ()=> ({push: jest.fn()}))
    //     // expect(Router.push).toHaveBeenCalledWith('/members')
    // })
})