const express = require('express')
const router = express.Router()
const User = require('./../models/user'); 
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// POST route to add a person
router.post('/signup', async (req, res) => {  // <-- Adjust the route here
    try {
        const data = req.body;

        // Create a new User document
        const newUser = new User(data);

        // Save the new user to the database
        const response = await newUser.save();
        console.log('User saved');

        const payload = {
            id: response.id,
        };

        const token = generateToken(payload);
        console.log("Token is: ", token);

        res.status(200).json({ response, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Login Route
router.post('/user/login', async(req, res) => {
    try{
        // Extract aadharCardNumber and password from request body
        const {aadharCardNumber, password} = req.body;

        // Find the user by username
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token 
        const payload = {
            id: user.id,
           
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/user/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put('/profile/password', async (req, res)=>{
    try{
        const userId = req.params.id; // Extract the id from the Token
      const {currentPassword, newPassword} = req.body //extract current and new password from the body

        const user = await User.findById(userId);
 // If user password does not match, return error
 if(!(await user.comparePassword(currentPassword))){
    return res.status(401).json({error: 'Invalid username or password'});
}
//update the user password
user.password = newPassword
await user.save()

  console.log('Password Updated')
  res.status(200).json({message: "Password Updated"})
    }catch(err){
console.log(err);
    }
})
        




module.exports = router;