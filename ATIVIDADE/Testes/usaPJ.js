const Telefone = require('../pessoas/Telefone');
const Endereco = require('../pessoas/Endereco');

const PJ = require('../pessoas/PJ');
const IE = require('../pessoas/IE/IEclss');


const end = new Endereco();
const fone1 = new Telefone();
const fone2 = new Telefone();

end.setLogradouro('QNM 40');
fone1.setNumero('1234-5678');
fone2.setNumero('1255-5578');

const ie = new IE();
ie.setNumero('1234156');
ie.setEstado('DF');

const obj = new PJ();
obj.setNome('Carla');
obj.setEndereco(end); // vincula Endereco a PJ
obj.addTelefone(fone1); // vincula Telefone a PJ
obj.addTelefone(fone2);  // vincula outro Telefone a PJ
obj.setIE(ie); // vincula IE a PJ


console.log(obj.getNome());
console.log(obj.getEndereco().getLogradouro());
console.log(obj.getTelefones());
//=========================================
for (let x of obj.getTelefones()) {
  console.log("Numeto:", x.getNumero());
}

//=========================================
console.log(obj.getIE().getNumero());
// ===== Endereco ======
console.log(end.getPessoas());
for (let x of end.getPessoas()) {
  console.log("Donos do Endereco:", x.getNome());
}
// ===== Telefone ======
console.log(fone1.getPessoas());
for (let x of fone1.getPessoas()) {
  console.log("Donos do Telefone:", x.getNome());
}
// ===== Titulo =======
console.log(ie.getPJ().getNome());




