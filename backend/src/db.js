require('dotenv').config();
const mysql = require("mysql2/promise");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// connection with MySql
let connection;

async function connect() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  return connection;
}

// endpoint CRUD

async function loginUser(email, password) {
  // {
  //   email: 'marcos@email.com',
  //   password: 'marcos123',
  // };

  const conn = await connect();
  const [hasEmail] = await conn.query(`SELECT * FROM usuarios WHERE email = ?`,
    [email]
  )
  if(!hasEmail.length) {
    return {
      status: false,
      message: "usuário não cadastrado",
    };
  }
  const user = hasEmail[0]
  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return {
      status: false,
      message: "senha incorreta!",
    };
  }
  const token = jwt.sign(
    {idUser: user.idUser},
    process.env.JWT_PASSWORD,
  )
  return {
      status: true,
      token: token
    };
}

async function createUser(name, email, password) {
  // {
  //   name: 'marcos',
  //   email: 'marcos@email.com',
  //   password: 'marcos123',
  // };

  try {
    const conn = await connect();
    const [noEmail] = await conn.query(`SELECT email FROM usuarios WHERE email = ?`,
      [email]
    )
    if (!noEmail.length) {
      await conn.query(
        "INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
      );
      return {
        status: true,
        message: "usuário cadastrado com sucesso",
      };
    }
    return {
        status: false,
        message: "email já cadastrado. Tente fazer login!",
      };
  } catch (err) {
    console.log(err);
  }
}

async function getUsers() {
  try {
    const conn = await connect();
    const [rows] = await conn.query(
      "SELECT name, email, telephone FROM usuarios"
    );
    return {
      status: true,
      message: "usuários encontrados",
      users: rows,
    };
  } catch (err) {
    console.log(err);
  }
}

async function getUserById(idUser) {
  try {
    const conn = await connect();
    const [row] = await conn.query(
      "SELECT name, email, telephone FROM usuarios WHERE idUser = ?",
      [idUser]
    );
    return {
      status: true,
      message: "usuário encontrado",
      user: row[0],
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteUser(idUser) {
  try {
    const conn = await connect();
    await conn.query("DELETE FROM usuarios WHERE idUser = ?", [idUser]);
    return {
      status: true,
      message: "usuário deletado com sucesso",
    };
  } catch (err) {
    console.log(err);
  }
}

async function updateUser(field, idUser) {
  // {
  //   name: 'marcos',
  //   email: 'marcos@email.com',
  //   password: 'marcos123',
  //   telephone: "99900000000",
  // };

  try {
    const conn = await connect();
    await conn.query(
      `UPDATE usuarios SET ${checkField(field)} WHERE idUser = ?`,
      [idUser]
    );
    return {
      status: true,
      message: "dados do usuário alterados com sucesso",
    };
  } catch (err) {
    console.log(err);
  }
}

// Recursive function

function checkField(field, index=0, query=[]) {
  if (Object.entries(field).length == index) {
    return query
  }
  query.push(`${Object.keys(field).at(index)} = '${Object.values(field).at(index)}'`)
  return checkField(field, index+1, query);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  loginUser
};