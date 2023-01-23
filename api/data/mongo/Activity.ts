import { ActivityDb } from "../db";
import {ActivitySchema} from './schemas/ActivitySchema'


export class Activity implements ActivityDb {
    
    createActivity(activity:ActivityDto) {
        const data = new ActivitySchema({
            timestamp: activity.timestamp,
            questionText: activity.questionText,
            answers: activity.answers,
            correctAnswer: activity.correctAnswer,
            videoclipId: activity.videoclipId
        })
        return data.save();
    }
    
}