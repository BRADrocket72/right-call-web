import { resolve } from "path"
import { ActivityDb } from "../../../data/db/ActivityDb"
import { ActivityDto } from "../../../data/model/ActivityDto"
import ActivityController from "../../controllers/activityController"
import {mock} from 'jest-mock-extended'
import { rejects } from "assert"


describe('ActivityController',()=>{

    const mockDb = mock<ActivityDb>();
    const controller = new ActivityController(mockDb)
    const activityOne: ActivityDto = {timestamp:1,questionText:"test question",questionType:"eye tracking",videoclipId:"12",correctAnswer:"yes", answers:['yes','no']}

    it('get all success',async()=>{
        const mockPromise:Promise<ActivityDto[]> = new Promise<ActivityDto[]>((resolve)=>{
            resolve([activityOne])
        })
        mockDb.getAll.mockReturnValue(mockPromise);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        const result =await controller.activities_get_all([],{json:()=>{},status:()=>{},header:(a,b)=>{}});
        expect(mockDb.getAll).toHaveBeenCalled()
    })
})