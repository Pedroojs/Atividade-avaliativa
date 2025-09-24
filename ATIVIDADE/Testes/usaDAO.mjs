//imports 

import PJ from '../Pessoas/PJ.js';
import PJDAO from '../Pessoas/DAOs/PJDAO.mjs';
import PF from '../Pessoas/PF.js';
import PFDAO from '../Pessoas/DAOs/PFDAO.mjs';
import Endereco from '../Pessoas/Endereco.js';
import Telefone from '../Pessoas/Telefone.js';
import IE from '../Pessoas/IE/IEclss.js';
import reader from 'readline-sync';
import Titulo from '../Pessoas/Titulo.js';

//Funções de Validação 
function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validarCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (!/^\d{11}$/.test(cpf)) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  for (let t = 9; t < 11; t++) {
    let sum = 0;
    for (let i = 0; i < t; i++) {
      sum += parseInt(cpf.charAt(i)) * (t + 1 - i);
    }
    let rev = (sum * 10) % 11;
    if (rev === 10) rev = 0;
    if (rev !== parseInt(cpf.charAt(t))) return false;
  }
  return true;
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');
  if (!/^\d{14}$/.test(cnpj)) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  const calc = (cnpjStr, tamanho) => {
    const numeros = cnpjStr.substring(0, tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i > 0; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11;
    return resultado < 2 ? 0 : 11 - resultado;
  };

  const dig1 = calc(cnpj, 12);
  if (dig1 !== parseInt(cnpj.charAt(12))) return false;
  const dig2 = calc(cnpj, 13);
  if (dig2 !== parseInt(cnpj.charAt(13))) return false;
  return true;
}

function validarTelefone(ddd, numero) {
  return /^\d{2}$/.test(ddd) && /^\d{8,9}$/.test(numero);
}

function validarCEP(cep) {
  return /^\d{8}$/.test(cep);
}

// Helpers de exibição
function imprimirPF(pf) {
  console.log('---------------------------');
  console.log(`Nome: ${pf.nome}`);
  console.log(`Email: ${pf.email}`);
  console.log(`CPF: ${pf.cpf}`);
  if (pf.endereco) {
    console.log(`Endereço: ${pf.endereco.logradouro} - CEP: ${pf.endereco.cep}`);
  }
  if (Array.isArray(pf.telefone) && pf.telefone.length) {
    console.log('Telefones:');
    pf.telefone.forEach((t, idx) =>
      console.log(`  ${idx + 1}) (${t.ddd}) ${t.numero}`)
    );
  }
  if (pf.titulo) {
    console.log(`Título: nº ${pf.titulo.numero}, Seção: ${pf.titulo.secao}, DataRegistro: ${pf.titulo.dataRegistro}`);
  }
  console.log('---------------------------');
}

function imprimirPJ(pj) {
  console.log('---------------------------');
  console.log(`Nome: ${pj.nome}`);
  console.log(`Email: ${pj.email}`);
  console.log(`CNPJ: ${pj.cnpj}`);
  if (pj.endereco) {
    console.log(`Endereço: ${pj.endereco.logradouro} - CEP: ${pj.endereco.cep}`);
  }
  if (Array.isArray(pj.telefone) && pj.telefone.length) {
    console.log('Telefones:');
    pj.telefone.forEach((t, idx) =>
      console.log(`  ${idx + 1}) (${t.ddd}) ${t.numero}`)
    );
  }
  if (pj.ie) {
    console.log(`IE: nº ${pj.ie.numero}, Estado: ${pj.ie.estado}, DataRegistro: ${pj.ie.dataRegistro}`);
  }
  console.log('---------------------------');
}

