// Variavel que guardará o express
const express = require("express");
// Variavel que irá executar o express
const server = express();

// Configurar pasta public
server.use(express.static("public"));

// Utilizando TEMPLATE ENGINE(nunjunks)
const nunjunks = require("nunjucks");
// Configuração do Template Engine
// Ele recebe alguns argumentos:
// 1° nome da pasta onde se localiza os arquivos HTML
// 2° um objeto, que recebe algumas propriedades que são:
// qual é o servidor express, noCache(significa que ele guardara
// alguns dados na memoria para ter uma resposta mais rápida)
nunjunks.configure("src/views", {
    express: server,
    noCache: true  // sem cache, nao use cache
})

// Configurar as rotas da aplicação
// Página inicial
// get - é um verbo http(protocolo, regras)
// req(require) - é uma requisição(pedido)
// res(response) - é uma resposta
server.get("/", (req, res) => {
    // render - passa o index.html pelo motor do nunjucks
    // render por ser usado para enviar dados a variavel criada no html
    res.render("index.html", { title: "Um título" });
})

// Página do create-point
server.get("/create-point", (req, res) => {
    res.render("create-point.html");
})

// Página do search-results
server.get("/search", (req, res) => {
    res.render("search-results.html");
})

// Para iniciar o servidor na porta 3000
server.listen(3000);