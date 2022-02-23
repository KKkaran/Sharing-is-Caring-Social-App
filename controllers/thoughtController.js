const {User, Thought} = require ("../models")

const ThoughtController = {

    //get all the thoughts
    getAllThoughts: (req,res)=>{
        Thought.find({})
            .select("-__v")
            .then(dbData=>res.json(dbData))
            .catch(er=>{
                console.log(er)
                res.ststau(500).json(er)
            })
    },
    //getting a specific thought by the id
    getOneThought: (req,res)=>{
        Thought.findOne({_id: req.params.thoughtId})
                .select("-__v")
                .then(dbData=>{
                    if(!dbData){
                        res.json("No thought found with that id")
                    }else{
                        res.json(dbData)
                    }
                })
                .catch(er=>{
                    console.log(er)
                    res.status(500).json(er)
                })
    },
    //create thoughts 
    createThought: (req,res)=>{
        Thought.create(req.body)
            .then(({_id})=>{
                return User.findOneAndUpdate(
                    {_id:req.body.userId},
                    {$push:{thoughts:_id}},
                    {new:true}
                )
            })
            .then(dbData=>{
                if(!dbData) res.json("no user found with that id")
                else res.json(dbData)
            })
            .catch(er=>{
                console.log(er)
                res.ststau(500).json(er)
            })
    },
    //updating a thought
    updateThought:(req,res)=>{
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            req.body,
            {new:true}
        )
        .then(dbData=>{
            if(!dbData){
                res.json("No thought with found that id!!")
                
            }else{
                res.json(dbData)
            }

        })
        .catch(er=>{
            console.log(er)
            res.ststau(500).json(er)
        })
    },
    //deleting s thought
    deleteThought:(req,res)=>{
        Thought.findOneAndDelete({_id:req.params.thoughtId})
            .then(dbData=>{
                if(!dbData){
                    res.json("No thought with found that id!!")
                    
                }else{
                    res.json(dbData)
                }
            })
            .catch(er=>{
                console.log(er)
                res.ststau(500).json(er)
            })
    },
    //create a reaction to a thought
    createReaction:(req,res)=>{
        Thought.findOneAndUpdate(
            {_id : req.params.thoughtId},
            {$push : {reactions:req.body}},
            {new : true}
        )
        .then(dbData=>res.json(dbData))
        .catch(er=>{
            console.log(er);
            res.status(500).json(er)
        })
    },
    //delete a reaction to a thought
    deleteReaction:(req,res)=>{
        Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$pull:{reactions:{_id:req.params.reactionId}}},
            {new : true}
        )
        .then(dbData=>{
            if(!dbData)res.json("No thought found by That id")
            else{
                
                res.json(dbData)
            }
        })
        .catch(er=>{
            console.log(er);
            res.status(500).json(er)
        })
    }


}


module.exports = ThoughtController


