import InstructorClass from "../../data/mongo/InstructorClass";

const instructorClassDb = new InstructorClass();

    module.exports.create_instructorClass = async (req, res)=>  {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const dataToSave = await instructorClassDb.createClass(req.body)
            res.status(200).json(dataToSave.toJSON())
        }
        catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }  
    module.exports.get_all = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await instructorClassDb.getAll();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    module.exports.get_all_by_instructorId = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await instructorClassDb.getAllByInstructorId(req.params.instructorId);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    module.exports.delete_video_clip = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await instructorClassDb.deleteVideoClip(req.params.classId, req.body);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    module.exports.add_video_clip = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await instructorClassDb.addVideoClip(req.params.classId, req.body);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    module.exports.update_student_ids = async(req, res) => {
        try {
            console.log("hello")
            res.header('Access-Control-Allow-Origin', '*')
            const data = await instructorClassDb.updateStudentIdList(req.params.classId, req.body);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }