import InstructorClass from "../../data/mongo/InstructorClass";

const instructorClassDb = new InstructorClass();

  module.exports.create_instructorClass =async (req, res)=>  {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const dataToSave = await instructorClassDb.createClass(req.body)
        res.status(200).json(dataToSave.toJSON())
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}