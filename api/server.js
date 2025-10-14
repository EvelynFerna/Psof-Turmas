require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'segredo-simples',
  resave: false,
  saveUninitialized: true,
}));

// Rotas
const authRoutes = require('./src/routes/auth');
const turmaRoutes = require('./src/routes/turmas');
const atividadeRoutes = require('./src/routes/atividades');

app.use('/auth', authRoutes);
app.use('/turmas', turmaRoutes);
app.use('/atividades', atividadeRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
