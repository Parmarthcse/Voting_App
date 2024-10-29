const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
         type:Number,
         required: true,
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
    },
    email:{
        type: String,
    },
    address:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,  // <-- Add this field to store password
        required: true,
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter',
    },
    isVoted:{
        type:Boolean,
        default:false,
    }
})
userSchema.pre('save', async function(next){
    const person = this;
    //hash the password only if it has been modified (or it new)
    //false ka ulta true hoga
    if(!person.isModified('password')) return next();
try {
 //hash password generation
//means how much long number the will generate 
 const salt = await bcrypt.genSalt(10)


 //hash paasowrd
 const hashedPassword = await bcrypt.hash(person.password,salt);

 //override the plain password with the hashed one 
 person.password = hashedPassword;
    next()
} catch (error) {
   return next(err)
}
})
userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        //use bcyrpt to compapre the provided password with the hashed password

        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;