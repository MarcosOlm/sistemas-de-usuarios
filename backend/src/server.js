const port = 5000;
require('dotenv').config();
const cors = require('cors')
const express = require('express')
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
        res.send(await db.createUser(name, email, password));
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/user', async (req, res) => {
    try {
        res.send(await db.getUsers());
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        res.send(await db.getUserById(req.params.id));
    }
    catch (err) {
        console.log(err);
    }
})

app.delete('/user/:id', async (req, res) => {
    try {
        res.send(await db.deleteUser(req.params.id));
    }
    catch (err) {
        console.log(err)
    }
})

app.put('/user', async (req, res) => {
    try {
        res.send(await db.updateUser(req.body));
    }
    catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Server on: ${port}`)
})