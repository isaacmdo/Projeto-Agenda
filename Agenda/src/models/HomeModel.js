const mongoose = require('mongoose');

//Modelagem de dados/ Obj com a config dos dados que queremos
//Estamos montando um schema pois o mongoDB e um banco nocicle, então ele não como os nossos dados serão armazenados
const HomeSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String
});

const HomeModel = mongoose.model('Home', HomeSchema);