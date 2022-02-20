const {Schema,model} = require("mongoose")

const UserSchema = new Schema({

    username:{
        type:String,
        unique:true,
        required:"Username is required",
        trim:true
    },
    email:{
        type:String,
        required:"Email is required",
        unique:true,
        match:[/.+\@.+\..+/]
    },
    thoughts:[
        {
            type:Schema.Types.ObjectId,
            ref:"thought"
        }
    ],
    friends:[
        {
            type:Schema.Types.ObjectId,
            ref:"user"
        }
    ]
})

// get total count of friends of the user
UserSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

const User = model("user",UserSchema)

module.exports = User;