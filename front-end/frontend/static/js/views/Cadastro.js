import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Cadastro");
    }

    async getHtml() {
        return `
            <h1>Cadastro</h1>
            <div class="form">
                <input id="nome-completo" placeholder="Nome Completo" type="text"/>    
                <input id="cpf" placeholder="CPF" type="text" autocomplete="off" maxlength="14" onkeypress="mask_cpf()"/>
                <input id="telefone" placeholder="Telefone" type="text" autocomplete="off" maxlength="13" onkeypress="mask_phone()"/>    
                <input id="data-nascimento" placeholder="Data de Nascimento" type="date"/>  
                <button onclick="cadastrar()">Cadastrar</button>
            </div>    
        `;
    }
}