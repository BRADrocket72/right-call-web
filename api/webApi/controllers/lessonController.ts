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