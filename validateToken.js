import axios from 'axios'

async function validateToken(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    try {
        const response = await axios.get(`http://localhost:3000/validate/${token}`);
    } catch (err) {
        res.status(401).json({error: "invalid token"});
    }

    next();
}


export { validateToken }