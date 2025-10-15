const express = require('express');
const router = express.Router();

const Usuario = require('./controllers/auth');
const Tarefa = require('./controllers/atividades');
const Turma = require('./controllers/turma')

router.get('/logout', Usuario.logout);
router.post('/login', Usuario.login);
router.post('/cadastrar', Usuario.cadastrarUsuario);

router.post('/tarefa', Tarefa.create);
router.get('/tarefa', Tarefa.read);
router.delete('/tarefa/:id', Tarefa.remove);

router.post('/turma', Turma.createTurma);
router.get('/turma', Turma.read);
router.delete('/turma/:id', Turma.remove);



module.exports = router;