<h1 align="center">Storybook Template para EBAC - Aplicação Backend</h1>
<p align=center><i align="center">Template de Aplicação Backend Express JS para exercício do Módulo 14 da Seção 'React: do Zero ao Pro' do curso 'Profissão: Engenheiro Front-End' da Instituição EBAC - Escola Britânica de Artes Criativas e Tecnologia</i></p>

<br>

<div align="center">

<a href="https://www.javascript.com"><img src="https://img.shields.io/badge/JavaScript-%23323330.svg?logo=javascript&logoColor=%23F7DF1E" height="22" alt="JavaScript"/></a>
<a href="https://nodejs.org/en/"><img src="https://img.shields.io/badge/node.js-6DA55F?logo=node.js&logoColor=white" height="22" alt="NodeJS"/></a>
<a href="https://expressjs.com/pt-br/"><img src="https://img.shields.io/badge/Express.js-404D59?logo=express" height="22" alt="ExpressJS"/></a>
<a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white" height="22" alt="Vercel"/></a>
<br>
<a href=""><img src="https://img.shields.io/badge/maintenance-as--is-yellow.svg" height="22" alt="Maintenance-as-is"/></a>
<a href=""><img src="https://img.shields.io/github/last-commit/dexdevlab/ebac-storybook-template-backend" height="22" alt="LastCommit"></a>
<a href=""><img src="https://img.shields.io/github/v/release/dexdevlab/ebac-storybook-template-backend" height="22" alt="Version"/></a>
<br>
<a href=""><img src="https://img.shields.io/github/repo-size/dexdevlab/ebac-storybook-template-backend" height="22" alt="RepoSize"/></a>
<a href=""><img src="https://img.shields.io/github/languages/code-size/dexdevlab/ebac-storybook-template-backend" height="22" alt="CodeSize"/></a>
<a href="https://github.com/dexdevlab/ebac-storybook-template-backend/blob/main/LICENSE"><img src="https://img.shields.io/github/license/dexdevlab/ebac-storybook-template-backend" height="22" alt="License"></a>

</div>

<hr>

## Conteúdo

O objetivo deste repositório é comportar o material necessário para servir de aplicação backend para o exercício do Módulo 14 da Seção "React: do Zero ao Pro" do curso "Profissão: Engenheiro Front-End" da Instituição EBAC - Escola Britânica de Artes Criativas e Tecnologia. Contém uma aplicação em Express.

<hr>

## Funcionamento da Aplicação

O servidor Express contido nesta aplicação foi adaptado para funcionar adequadamente dentro da implementação do Vercel, considerando as baixas demandas que essa aplicação atenderá. Evidentemente, muitas implementações aqui realizadas se mostrarão ineficientes em ambientes mais complexos. Alguns detalhes são explorados abaixo:

Arquitetura do Projeto - Para o funcionamento correto da aplicação, é necessário que o arquivo Express que inicializa o serviço esteja na pasta raiz do diretório ```/api``` e que tenha o nome ```index.js```. Caso contrário, a execução no Vercel não é garantida devido a especificações de configuração da própria plataforma.

Banco de Dados - Para a proposta deste projeto, não foi intencionada a utilização de um Banco de Dados próprio. As informações são salvas em um arquivo ```JSON```, lidas e modificadas pelas requisições da API (ver abaixo na seção "Instruções").

Caminho de Arquivo - O Vercel não permite a modificação de arquivos que estejam dentro do seu diretório de compilação, com exceção do diretório "tmp", comum em implantações Linux e instâncias de aplicação. Com isso, modificações no conteúdo do arquivo ```data.json``` são realizadas através do seguinte processo:

1 - Se o arquivo ```tmp/data.json``` não existe, ele é criado em um processo de cópia de seu arquivo original contido em ```data/data.json```;<br>
2 - Se uma tentativa de modificação no ```tmp/data.json``` é solicitada (através de ```POST```, ```PUT``` ou ```DELETE```), um novo arquivo chamado ```data2.json``` é criado atendendo as modificações;<br>
3 - O arquivo ```tmp/data.json``` é deletado do diretório;<br>
4 - O arquivo ```tmp/data2.json``` é renomeado para ```tmp/data.json```.

Considerando que os caminhos relativos dos arquivos na máquina local e no Vercel são diferentes, a aplicação detecta se o ambiente é de desenvolvimento (```process.env.NODE_ENV```) e altera o diretório de trabalho apropriadamente.

<hr>

## Instruções

### Utilizando o repositório como projeto

1 - Faça um git clone ou o download do repositório, da forma que preferir

