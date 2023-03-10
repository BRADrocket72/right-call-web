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

exports.update_instructor_lesson_name = async(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        console.log(req.params.id)
        console.log(req.body.name)
        const data = await instructorLessonDb.updateInstructorLessonName(req.params.id, req.body.name);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.get_lesson_by_id = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await instructorLessonDb.getLessonById(req.params.id)
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
