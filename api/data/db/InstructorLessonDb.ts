import {InstructorLessonDto} from "../model/InstructorLessonDto";

export interface InstructorLessonDb {
    createCustomLesson(lesson:InstructorLessonDto) : Promise<InstructorLessonDto>
    getAll():Promise<InstructorLessonDto[]>;
}