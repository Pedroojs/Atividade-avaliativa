// Código Titulo.js 
class Titulo{
  #numero;
  #zona;
  #secao;
  #dataRegistro;

  setNumero(numero){
     if(numero){
        this.#numero = numero;
        return true;
     }else{
       return false;
     } 
  }
  getNumero(){
    return this.#numero;
  }
  setZona(zona){
    if(zona){
       this.#zona = zona;
       return true;
    }else{
      return false;
    }
  }
  getZona() {
    return this.#zona;
  }
  setSecao(secao){
    if(secao){
       this.#secao = secao;
       return true;
    }else{
      return false;
    }
  }
  getSecao(){
    return this.#secao;
  }
  
  setDataRegistro(dataregistro){
    if(dataregistro){
      this.#dataRegistro = dataregistro;
      return true;
    }else{
      return false;
    }
  } 

  getDataRegistro(){
    return this.#dataRegistro;
  }

  // Relacionamento 1 para 1 com a classe PF
  #pf;
  setPF(pf){
    if(pf){
      this.#pf = pf;
      return true;
    }else{
      return false;
    }

  }
  getPF(){
    return this.#pf;
  }
}
module.exports = Titulo;