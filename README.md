# 📝 Sistema de Cadastro de Pessoas - JavaScript

Este projeto foi desenvolvido como parte do curso de **JavaScript** do **Instituto Hardware**, com o objetivo de demonstrar habilidades em **programação orientada a objetos**, **validações complexas**, **persistência de dados em JSON** e **interação com o usuário via terminal**.  

Ele serve como **portfólio prático**, mostrando competências adquiridas no curso.

---

## 🗂️ Estrutura do Projeto

A organização dos arquivos e diretórios segue a estrutura abaixo, separando as classes de modelo, os DAOs (Data Access Objects) e o arquivo principal de execução.

```
/
├── ATIVIDADE/
│   ├── Escola/
│       └── Aluno.js
│       └── AlunoBase.js
│   ├── Pessoas/
│       ├── DAOs/
│           └── localStorage.mjs
│           └── PFDAO.mjs
│           └── PJDAO.mjs
|        ├── Endereco - mjs/
|            └── Endereco.mjs
|            └── usaEndereco.mjs
|        ├── IE/
|            └── IE.mjs
|            └── IEclss.js
|            └── IEfunc.js
|            └── IEjson.js
|            └── usaIE.mjs
|        └── Endereco.js
|        └── Pessoa.js
|        └── PF.js
|        └── PJ.js
|        └── Telefone.js
|        └── Titulo.js
|   ├── Testes/
│       └── usaAluno.js
|        └── usaAlunobase.js
|        └── usaDAO.mjs
|        └── usaPessoas.js
|        └── usaPF.js
|        └── usaPFDAO.mjs
|        └── usaPJDAO.mjs
|
├── JSKILLS/
|    └── Aluno.js
|    └── arrays.js
|    └── declvar.js
|    └── definimodulo.js
|    └── funcbasic.js
|    └── lacos.js
|    └── lacosarray.js
|    └── manipulaArray.js
|    └── tipovar.js
|    └── usamodulo.js
├── node_modules/
|    └── readline-sync/
|    └── .package-lock.json
├── .gitgnore
├── package-lock.json
├── package.json
├── readme.md

```
### 📝 Descrição dos Componentes Principais

-   `Testes/`: É o **ponto de entrada** da aplicação. Esta pasta é responsável por guardar os DAOs, arquivos responsáveis por iniciar o programa, exibir o menu interativo e coordenar as chamadas para as outras partes do sistema.

-   `pessoas/`: Diretório principal que agrupa todos os módulos e classes relacionados às entidades principais do sistema.
    -   `PF.js`, `PJ.js`, `Endereco.js`, etc.: São as **classes de modelo** (ou *models*). Cada arquivo define a estrutura e os atributos de uma entidade específica (Pessoa Física, Pessoa Jurídica, Endereço).
    
-   `JSKILLS/`: Diretório que contém os **conhecimentos específicos** obtidos durante o curso. A função desses arquivos é abstrair todo o javaScript básico necessário para a continuidade do curso.
## 🛠 Como Usar?

O projeto utiliza classes DAO - encontradas em `./BFD_JS_OO-MAIN/ATIVIDADE/Testes` - para gerenciar os dados de Pessoas Físicas e Jurídicas. Abaixo está uma explicação de cada uma:

### `usaPFDAO`
- Responsável por gerenciar dados de **Pessoas Físicas (PF)**.  
- Permite:  
  - Salvar um PF em arquivo JSON.  
  - Atualizar dados existentes.  
  - Remover PF pelo CPF.  
  - Recuperar PF pelo CPF.  
- Exemplo de uso no node:  
` node ./ATIVIDADE/Testes/usaPFDAO.mjs `

### `usaPJDAO`
- Responsável por gerenciar dados de **Pessoas Jurídicas (PJ)**.  
- Permite:  
  - Salvar um PJ em arquivo JSON.  
  - Atualizar dados existentes.  
  - Remover PJ pelo CNPJ.  
  - Recuperar PJ pelo CNPJ.  
- Exemplo de uso no node:  
` node ./ATIVIDADE/Testes/usaPJDAO.mjs `

### `usaAlunoDAO`
- Responsável por gerenciar dados de **Pessoas Físicas (PF)**.  
- Permite:  
  - Salvar um PF em arquivo JSON.  
  - Atualizar dados existentes.  
  - Remover PF pelo CPF.  
  - Recuperar PF pelo CPF.  
- Exemplo de uso no node:  
` node ./ATIVIDADE/Testes/usaPFDAO.mjs `

### `usaDAO`
- Classe **genérica** que abstrai operações comuns de CRUD (Create, Read, Update, Delete).
- Serve como base para usaPFDAO e usaPJDAO, evitando repetição de código.
- Exemplo de uso no node:  
` node ./ATIVIDADE/Testes/usaDAO.mjs `

## 🚀 Instruções para rodar o projeto:
Siga estas instruções para obter uma cópia do projeto em funcionamento na sua máquina local.
- Instale o NodeJs e o npm na sua maquina
- Clone o repositório
- no terminal, digite `chcp 65001` para ativar os caracteres especiais
- por fim, rode um dos arquivos da pasta `Testes/`

## ⚙️ Tecnologias Utilizadas:

- JavaScript (ES6+)
- Node.js
- readline-sync (para menu interativo no terminal)
- JSON (para persistência de dados)

## 📚 Aprendizados e Habilidades Demonstradas:

- Programação Orientada a Objetos (classes, herança e métodos).
- Validação de dados complexos: CPF, CNPJ, telefone, CEP e e-mail.
- Persistência de dados usando **JSON**.
- Manipulação de arrays e objetos em JavaScript.
- Interação com o usuário via **terminal (Node.js + readline-sync)**.
Estruturação de projeto modular e organizado para fácil manutenção.
---
<p align="center">
  Feito por Pedro Henrique 👤
</p>
