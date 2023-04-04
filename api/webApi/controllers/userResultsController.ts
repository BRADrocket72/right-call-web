import { UserResultsDb } from "../../data/db/UserResultsDb"
import UserResults from "../../data/mongo/UserResults"

// const userResultsDb = new UserResults();

class UserResultsController{

    private userResultsDb:UserResultsDb = new UserResults();
    constructor(userResultsDb:UserResults){
        this.userResultsDb = userResultsDb
    }

    create_results = async (req, res) => {


        try {
            res.header('Access-Control-Allow-Origin', '*')
            const dataToSave = await this.userResultsDb.createUserResult(req.body)
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
    }
    
    get_all = async (req, res) => {
        try {
            res.header('Access-Control-Allow-Origin', '*')
            const data = await this.userResultsDb.getAllUserResults()
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    
    get_by_username = async (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
        try {
            const data = await this.userResultsDb.getResultsByUsername(req.params.username);
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
    
    get_highest_user_results = async (req,res) =>{
        res.header('Access-Control-Allow-Origin', '*')
        try {
            const data = await this.userResultsDb.getAllHighestUserResults();
            res.json(data)
        }
        catch (error) {
            res.status(500).json({ message: error.message })
        }
    }



}

export default UserResultsController