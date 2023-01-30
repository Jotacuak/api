class Message extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.text = this.getAttribute('text');
        this.type = this.getAttribute('type');
    }

    static get observedAttributes() { return ['text', 'type']; }

    connectedCallback() {
        
        document.addEventListener("message", (event =>{
            this.setAttribute('text', event.detail.text);
            this.setAttribute('type', event.detail.type);
        }));

        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){

        let notificationWrapper = this.shadow.getElementById("notification-wrapper");
        let notification = this.shadow.getElementById("notification");
        let notificationText = this.shadow.getElementById("notification-message");
        notification.classList.add("active");
        notificationWrapper.classList.add("active");

        setTimeout(() => {
            notification.classList.add("active");
        }, 500);

        setTimeout(() => {
            notificationWrapper.classList.remove("active");
            notification.classList.remove("active");
            notification.classList.remove(this.getAttribute('type'));
        }, 5000);

        if(name == "text"){       
            let p = document.createElement("p");
            notificationText.append(newValue, p);
        }

        if(name == "type"){
            notification.classList.add(newValue);
        }
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>

            #notification{
                height: 3vh;
                left: 40%;
                padding: 1rem;
                position: fixed;
                top: -100vh;
                z-index: 6001
            }

            #notification.mistake{
                background-color: red;
            }

            #notification.success{
                background-color: green;
            }

            #notification.active{
                top: 30%;
            }

            #notification-wrapper{
                background-color: hsl(288, 69%, 87%);
                height: 100%;
                left: 0;
                position: fixed;
                top: -100vh;
                transition: top 0.5s;
                width: 100%;
                z-index: 5001;
            }
            
            #notification-wrapper.active{
                top: 0vh;
            }
        
        </style>

        <div id="notification-wrapper">
            <div id="notification">
                <div id="notification-message"></div>
            </div>
        </div>

        `;        
              
    }
}

customElements.define('message-component', Message);