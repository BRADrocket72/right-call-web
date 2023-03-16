import {FeedbackDto} from "../model/FeedbackDto";

export interface FeedbackDb {
    createFeedback(feedback:FeedbackDto) : Promise<FeedbackDto>;
    getAll():Promise<FeedbackDto[]>;
    findAllByVideoId(videoclipId:string) : Promise<FeedbackDto[]>;
    update(id:string, feedback: FeedbackDto) : Promise<FeedbackDto>;
    findByIdAndDelete(id:string):Promise<FeedbackDto>;
}