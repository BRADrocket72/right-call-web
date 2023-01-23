import ActivityDto from "../model/ActivityDto";

export interface ActivityDb {
    createActivity(activity:ActivityDto) : Promise<ActivityDto>;
    // getAllActivities():Promise<ActivityDto[]>;
    // getActivityByVideoId(id:string) : Promise<ActivityDto[]>
    // updateActivity(activity: ActivityDto) : Promise<ActivityDto>;
    // deleteById(id:string):Promise<ActivityDto>;
}