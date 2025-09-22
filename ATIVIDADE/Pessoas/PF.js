// Arquivo criado em projeto no www.stackblitz.com denominado PF.js (Pessoa Fisica)
// arquivo criado dentro de uma pasta /objetos/pessoas na raiz do projeto
// Objetivo do exemplo : demonstrar conceitos de Herança, encapsulamentos e relacionamentos 1 - 1 com a classe Titulo

const Pessoa = require('./Pessoa');
const Titulo = require('./Titulo');

class PF extends Pessoa{
   
    #cpf;
    setCPF(cpf){
      if(cpf){
        this.#cpf = cpf;
        return true;
      }else{
        return false;
      }
    }
    getCPF(){
      return this.#cpf;
    }

    setEmail(email) {
    /* operador de comparacão
        == : igualdade frouxa
        === : igauldade estrita
        != : diferença frouxa
        !== : diferenca estrita
    */
    if(email !== ''){
      if(email.includes('@')) {
        super.setEmail(email);
        return true;
      }
    }else{
      return false;
    }
  }

    // Relacionamento 1 - 1 com a classe Titulo
    #titulo;
    setTitulo(titulo){
       if(titulo instanceof Titulo){
         this.#titulo = titulo;
         titulo.setPF(this); // referencia cruzada
         return true;
       }else{
         return false;
       }
    }
    getTitulo(){
      return this.#titulo;
    }
}
module.exports = PF;

