import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import InstructorClassDto  from '@/models/InstructorClassDto'
import 'jest'
import AddStudentsModal from '@/components/modals/AddStudentsModal.vue';

describe('AssignActivityModal.vue', () => {
    let wrapper;
    beforeEach(() => {
        setActivePinia(createPinia())
        wrapper = mount(AddStudentsModal, {
            props:{
                selectedClass: [new InstructorClassDto("test123", "Test Class", ["123","1234"], ["student1", "student2"])]
            },
            data() {
                return{
                    allUsers: ["test123"],
                    allStudents: [{_id: "student3", userName: "student3"}]
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

    it('Contains the two Tables of Students', () => {
        const studentTable1 = wrapper.findAll('.flex-container-1')
        expect(studentTable1.length).toEqual(1)
        const studentTable2 = wrapper.findAll('.flex-container-2')
        expect(studentTable2.length).toEqual(1)
    })
    it('Displays the correct amount of currently added students to remove', () => {
        const addedStudents = wrapper.findAll('.removeStudent')
        expect(addedStudents.length).toEqual(0)
    })
    it('Displays the correct amount of students to add', () => {
        const notAddedStudents = wrapper.findAll('.addStudent')
        expect(notAddedStudents.length).toEqual(1)
    })

     it('Displays the close button', () => {
        const closeButton = wrapper.find('.btn-green')
        expect(closeButton.exists).toBeTruthy()
    })
    
})