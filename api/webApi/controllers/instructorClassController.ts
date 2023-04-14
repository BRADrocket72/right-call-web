import { InstructorClassDb } from "../../data/db/InstructorClassDb";
import InstructorClass from "../../data/mongo/InstructorClass";

const instructorClassDb = new InstructorClass();

class InstructorClassController {
    private instructorClassDb:InstructorClassDb = new InstructorClass();
    constructor(instructorDb:InstructorClass){
        this.instructorClassDb = instructorDb;
    }

   create_instructorClass = async (req, res)=>  {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const dataToSave = await instructorClassDb.createClass(req.body)
            res.status(200).json(dataToSave.toJSON())
        }
        catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }  
    get_all = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await this.instructorClassDb.getAll();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    get_all_by_instructorId = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await this.instructorClassDb.getAllByInstructorId(req.params.instructorId);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    add_video_clip = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await this.instructorClassDb.addVideoClip(req.params.classId, req.body);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    update_student_ids = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await this.instructorClassDb.updateStudentIdList(req.params.classId, req.body);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    get_by_classId = async(req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await this.instructorClassDb.getByClassId(req.params.classId);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
export default InstructorClassController