export default class InstructorClassDto {
    instructorId = "";
    className = "";
    videoclipIds = []
    studentIds = []

    constructor(instructorId, className, videoclipIds, studentIds) {
        this.instructorId = instructorId
        this.className = className;
        this.videoclipIds = videoclipIds;
        this.studentIds = studentIds;
    }
}