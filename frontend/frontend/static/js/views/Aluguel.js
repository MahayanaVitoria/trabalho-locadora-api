import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Alugueis");
    }

    async getHtml() {
        return `
            <div>
                <h1>Alugueis</h1>
                <div class="mb-5 border rounded p-2">
                    <h3> Novo Aluguel </h1>
                    <div id="form-aluguel" class="form d-flex bd-highlight">
                        <select class="form-select" id="select-clientes">
                            <option value="-1">Cliente</options>                        
                        </select>
                        
                        <select class="form-select" id="select-filmes">
                            <option value="-1">Filme</options>                        
                        </select>
                        
                        <button onclick="" class="btn btn-success">Alugar</button>
                    </div>
                    
                    <div>
                    
                    </div>
                    </div>
                    
                    `;
    }

    async onRender() {
        this.getClientes()
        this.getFilmes()
    }

    getClientes() {
        fetch("http://localhost:3000/clientes")
        .then(response => response.json())
        .then((clientes) =>
        {
            let selectCliente = document.getElementById('select-clientes')

            for(let c of clientes)
            {
                let opt = document.createElement('option')
                opt.text = c.nomeCompleto
                opt.value = c.id

                selectCliente.add(opt)
            }
        })
    }

    getFilmes() {
        fetch("http://localhost:3000/filmes/disponiveis")
        .then(response => response.json())
        .then((filmes) =>
        {
            let selectFilme = document.getElementById('select-filmes')

            for(let f of filmes)
            {
                let opt = document.createElement('option')
                opt.text = f.nome
                opt.value = f.id

                selectFilme.add(opt)
            }
        })
    }


}
                    // <select class="form-select" id="select-clientes">
                    //     <option value="-1">Cliente</options>                        
                    // </select>
                    
                    // <select class="form-select" id="select-filmes">
                    //     <option value="-1">Filme</options>                        
                    // </select>