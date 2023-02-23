import {LessonDto} from "../model/LessonDto";

export interface LessonDb {
    createLesson(lesson:LessonDto) : Promise<LessonDto>;
    getAll():Promise<LessonDto[]>;
    // findAllByVideoId(videoclipId:string) : Promise<LessonDto[]>;
    // update(id:string,activity: LessonDto) : Promise<LessonDto>;
    // findByIdAndDelete(id:string):Promise<LessonDto>;
}