const {User, Thought} = require ("../models")

const UserController = {

    getAllUsers: (req,res)=>{
        User.find({})
            .populate({
                path:"thoughts",
                select:"-__v -username"
            })
            .select("-__v")
            .then(dbData=>res.json(dbData))
            .catch(er=>{
                console.log(er)
                res.ststau(500).json(er)
            })
    },
    getOneUser: (req,res)=>{

    },
    createUser: (req,res)=>{
        User.create(req.body)
            .then(dbData=>res.json(dbData))
            .catch(er=>{
                console.log(er)
                res.ststau(500).json(er)
            })
    }



}


module.exports = UserController


