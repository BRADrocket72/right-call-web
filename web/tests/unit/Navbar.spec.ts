import { mount } from '@vue/test-utils'
import NavBar from '@/components/Navbar.vue'
import 'jest'

describe('Navbar.vue', () => {
    let wrapper: any
    beforeEach(() => {
        wrapper = mount(NavBar)
    })

    it('renders the navbar', () => {
        expect(wrapper.exists()).toBe(true)
    })
})