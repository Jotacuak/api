class PageTitle extends HTMLElement {

    constructor() {
        // Extrae todos los elementos del padre. En este caso HTMLElement
        super();
        // this.attachShadow llama a una función del padre que crea un ShadowDOM. En este caso llama al CSS.
        this.shadow = this.attachShadow({ mode: 'open' });
        this.title = this.getAttribute('title');
    }

    static get observedAttributes() { return ['title']; }


    // Siempre ha de estar. Arranca en cuanto el navegador rendereiza el componente.
    connectedCallback() {
        
        document.addEventListener("newUrl",( event =>{
            this.setAttribute('title', event.detail.title);
        }));

        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            h2 {   
                color: hsl(288, 69%, 87%);
                font-family: 'Ubuntu';
                font-size: 2em;
                font-weight: 600;
                margin: 0;
                margin-left: 7rem;
                text-decoration: none;
                text-align:left;
            }
        </style>

        <h2>${this.title}</h2>
        `;	
    }
}

// Al definir un elemento ha de contener un guión, no pueden utilizarse números ni carácteres especiales y han de ser minúsculas.
customElements.define('page-title-component', PageTitle);