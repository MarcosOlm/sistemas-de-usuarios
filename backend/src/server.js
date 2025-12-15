require("dotenv").config();
const authMiddleware = require("./middleware.js");
const bcrypt = require("bcrypt");

const port = 5000;
const express = require("express");
const cors = require("cors");
const cookiePaser = require("cookie-parser");
const app = express();
const db = require("./db.js");
const { verify } = require("jsonwebtoken");

app.use(express.json());
app.use(cookiePaser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const verify = await db.loginUser(email, password);
    if (!verify.status) {
      return res.send({
        status: false,
        massage: "login não efetuado",
      });
    }
    res.cookie("token", verify.token, {
      httpOnly: true,
      secure: false,
    });
    return res.send({
      status: true,
      massage: "login efetuado com sucesso",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    res.send({
      status: true,
      massage: "logout efetuado com sucesso",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/registration", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const cryptPassword = await bcrypt.hash(password, 10);
    res.send(await db.createUser(name, email, cryptPassword));
  } catch (err) {
    console.log(err);
  }
});

app.get("/me", authMiddleware, (req, res) => {
  try {
    res.send({
      status: true,
      massage: "rota segura para prosseguir",
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/allUser", authMiddleware, async (req, res) => {
  try {
    res.send(await db.getUsers());
  } catch (err) {
    console.log(err);
  }
});

app.get("/user", authMiddleware, async (req, res) => {
  try {
    res.send(await db.getUserById(req.idUser));
  } catch (err) {
    console.log(err);
  }
});

app.delete("/user", authMiddleware, async (req, res) => {
  try {
    res.send(await db.deleteUser(req.idUser));
  } catch (err) {
    console.log(err);
  }
});

app.put("/user", authMiddleware, async (req, res) => {
  try {
    res.send(await db.updateUser(req.body, req.idUser));
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server on: ${port}`);
});
