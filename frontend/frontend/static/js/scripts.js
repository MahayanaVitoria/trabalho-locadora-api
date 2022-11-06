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
    let body = 
    {
        "NomeCompleto": document.getElementById('nome-completo').value,
        "CPF": document.getElementById('cpf').value.replace('.', '').replace('-', ''),
        "telefone": document.getElementById('telefone').value,
        "dataNascimento": document.getElementById('data-nascimento').value
    }

    Post(body, "clientes")
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