const AlunoBase = require('../Escola/AlunoBase')

joao = new AlunoBase();
//joao.#matricula = 12345; --> ERRO
joao.setMatricula(12345);
console.log(joao.getMatricula());