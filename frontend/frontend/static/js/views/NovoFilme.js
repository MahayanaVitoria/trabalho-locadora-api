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
                <input id="nome" placeholder="Nome do Filme" type="text" autocomplete="off"/>    
                <input id="genero" placeholder="Gênero" type="text"/>
                
                <select name="classificacao" id="classificacao">
                    <option value="6">Livre</option>
                    <option value="10">10+</option>
                    <option value="12">12+</option>
                    <option value="14">14+</option>
                    <option value="16">16+</option>
                    <option value="18">18+</option>
                </select>

                <input id="data-lancamento" type="date" placeholder="Data de Lançamento"/>

                <button onclick="cadastrarFilme()">Cadastrar</button>
            </div>    
        `;
    }
}