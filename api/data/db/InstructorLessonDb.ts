import {InstructorLessonDto} from "../model/InstructorLessonDto";

export interface InstructorLessonDb {
    createCustomLesson(lesson:InstructorLessonDto) : Promise<InstructorLessonDto>
    getAll():Promise<InstructorLessonDto[]>;
    getById(instructorId:string):Promise<InstructorLessonDto[]>;
    updateInstructorLessonName(id:string, name:string) : Promise<InstructorLessonDto>;
    getLessonById(id:string) : Promise<InstructorLessonDto>;
}