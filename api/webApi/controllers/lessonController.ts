import { LessonDb } from "../../data/db/LessonDb";
import Lesson from "../../data/mongo/Lesson"

class LessonController {
    private lessonDb: LessonDb = new Lesson();

    constructor(lessonDb: LessonDb){
       this.lessonDb = lessonDb
    }

lessons_create_lesson = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await this.lessonDb.createLesson(req.body);
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

lessons_get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.lessonDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

lessons_delete_lesson = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const result = await this.lessonDb.findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

update_lesson_name = async(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.lessonDb.updateLessonName(req.params.id, req.body.name);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

update_video_clips_array = async(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.lessonDb.updateVideoClipsArray(req.params.id, req.body);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

get_admin_lesson_by_id = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await this.lessonDb.getAdminLessonById(req.params.id)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
}
export default LessonController;

