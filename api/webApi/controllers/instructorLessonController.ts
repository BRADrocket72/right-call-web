import InstructorLesson from "../../data/mongo/InstructorLesson"

const instructorLessonDb = new InstructorLesson();

exports.instructor_lessons_create_lesson = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await instructorLessonDb.createCustomLesson(req.body);
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.instructor_lessons_get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await instructorLessonDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.instructor_lessons_get_by_id = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await instructorLessonDb.getById(req.params.instructorId);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}