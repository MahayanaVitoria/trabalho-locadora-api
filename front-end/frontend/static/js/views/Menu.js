import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Menu Principal");
    }

    async getHtml() {
        return `
            <h1>Bem vindo a locadora!</h1>
            <p> 
                Para alugar filmes é necessário um cadastro! 
            </p>
        `;
    }
}