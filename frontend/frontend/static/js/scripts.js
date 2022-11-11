function mask_cpf() {
    var cpf = document.getElementById('cpf')
    if (cpf.value.length == 3 || cpf.value.length == 7) {
        cpf.value += "."
    } else if (cpf.value.length == 11) {
        cpf.value += "-"
    }
}

function mask_phone() {
    var telefone = document.getElementById('telefone')
    if (telefone.value.length == 2) {
        telefone.value += " "
    } else if (telefone.value.length == 8) {
        telefone.value += "-"
    }
}

function teste() {
    console.log("EAE")
}

const userLocale =
navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;

var formatReal = (valor) => {
    return valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}


var url = 'http://localhost:3000/'

function cadastrarCliente() 
{
    nome = document.getElementById('nome-completo')
    cpf = document.getElementById('cpf')
    telefone = document.getElementById('telefone')
    nascimento = document.getElementById('data-nascimento')

    let body = 
    {
        "NomeCompleto": nome.value,
        "CPF": cpf.value.replace('.', '').replace('-', ''),
        "telefone": telefone.value,
        "dataNascimento": nascimento.value
    }
    Post(body, "clientes").then( () => {
        nome.value = ""
        cpf.value = ""
        telefone.value = ""
        nascimento.value = ""
    })



}

function cadastrarFilme()
{
    console.log(document.getElementById('classificacao').value)
    let body = 
    {
        "Nome": document.getElementById('nome').value,
        "Genero": document.getElementById('genero').value,
        "Classificacao": parseInt(document.getElementById('classificacao').value),
        "DataLancamento": document.getElementById('data-lancamento').value
    }

    Post(body, "filmes")
}

async function Post(body, type)
{
    fetch(url + type,
    {
        'method': 'POST',
        'redirect': 'follow',
        'headers':
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then((response) => 
    {
        if(response.ok)
        {
            return response.text()
        }
        else
        {
            return response.text().then((text) =>
            {
                throw new Error(text)
            })
        }
    })
    .then((output) =>
    {
        console.log(output)
        alert('Cadastro efetuado :D')
    })
    .catch((error) =>
    {
        console.log(error)
        alert("Não foi possível efetuar o cadastro")
    })
}


const getClassificacao = (c) => {
    switch(c) {
        case 6:
            return "Livre"
        case 10:
            return "10+"
        case 12:
            return "12+"
        case 14:
            return "14+"
        case 16:
            return "16+"
        case 18:
            return "18+"
        default:
            return "Não Informado"
    }
}

function listarFilmes()
{
    fetch(url + 'filmes')
    .then(response => response.json())
    .then((filmes) => 
    {
        let listaFilmes = document.getElementById('lista-filmes')

        console.log(filmes)
        while(listaFilmes.firstChild)
            listaFilmes.removeChild(listaFilmes.firstChild)

        for(let filme of filmes)
        {

            console.log(filme)
            // Div com todas informações do item filme
            let divFilme = document.createElement('div')
            divFilme.setAttribute('class', 'movie-box')


            let divNome = document.createElement('p')
            divNome.innerHTML = "Nome: " + filme.nome
            divFilme.appendChild(divNome)

            let divGenero = document.createElement('p')
            divGenero.innerHTML = "Gênero: " + filme.genero
            divFilme.appendChild(divGenero)

            let divClassificacao = document.createElement('p')
            divClassificacao.innerHTML = "Classificação: " + getClassificacao(filme.classificacao)
            divFilme.appendChild(divClassificacao)
     
            var data = new Date(filme.dataLancamento).toLocaleDateString(userLocale)
            let divDataLancamento = document.createElement('p')
            divDataLancamento.innerHTML = "Data de Lançamento: " + data
            divFilme.appendChild(divDataLancamento)

            let divPreco = document.createElement('p')
            divPreco.innerHTML = "Preço: " + formatReal(filme.preco)
            divFilme.appendChild(divPreco)

            listaFilmes.appendChild(divFilme)
        }
        
    })
}


function listarClientes()
{
    fetch(url + 'clientes')
    .then(response => response.json())
    .then((clientes) =>
    {

        console.log(clientes)
        let listaClientes = document.getElementById('lista-clientes')
        listaClientes.setAttribute('class', 'box p-2')

        while(listaClientes.firstChild)
            listaClientes.removeChild(listaClientes.firstChild)

        for(let cliente of clientes)
        {  
            
            let divCliente = document.createElement('div')
            divCliente.setAttribute('class', 'border border-dark rounded my-2 p-2 mx-2 bg-dark text-light')

            let divNome = document.createElement('p')
            divNome.setAttribute('class', 'ms-2 mt-2')
            divNome.innerHTML = "Nome: " + cliente.nomeCompleto
            divCliente.appendChild(divNome)

            let divTel = document.createElement('p')
            divTel.setAttribute('class', 'ms-2 mt-2')
            divTel.innerHTML = "Telefone: " + cliente.telefone
            divCliente.appendChild(divTel)


            let divButtons = document.createElement('div')
            divButtons.setAttribute('class', 'd-flex flex-row-reverse')

            let editButton = document.createElement('button')
            editButton.setAttribute('class', 'btn btn-outline-warning')
            editButton.innerHTML = "Editar"

            let deleteButton = document.createElement('button')
            deleteButton.setAttribute('class', 'btn btn-outline-danger ms-2')
            deleteButton.innerHTML = "Deletar"

            deleteButton.value = cliente.id

            divButtons.appendChild(deleteButton)
            divButtons.appendChild(editButton)

            divCliente.appendChild(divButtons)

            listaClientes.appendChild(divCliente)
        }
    })
}


function deletarCliente()
{
}