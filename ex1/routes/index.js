var express = require('express');
var router = express.Router();
var edicaoController = require('../controllers/edicaoController');


// GET /edicoes
router.get('/edicoes', (req, res) => {
  if (req.query.org) {
    edicaoController.getEdicoesByOrganizacao(req.query.org)
      .then(edicoes => res.json(edicoes))
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    edicaoController.getAllEdicoes()
      .then(edicoes => res.json(edicoes))
      .catch(err => res.status(500).json({ error: err.message }));
  }
});

// GET /edicoesFull
router.get('/edicoesFull', (req, res) => {
  edicaoController.find()
    .then(edicoes => res.json(edicoes))
    .catch(err => res.status(500).send('Erro a procurar todas as edições completas'));
});


// GET /edicoes/:id
router.get('/edicoes/:id', (req, res) => {
  edicaoController.getEdicaoById(req.params.id)
    .then(edicao => {
      if (edicao) res.json(edicao);
      else res.status(404).json({ error: 'Edição não encontrada' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET /paises
router.get('/paises', (req, res) => {
  if (req.query.papel === 'org') {
    edicaoController.getPaisesOrganizadores()
      .then(paises => res.json(paises))
      .catch(err => res.status(500).json({ error: err.message }));
  } else if (req.query.papel === 'venc') {
    edicaoController.getPaisesVencedores()
      .then(paises => res.json(paises))
      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    res.status(400).json({ error: 'Parâmetro "papel" inválido' });
  }
});

// GET /interpretes
router.get('/interpretes', (req, res) => {
  edicaoController.getInterpretes()
    .then(interpretes => res.json(interpretes))
    .catch(err => res.status(500).json({ error: err.message }));
});

// POST /edicoes
router.post('/edicoes', (req, res) => {
  edicaoController.addEdicao(req.body)
    .then(edicao => res.status(201).json(edicao))
    .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE /edicoes/:id
router.delete('/edicoes/:id', (req, res) => {
  edicaoController.deleteEdicao(req.params.id)
    .then(edicao => {
      if (edicao) res.json({ message: 'Edição apagada com sucesso' });
      else res.status(404).json({ error: 'Edição não encontrada' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

// PUT /edicoes/:id
router.put('/edicoes/:id', (req, res) => {
  edicaoController.updateEdicao(req.params.id, req.body)
    .then(edicao => {
      if (edicao) res.json(edicao);
      else res.status(404).json({ error: 'Edição não encontrada' });
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
