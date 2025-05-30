var express = require('express');
var router = express.Router();
var axios = require('axios');


const API_URL = 'http://localhost:25000';//api


router.get('/', (req, res) => {
  axios.get(`${API_URL}/edicoes`)
    .then(response => res.render('index', { edicoes: response.data }))
    .catch(err => res.status(500).send('Erro a procurar edições.'));
});


router.get('/:id', (req, res) => {
  axios.get(`${API_URL}/edicoes/${req.params.id}`)
    .then(response => res.render('edicao', { edicao: response.data }))
    .catch(err => res.status(500).send('Erro a procurar edição.'));
});


router.get('/paises/:idPais', (req, res) => {
  const idPais = decodeURIComponent(req.params.idPais);

  axios.get(`${API_URL}/edicoesFull`)
    .then(response => {
      const edicoes = response.data;

      const participacoes = [];
      console.log(edicoes);

      edicoes.forEach(ed => {
        console.log(ed._id, ed.musicas);
        if (Array.isArray(ed.musicas)) { 
          ed.musicas.forEach(musica => {
            console.log(musica);
            if (musica.pais === idPais) {
              participacoes.push({
                idEdicao: ed._id,
                ano: ed.anoEdicao,
                musica: musica.titulo,
                interprete: musica.interprete,
                venceu: ed.vencedor === idPais ? "Sim" : "Não"
              });
            }
          });
        }
      });

      const organizacoes = edicoes.filter(ed => ed.organizacao === idPais)
        .map(ed => ({
          idEdicao: ed._id,
          ano: ed.anoEdicao
        }));

      res.render('pais', {
        pais: idPais,
        participacoes: participacoes,
        organizacoes: organizacoes
      });
    })
    .catch(err => res.status(500).send('Erro a buscar dados do país.'));
});



module.exports = router;

