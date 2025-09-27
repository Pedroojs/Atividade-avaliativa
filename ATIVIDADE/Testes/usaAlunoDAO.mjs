//imports 

import Aluno from '../Escola/Aluno.js';
import AlunoDAO from '../Pessoas/DAOs/AlunoDAO.mjs';
import Endereco from '../Pessoas/Endereco.js';
import Telefone from '../Pessoas/Telefone.js';
import Titulo from '../Pessoas/Titulo.js';
import reader from 'readline-sync';

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

function validarMatricula(matricula) {
  return /^\d{8}$/.test(matricula) && matricula.startsWith('20');
}

function validarCurso(curso) {
  const cursosValidos = ['ADS', 'SI', 'Engenharia', 'Jogos'];
  return cursosValidos.includes(curso);
}

function validarTelefone(ddd, numero) {
  return /^\d{2}$/.test(ddd) && /^\d{8,9}$/.test(numero);
}

function validarCEP(cep) {
  return /^\d{8}$/.test(cep);
}

// Helpers de exibição
function imprimirAluno(aluno) {
  console.log('---------------------------');
  console.log(`Nome: ${aluno.nome}`);
  console.log(`Email: ${aluno.email}`);
  console.log(`CPF: ${aluno.cpf}`);
  console.log(`Matrícula: ${aluno.matricula}`);
  console.log(`Curso: ${aluno.curso}`);
  console.log(`Escola: ${aluno.escola || 'Não informada'}`);
  if (aluno.endereco) {
    console.log(`Endereço: ${aluno.endereco.logradouro} - CEP: ${aluno.endereco.cep}`);
  }
  if (Array.isArray(aluno.telefone) && aluno.telefone.length) {
    console.log('Telefones:');
    aluno.telefone.forEach((t, idx) =>
      console.log(`  ${idx + 1}) (${t.ddd}) ${t.numero}`)
    );
  }
  if (aluno.titulo) {
    console.log(`Título: nº ${aluno.titulo.numero}, Seção: ${aluno.titulo.secao}, DataRegistro: ${aluno.titulo.dataRegistro}`);
  }
  console.log('---------------------------');
}

