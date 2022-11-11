import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Cadastro de Clientes");
    }

    async getHtml() {
        return `
            <div class="mb-5">
                <h1 >Cadastro de Clientes</h1>
                <div class="form">
                    <input id="nome-completo" placeholder="Nome Completo" type="text" />    
                    <input id="cpf" placeholder="CPF" type="text" autocomplete="off" maxlength="14" onkeypress="mask_cpf()"/>
                    <input id="telefone" placeholder="Telefone" type="text" autocomplete="off" maxlength="13" onkeypress="mask_phone()"/>    
                    <input id="data-nascimento" placeholder="Data de Nascimento" type="date"/>  
                    <button onclick="cadastrarCliente()" class="btn btn-success">Cadastrar</button>
                </div> 
            </div>
            
            <div>
                <h1>Lista de Clientes</h1>
                <button onclick="listarClientes()" class="btn btn-primary">Listar Clientes </button>
                <div class="my-5" id="lista-clientes"></div>                
            
            </div>
            

        `;
    }
}