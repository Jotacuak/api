class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.url = this.getAttribute('url');
        this.tableData = [];
    }

    static get observedAttributes() { return ['url']; }


    connectedCallback() {

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', event.detail.url)
        }));

        this.loadData().then( () => this.render());
    }

    attributeChangedCallback(name, oldValue, newValue){

        this.loadData().then( () => this.render());
    }

    async loadData(){
        
        try{

            let url = `http://127.0.0.1:8080${this.getAttribute('url')}`;


            let result = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                }
            });
    
            let data = await result.json();

            this.tableDatas = Object.values(data);


        }catch(error){
            console.log(error);
        }
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            .table-element{
                background-color: hsl(288, 69%, 87%);
                border: .1rem solid hsl(0, 2%, 56%);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin: 2.5rem auto;
                width: 100%;
            }
            
            .table-element-text{
                margin-left: 2rem;
            }

            .table-element-button .table-button{
                background: none;
                border: none;
            }
            
            .table-element-button .table-button svg{
                height: 2rem;
                width: 2rem;
            }
            
            .table-element-button .table-button svg path{
                fill: hsl(288, 69%, 87%);
            }
        </style>

        <div class="table"></div>

        `;
        
        this.tableDatas.forEach(tableData => {

            let parentDiv = this.shadow.querySelector(".table");
            let tableElement = document.createElement("div");
            let tableElementText = document.createElement("div");

            tableElement.setAttribute("class", "table-element");
            tableElementText.setAttribute("class", "table-element-text");

            parentDiv.appendChild(tableElement);
            tableElement.appendChild(tableElementText);

            for (let [key, value] of Object.entries(tableData)) {

                let tableText = document.createElement("h5");
                tableElementText.appendChild(tableText);
                tableText.textContent = key + ': ' + value;

            }
            
        });
    }
}

customElements.define('table-component', Table);