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