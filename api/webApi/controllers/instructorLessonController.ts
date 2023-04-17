import InstructorLesson from "../../data/mongo/InstructorLesson"

class InstructorLessonController {
    private instructorLessonDb : InstructorLesson = new InstructorLesson();

    constructor(instructorLessonDb : InstructorLesson){
        this.instructorLessonDb = instructorLessonDb
    }



    instructor_lessons_create_lesson = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await this.instructorLessonDb.createCustomLesson(req.body);
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

    instructor_lessons_get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.instructorLessonDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    instructor_lessons_get_by_id = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.instructorLessonDb.getById(req.params.instructorId);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    update_instructor_lesson_name = async(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await this.instructorLessonDb.updateInstructorLessonName(req.params.id, req.body.name);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

    get_lesson_by_id = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await this.instructorLessonDb.getLessonById(req.params.id)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
} 
export default InstructorLessonController