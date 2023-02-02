import {InstructorClassDto} from "../model/InstructorClassDto";

export interface InstructorClassDb {
    createClass(instructorClass:InstructorClassDto) : Promise<InstructorClassDto>;
}