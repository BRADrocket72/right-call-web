import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import VideoUpload from '@/components/VideoUpload.vue'
import '@/routes.js'
import 'jest'

describe('VideoUpload.vue', () => {
    let wrapper
    let mockRouter
    let mockRoute
    let mockCookies

    beforeEach(() => {
        mockRouter = {
            push: jest.fn()
        }, 
        mockCookies = {
            get: jest.fn()
        }
        mockCookies.get.mockReturnValue({ currentUserType: "test" })
        setActivePinia(createPinia())
        wrapper = mount(VideoUpload, {
            data() {
                return {
                    fileUpload: {name: 'lesson.mp4',size: 50000, type: 'video/mp4'}
                }
            },
            global: {
                mocks: {
                    $router: mockRouter,
                    $route: mockRoute,
                    $cookies: mockCookies
                }
            }
        })
    })

    it('renders VideoUpload', () => {
        expect(wrapper.exists()).toBe(true)
    })

    // it('router.push is called successfully when no user token is set', async () => {
    //     expect(mockRouter.push).toHaveBeenCalledWith({'name': 'LoginPage'})
    //     expect(mockRouter.push).toHaveBeenCalledTimes(1)
    // })

    it('allows the user to upload a file', async () => {
        const button = wrapper.find('.upload-video-div').find('input#videoUpload')
        expect(button.exists()).toBe(true)
        wrapper.vm.fileChange = jest.fn()
        const fileChange = jest.spyOn(wrapper.vm, 'fileChange')
        await button.trigger('click') 
        expect(fileChange).toHaveBeenCalled
    })

    it('displays the Video Name input', () => {
        const input = wrapper.find('.upload-video-div').find('input#video-name')
        expect(input.exists()).toBe(true)
    })

    it('calls the uploadVideo function when Upload Video button is clicked', async () => {
        const button = wrapper.find('.upload-video-div').find('button#upload-button')
        expect(button.exists()).toBe(true)
        wrapper.vm.uploadVideo = jest.fn()
        const upload = jest.spyOn(wrapper.vm, 'uploadVideo')
        await button.trigger('click') 
        expect(upload).toHaveBeenCalled
    })
})