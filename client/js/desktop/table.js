import { API_URL } from '../../config/config.js';

class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.tableDatas = [];
    }

    static get observedAttributes() { return ['url']; }


    connectedCallback() {

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', event.detail.url)
        }));

        document.addEventListener("removeElement",( event =>{  
            this.loadData().then( () => this.render());
        }));

        // this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){

        this.loadData().then( () => this.render());
    }

    async loadData(){
        
        try{

            let result = await fetch(`${API_URL}${this.getAttribute('url')}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                }
            });
    
            let data = await result.json();

            this.tableDatas = data.rows;    

        }catch(error){
            console.log(error);
        }
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>

            .desktop-two-columns{
                display: flex;
                justify-content: space-between;
                width: 100%;
            }

            .desktop-two-columns .main-column{
                width: 70%;
            }

            .desktop-two-columns .aside-column{
                width: 23%;
            }

            .table-element{
                background-color: hsl(288, 69%, 87%);
                border: .3rem solid hsl(156, 100%, 50%);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin: 2.5rem auto;
                width: 100%;
            }
            
            .table-element-text{
                margin-left: 1rem;
            }

            .table-element-text h5{
                color: hsl(0, 100%, 50%);
            }

            .table-element-button{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }

            .table-element-button .table-button{
                background: none;
                border: none;
                width: 100%;
            }
            
            .table-element-button .table-button svg{
                height: 3rem;
                filter: drop-shadow(1px 1px 3px #888);
                cursor: pointer;
                width: 3rem;
            }
            
            .table-element-button .table-button svg path{
                fill: hsl(62, 100%, 75%);
            }
        </style>

        <div class="table"></div>

        `;  
        
        this.tableDatas.forEach(tableData => {  
            
            let tableStructure = this.setTableStructure();
            let parentDiv = this.shadow.querySelector(".table");
            let tableElement = document.createElement("div");
            let tableElementText = document.createElement("div");
            let tableElementButtons = document.createElement("div");        
    
            tableElement.classList.add("table-element", "destkop-two-columns");
            tableElementText.classList.add("table-element-text", "main-column");
            tableElementButtons.classList.add("table-element-button", "aside-column");

            parentDiv.appendChild(tableElement);
            tableElement.appendChild(tableElementText);
            tableElement.appendChild(tableElementButtons);
            
            Object.keys(tableStructure.headers).forEach(headerKey => {

                for (let [key, value] of Object.entries(tableData)) {

                    if(headerKey === key){

                        let tableText = document.createElement("h5");
                        tableElementText.appendChild(tableText);
                        tableText.textContent = Object.values(tableStructure.headers[headerKey]) + ': ' + value;

                    }                 

                }       
                
            });

            let html = '';

            Object.keys(tableStructure.buttons).forEach( buttonKey =>{

                if (buttonKey == "edit"){

                    html += `
                        <button class="table-button" type="submit" data-type="edit" data-id="${tableData.id}">
                            <svg viewBox="0 0 24 24">
                                <path d="M21,10.12H14.22L16.96,7.3C14.23,4.6 9.81,4.5 7.08,7.2C4.35,9.91 4.35,14.28 7.08,17C9.81,19.7 14.23,19.7 16.96,17C18.32,15.65 19,14.08 19,12.1H21C21,14.08 20.12,16.65 18.36,18.39C14.85,21.87 9.15,21.87 5.64,18.39C2.14,14.92 2.11,9.28 5.62,5.81C9.13,2.34 14.76,2.34 18.27,5.81L21,3V10.12M12.5,8V12.25L16,14.33L15.28,15.54L11,13V8H12.5Z"/>
                            </svg>
                        </button>                    
                    `;

                    tableElementButtons.innerHTML = html;

                }else{

                    html += `
                        <button class="table-button" type="submit" data-type="remove" data-url="${API_URL}${this.getAttribute('url')}/${tableData.id}">
                            <svg viewBox="0 0 24 24">
                                <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"/>
                            </svg>
                        </button>                    
                    `;

                    tableElementButtons.innerHTML = html;

                }

            })
        });

        this.tableButtonsFunction();
        
    }

    setTableStructure() {

        let url = this.getAttribute('url');

        switch (url) {

            case '/api/admin/users':

                return {
                    headers:{
                        name: {
                            label: 'Nombre',
                        },
                        email: {
                            label: 'Email',
                        },
                    },
                    buttons: {
                        edit: true,
                        remove: true
                    }
                };

            case '/api/admin/taxes':

                return {
                    headers:{
                        type: {
                            label: 'tipo',
                        },
                        valid: {
                            label: 'valido',
                        }
                    },
                    buttons: {
                        edit: true,
                        remove: true
                    }
                };
        }
    }

    tableButtonsFunction(){

        let tableButtons = this.shadow.querySelectorAll(".table-button");

        if (tableButtons) {

            tableButtons.forEach(button => {

                button.addEventListener("click", (event) => {

                    event.preventDefault();

                    switch (button.dataset.type) {

                        case 'edit':

                            document.dispatchEvent(new CustomEvent('loadForm', {
                                detail: {
                                    id: button.dataset.id,
                                }
                            }));
           
                        break
                        case 'remove':

                            document.dispatchEvent(new CustomEvent('openModalDelete', {
                                detail: {
                                    url: button.dataset.url,
                                }
                            }));

                            // document.dispatchEvent(new CustomEvent('startOverlay'));
     
                        break
                    }
                })
            });
        }    
    }

    renderTable(){        
        document.addEventListener("removeElement",( event =>{        
            this.render();
        }));
    }
}

customElements.define('table-component', Table);