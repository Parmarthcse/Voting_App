const mongoose = require('mongoose')

const CandidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
party:{
    type:String,
    required:true
},
age:{
    type: String,
    required:true,
},
votes:[
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    votedAt:{
        type:Date,
        default: Date.now()
    }
}
],
voteCount:{
    type:Number,
    default:0,
}
})

const Candidate = mongoose.model('Candidate', CandidateSchema);
module.exports = Candidate;