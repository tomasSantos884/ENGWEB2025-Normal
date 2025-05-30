const Edicao = require('../models/Edicao');

function find(){
    return Edicao.find({});
}

// GET /edicoes
function getAllEdicoes() {
  return Edicao.find({}, { anoEdicao: 1, organizacao: 1, vencedor: 1 });
}

// GET /edicoes/:id
function getEdicaoById(id) {
  return Edicao.findById(id);
}

// GET /edicoes?org=EEEE
function getEdicoesByOrganizacao(org) {
  return Edicao.find({ organizacao: org }, { anoEdicao: 1, organizacao: 1, vencedor: 1 });
}

// GET /paises?papel=org
function getPaisesOrganizadores() {
  return Edicao.aggregate([
    { $group: { _id: "$organizacao", anos: { $push: "$anoEdicao" } } },
    { $sort: { _id: 1 } }
  ]);
}

// GET /paises?papel=venc
function getPaisesVencedores() {
  return Edicao.aggregate([
    { $group: { _id: "$vencedor", anos: { $push: "$anoEdicao" } } },
    { $sort: { _id: 1 } }
  ]);
}

// GET /interpretes
function getInterpretes() {
    console.log("getInterpretes called");
  return Edicao.aggregate([
    { $unwind: "$musicas" },
    { 
      $group: { 
        _id: { interprete: "$musicas.interprete", pais: "$musicas.pais" } 
      }
    },
    { 
      $project: {
        _id: 0,
        interprete: "$_id.interprete",
        pais: "$_id.pais"
      }
    },
    { $sort: { interprete: 1 } }
  ]);
}


// POST /edicoes
function addEdicao(edicaoData) {
  const edicao = new Edicao(edicaoData);
  return edicao.save();
}

// DELETE /edicoes/:id
function deleteEdicao(id) {
  return Edicao.findByIdAndDelete(id);
}

// PUT /edicoes/:id
function updateEdicao(id, edicaoData) {
  return Edicao.findByIdAndUpdate(id, edicaoData, { new: true });
}

module.exports = {
    find,
    getAllEdicoes,
    getEdicaoById,
    getEdicoesByOrganizacao,
    getPaisesOrganizadores,
    getPaisesVencedores,
    getInterpretes,
    addEdicao,
    deleteEdicao,
    updateEdicao
};
