import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import InstructorClassDto  from '@/models/InstructorClassDto'
import 'jest'
import AddVideosToClassModal from '@/components/modals/AddVideosToClassModal.vue';

describe('AssignActivityModal.vue', () => {
    let wrapper;
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(AddVideosToClassModal, {
            props:{
                selectedClass: [new InstructorClassDto("test123", "Test Class", ["123","1234"], ["student1", "student2"])]
            },
            data() {
                return{
                    lessons: [{_id: "testVideo123", videoName: "testVideo123"}]
                }
            }
        })
    })

    it('renders AssignActivityModal', () => {
        expect(wrapper.exists()).toBe(true)
    })

    it('displays the header div', () => {
        const modalHeader = wrapper.find('.modal-header')
        expect(modalHeader.exists()).toBeTruthy
    })

    it('Contains the two containers of Students', () => {
        const studentTable1 = wrapper.findAll('.flex-container-1')
        expect(studentTable1.length).toEqual(1)
        const studentTable2 = wrapper.findAll('.flex-container-2')
        expect(studentTable2.length).toEqual(1)
    })
    it('Displays the correct amount of currently added videos to remove and add', () => {
        const notAddedVideos = wrapper.findAll('.addVideo')
        expect(notAddedVideos.length).toEqual(1)
        const addedVideos = wrapper.findAll('.removeVideo')
        expect(addedVideos.length).toEqual(0)
    })

     it('Displays the close button', () => {
        const closeButton = wrapper.find('.btn-green')
        expect(closeButton.exists).toBeTruthy()
    })
    
})