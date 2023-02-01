import { API_URL } from '../../config/config.js';

class Form extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ['url']; }

    connectedCallback() {

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', event.detail.url)
        }));

        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){

        // this.loadData().then( () => this.render());
    }

    // async loadData(){
        
    //     let form = this.shadow.getElementById('admin-form');
    //     let formData = new FormData(form);
    //     let formDataJson = Object.fromEntries(formData.entries());

    //     fetch(`${API_URL}${this.getAttribute('url')}`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formDataJson)
    //     })
    //     .then(response => {
                
    //         if (!response.ok) throw response;

    //         document.dispatchEvent(new CustomEvent('message', {
    //             detail: {
    //                 message: "Todo bien",
    //                 type: "success",
    //             }
    //         }));

    //         return response.json();

    //     })
    //     .catch(error => {

    //         document.dispatchEvent(new CustomEvent('message', {
    //             detail: {
    //                 message: error.statusText,
    //                 type: "error",
    //             }
    //         }));

    //         console.log(error);
    //     });
            
    // }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            .form-element input,textarea{
                height: 2rem;
                width: 100%;
            }
            
            .form-element textarea{
                height: 15vh;
                resize: none;
            }
            .form-element{
                margin: .5rem 0;
            }
        </style>

        <form id="admin-form" method="POST"></form>

        `;  

        let formStructure = this.setFormStructure();
        let form = this.shadow.getElementById(".admin-form");
        
        Object.keys(formStructure.inputs).forEach(formKey => { 
            
            console.log(formKey);

            let labelDiv = document.createElement("div");
            let inputDiv = document.createElement("div");            
            let formLabel = document.createElement("label");
            // let formInput = document.createElement("input");

            inputDiv.setAttribute("class", "form-element");    
            labelDiv.setAttribute("class", "form-element");
    
            form.append(labelDiv, inputDiv);
            labelDiv.append(formLabel);

            formLabel.textContent = Object.values(Object.values(formStructure.inputs[formKey]))
            
            // Object.keys(tableStructure.headers).forEach( tableKey => {

            //     for (let [key, value] of Object.entries(tableData)) {

            //         if(tableKey === key){

            //             let tableText = document.createElement("h5");
            //             tableElementText.appendChild(tableText);
            //             tableText.textContent = Object.values(tableStructure.headers[tableKey]) + ': ' + value;

            //         }                 

            //     }       
                
            // });

        });
        
    }

    setFormStructure() {

        let url = this.getAttribute('url');

        switch (url) {

            case '/api/admin/users':

                return {
                    inputs:{
                        name: {
                            label: 'Nombre',
                        },
                        email: {
                            label: 'Email',
                        },
                        password: {
                            label: 'Contraseña',
                        },
                    },
                    types:{
                        input: 'input',
                        textarea: 'textarea',
                    }
                };

        }
    }

}

customElements.define('form-component', Form);