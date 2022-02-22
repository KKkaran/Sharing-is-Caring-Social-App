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
                .then(dbData=>res.json(dbData))
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
    //create a reaction to a thought
    createReaction:(req,res)=>{
        
    }

    //create a reaction to a thought



}


module.exports = ThoughtController


