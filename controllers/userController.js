const {User, Thought} = require ("../models")

const UserController = {

    //get all the users
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
    //get a specific user by the id
    getOneUser: (req,res)=>{
        User.findOne({_id: req.params.userId})
                .populate({
                    path:"thoughts",
                    select:"-__v -username"
                })
                .select("-__v")
                .then(dbData=>res.json(dbData))
                .catch(er=>{
                    console.log(er)
                    res.status(500).json(er)
                })
    },
    //creating a user
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


