const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    // Extract jwt token from the request header
    const authHeader = req.headers['authorization']; // Add this line
    const token = authHeader && authHeader.split(' ')[1]; // Check if authHeader exists before splitting

    if (!token) return res.status(401).json({ error: 'unauthorized' });

    try {
        // Verify the jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded;
//decode the user
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Function to generate jwt
const generateToken = (userData) => {
    // Generate a new jwt token
    return jwt.sign(userData, process.env.JWT_SECRET,{expiresIn:30000});
};

module.exports = { jwtAuthMiddleware, generateToken };
