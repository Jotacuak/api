class Menu extends HTMLElement {

    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.menuItems = [];
    }

    connectedCallback(){
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    render() {

        this.shadow.innerHTML =
        `
        <style>
            .menu-hamburger {
                width: 25%;
            }           

            #collapse-button {
                border: 0;
                background: transparent;
                cursor: pointer;
                margin-top: 0;
                width: 100%;
            }
            #collapse-button:focus {
                outline: 0;
            }

            #collapse-button:first-child {
                margin: 0;
            }

            #collapse-button.active span:first-of-type {
                transform: rotate(45deg) translate(1rem, 1rem);
            }

            #collapse-button.active span:nth-of-type(2) {
                opacity: 0;
            }

            #collapse-button.active span:last-of-type {
                transform: rotate(-45deg) translate(1px, -1px);
            }

            #collapse-button span {
                background: hsl(288, 69%, 87%);
                border-radius: 1rem;
                display: block;
                height: 5px;
                margin: .5rem auto;
                opacity: 1;
                transition: all 0.6s cubic-bezier(0.81, -0.33, 0.345, 1.375);
                transform: none;
                width: 100%;
            }

            .overlay {
                background-color: hsl(288, 69%, 87%);
                height: 100%;
                left: 0;
                position: fixed;
                top: -100vh;
                transition: top 0.5s;
                width: 100%;
                z-index: 5001;
            }
              
            #overlay.active {
                top: 9vh;
            }

        </style>

        <div class="overlay" id="overlay">
            <div id="menu">
                <ul></ul>
            </div>
        </div>

        <div class="menu-hamburger">
            <button type="button" id="collapse-button">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div> 
        `

        let hamburger = this.shadow.getElementById("collapse-button");
        let overlay = this.shadow.getElementById("overlay");

        hamburger.addEventListener("click", (event) => {

            event.preventDefault();

            hamburger.classList.toggle("active");
            overlay.classList.toggle("active");  
        })
    }

}

customElements.define('menu-hamburguer-component', Menu);