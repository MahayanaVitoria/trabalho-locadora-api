import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Alugueis");
    }

    async getHtml() {
        return `
            <div class="mb-5">
       
            </div>
            
            <div>
            
            </div>
            

        `;
    }
}