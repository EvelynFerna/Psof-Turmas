const express = require('express');
const router = express.Router();
const db = require('../../db');

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.query('SELECT * FROM professores WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no servidor' });
    if (results.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });

    req.session.user = results[0];
    res.json({ message: 'Login realizado com sucesso', professor: results[0] });
  });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logout realizado com sucesso' });
  });
});

module.exports = router;
