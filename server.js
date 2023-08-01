// Importações de Bibliotecas
const express = require('express');
const path = require('path');

// Importa Routers
const newsRouter = require('./routes/newsRoutes');
const authorRouter = require('./routes/authorRoutes');
const imgRouter = require('./routes/imgRoutes');
const db = require('./backend/db_interface')

// Importa Configurações
const config = require('./config')

// Inicia o APP
const app = express();
app.use(express.static(config.initial_path));

// Rotas
  // Buscador
    app.get('/', (req, res) => {
        res.sendFile(path.join(config.initial_path, "index.html"));
    })
  // Noticias
    app.use(newsRouter)
  // Autores
    app.use(authorRouter)
  // Imagens
    app.use(imgRouter)

// Escuta a porta 3000
app.listen("3000", () => {
    console.log('Sucesso! Escutando...');
})