// Importar a dependência do sqlite3, utilizando o 
// metodo "verbose" que irá configurar o sqlite3 
// para exibir mais informações no terminal
const sqlite3 = require("sqlite3").verbose();

// Criar o objeto que irá fazer operações no banco de dados
// const db = {
    // propriedade: "valor"
// }

// Outra forma de criar um objeto
// Quando usamos a palavra chave "new", podemos iniciar um novo objeto
// desde que o que seja retornado, seja um constructor(uma classe)
const db = new sqlite3.Database("./src/database/database.db");

// Para EXPORTAR o objeto 'db' para ser usado em outro local, neste caso no arquivo "server.js"
module.exports = db;


// Após finalizar as configuraçoes do banco, 
// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database("./src/database/database.db");
// para criar o db é só ir no terminal e neste caso digitar "node src/database/db.js",
// note que um arquivo chamado "database.db" será criado em nosso projeto.

// Utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {

//     // Com comandos SQL eu vou:

//     // 1 Criar uma tabela 
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // 2 Inserir dados na tabela
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `
//     // const values = [
//     //     "https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//     //     "Colectoria",
//     //     "Guilherme Gemballa, Jardim América",
//     //     "N° 260",
//     //     "Santa Catarina",
//     //     "Rio do Sul",
//     //     "Resíduos Eletrônicos, Lâmpadas"
//     // ]

//     const values = [
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "N° 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err);
//         }

//         // Se nao tiver erros, imprima ...
//         console.log("Cadastrado com sucesso!");
//         // this dentro dessa função referencia a 
//         // resposta que o "db.run(query, values, afterInsertData)" esta retornando!
//         console.log(this);
//     }

//     // O terceiro argumento é um callback(resposta)
//     // db.run(query, values, afterInsertData)

//     // 3 Consultar os dados da tabela
    
//     // O terceiro argumento é um callback(resposta), que recebe dois parametros,
//     // o primeiro são os erros e o segundo sao os registros(rows, os arrays)
//     // db.all(`SELECT * FROM places`, function(err, rows) {
//     //     if(err) {
//     //         return console.log(err);
//     //     }

//     //     // Caso não haja erros, imprima...
//     //     console.log("Aqui estão seus registros!");
//     //     console.log(rows);
//     // })

//     // 4 Deletar um dado da tabela

//     // Para remover um registro da tabela passando uma condiçao,
//     // quando colocamos '?', precisamos passar uma coleção logo em seguida,
//     // para dizer qual registro que sera removido
    // db.run(`DELETE FROM places WHERE id = ?`, [5], function(err){
    //     if(err) {
    //         return console.log(err);
    //     }

    //     // Caso não haja erros, imprima...
    //     console.log("Registro deletado com sucesso!")
    // })

})