//imports 

import { localStorage } from './localStorage.mjs';
import Aluno from '../../Escola/Aluno.js';

export default class AlunoDAO {
  #aluno;

  constructor(aluno) {
    if (aluno instanceof Aluno) {
      this.#aluno = aluno;
    }
  }

  toJSON() {
    let fones = [];
    for (let fone of this.#aluno.getTelefones()) {
      fones.push({
        ddd: fone.getDdd(),
        numero: fone.getNumero(),
      });
    }
    return {
      nome: this.#aluno.getNome(),
      email: this.#aluno.getEmail(),
      cpf: this.#aluno.getCPF(),
      matricula: this.#aluno.getMatricula(),
      curso: this.#aluno.getCurso(),
      escola: this.#aluno.escola,
      endereco: {
        logradouro: this.#aluno.getEndereco().getLogradouro(),
        cep: this.#aluno.getEndereco().getCep(),
      },
      telefone: fones,
      titulo: {
        numero: this.#aluno.getTitulo().getNumero(),
        secao: this.#aluno.getTitulo().getSecao(),
        dataRegistro: this.#aluno.getTitulo().getDataRegistro(),
      },
    };
  }

  saveJSON() {
    let lista = JSON.parse(localStorage.getItem("alunos")) || [];

    // Evitar duplicidade de CPF
    if (lista.some(aluno => aluno.cpf === this.#aluno.getCPF())) {
      throw new Error("CPF já cadastrado!");
    }

    // Evitar duplicidade de matrícula
    if (lista.some(aluno => aluno.matricula === this.#aluno.getMatricula())) {
      throw new Error("Matrícula já cadastrada!");
    }

    lista.push(this.toJSON());
    localStorage.setItem("alunos", JSON.stringify(lista));
  }

  static listarAlunos() {
    return JSON.parse(localStorage.getItem("alunos")) || [];
  }

  static recoveryJSON(cpf) {
    let lista = JSON.parse(localStorage.getItem("alunos")) || [];
    return lista.find(aluno => aluno.cpf === cpf) || null;
  }

  static recoveryByMatricula(matricula) {
    let lista = JSON.parse(localStorage.getItem("alunos")) || [];
    return lista.find(aluno => aluno.matricula === matricula) || null;
  }

  static removerAluno(cpf) {
    let lista = JSON.parse(localStorage.getItem("alunos")) || [];
    const novaLista = lista.filter(aluno => aluno.cpf !== cpf);
    localStorage.setItem("alunos", JSON.stringify(novaLista));
    return lista.length !== novaLista.length; // true se removeu
  }

  static removerAlunoPorMatricula(matricula) {
    let lista = JSON.parse(localStorage.getItem("alunos")) || [];
    const novaLista = lista.filter(aluno => aluno.matricula !== matricula);
    localStorage.setItem("alunos", JSON.stringify(novaLista));
    return lista.length !== novaLista.length; // true se removeu
  }

  static atualizarAluno(cpf, novosDados) {
    let lista = JSON.parse(localStorage.getItem("alunos")) || [];
    let idx = lista.findIndex(aluno => aluno.cpf === cpf);
    if (idx === -1) return false;

    // Atualiza apenas os campos informados
    lista[idx] = { ...lista[idx], ...novosDados };
    localStorage.setItem("alunos", JSON.stringify(lista));
    return true;
  }

  static atualizarAlunoPorMatricula(matricula, novosDados) {
    let lista = JSON.parse(localStorage.getItem("alunos")) || [];
    let idx = lista.findIndex(aluno => aluno.matricula === matricula);
    if (idx === -1) return false;

    // Atualiza apenas os campos informados
    lista[idx] = { ...lista[idx], ...novosDados };
    localStorage.setItem("alunos", JSON.stringify(lista));
    return true;
  }

  recoveryJSON(){
   // recupera a string armazenada e transforma em JSON usando parse()
   return JSON.parse(localStorage.getItem("aluno"));
  }
}