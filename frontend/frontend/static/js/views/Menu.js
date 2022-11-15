import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Menu Principal");
    }

    async getHtml() {
        return `
            <h1 class="titulo">Bem vindo a locadora!</h1>
            <p class="texto"> Utilize os menus para navegar</p>
        `;
    }
}