// Menu 
do {
  console.log('\n=== MENU ALUNOS ===');
  console.log('1 - Cadastrar Aluno');
  console.log('2 - Buscar Aluno por CPF');
  console.log('3 - Buscar Aluno por Matrícula');
  console.log('4 - Listar todos os Alunos');
  console.log('5 - Remover Aluno por CPF');
  console.log('6 - Remover Aluno por Matrícula');
  console.log('7 - Atualizar Aluno por CPF');
  console.log('8 - Atualizar Aluno por Matrícula');
  console.log('0 - Sair');
  const opcao = reader.question('Digite o número correspondente: ');

  try {
    switch (opcao) {
      case '1': { // Cadastrar Aluno
        const aluno = new Aluno();
        
        const nome = reader.question('Nome: ').trim();
        if (!nome) throw new Error('Nome inválido!');
        aluno.setNome(nome);

        const email = reader.question('Email: ').trim();
        if (!validarEmail(email)) throw new Error('Email inválido!');
        aluno.setEmail(email);

        const cpf = reader.question('CPF: ').replace(/\D/g, '');
        if (!validarCPF(cpf)) throw new Error('CPF inválido!');
        aluno.setCPF(cpf);

        const matricula = reader.question('Matrícula (8 dígitos iniciando com 20): ').replace(/\D/g, '');
        if (!validarMatricula(matricula)) throw new Error('Matrícula inválida! Deve ter 8 dígitos e iniciar com 20.');
        if (!aluno.setMatricula(matricula)) throw new Error('Matrícula não atende aos critérios da classe Aluno!');

        console.log('Cursos disponíveis: ADS, SI, Engenharia, Jogos');
        const curso = reader.question('Curso: ').trim();
        if (!validarCurso(curso)) throw new Error('Curso inválido! Escolha entre: ADS, SI, Engenharia, Jogos');
        if (!aluno.setCurso(curso)) throw new Error('Curso não atende aos critérios da classe Aluno!');

        const escola = reader.question('Escola: ').trim();
        aluno.escola = escola;

        const endAluno = new Endereco();
        endAluno.setLogradouro(reader.question('Logradouro: ').trim());
        const cep = reader.question('CEP: ').replace(/\D/g, '');
        if (!validarCEP(cep)) throw new Error('CEP inválido!');
        endAluno.setCep(cep);
        aluno.setEndereco(endAluno);

        const foneAluno = new Telefone();
        const ddd = reader.question('DDD: ').replace(/\D/g, '');
        const numero = reader.question('Número de telefone: ').replace(/\D/g, '');
        if (!validarTelefone(ddd, numero)) throw new Error('Telefone inválido!');
        foneAluno.setDdd(ddd);
        foneAluno.setNumero(numero);
        aluno.addTelefone(foneAluno);

        const titulo = new Titulo();
        titulo.setNumero(reader.question('Número do título de eleitor: ').trim());
        titulo.setSecao(reader.question('Seção do título de eleitor: ').trim());
        titulo.setDataRegistro(new Date());
        aluno.setTitulo(titulo);

        const alunoDAO = new AlunoDAO(aluno);
        alunoDAO.saveJSON();
        console.log('✅ Aluno cadastrado com sucesso!');
        break;
      }

      case '2': { // Buscar por CPF
        const cpf = reader.question('Digite o CPF: ').replace(/\D/g, '');
        if (!validarCPF(cpf)) throw new Error('CPF inválido!');
        
        const aluno = AlunoDAO.recoveryJSON(cpf);
        if (aluno) imprimirAluno(aluno);
        else console.log('❌ CPF não encontrado');
        break;
      }

      case '3': { // Buscar por Matrícula
        const matricula = reader.question('Digite a Matrícula: ').replace(/\D/g, '');
        if (!validarMatricula(matricula)) throw new Error('Matrícula inválida!');
        
        const aluno = AlunoDAO.recoveryByMatricula(matricula);
        if (aluno) imprimirAluno(aluno);
        else console.log('❌ Matrícula não encontrada');
        break;
      }

      case '4': { // Listar todos os Alunos
        const lista = AlunoDAO.listarAlunos();
        if (!lista || lista.length === 0) {
          console.log('Nenhum aluno cadastrado.');
        } else {
          console.log('=== Alunos cadastrados ===');
          lista.forEach((a, i) => {
            console.log(`${i + 1}. Nome: ${a.nome}, CPF: ${a.cpf}, Matrícula: ${a.matricula}, Curso: ${a.curso}`);
          });
        }
        break;
      }

      case '5': { // Remover por CPF
        const cpf = reader.question('Digite o CPF para remover: ').replace(/\D/g, '');
        if (!validarCPF(cpf)) throw new Error('CPF inválido!');
        const removido = AlunoDAO.removerAluno(cpf);
        console.log(removido ? '✅ Aluno removido com sucesso!' : '❌ CPF não encontrado.');
        break;
      }

      case '6': { // Remover por Matrícula
        const matricula = reader.question('Digite a Matrícula para remover: ').replace(/\D/g, '');
        if (!validarMatricula(matricula)) throw new Error('Matrícula inválida!');
        const removido = AlunoDAO.removerAlunoPorMatricula(matricula);
        console.log(removido ? '✅ Aluno removido com sucesso!' : '❌ Matrícula não encontrada.');
        break;
      }

      case '7': { // Atualizar por CPF
        const cpf = reader.question('Digite o CPF para atualizar: ').replace(/\D/g, '');
        if (!validarCPF(cpf)) throw new Error('CPF inválido!');

        const aluno = AlunoDAO.recoveryJSON(cpf);
        if (!aluno) {
          console.log("❌ CPF não encontrado.");
          break;
        }

        console.log("Deixe em branco para manter o valor atual.");
        const nome = reader.question(`Nome (${aluno.nome}): `).trim() || aluno.nome;
        const email = reader.question(`Email (${aluno.email}): `).trim() || aluno.email;
        const escola = reader.question(`Escola (${aluno.escola || 'Não informada'}): `).trim() || aluno.escola;

        if (!validarEmail(email)) throw new Error("Email inválido!");

        const atualizado = AlunoDAO.atualizarAluno(cpf, { nome, email, escola });
        console.log(atualizado ? "✅ Aluno atualizado com sucesso!" : "❌ Erro ao atualizar.");
        break;
      }

      case '8': { // Atualizar por Matrícula
        const matricula = reader.question('Digite a Matrícula para atualizar: ').replace(/\D/g, '');
        if (!validarMatricula(matricula)) throw new Error('Matrícula inválida!');

        const aluno = AlunoDAO.recoveryByMatricula(matricula);
        if (!aluno) {
          console.log("❌ Matrícula não encontrada.");
          break;
        }

        console.log("Deixe em branco para manter o valor atual.");
        const nome = reader.question(`Nome (${aluno.nome}): `).trim() || aluno.nome;
        const email = reader.question(`Email (${aluno.email}): `).trim() || aluno.email;
        const escola = reader.question(`Escola (${aluno.escola || 'Não informada'}): `).trim() || aluno.escola;

        if (!validarEmail(email)) throw new Error("Email inválido!");

        const atualizado = AlunoDAO.atualizarAlunoPorMatricula(matricula, { nome, email, escola });
        console.log(atualizado ? "✅ Aluno atualizado com sucesso!" : "❌ Erro ao atualizar.");
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