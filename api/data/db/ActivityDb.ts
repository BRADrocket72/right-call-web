import {ActivityDto} from "../model/ActivityDto";

export interface ActivityDb {
    createActivity(activity:ActivityDto) : Promise<ActivityDto>;
    getAll():Promise<ActivityDto>;
    findByVideoId(videoId:string) : Promise<ActivityDto>;
    update(activity: ActivityDto) : Promise<ActivityDto>;
    findByIdAndDelete(id:string):Promise<ActivityDto>;
}