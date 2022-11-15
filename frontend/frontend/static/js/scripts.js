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
    nascimento = document.getElementById('data-nascimento').value

    if (nascimento.length != 10) {
        return
    }

    let ano = parseInt(nascimento.substring(0, 4))

    let hoje = new Date().getFullYear()

    console.log(ano)
    console.log(hoje)
    if ( ano < 1900 || ano > hoje)
    {
        alert("Ano de nascimento inválido")
        return 
    }

    console.log(nascimento)
}

function cadastrarFilme()
// let body = 
// {
//     "NomeCompleto": nome.value,
//     "CPF": cpf.value.replace('.', '').replace('-', ''),
//     "telefone": telefone.value,
//     "dataNascimento": nascimento.value
// }
// Post(body, "clientes").then( () => {
//     nome.value = ""
//     cpf.value = ""
//     telefone.value = ""
//     nascimento.value = ""
// })
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

        let listaClientes = document.getElementById('lista-clientes')
        listaClientes.setAttribute('class', 'box p-2')

        while(listaClientes.firstChild)
        listaClientes.removeChild(listaClientes.firstChild)

        
        if (clientes.length < 1)
        {
            alert("Não há nenhum cliente na base de dados")
            return
        }

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
            deleteButton.onclick = () => {

                if (window.confirm("Tem certeza que deseja remover " + cliente.nomeCompleto + " do sistema ?")) {
                    deletarCliente(deleteButton.value)
                }


            }
            divButtons.appendChild(deleteButton)
            divButtons.appendChild(editButton)

            divCliente.appendChild(divButtons)

            listaClientes.appendChild(divCliente)
        }
    })
}

function deletarCliente(id)
{      
    fetch(url + 'clientes/' + id,
    {
        'method': 'DELETE',
        'redirect': 'follow'
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
        listarClientes()
        console.log(output)
        alert('Cliente removido')
    })
    .catch((error) =>
    {
        console.log(error)
        alert('Não foi possível remover o cliente')
    })
}

function criarAluguel()
{
    let idCliente = document.getElementById('select-clientes').value
    let idFilme = document.getElementById('select-filmes').value

    if (idCliente == -1) {
        alert("Por favor, selecione um cliente")
        return
    }

    if (idFilme == -1) {
        alert("Por favor, selecione um filme")
        return
    }

    let body =
    {
        "ClienteID": idCliente,
        "FilmeID": idFilme
    }

    Post(body, "alugueis")
}


async function getFilmeById(id)
{
    const req = await fetch(url + 'filmes/' + id)
    const res = await req.json()
    return res
}

async function getAluguelByClient(id)
{
    const req = await fetch(url + 'alugueis/cliente/' + id)
    const res = await req.json()
    return res
}

async function listarAlugueis()
{
    let selectedClient = document.getElementById('select-clientes-2').value
    
    if (selectedClient == -1)
    {
        alert("Selecione o cliente que deseja verificar")
        return
    }  
    let aluguelList = document.getElementById('lista-alugueis')
    
    while(aluguelList.firstChild)
    {
        aluguelList.removeChild(aluguelList.firstChild)
    }
    
    alugueisDoCliente = await this.getAluguelByClient(selectedClient)
    let titleAlugueis = document.getElementById('title-aluguel')

    if (alugueisDoCliente.length < 1)
    {
        titleAlugueis.innerHTML = "Usuário não possui filmes alugados"
        return
    }


    titleAlugueis.innerHTML = "Filmes alugados:"

    for(var aluguel of alugueisDoCliente)
    {
        var filme = await this.getFilmeById(aluguel.filmeID)
        let itemBox  = document.createElement('div')
        itemBox.setAttribute('class', 'border p-2')

        let labelNome = document.createElement('p')
        labelNome.innerHTML = "Nome: " + filme.nome
        itemBox.appendChild(labelNome)
        
        let labelEstado = document.createElement('p')
        labelEstado.innerHTML = "Estado: " + getEstado(aluguel.estadoDevolução)
        itemBox.appendChild(labelEstado)
        

        let divBotoes = document.createElement('div')
        divBotoes.setAttribute('class', 'd-flex flex-row-reverse')

        let botaoDevolver = document.createElement('button')
        botaoDevolver.setAttribute('class', 'btn btn-warning')
        
        botaoDevolver.innerHTML = "Devolver"
        botaoDevolver.value = aluguel.id
        botaoDevolver.onclick = () => {
            if(window.confirm("Tem certeza que deseja devolver este filme ? ")) {
                devolverFilme(botaoDevolver.value)
            }
        }

        if(aluguel.estadoDevolução == 1) {
            botaoDevolver.disabled = true
        }

        divBotoes.append(botaoDevolver)

        itemBox.append(divBotoes)

        aluguelList.appendChild(itemBox)
    }

}

function getEstado(en)
{
    console.log(en)
    switch(en)
    {
        case 0:
            return "Pendente"
        case 1:
            return "Devolvido"
        case 2:
            return "Atrasado"
        default:
            return "Indefinido"
    }
}


function devolverFilme(id)
{
    fetch(url + "alugueis/devolver/" + id,
    {
        'method': 'PUT',
        'redirect': "follow"
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
        listarAlugueis()
        console.log(output)
        alert('Filme Devolvido')
    })
    .catch((error) =>
    {
        console.log(error)
        alert('Não foi possível devolver o filme')
    })
    
    
}