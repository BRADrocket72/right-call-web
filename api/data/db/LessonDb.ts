import {LessonDto} from "../model/LessonDto";

export interface LessonDb {
    createLesson(lesson:LessonDto) : Promise<LessonDto>;
    getAll():Promise<LessonDto[]>;
    updateLessonName(id:string, name:string) : Promise<LessonDto>;
    updateVideoClipsArray(id:string, videoClipsArray:Array<string>) : Promise<LessonDto>;
}