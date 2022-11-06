import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Catálogo");
    }

    async getHtml() {
        return `
            <h1>Catálogo</h1>
            <p> 
                Esta é a sessão de filmes disponíveis para alugar!
            </p>
        `;
    }
}