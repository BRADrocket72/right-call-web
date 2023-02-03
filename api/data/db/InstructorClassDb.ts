import {InstructorClassDto} from "../model/InstructorClassDto";

export interface InstructorClassDb {
    createClass(instructorClass:InstructorClassDto) : Promise<InstructorClassDto>;
    getAllByInstructorId(instructorId: string) : Promise<InstructorClassDto[]>;
    getAll():Promise<InstructorClassDto[]>;
    addVideoClip(classId: string, videoClipIds: Array<string>) : Promise<InstructorClassDto>;
    deleteVideoClip(classId: string, videoClipIds: Array<string>) : Promise<InstructorClassDto>;
}