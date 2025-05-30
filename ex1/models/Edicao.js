const mongoose = require('mongoose');

const MusicaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  link: { type: String },
  pais: { type: String },
  compositor: { type: String },
  letra: { type: String },
  titulo: { type: String },
  interprete: { type: String }
}, { _id: false });

const EdicaoSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  anoEdicao: { type: String, required: true },
  organizacao: { type: String, required: true },
  vencedor: { type: String },
  musicas: [MusicaSchema]
});

module.exports = mongoose.model('Edicao', EdicaoSchema, 'edicoes');