// Menu 
do {
  console.log('\n=== MENU ===');
  console.log('1 - Cadastrar Pessoa Física');
  console.log('2 - Cadastrar Pessoa Jurídica');
  console.log('3 - Mostrar dados cadastrados (CPF/CNPJ)');
  console.log('4 - Listar todas as Pessoas Físicas');
  console.log('5 - Listar todas as Pessoas Jurídicas');
  console.log('6 - Remover Pessoa Física (CPF)');
  console.log('7 - Remover Pessoa Jurídica (CNPJ)');
  console.log('8 - Atualizar Pessoa Física (CPF)');
  console.log('9 - Atualizar Pessoa Jurídica (CNPJ)');
  console.log('0 - Sair');
  const tipo = reader.question('Digite o número correspondente: ');

  try {
    switch (tipo) {
      case '1': { // Pessoa Física
        const pf = new PF();
        const nome = reader.question('Nome: ').trim();
        if (!nome) throw new Error('Nome inválido!');
        pf.setNome(nome);

        const email = reader.question('Email: ').trim();
        if (!validarEmail(email)) throw new Error('Email inválido!');
        pf.setEmail(email);

        const cpf = reader.question('CPF: ').replace(/\D/g, '');
        if (!validarCPF(cpf)) throw new Error('CPF inválido!');
        pf.setCPF(cpf);

        const endPF = new Endereco();
        endPF.setLogradouro(reader.question('Logradouro: ').trim());
        const cep = reader.question('CEP: ').replace(/\D/g, '');
        if (!validarCEP(cep)) throw new Error('CEP inválido!');
        endPF.setCep(cep);
        pf.setEndereco(endPF);

        const fonePF = new Telefone();
        const ddd = reader.question('DDD: ').replace(/\D/g, '');
        const numero = reader.question('Número de telefone: ').replace(/\D/g, '');
        if (!validarTelefone(ddd, numero)) throw new Error('Telefone inválido!');
        fonePF.setDdd(ddd);
        fonePF.setNumero(numero);
        pf.addTelefone(fonePF);

        const titulo = new Titulo();
        titulo.setNumero(reader.question('Número do título de eleitor: ').trim());
        titulo.setSecao(reader.question('Seção do título de eleitor: ').trim());
        titulo.setDataRegistro(new Date());
        pf.setTitulo(titulo);

        const pfdao = new PFDAO(pf);
        pfdao.saveJSON();
        console.log('✅ Pessoa Física cadastrada com sucesso!');
        break;
      }

      case '2': { // Pessoa Jurídica
        const pj = new PJ();
        const nome = reader.question('Nome: ').trim();
        if (!nome) throw new Error('Nome inválido!');
        pj.setNome(nome);

        const email = reader.question('Email: ').trim();
        if (!validarEmail(email)) throw new Error('Email inválido!');
        pj.setEmail(email);

        const cnpj = reader.question('CNPJ: ').replace(/\D/g, '');
        if (!validarCNPJ(cnpj)) throw new Error('CNPJ inválido!');
        pj.setCNPJ(cnpj);

        const endPJ = new Endereco();
        endPJ.setLogradouro(reader.question('Logradouro: ').trim());
        const cep = reader.question('CEP: ').replace(/\D/g, '');
        if (!validarCEP(cep)) throw new Error('CEP inválido!');
        endPJ.setCep(cep);
        pj.setEndereco(endPJ);

        const fonePJ = new Telefone();
        const ddd = reader.question('DDD: ').replace(/\D/g, '');
        const numero = reader.question('Número de telefone: ').replace(/\D/g, '');
        if (!validarTelefone(ddd, numero)) throw new Error('Telefone inválido!');
        fonePJ.setDdd(ddd);
        fonePJ.setNumero(numero);
        pj.addTelefone(fonePJ);

        const ie = new IE();
        ie.setNumero(reader.question('Número da Inscrição Estadual: ').trim());
        ie.setEstado(reader.question('Estado da Inscrição Estadual: ').trim());
        ie.setDataRegistro(new Date());
        pj.setIE(ie);

        const pjdao = new PJDAO(pj);
        pjdao.saveJSON();
        console.log('✅ Pessoa Jurídica cadastrada com sucesso!');
        break;
      }

      case '3': { // Buscar por CPF ou CNPJ
        let dados = reader.question('Digite seu CPF ou CNPJ: ').replace(/\D/g, '');
        if (validarCPF(dados)) {
          const pessoa = PFDAO.recoveryJSON(dados);
          if (pessoa) imprimirPF(pessoa);
          else console.log('CPF não encontrado');
        } else if (validarCNPJ(dados)) {
          const pessoa = PJDAO.recoveryJSON(dados);
          if (pessoa) imprimirPJ(pessoa);
          else console.log('CNPJ não encontrado');
        } else {
          console.log('❌ CPF ou CNPJ inválido!');
        }
        break;
      }

      case '4': { // Listar todos os PFs
        const lista = PFDAO.listarPF();
        if (!lista || lista.length === 0) {
          console.log('Nenhuma Pessoa Física cadastrada.');
        } else {
          console.log('=== Pessoas Físicas cadastradas ===');
          lista.forEach((p, i) => {
            console.log(`${i + 1}. Nome: ${p.nome}, CPF: ${p.cpf}, Email: ${p.email}`);
          });
        }
        break;
      }

      case '5': { // Listar todos os PJs
        const lista = PJDAO.listarPJ();
        if (!lista || lista.length === 0) {
          console.log('Nenhuma Pessoa Jurídica cadastrada.');
        } else {
          console.log('=== Pessoas Jurídicas cadastradas ===');
          lista.forEach((p, i) => {
            console.log(`${i + 1}. Nome: ${p.nome}, CNPJ: ${p.cnpj}, Email: ${p.email}`);
          });
        }
        break;
      }

      case '6': { // Remover PF
        const cpf = reader.question('Digite o CPF para remover: ').replace(/\D/g, '');
        if (!validarCPF(cpf)) throw new Error('CPF inválido!');
        const removido = PFDAO.removerPF(cpf);
        console.log(removido ? '✅ Pessoa Física removida com sucesso!' : '❌ CPF não encontrado.');
        break;
      }

      case '7': { // Remover PJ
        const cnpj = reader.question('Digite o CNPJ para remover: ').replace(/\D/g, '');
        if (!validarCNPJ(cnpj)) throw new Error('CNPJ inválido!');
        const removido = PJDAO.removerPJ(cnpj);
        console.log(removido ? '✅ Pessoa Jurídica removida com sucesso!' : '❌ CNPJ não encontrado.');
        break;
      }

      case '8': { // Atualizar PF
        const cpf = reader.question('Digite o CPF para atualizar: ').replace(/\D/g, '');
        if (!validarCPF(cpf)) throw new Error('CPF inválido!');

        const pessoa = PFDAO.recoveryJSON(cpf);
        if (!pessoa) {
          console.log("❌ CPF não encontrado.");
          break;
        }

        console.log("Deixe em branco para manter o valor atual.");
        const nome = reader.question(`Nome (${pessoa.nome}): `).trim() || pessoa.nome;
        const email = reader.question(`Email (${pessoa.email}): `).trim() || pessoa.email;

        if (!validarEmail(email)) throw new Error("Email inválido!");

        const atualizado = PFDAO.atualizarPF(cpf, { nome, email });
        console.log(atualizado ? "✅ Pessoa Física atualizada com sucesso!" : "❌ Erro ao atualizar.");
        break;
      }

      case '9': { // Atualizar PJ
        const cnpj = reader.question('Digite o CNPJ para atualizar: ').replace(/\D/g, '');
        if (!validarCNPJ(cnpj)) throw new Error('CNPJ inválido!');

        const pessoa = PJDAO.recoveryJSON(cnpj);
        if (!pessoa) {
          console.log("❌ CNPJ não encontrado.");
          break;
        }

        console.log("Deixe em branco para manter o valor atual.");
        const nome = reader.question(`Nome (${pessoa.nome}): `).trim() || pessoa.nome;
        const email = reader.question(`Email (${pessoa.email}): `).trim() || pessoa.email;

        if (!validarEmail(email)) throw new Error("Email inválido!");

        const atualizado = PJDAO.atualizarPJ(cnpj, { nome, email });
        console.log(atualizado ? "✅ Pessoa Jurídica atualizada com sucesso!" : "❌ Erro ao atualizar.");
        break;
      }

      case '0':
        console.log('Saindo do programa...');
        process.exit(0);

      default:
        console.log('Opção inválida. Tente novamente.');
        break;
    }
  } catch (err) {
    console.error('❌ Erro:', err.message);
  }
} while (true);
