# 💻 Sistema de cadastro de usuários

## 📌 Descrição

Este projeto foi desenvolvido com o objetivo de **aprofundar conhecimentos em autenticação com JWT**, **operações CRUD** e **persistência de dados em tabelas MySQL**.

O sistema conta com:
- **Login e cadastro de usuários**
- **Página principal protegida por autenticação**
- **Seção para o usuário visualizar e atualizar seus próprios dados**
- **Seção administrativa para visualizar todos os usuários cadastrados**

A autenticação é realizada por meio de **tokens JWT armazenados em cookies HTTP-only**, garantindo maior segurança.

---

## ⚙️ Instalação Frontend (Vite)

```bash
npm install
```

```bash
npm run dev
```
## ⚙️ Instalação BackEnd em Node.js

```bash
npm install
```

### .env

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
JWT_PASSWORD=sua_chave_secreta
