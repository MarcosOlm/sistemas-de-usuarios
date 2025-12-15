const jwt = require("jsonwebtoken");
require("dotenv").config();

function middleware(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.send({
        status: false,
        massage: "token não encontrado!",
      });
    }
    const auth = jwt.verify(token, process.env.JWT_PASSWORD);
    req.idUser = auth.idUser;
    next();
  } catch (err) {
    console.log(err);
    res.send({
      status: false,
      massage: "Ocorreu algum problema com o token",
    });
  }
}

module.exports = middleware;
