import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Cadastro de Filmes");
    }

    async getHtml() {
        return `
            <div>
                <h1>Cadastro de Filmes</h1>
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
                    <button class="btn btn-success"onclick="cadastrarFilme()">Cadastrar</button>
                </div>    
            </div>  

            <div class="mt-5">
                <h1>Catálogo</h1>
                <p> 
                    Esta é a sessão de filmes disponíveis para alugar!
                </p>
                
                <button class="btn btn-primary "onclick="listarFilmes()">Listar Filmes</button>
                <div id="lista-filmes"></div>
            </div>  
        `;
    }
}