```bash
git clone https://github.com/dexdevlab/ebac-storybook-template-backend.git
```

2 - Execute `yarn` para carregar as dependências

#### Testando a aplicação

Execute `yarn start` do terminal dentro do diretório do projeto. A aplicação irá ser executada na porta 3000 como padrão.

#### Implementando no Vercel

Você pode implementar sua própria instância deste projeto clicando neste botão:

<a href="https://vercel.com/new/clone?repository-url=https://github.com/DexDevLab/ebac-storybook-template-backend/tree/main"><img src="https://vercel.com/button" height="30" alt="Deploy with Vercel"/></a>

### Testes de API

#### Método GET

Fornece a lista de Pokémon.

```json
// http://localhost:3000/
[
  {
    "_id": 0,
    "pid": 83,
    "name": "Farfetch'd",
    "evolution": 1
  },
  {
    "_id": 1,
    "pid": 304,
    "name": "Aron",
    "evolution": 1
  },
  {
    "_id": 2,
    "pid": 158,
    "name": "Totodile",
    "evolution": 1
  },
  {
    "_id": 3,
    "pid": 1008,
    "name": "Miraidon",
    "evolution": 1
  }
]
```

#### Método POST

Adiciona um novo Pokémon à coleção.

Body (JSON):

```json
// http://localhost:3000/new-pokemon
{
  "pid": 83,
  "name": "Farfetch'd",
  "evolution": 1
}
```

#### Método PUT

Modifica um Pokémon da lista, baseado no ID contido no Banco de Dados

Query Params:

| Parâmetro | Valor | Tipo | Exemplo |
| --- | ----------- |-------|--------|
| id | ID do Pokémon contido no Banco de Dados.| Number | 2 |

Body (JSON):

Adicione no corpo os valores a serem modificados, mas não suprima nenhum dos campos.

```json
// http://localhost:3000/update-pokemon/:id
{
  "pid": 84,
  "name": "Farfetch'd",
  "evolution": 1
}
```

#### Método DELETE

Remove um Pokémon da lista, baseado no ID contido no Banco de Dados

```bash
http://localhost:3000/delete-pokemon/:id
```

Query Params:

| Parâmetro | Valor | Tipo | Exemplo |
| --- | ----------- |-------|--------|
| id | ID do Pokémon contido no Banco de Dados.| Number | 2 |

<hr>

## Notas de versão

### v1.0.3-240426

- Atualização do README

### v1.0.2-240426

- Atualização do README

### v1.0.1-240425

- Atualização do README

### v1.0.0-240425

- Atualização do README

### v0.0.12-beta-240425

- Ajuste no script do Express
- Atualização do README

### v0.0.11-beta-240425

- Ajuste no script do Express

### v0.0.10-beta-240425

- Ajuste no script do Express

### v0.0.9-beta-240425

- Ajuste no script do Express

### v0.0.8-beta-240425

- Ajuste no script do Express

### v0.0.7-beta-240425

- Ajuste no script do Express para criar uma cópia temporária do arquivo de dados a fim de ser lido e editado pelo Vercel

### v0.0.6-beta-240425

- Alteração na estrutura de pastas do projeto
- Alteração de scripts de execução do Node e Vercel
- Remoção do Handler de API (usado no Frontend)

### v0.0.5-beta-240425

- Ajuste no package.json para especificação de versão de Node para o Vercel

### v0.0.4-beta-240425

- Ajuste no arquivo de configuração do Vercel
- Ajuste no package.json para especificação de versão de Node para o Vercel

### v0.0.3-beta-240425

- Ajuste no arquivo de configuração do Vercel

### v0.0.2-beta-240425

- Remoção de bibliotecas em desuso
- Ajuste no script do Express
- Atualização do README

### v0.0.1-beta-240425

- Publicação do repositório e teste inicial de implementação

<hr>

## Autores

<a href="https://github.com/dexdevlab/ebac-storybook-template-backend/graphs/contributors">
  <img alt="contrib" src="https://contrib.rocks/image?repo=dexdevlab/ebac-storybook-template-backend" />
</a>

<hr>

## Contato

<br>

Se você gostou deste projeto, dê uma <a href="https://github.com/dexdevlab/ebac-storybook-template-backend" data-icon="octicon-star" aria-label="Star dexdevlab/ebac-storybook-template-backend on GitHub">estrela</a>. <br>
Para contato, envie um email a: <a href="mailto:dex.houshi@hotmail.com">dex.houshi@hotmail.com</a>

<hr>

## Licença

Licenciado sob a [MIT License](https://github.com/dexdevlab/ebac-storybook-template-backend/blob/main/LICENSE).
