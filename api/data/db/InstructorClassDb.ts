import {InstructorClassDto} from "../model/InstructorClassDto";

export interface InstructorClassDb {
    createClass(instructorClass:InstructorClassDto) : Promise<InstructorClassDto>;
    getAllByInstructorId(instructorId: string) : Promise<InstructorClassDto[]>;
    getAll():Promise<InstructorClassDto[]>;
    addVideoClip(classId: string, lessonIds: Array<string>) : Promise<InstructorClassDto>;
    updateStudentIdList(classId: string, studentIds: Array<string>) : Promise<InstructorClassDto>;
    getByClassId(classId:string) : Promise<InstructorClassDto>;
}