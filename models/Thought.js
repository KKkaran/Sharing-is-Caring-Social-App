const { Schema, model } = require("mongoose")
const mongoose = require("mongoose")

const reactionSchema = new Schema({

    reactionId:{
        type: mongoose.Types.ObjectId
    },
    reactionBody:{
        type:String,
        required:"A reactionBody is required",
        maxlength:280,
        trim:true
    },
    username:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        //formatting the date to be done
    }
})

const ThoughtSchema = new Schema({

    thoughtText:{
        type:String,
        required:"A thought is required",
        maxlength:280,
        trim:true
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    username:{
        type:String,
        required:true
    },
    reactions:[reactionSchema]
},
{
    toJSON:{
        virtuals:true
    },
    id:false
})

// get total count of friends of the user
ThoughtSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length;
});

const Thought = model("thought",ThoughtSchema)

module.exports = Thought;