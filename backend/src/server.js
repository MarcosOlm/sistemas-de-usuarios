require('dotenv').config();
const authMiddleware = require("./middleware.js");
const bcrypt = require('bcrypt');

const port = 5000;
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./db.js')

app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        res.send(await db.loginUser(email, password))
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/registration', async (req, res) => {
    try {
        const {name, email, password} = req.body
        const cryptPassword = await bcrypt.hash(password, 10);
        res.send(await db.createUser(name, email, cryptPassword));
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/allUser', authMiddleware, async (req, res) => {
    try {
        res.send(await db.getUsers());
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/user', authMiddleware, async (req, res) => {
    try {
        res.send(await db.getUserById(req.idUser));
    }
    catch (err) {
        console.log(err);
    }
})

app.delete('/user', authMiddleware, async (req, res) => {
    try {
        res.send(await db.deleteUser(req.idUser));
    }
    catch (err) {
        console.log(err)
    }
})

app.put('/user', authMiddleware, async (req, res) => {
    try {
        res.send(await db.updateUser(req.body, req.idUser));
    }
    catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Server on: ${port}`)
})