export default class InstructorClassDto {
    instructorId = "";
    className = "";
    lessonIds = []
    studentIds = []

    constructor(instructorId, className, lessonIds, studentIds) {
        this.instructorId = instructorId
        this.className = className;
        this.lessonIds = lessonIds;
        this.studentIds = studentIds;
    }
}