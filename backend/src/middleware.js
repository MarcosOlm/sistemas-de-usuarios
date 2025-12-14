const jwt = require('jsonwebtoken');
require('dotenv').config();

function middleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        res.send({
            status: false,
            massage: "token não encontrado!"
        })
    }
    try {
        const auth = jwt.verify(token, process.env.JWT_PASSWORD)
        req.idUser = auth.idUser;
        next();
    }
    catch (err) {
        console.log(err)
        res.send({
            status: false,
            massage: "Ocorreu algum problema com o token"
        })
    }
}

module.exports = middleware;