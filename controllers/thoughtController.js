const {User, Thought} = require ("../models")

const ThoughtController = {

    getAllThoughts: (req,res)=>{
        Thought.find({})
            .then(dbData=>res.json(dbData))
            .catch(er=>{
                console.log(er)
                res.ststau(500).json(er)
            })
    },
    getOneThought: (req,res)=>{

    },
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
    }



}


module.exports = ThoughtController


