// Import the JSON Web Token (JWT) library
const jwt = require('jsonwebtoken');

// Define the secret key for verifying JSON Web Tokens
const JWT_SECRET = "Stay$healthy";

// Define the middleware function to fetch the user from the JWT
const fetchuser = (req, res, next) => {
    // Get the token from the request header named "auth-token"
    const token = req.header("auth-token");

    // If the token is not found, respond with a 401 Unauthorized status and an error message
    if(!token) {
        return res.status(401).send({error: "Please authenticate using a valid token"});
    }

    try {
        // Verify the token using the secret key
        const data = jwt.verify(token, JWT_SECRET);
        
        // Attach the user data (extracted from the token) to the request object
        req.user = data.user;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If the token verification fails, respond with a 401 Unauthorized status and an error message
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

// Export the middleware function for use in other parts of the application
module.exports = fetchuser;
