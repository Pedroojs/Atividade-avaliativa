//imports 

import { localStorage } from './localStorage.mjs';
import PF from '../PF.js';

export default class PFDAO {
  #pf;

  constructor(pf) {
    if (pf instanceof PF) {
      this.#pf = pf;
    }
  }

  toJSON() {
    let fones = [];
    for (let fone of this.#pf.getTelefones()) {
      fones.push({
        ddd: fone.getDdd(),
        numero: fone.getNumero(),
      });
    }
    return {
      nome: this.#pf.getNome(),
      email: this.#pf.getEmail(),
      cpf: this.#pf.getCPF(),
      endereco: {
        logradouro: this.#pf.getEndereco().getLogradouro(),
        cep: this.#pf.getEndereco().getCep(),
      },
      telefone: fones,
      titulo: {
        numero: this.#pf.getTitulo().getNumero(),
        secao: this.#pf.getTitulo().getSecao(),
        dataRegistro: this.#pf.getTitulo().getDataRegistro(),
      },
    };
  }

  saveJSON() {
    let lista = JSON.parse(localStorage.getItem("pfs")) || [];

    // Evitar duplicidade de CPF
    if (lista.some(pf => pf.cpf === this.#pf.getCPF())) {
      throw new Error("CPF já cadastrado!");
    }

    lista.push(this.toJSON());
    localStorage.setItem("pfs", JSON.stringify(lista));
  }

  static listarPF() {
    return JSON.parse(localStorage.getItem("pfs")) || [];
  }

  static recoveryJSON(cpf) {
    let lista = JSON.parse(localStorage.getItem("pfs")) || [];
    return lista.find(pf => pf.cpf === cpf) || null;
  }

  static removerPF(cpf) {
    let lista = JSON.parse(localStorage.getItem("pfs")) || [];
    const novaLista = lista.filter(pf => pf.cpf !== cpf);
    localStorage.setItem("pfs", JSON.stringify(novaLista));
    return lista.length !== novaLista.length; // true se removeu
  }

  static atualizarPF(cpf, novosDados) {
  let lista = JSON.parse(localStorage.getItem("pfs")) || [];
  let idx = lista.findIndex(pf => pf.cpf === cpf);
  if (idx === -1) return false;

  // Atualiza apenas os campos informados
  lista[idx] = { ...lista[idx], ...novosDados };
  localStorage.setItem("pfs", JSON.stringify(lista));
  return true;
}
  recoveryJSON(){
   // recupera a string armazenada e transforma em JSON usando parse()
   return JSON.parse(localStorage.getItem("pf"));
  }
}

