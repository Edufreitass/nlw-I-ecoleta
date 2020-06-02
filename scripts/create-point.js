
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    // Faz a busca de todos os estados
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")

    // Uma forma de fazer uma arrow function
    // .then( (res) => { return res.json })

    // Outra forma de fazer uma arrow function
    // Função anônima que esta retornando um valor
    .then( res => res.json() ) // retorna a resposta e transforma essa res em JSON
    // Função que recebe todos os estados e contem um laço para inserir todos eles no html
    .then( states => {

        // Estrutura de repetição para percorrer todos os estados
        for(const state of states ) {
            ufSelect.innerHTML += `<option value = "${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs();

function getCities(event){
    const citySelect = document.querySelector("[name=city]") // ("select[name=city]")
    const stateInput = document.querySelector("[name=state]") // ("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() ) 
    .then( cities => {

        for(const city of cities ) {
            citySelect.innerHTML += `<option value = "${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false

    } )
}

document
    .querySelector("select[name=uf]")
    /* getCities, não é preciso colocar os parenteses, pois se abrir e fechar os ()
       voce estará dizendo ao JS para executar ela imediamente e não é o nosso caso!
       Estamos passando getCities por REFERENCIA, por que? 
       Porque quando mudar(change) que ela irá ser executada!
    */
    .addEventListener("change", getCities)

/*
// Dentro do documento
document
    // Se faz uma procura pelo seletor que contem um nome, que seria UF
    .querySelector("select[name=uf]")
    // Ficará escutando algum evento do js
    // Função anônima, exemplos:
        // 1ª forma, uma função simples, 
                // function(){}
        // 2ª forma, uma arrow function, por causa da "=>", 
                // () => {}
    // Quando ele ouvir alguma mudança(change), imprima no console.log "mudei"
    .addEventListener("change", () => {
        console.log("mudei");
    } );
*/