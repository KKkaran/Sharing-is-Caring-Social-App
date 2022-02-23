const {User, Thought} = require ("../models")
const mongoose = require("mongoose")
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
                .then(dbData=>{
                    if(!dbData){
                        res.json("No user with found that id!!")
                        
                    }else{
                        res.json(dbData)
                    }

                })
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
    },
    //updating a user
    updateUser:(req,res)=>{
        User.findOneAndUpdate(
            {_id:req.params.userId},
            req.body,
            {new:true}
        )
        .then(dbData=>{
            if(!dbData){
                res.json("No user with found that id!!")
                
            }else{
                res.json(dbData)
            }

        })
        .catch(er=>{
            console.log(er)
            res.ststau(500).json(er)
        })
    },
    //deleting s user
    deleteUser:(req,res)=>{
        User.findOne({_id:req.params.userId})
                            .populate({
                                path:"thoughts",
                                select:"-__v -username"
                            })
                            .select("-__v")
                        .then(dbData=>{

                            const thoughtIds = JSON.stringify(dbData.thoughts.map(t=>t._id))
                            const ids = JSON.parse(thoughtIds)
                            console.log(typeof(ids))
                            return Thought.deleteMany(
                                {_id:{$in:ids}}
                            )
                        })
                        .then(dbData=>{
                            User.findOneAndDelete({_id:req.params.userId})
                            .then(dbData=>{
                                if(!dbData){
                                    res.json("No user with found that id!!")
                                    
                                }else{
                                    //when the user is deleted we delete his thoughts as well
                                         res.json("user deleted with his thoughts!!")  
                                    }
                            })
                        })
                        .catch(er=>{
                            console.log(er)
                            res.ststau(500).json(er)
                        })
            .catch(er=>{
                console.log(er)
                res.ststau(500).json(er)
            })
    },

    //testing a user and get ids of thoughts to delete
    testRoute:(req,res)=>{
        
    }

}


module.exports = UserController


