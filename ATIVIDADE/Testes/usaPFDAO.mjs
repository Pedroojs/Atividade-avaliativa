
import PF from '../Pessoas/PF.js';
import PFDAO from '../Pessoas/DAOs/PFDAO.mjs';

import Endereco from '../Pessoas/Endereco.js';
import Telefone from '../Pessoas/Telefone.js';
import Titulo from '../Pessoas/Titulo.js';

const pf = new PF();
pf.setNome("Carla");
pf.setEmail("carla@ifb.edu.br");
pf.setCPF("1234567890/0001-88");

const end = new Endereco();
end.setLogradouro("QNM 41");
end.setCep("12345-679");

pf.setEndereco(end);

const fone = new Telefone();

fone.setDdd("61");
fone.setNumero("99999-8888");

pf.addTelefone(fone);

const fone2 = new Telefone();

fone2.setDdd("62");
fone2.setNumero("99999-7777");

pf.addTelefone(fone2);

const titulo = new Titulo();
titulo.setNumero('1234156');
titulo.setSecao('DF');
titulo.setDataRegistro(new Date());

pf.setTitulo(titulo);



const pfdao = new PFDAO(pf);

var x = pfdao.toJSON();
pfdao.saveJSON();

console.log(x);
console.log(JSON.stringify(x));
console.log(pfdao.recoveryJSON());

