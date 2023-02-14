import { API_URL } from '../../config/config.js';

class Form extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() { return ['url']; }

    connectedCallback() {

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', event.detail.url);
        }));

        document.addEventListener("loadForm",( event =>{
            this.setAttribute('id', event.detail.id);

            this.editRequest();
        }));

        document.addEventListener("attachImageToForm",( event =>{
            this.attachImageToForm(event.detail.image);
        }));

    }

    async attributeChangedCallback(name, oldValue, newValue){
        this.formStructure = await this.setFormStructure();        
        await this.render();
    }

    async storeRequest () {

        let form = this.shadow.getElementById('admin-form');
        let formData = new FormData(form);

        if(this.shadow.querySelectorAll('input[type="checkbox"]').length > 0){
                
            this.shadow.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {

                let checkboxValues = [];

                this.shadow.querySelectorAll(`input[name="${checkbox.name}"]:checked`).forEach(checkedCheckbox => {
                    checkboxValues.push(checkedCheckbox.value);
                });
                
                formData.append(checkbox.name, checkboxValues);
            });
        }

        let formDataJson = Object.fromEntries(formData.entries());
            let url = formDataJson.id ? `${API_URL}${this.getAttribute('url')}/${formDataJson.id}` : `${API_URL}${this.getAttribute('url')}`;
            let method = formDataJson.id ? 'PUT' : 'POST';
            delete formDataJson.id;

            if(this.images){
                formDataJson.images =  this.images;
            }
            
            let response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                },
                body: JSON.stringify(formDataJson)
            })

            if(response.status === 200){
                                
                document.dispatchEvent(new CustomEvent('message', {
                    detail: {
                        message: 'Datos guardados correctamente',
                        type: 'success'
                    }
                }));

                this.images = [];
                this.render();
                document.dispatchEvent(new CustomEvent('refreshTable'));
            }

            if(response.status === 500){

                let data = await response.json();

                if(data.errors){

                    data.errors.forEach(error => {

                        let errorContainer = document.createElement('div');
                        let errorMessage = document.createElement('span')
                        errorContainer.classList.add('error-container');
                        errorMessage.textContent = error.message;
                        errorContainer.append(errorMessage);

                        this.shadow.querySelector('.errors-container').append(errorContainer);
                        this.shadow.querySelector('.errors-container').classList.add('active');
                    });
                }

                document.dispatchEvent(new CustomEvent('message', {
                    detail: {
                        message: 'Fallo al guardar los datos',
                        type: 'error'
                    }
                }));  
            }
    };
    

    async editRequest () {
                    
        await fetch(`${API_URL}${this.getAttribute('url')}/${this.getAttribute('id')}`, {
            
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },

        })
        .then(response => {
                
            if (!response.ok) throw response;

            return response.json();

        })        
        .then(json => {

            console.log(json);

            for (const [key, value] of Object.entries(json)) {
                if(this.shadow.querySelector(`input[name="${key}"]`)){
                    this.shadow.querySelector(`input[name="${key}"]`).value = value;
                }
            }    
        })
        .catch(error => {

            document.dispatchEvent(new CustomEvent('message', {
                detail: {
                    message: error.statusText,
                    type: "error",
                }
            }));

            console.log(error);
        }); 
        
    };


    async render() {

        this.shadow.innerHTML = 
        `
        <style>

            .label-container{
                text-align:center;
            }

            .form-element input,textarea,select{
                background-color: hsl(288, 69%, 87%);
                border: .1rem solid hsl(156, 100%, 50%);
                height: 2rem;
                width: 100%;
            }
            
            .form-element textarea{
                height: 15vh;
                resize: none;
            }

            .form-element{
                color: hsl(62, 100%, 75%);
                display: flex;
                flex: 1 1 0;
                flex-direction: column;
                margin: .5rem 0;
            }

            .row{
                display: flex;
                justify-content: space-between;
                gap: 1rem;
            }

            .tabs-container{
                display: flex;
                overflow: hidden;
                border: .3rem solid  hsl(62, 100%, 75%);
                background-color: hsl(288, 69%, 87%);
                flex-direction: row;
                justify-content: space-between;
                margin-top: 2.5rem;
            }
            
            #tabs button {
                background-color: inherit;
                color: hsl(0, 100%, 50%);
                float: left;
                border: none;
                outline: none;
                cursor: pointer;
                font-family: "Comic Sans MS";
                font-size: 1rem;
                padding: 1rem;
                transition: 0.3s;     
            }
            
            #tabs button:hover {
                background-color: hsl(156, 100%, 50%);
            }
            
            #tabs button.active {
                background-color: hsl(0, 0%, 80%);
            }

            .tabs-buttons{
                display: flex;
                flex-direction: row;
            }

            .tabs-buttons button{
                background: none;
                border: none;
                width: 100%;
            }

            .tabs-buttons button svg{
                height: 2rem;
                filter: drop-shadow(1px 1px 3px #888);
                cursor: pointer;
                width: 2rem;
            }

            .tabs-buttons button svg path{
                fill: hsl(156, 100%, 50%);
            }
            
            .tabcontent {
                animation: fadeEffect 1s;
                border: 1px solid #ccc;
                border-top: none;
                display: none;
                padding: .5rem 1rem;
            }
            
            .tabcontent.active {
                display: block;
            }
            
            @keyframes fadeEffect {
                from {opacity: 0;}
                to {opacity: 1;}
            }

            .hidden{
                display: none;
            }

            .radio-container, .checkbox-container{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
            }

            .errors-container{
                background-color: hsl(0, 0%, 100%);
                display: none;
                flex-direction: column;
                gap: 1em;
                margin-top: 1em;
                padding: 1em;
            }

            .errors-container.active{
                display: flex;
            }

            .errors-container .error-container{
                width: 100%;
            }

            .errors-container .error-container span{
                color: hsl(0, 0%, 50%);
                font-family: 'Roboto' , sans-serif;
                font-size: 1em;
                font-weight: 600;
            }

        </style>

        <form id="admin-form" method="POST">
            <div id="tabs-container" class="tabs-container">
                <div id="tabs"></div>
                <div id="tabs-buttons" class="tabs-buttons">
                    <button id="clear-button" class="clear-button">
                        <svg viewBox="0 0 24 24">
                            <path d="M20.84 22.73L11.11 13H3V11H9.11L6.11 8H3V6H4.11L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M15 11H14.2L15 11.8V11M21 8V6H9.2L11.2 8H21M3 18H9V16H3V18Z" />
                        </svg>
                    </button>
                    <button id="save-button" class="save-button">
                        <svg viewBox="0 0 24 24">
                            <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div id="tab-content" class="content"></div>        
        </form>

        `;  

        let formStructure = await this.setFormStructure();
        let form = this.shadow.getElementById('admin-form');
        let tabContainer = this.shadow.getElementById("tabs");
        let formContainer = this.shadow.getElementById("tab-content");
                
        for (let tabKey in formStructure.tabs) {
            
            let tab = formStructure.tabs[tabKey];
            let tabContent = formStructure.tabsContent[tabKey];

            let tabButton = document.createElement("button")
            tabButton.classList.add("tablinks");
            tabButton.dataset.browsertab = tab.label.toLowerCase();
            tabButton.innerHTML = tab.label;             
            tabContainer.appendChild(tabButton);

            let tabEl = document.createElement("div");
            tabEl.classList.add("tabcontent");
            tabEl.dataset.content = tab.label.toLowerCase();     

            for (let rowKey in tabContent.rows) {

                let row = tabContent.rows[rowKey];
                let rowEl = document.createElement("div")
                rowEl.classList.add("row");

                for (let formElementKey in row.formElements) {

                    let formElement = row.formElements[formElementKey]
                    let formElementContainer = document.createElement("div");
                    const formElementLabel = document.createElement('div');
                    const formElementInput = document.createElement('div');
                    formElementContainer.append(formElementLabel);
                    formElementContainer.append(formElementInput);
        
                    formElementContainer.classList.add('form-element');
                    formElementLabel.classList.add('form-element-label');
                    formElementInput.classList.add('form-element-input');

        
                    if(formElement.label){

                        const label = document.createElement('label');
                        label.innerText = formElement.label;
                        label.setAttribute('for', formElementKey);
                        formElementLabel.append(label);
                    }
     
                    if (formElement.element === 'input') {
        
                        switch (formElement.type) {


                            case 'hidden': {

                                const input = document.createElement('input');
                                input.setAttribute('class', 'hidden');
                                input.type = formElement.type;
                                input.name = formElementKey;
                                input.value = formElement.value || '';

                                form.append(input);

                                continue;
                            }

                            case 'checkbox':
                            case 'radio': {
        
                                const inputContainer = document.createElement('div');
                                inputContainer.classList.add(`${formElement.type}-container`);
                
                                formElement.options.forEach(option => {
                                    const input = document.createElement('input');
                                    const inputLabel = document.createElement('label');
                                    inputLabel.innerText = option.label;
                                    input.id = formElementKey;
                                    input.type = formElement.type;
                                    input.name = formElementKey;
                                    input.value = option.value || '';
                                    input.checked = option.checked || false;
                                    input.disabled = option.disabled || false;

                                    inputContainer.append(inputLabel);
                                    inputContainer.append(input);
                                });

                                formElementInput.append(inputContainer);

                                break;
                            }

                            case 'range': {

                                const rangeContainer = document.createElement('div');
                                rangeContainer.classList.add('range-container');
                
                                const input = document.createElement('input');
                                input.id = formElementKey;
                                input.type = formElement.type;
                                input.name = formElementKeyy;
                                input.min = formElement.min || '';
                                input.max = formElement.max || '';
                                input.step = formElement.step || '';
                                input.value = formElement.value || '';
                                rangeContainer.append(input);

                                const rangeValue = document.createElement('span');
                                rangeValue.classList.add('range-value');
                                rangeValue.innerText = formElement.value;
                                rangeContainer.append(rangeValue);

                                input.addEventListener('input', () => {
                                    rangeValue.innerText = input.value;
                                });

                                formElementInput.append(rangeContainer);

                                break;
                            }

                            case 'number':
                            case 'date':
                            case 'time':
                            case 'datetime-local':
                            case 'month':
                            case 'week': {
                                const input = document.createElement('input');
                                input.id = formElementKey;
                                input.type = formElement.type;
                                input.name = formElementKey;
                                input.min = formElement.min || '';
                                input.max = formElement.max || '';
                                input.step = formElement.step || '';
                                input.placeholder = formElement.placeholder || '';
                                input.value = formElement.value || '';
                                input.readOnly = formElement.readOnly || false;
                                input.dataset.validate = formElement.validate || '';

                                formElementInput.append(input);
                            
                                break;
                            }

                            case 'file': {

                                if(!this.shadow.querySelector('image-gallery-component')){
                                    const imageGallery = document.createElement('image-gallery-component');
                                    this.shadow.append(imageGallery);
                                }

                                const input = document.createElement('upload-image-button-component');
                                input.id = formElementKey;
                                input.setAttribute("name", formElementKey);
                                input.setAttribute("languageAlias", "es");
                                input.setAttribute("quantity", formElement.quantity);

                                // input.accept = formElement.accept || '';
                                // input.multiple = formElement.multiple || false;
                                // input.required = formElement.required || false;
                                // input.dataset.validate = formElement.validate || '';

                                formElementInput.append(input);

                                break;
                            }

                            default: {
                                
                                const input = document.createElement('input');
                                input.id = formElementKey;
                                input.type = formElement.type;
                                input.name = formElementKey;
                                input.value = formElement.value || '';
                                input.placeholder = formElement.placeholder || '';
                                input.dataset.validate = formElement.validate || '';
                                  
                                if(formElement.maxLength){

                                    input.maxLength = formElement.maxLength || '';
                                    const counter = document.createElement('span');
                                    formElementLabel.append(counter);

                                    input.addEventListener('input', () => {
                                        if(input.value.length > 0){
                                            counter.textContent = input.value.length + ' / ' + input.maxLength;                            
                                        }else{
                                            counter.textContent = '';
                                        }
                                    });
                                }
            
                                formElementInput.append(input);

                                break;
                            }
                        }
                    }

                    if (formElement.element === 'textarea') {

                        const textarea = document.createElement('textarea');
                        textarea.id = formElementKey;
                        textarea.name = formElementKey;
                        textarea.disabled = formElement.disabled || false;
                        textarea.readOnly = formElement.readOnly || false;
                        textarea.value = formElement.value || '';
                        textarea.cols = formElement.cols || '';
                        textarea.rows = formElement.rows || '';
                        textarea.wrap = formElement.wrap || '';
                        textarea.placeholder = formElement.placeholder || '';
                        textarea.dataset.validate = formElement.validate || '';
                       
                        if(formElement.maxLength){

                            textarea.maxLength = formElement.maxLength || '';
                            const counter = document.createElement('span');
                            formElementLabel.append(counter);

                            textarea.addEventListener('input', () => {
                                if(textarea.value.length > 0){
                                    counter.textContent = textarea.value.length + ' / ' + textarea.maxLength;                            
                                }else{
                                    counter.textContent = '';
                                }
                            });
                        }

                        formElementInput.append(textarea);
                    }
        
                    if (formElement.element === 'select') {
        
                        const select = document.createElement('select');
                        select.id = formElementKey;
                        select.name = formElementKey;
                        select.disabled = formElement.disabled || false;
                        select.required = formElement.required || false;
                        select.multiple = formElement.multiple || false;
        
                        formElement.options.forEach(option => {
                            const optionElement = document.createElement('option');
                            optionElement.value = option.value;
                            optionElement.innerText = option.label;
                            select.append(optionElement);
                        });

                        formElementInput.append(select);

                    }

                    rowEl.appendChild(formElementContainer);
                   
                }

                tabEl.appendChild(rowEl);

            }

            formContainer.appendChild(tabEl);

        }

        this.shadow.querySelector(".tablinks").classList.add("active");
        this.shadow.querySelector(".tabcontent").classList.add("active");

        let browserTabs = this.shadow.querySelectorAll(".tablinks");
        let contents = this.shadow.querySelectorAll(".tabcontent");

        browserTabs.forEach(browserTab => {

            browserTab.addEventListener("click", (event) => {

                event.preventDefault();

                browserTabs.forEach(browserTab => {
                    browserTab.classList.remove("active");
                });

                contents.forEach(content => {
                    content.classList.remove("active");

                    if (browserTab.dataset.browsertab == content.dataset.content) {
                        browserTab.classList.add("active");
                        content.classList.add("active");
                    };
                });
            });
        });
        


        let clearButton = this.shadow.querySelector('#clear-button');
        let storeButton = this.shadow.querySelector('#save-button');

        clearButton.addEventListener("click", (event) => {

            event.preventDefault();

            this.render();
        });
                
        storeButton.addEventListener("click", (event) => {

            event.preventDefault();

            let form = this.shadow.querySelector('form');

            if(!this.validateForm(form.elements)){
                return;
            }

            this.storeRequest();
        });
        
    }

    renderCreateForm = () => {
        this.shadow.querySelector('#create-button').addEventListener('click', () => {
            this.images = [];
            this.render();
        });
    }

    validateForm = formInputs => {

        let validForm = true;
        
        let validators = {
            "required": {
                "regex": /\S/g,
                "message": "El campo es obligatorio"
            },
            "only-letters": {
                "regex": /^[a-zA-Z\s]+$/g,
                "message": "El campo sólo puede contener letras"
            },
            "only-numbers": {
                "regex": /\d/g,
                "message": "El campo sólo puede contener números"
            },
            "telephone": {
                "regex": /^\d{9}$/g,
                "message": "El campo debe contener 9 números"
            },
            "email": {
                "regex": /\w+@\w+\.\w+/g,
                "message": "El campo debe contener un email válido"
            },
            "password": {
                "regex": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
                "message": "El campo debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número"
            },
            "date": {
                "regex": /^\d{4}-\d{2}-\d{2}$/g,
                "message": "El campo debe contener una fecha válida"
            },
            "time": {
                "regex": /^\d{2}:\d{2}$/g,
                "message": "El campo debe contener una hora válida"
            },
            "datetime": {
                "regex": /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/g,
                "message": "El campo debe contener una fecha y hora válida"
            },
            "dni": {
                "regex": /^\d{8}[a-zA-Z]$/g,
                "message": "El campo debe contener un DNI válido"
            },
            "nif": {
                "regex": /^[a-zA-Z]\d{7}[a-zA-Z]$/g,
                "message": "El campo debe contener un NIF válido"
            },
            "cif": {
                "regex": /^[a-zA-Z]\d{7}[a-zA-Z0-9]$/g,
                "message": "El campo debe contener un CIF válido"
            },
            "postal-code": {
                "regex": /^\d{5}$/g,
                "message": "El campo debe contener un código postal válido"
            },
            "credit-card": {
                "regex": /^\d{16}$/g,
                "message": "El campo debe contener una tarjeta de crédito válida"
            },        
            "isbn": {
                "regex": /^(?:\d[\ |-]?){9}[\d|X]$/g,
                "message": "El campo debe contener un ISBN válido"
            },
            "iban": {
                "regex": /^[a-zA-Z]{2}\d{22}$/g,
                "message": "El campo debe contener un IBAN válido"
            },
            "url": {
                "regex": /^(http|https):\/\/\w+\.\w+/g,
                "message": "El campo debe contener una URL válida"
            },
            "ip": {
                "regex": /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g,
                "message": "El campo debe contener una IP válida"
            },
            "mac": {
                "regex": /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/g,
                "message": "El campo debe contener una MAC válida"
            },
            "image": {
                "regex": /\.(gif|jpg|jpeg|tiff|png)$/g,
                "message": "El campo debe contener una imagen válida"
            },
            "video": {
                "regex": /\.(avi|mp4|mov|wmv|flv|mkv)$/g,
                "message": "El campo debe contener un vídeo válido"
            },
            "audio": {
                "regex": /\.(mp3|wav|ogg|flac|aac)$/g,
                "message": "El campo debe contener un audio válido"
            },
            "pdf": {
                "regex": /\.(pdf)$/g,
                "message": "El campo debe contener un PDF válido"
            },
            "doc": {
                "regex": /\.(doc|docx)$/g,
                "message": "El campo debe contener un documento válido"
            },
            "xls": {
                "regex": /\.(xls|xlsx)$/g,
                "message": "El campo debe contener una hoja de cálculo válida"
            },
            "ppt": {
                "regex": /\.(ppt|pptx)$/g,
                "message": "El campo debe contener una presentación válida"
            },
            "zip": {
                "regex": /\.(zip|rar|7z|tar|gz)$/g,
                "message": "El campo debe contener un archivo comprimido válido"
            }
        }
    
        for (let i = 0; i < formInputs.length; i++) {
    
            if (formInputs[i].dataset.validate) {

                formInputs[i].dataset.validate.split(',').forEach((option) => {
                
                    if(formInputs[i].value.match(validators[option].regex) == null) {

                        if(!formInputs[i].classList.contains('invalid')){
                            formInputs[i].classList.add('invalid');
                            formInputs[i].closest('.form-element').querySelector('label').classList.add('invalid');
                            
                            let errorContainer = document.createElement('div');
                            let errorMessage = document.createElement('span');
                            errorContainer.classList.add('error-container');
                            errorMessage.textContent = `${formInputs[i].closest('.form-element').querySelector('label').textContent}: ${validators[option].message}`;
                            errorContainer.append(errorMessage);
    
                            this.shadow.querySelector('.errors-container').append(errorContainer);
                        }

                        validForm = false;

                    }else{
                        formInputs[i].classList.remove('invalid');
                        formInputs[i].closest('.form-element').querySelector('label').classList.remove('invalid');
                    }
                });
            }
        }
    
        if(!validForm){

            this.shadow.querySelector('.errors-container').classList.add('active');

            document.dispatchEvent(new CustomEvent('message', {
                detail: {
                    message: 'Los datos del formulario no son válidos',
                    type: 'error'
                }
            }));
        }
    
        return validForm;
    };

    showElement = element => {

        this.render();
        this.images = [];

        Object.entries(element).forEach(([key, value]) => {

            if(this.shadow.querySelector(`[name="${key}"]`)){

                this.shadow.querySelector(`[name="${key}"]`).value = value;

                if(this.shadow.querySelector(`[name="${key}"]`).tagName == 'SELECT'){

                    let options = this.shadow.querySelector(`[name="${key}"]`).querySelectorAll('option');

                    options.forEach(option => {
                        if(option.value == value){
                            option.setAttribute('selected', true);
                        }
                    });
                }

                if(this.shadow.querySelector(`[name="${key}"]`).type == 'radio'){

                    let radios = this.shadow.querySelector(`[name="${key}"]`).closest('.form-element').querySelectorAll('input[type="radio"]');

                    radios.forEach(radio => {
                        if(radio.value == value){
                            radio.setAttribute('checked', true);
                        }
                    });
                }  

                if(this.shadow.querySelector(`[name="${key}"]`).type == 'checkbox'){

                    let checkbox = this.shadow.querySelectorAll(`[name="${key}"]`);

                    checkbox.forEach(check => {
                        if(check.value == value){
                            check.setAttribute('checked', true);
                        }
                    });
                }
            }

            if(key == 'images'){

                document.dispatchEvent(new CustomEvent('showImages', {
                    detail: {
                        images: value
                    }
                }));
            }
        });
    };

    attachImageToForm = async attachedImage => {
        
        let index = this.images.findIndex(image => 
            image.filename === attachedImage.previousImage && 
            image.languageAlias === attachedImage.languageAlias && 
            image.name === attachedImage.name
        );

        if(index == -1){
            this.images.push(attachedImage);
        }else{
            this.images[index] = attachedImage;
        }

        console.log(this.images)
    }

    async setFormStructure () {
       
        let url = this.getAttribute('url');

        switch (url) {

            case '/api/admin/users':

                return {

                    tabs:{
                        main: {
                            label: 'Principal',
                        }
                        // images: {
                        //     label: 'Imágenes'
                        // }
                    },

                    tabsContent: {
                       
                        // images: {
                        //     rows:{
                        //         row1:{
                        //             formElements: {
                        //                 hola: {
                        //                     label: 'Nombre',
                        //                     element: 'input',
                        //                     maxLength: '10',
                        //                     type: 'text',
                        //                     placeholder: '',
                        //                     required: true,
                        //                     validate: 'only-letters'
                        //                 },
                        //             }
                        //         }
                        //     }
                        // },
                        main: {
                            rows:{
                                row1: {
                                    formElements:{
                                        name: {
                                            label: 'Nombre',
                                            element: 'input',
                                            maxLength: '10',
                                            type: 'text',
                                            placeholder: '',
                                            required: true,
                                            validate: 'only-letters'
                                        },
                                        email: {
                                            label: 'Email',
                                            element: 'input',
                                            type: 'email',
                                            placeholder: '',
                                            required: true,
                                            validate: 'email'
                                        }
                                    }
                                },
                                row2: {
                                    formElements:{
                                        password: {
                                            label: 'Contraseña',
                                            element: 'input',
                                            type: 'password',
                                            placeholder: '',
                                            required: true
                                        },
                                        repeatPassword: {
                                            label: 'Repita la contraseña',
                                            element: 'input',
                                            type: 'password',
                                            placeholder: '',
                                            required: true
                                        }
                                    }
                                },
                                // row3: {
                                //     formElements:{
                                //         permissions: {
                                //             label: 'Permisos',
                                //             element: 'input',
                                //             type: 'checkbox',
                                //             required: true,
                                //             options: [
                                //                 {
                                //                     label: 'Crear',
                                //                     value: 'create',
                                //                     checked: true
                                //                 },
                                //                 {
                                //                     label: 'Leer',
                                //                     value: 'read'
                                //                 },
                                //                 {
                                //                     label: 'Actualizar',
                                //                     value: 'update'
                                //                 },
                                //                 {
                                //                     label: 'Eliminar',
                                //                     value: 'delete'
                                //                 }
                                //             ]
                                //         },
                                //         sex: {
                                //             label: 'Sexo',
                                //             element: 'input',
                                //             type: 'radio',
                                //             required: true,
                                //             options: [
                                //                 {
                                //                     label: 'Masculino',
                                //                     value: "M",
                                //                     checked: true
                                //                 },
                                //                 {
                                //                     label: 'Femenino',
                                //                     value: "F"
                                //                 }
                                //             ],
                                //         }
                                //     }
                                // },
                                // row4: {
                                //     formElements:{
                                //         color: {
                                //             label: 'Color',
                                //             element: 'input',
                                //             type: 'color',
                                //             placeholder: ''
                                //         },
                                //         role: {
                                //             label: 'Rol',
                                //             element: 'select',
                                //             required: true,
                                //             options: [
                                //                 {
                                //                     label: 'Administrador',
                                //                     value: 'admin'
                                //                 },
                                //                 {
                                //                     label: 'Usuario',
                                //                     value: 'user'
                                //                 }
                                //             ]
                                //         }
                                //     }
                                // },
                                // row5: {
                                //     formElements:{
                                //         edad: {
                                //             label: 'Edad',
                                //             element: 'input',
                                //             type: 'number',
                                //             placeholder: '',
                                //             required: true
                                //         },
                                //         telefono: {
                                //             label: 'Teléfono',
                                //             element: 'input',
                                //             type: 'tel',
                                //             placeholder: '',
                                //             required: true
                                //         },
                                //         url: {
                                //             label: 'URL',
                                //             element: 'input',
                                //             type: 'url',
                                //             placeholder: '',
                                //             required: true
                                //         }
                                //     }
                                // },
                                // row6: {
                                //     formElements:{
                                //         creationDate: {
                                //             label: 'Fecha de creación',
                                //             element: 'input',
                                //             type: 'date',
                                //             placeholder: '',
                                //             required: true,
                                //             validate: 'date'
                                //         },
                                //         creationTime: {
                                //             label: 'Hora de creación',
                                //             element: 'input',
                                //             type: 'time',
                                //             placeholder: '',
                                //             required: true
                                //         }
                                //     }
                                // },
                                // row7: {
                                //     formElements:{
                                //         reservationWeek: {
                                //             label: 'Semana de reserva',
                                //             element: 'input',
                                //             type: 'week',
                                //             placeholder: '',
                                //             required: true
                                //         },
                                //         reservationMonth: {
                                //             label: 'Mes de reserva',
                                //             element: 'input',
                                //             type: 'month',
                                //             placeholder: '',
                                //             required: true
                                //         },
                                //         reservationDateTime: {
                                //             label: 'Fecha y hora',
                                //             element: 'input',
                                //             type: 'datetime-local',
                                //             placeholder: '',
                                //             required: true
                                //         }
                                //     }
                                // },
                                // row8: {
                                //     formElements:{
                                //         capital: {
                                //             label: 'Capital',
                                //             element: 'input',
                                //             type: 'range',
                                //             min: 0,
                                //             max: 100,
                                //             step: 1,
                                //             value: 50,
                                //             placeholder: ''
                                //         },
                                //     }
                                   
                                // },
                                // row9: {
                                //     formElements:{
                                //         pdf: {
                                //             label: 'Pdf',
                                //             element: 'input',
                                //             type: 'file',
                                //             placeholder: '',
                                //             required: true
                                //         },
                                //         search: {
                                //             label: 'Buscar',
                                //             element: 'input',
                                //             type: 'search',
                                //             placeholder: '',
                                //             required: true
                                //         }
                                //     }
                                // },
                                // row10: {
                                //     formElements:{
                                //         description: {
                                //             label: 'Descripción',
                                //             element: 'textarea',
                                //             maxLength: 100,
                                //             placeholder: '',
                                //             required: true
                                //         }
                                //     }
                                // }
                            }
                        }
                    }
                };
        }
    }

}

customElements.define('form-component', Form);