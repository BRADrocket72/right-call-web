import UserResults from "../../data/mongo/UserResults"

let userResultsDb = new UserResults();

module.exports.create_results = async (req, res) => {


    try {
        res.header('Access-Control-Allow-Origin', '*')
        var dataToSave = await userResultsDb.createUserResult(req.body)
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports.get_all = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        const data = await userResultsDb.getAllUserResults()
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports.get_by_username = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const data = await userResultsDb.getResultsByUsername(req.params.username);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}