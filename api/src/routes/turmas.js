const express = require('express');
const router = express.Router();
const db = require('../../db');
const ensureAuth = require('../ensureAuth');

// Listar turmas do professor
router.get('/', ensureAuth, (req, res) => {
  const id_professor = req.session.user.id;
  db.query('SELECT * FROM turmas WHERE id_professor = ?', [id_professor], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar turmas' });
    res.json(results);
  });
});

// Cadastrar turma
router.post('/', ensureAuth, (req, res) => {
  const { nome } = req.body;
  const id_professor = req.session.user.id;
  db.query('INSERT INTO turmas (nome, id_professor) VALUES (?, ?)', [nome, id_professor], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao cadastrar turma' });
    res.json({ message: 'Turma cadastrada com sucesso' });
  });
});

// Excluir turma
router.delete('/:id', ensureAuth, (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM atividades WHERE id_turma = ?', [id], (err, atividades) => {
    if (atividades.length > 0) {
      return res.status(400).json({ message: 'Você não pode excluir uma turma com atividades cadastradas' });
    }
    db.query('DELETE FROM turmas WHERE id = ?', [id], (err) => {
      if (err) return res.status(500).json({ error: 'Erro ao excluir turma' });
      res.json({ message: 'Turma excluída com sucesso' });
    });
  });
});

module.exports = router;
