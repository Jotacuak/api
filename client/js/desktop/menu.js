class Menu extends HTMLElement {

    constructor(){
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.menu = this.getAttribute('menu');
        this.menuItems = [];
    }

    connectedCallback(){
        this.loadData().then( () => this.render());
    }

    attributeChangedCallback(name, oldValue, newValue){
        this.render();
    }

    async loadData(){
        
        try{

            let url = `http://127.0.0.1:8080/api/admin/menus/display/${this.menu}`;

            let result = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                }
            });
    
            let data = await result.json();

            this.menuItems = Object.values(data);

        }catch(error){
            console.log(error);
        }
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

            ul, li{
                list-style:none;
            }

            ul{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-around;
            }

            .sub-menu-parent { position: relative; }

            .sub-menu { 
                visibility: hidden;
                opacity: 0;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                transform: translateY(-2em);
                z-index: -1;
                transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
            }

            .sub-menu-parent:focus .sub-menu,
            .sub-menu-parent:focus-within .sub-menu,
            .sub-menu-parent:hover .sub-menu {
                visibility: visible;
                opacity: 1;
                z-index: 1;
                transform: translateY(10%);
                transform: translateX(-30%);
                transition-delay: 0s, 0s, 0.3s;
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
        let menuList = this.shadow.querySelector("#menu ul");

        this.menuItems.forEach(menuItem => {

            let list = document.createElement("li");
            let link = document.createElement("a");

            link.setAttribute("href", menuItem.customUrl);
            link.textContent = menuItem.name;

            list.appendChild(link);

            this.createSubMenu(menuItem, list);

            menuList.appendChild(list);

            link.addEventListener("click", (event) => {

                event.preventDefault();

                hamburger.classList.toggle("active");
                overlay.classList.toggle("active");

            })
            
        });

           
        hamburger.addEventListener("click", (event) => {

            event.preventDefault();

            hamburger.classList.toggle("active");
            overlay.classList.toggle("active");
            
        });
    };

    createSubMenu(menuItem, list) {

        let hamburger = this.shadow.getElementById("collapse-button");
        let overlay = this.shadow.getElementById("overlay");

        if(menuItem.children){
            
            list.setAttribute("class", "sub-menu-parent")

            let subList = document.createElement("ul");
            subList.setAttribute("class", "sub-menu");

            menuItem.children.forEach(child => {

                let subItem = document.createElement("li");
                let subLink = document.createElement("a");

                subList.appendChild(subItem);
                subItem.appendChild(subLink);

                subLink.setAttribute("href", child.customUrl);
                subLink.textContent = child.name;

                subLink.addEventListener("click", (event) =>{

                    event.preventDefault();

                    hamburger.classList.toggle("active");
                    overlay.classList.toggle("active");
    
                    document.dispatchEvent(new CustomEvent('newUrl', {
                        detail: {
                            url: subLink.getAttribute('href'),
                            title: subLink.textContent.toUpperCase(),
                        }
                    }));
                })

                this.createSubMenu(child,subList);

            })

            list.appendChild(subList);
        }

    }

}

customElements.define('menu-hamburguer-component', Menu);