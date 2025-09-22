// Arquivo criado em projeto no www.stackblitz.com denominado Aluno.js
// arquivo criado dentro de uma pasta /objetos/escola na raiz do projeto
// Objetivo do exemplo : demonstrar conceitos de visibilidade de atributos e métodos e objetivos do encapsulamento
const Pessoa = require('../pessoas/Pessoa');

class Aluno extends Pessoa {

    #matricula; // atributo privato
    #curso;
    escola; // atributo publico
    

    setMatricula(matricula){
    if (matricula && matricula.length >= 8) {
        this.#matricula = matricula;
        return true;
    }
    return false;
  }

  setCurso(curso){
    if (curso && curso.length >= 2) {
        this.#curso = curso;
        return true;
    }
    return false;
  }
    getMatricula(){
      return this.#matricula;
    }
 
   getCurso(){
     return this.#curso;
   }
}
module.exports = Aluno;