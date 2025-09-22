//imports 

import { localStorage } from './localStorage.mjs';
import PJ from '../PJ.js';

export default class PJDAO {
  #pj;

  constructor(pj) {
    if (pj instanceof PJ) {
      this.#pj = pj;
    }
  }

  toJSON() {
    let fones = [];
    for (let fone of this.#pj.getTelefones()) {
      fones.push({
        ddd: fone.getDdd(),
        numero: fone.getNumero(),
      });
    }
    return {
      nome: this.#pj.getNome(),
      email: this.#pj.getEmail(),
      cnpj: this.#pj.getCNPJ(),
      endereco: {
        logradouro: this.#pj.getEndereco().getLogradouro(),
        cep: this.#pj.getEndereco().getCep(),
      },
      telefone: fones,
      ie: {
        numero: this.#pj.getIE().getNumero(),
        estado: this.#pj.getIE().getEstado(),
        dataRegistro: this.#pj.getIE().getDataRegistro(),
      },
    };
  }

  saveJSON() {
    let lista = JSON.parse(localStorage.getItem("pjs")) || [];

    // Evitar duplicidade de CNPJ
    if (lista.some(pj => pj.cnpj === this.#pj.getCNPJ())) {
      throw new Error("CNPJ já cadastrado!");
    }

    lista.push(this.toJSON());
    localStorage.setItem("pjs", JSON.stringify(lista));
  }

  static listarPJ() {
    return JSON.parse(localStorage.getItem("pjs")) || [];
  }

  static recoveryJSON(cnpj) {
    let lista = JSON.parse(localStorage.getItem("pjs")) || [];
    return lista.find(pj => pj.cnpj === cnpj) || null;
  }

  static removerPJ(cnpj) {
    let lista = JSON.parse(localStorage.getItem("pjs")) || [];
    const novaLista = lista.filter(pj => pj.cnpj !== cnpj);
    localStorage.setItem("pjs", JSON.stringify(novaLista));
    return lista.length !== novaLista.length; // true se removeu
  }

  static atualizarPJ(cnpj, novosDados) {
  let lista = JSON.parse(localStorage.getItem("pjs")) || [];
  let idx = lista.findIndex(pj => pj.cnpj === cnpj);
  if (idx === -1) return false;

  lista[idx] = { ...lista[idx], ...novosDados };
  localStorage.setItem("pjs", JSON.stringify(lista));
  return true;
}
   recoveryJSON(){
   // recupera a string armazenada e transforma em JSON usando parse()
   return JSON.parse(localStorage.getItem("pj"));
  }
}
