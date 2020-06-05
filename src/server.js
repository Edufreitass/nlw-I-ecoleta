// Variavel que guardará o express
const express = require("express");
// Variavel que irá executar o express
const server = express();

// Para IMPORTAR o arquivo do banco de dados
const db = require("./database/db");

// Configurar pasta public
server.use(express.static("public"));

// Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

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
    // render pode ser usado para enviar dados a variavel criada no html
    return res.render("index.html", { title: "Um título" });
})

// Página do create-point
server.get("/create-point", (req, res) => {

    // Para pegar os dados que estao sendo enviados no formulario.. 
    // req.query: Query Strings da nossa URL
    // console.log(req.query);

    return res.render("create-point.html");
})

// Método POST do envio de dados do formulario
server.post("/savepoint", (req, res) => {

    // req.body: O corpo do nosso formulário
    // console.log(req.body);

    // Inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items,
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err);
            return res.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso!");
        console.log(this);

        return res.render("create-point.html", { saved: true });
    }

    db.run(query, values, afterInsertData);

})

// Página do search-results
server.get("/search", (req, res) => {

    // variavel para receber o valor do "Pesquisar pontos de coleta", da pagina inicial
    const search = req.query.search;

    // Se a pesquisar for igual a vazia, nao exibe nada!
    // A logica do "total" esta no search-results.html
    if(search == ""){
        // pesquisa vazia
        return res.render("search-results.html", { total: 0});
    }

    // Pegar os dados do banco de dados
    // LIKE: a % antes ou depois, significa que ele pode retornar qualquer valor que venha antes ou depois
    // Exemplo:
    // Palavra digitada  --->  sul
    // O que pode retornar:
    // chapadao do sul
    // rio do sul
    // sulamericana
    // se fosse WHERE city = ... ele retornaria o valor exato que foi digitado
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        // Caso não haja erros, imprima...
        // console.log("Aqui estão seus registros!");
        // console.log(rows);

        const total = rows.length;

        // Mostrar a página HTML com os dados do banco de dados
        return res.render("search-results.html", { places: rows , total: total});
    })
   
})

// Para iniciar o servidor na porta 3000
server.listen(3000);