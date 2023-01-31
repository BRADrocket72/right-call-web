import {ActivityDto} from "../model/ActivityDto";

export interface ActivityDb {
    createActivity(activity:ActivityDto) : Promise<ActivityDto>;
    getAll():Promise<ActivityDto[]>;
    findAllByVideoId(videoclipId:string) : Promise<ActivityDto[]>;
    update(id:string,activity: ActivityDto) : Promise<ActivityDto>;
    findByIdAndDelete(id:string):Promise<ActivityDto>;
}