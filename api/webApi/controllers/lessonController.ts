import Lesson from "../../data/mongo/Lesson"

const lessonDb = new Lesson();

exports.lessons_create_lesson = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await lessonDb.createLesson(req.body);
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.lessons_get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await lessonDb.getAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.lessons_delete_lesson = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const id = req.params.id;
        const result = await lessonDb.findByIdAndDelete(id)
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.update_lesson_name = async(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await lessonDb.updateLessonName(req.params.id, req.body.name);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}