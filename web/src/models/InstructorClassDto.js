export default class InstructorClassDto {
    instructorId = "";
    videoClipIds = []
    studentIds = []

    constructor(instructorId, videoClipIds,studentIds) {
        this.instructorId = instructorId;
        this.videoClipIds = videoClipIds;
        this.studentIds = studentIds;
    }
}