require('dotenv').config();
const mysql = require("mysql2/promise");

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
      user: row,
    };
  } catch (err) {
    console.log(err);
  }
}

async function createUser(name, email, password) {
  try {
    const conn = await connect();
    await conn.query(
      "INSERT INTO usuarios (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return {
      status: true,
      message: "usuário cadastrado com sucesso",
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

async function updateUser(field) {
  // {
  //   idUser: 1,
  //   name: 'marcos',
  //   email: 'marcos@email.com',
  //   telephone: "83900000000",
  // };

  try {
    const conn = await connect();
    await conn.query(
      `UPDATE usuarios SET ${checkField(field)} WHERE idUser = ${field.idUser}`
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
  if (Object.keys(field).at(index) != 'idUser') {
    query.push(`${Object.keys(field).at(index)} = '${Object.values(field).at(index)}'`)
  }
  return checkField(field, index+1, query);
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};