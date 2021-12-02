const { request, response } = require("express");
const express = require("express");
const { v4 } = require("uuid");
const app = express();
app.use(express.json());
const usuarios = [];
app.get('/users', (request, response) => {
    return response.json(usuarios)
});
app.post('/users', (request, response) => {
    const { name, email, phone } = request.body;
    const usuario = { id: v4(), name, email, phone};
    usuarios.push(usuario)
    return response.json(usuario);
});
app.put('/users/:id', (request, response) => {
    const { id } = request.params;
    const { name, email, phone } = request.body;
    const userIndex =  usuarios.findIndex( usuario => usuario.id === id)
    if( userIndex < 0) {
        return response.status(400).json({ error: 'Usuário não encontrado'})
    }
    const usuario = {
        id,
        name,
        email,
        phone
    }
    usuarios[userIndex] = usuario
    return response.json(usuario)
});
app.delete('/users/:id', (request, response) => {
    const { id } = request.params;
    const userIndex =  usuarios.findIndex( usuario => usuario.id === id)
    if( userIndex < 0) {
        return response.status(400).json({ error: 'Usuário não encontrado'})
    }
    usuarios.splice(userIndex, 1)
    return response.status(201).send();
});
module.exports = app;