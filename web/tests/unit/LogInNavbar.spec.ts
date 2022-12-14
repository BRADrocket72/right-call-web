import { mount } from '@vue/test-utils'
import NavBar from '@/components/LoginNavBar.vue'
import 'jest'

describe('Navbar.vue', () => {
    let wrapper: any
    beforeEach(() => {
        wrapper = mount(NavBar)
    })

    it('renders the navbar', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('renders the navbar', () => {
        expect(wrapper.findAll('.container-fluid').length).toBe(1)
    })
})