const express = require('express');
const router = express.Router();
const db = require('../../db');
const ensureAuth = require('../ensureAuth');

// Listar atividades de uma turma
router.get('/:id_turma', ensureAuth, (req, res) => {
  const id_turma = req.params.id_turma;
  db.query('SELECT * FROM atividades WHERE id_turma = ?', [id_turma], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar atividades' });
    res.json(results);
  });
});

// Cadastrar atividade
router.post('/', ensureAuth, (req, res) => {
  const { descricao, id_turma } = req.body;
  db.query('INSERT INTO atividades (descricao, id_turma) VALUES (?, ?)', [descricao, id_turma], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao cadastrar atividade' });
    res.json({ message: 'Atividade cadastrada com sucesso' });
  });
});

module.exports = router;
