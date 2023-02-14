import { API_URL } from '../../config/config.js';

class ModalDelete extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

        document.addEventListener("openModalDelete",( event =>{        
            this.setAttribute('id', event.detail.id);
            this.shadow.getElementById("modal-delete").classList.add('modal-active');
            this.shadow.getElementById("overlay").classList.add('active');
        }));

        this.render();
    }

    async deleteRequest(){

      let response = await fetch(`${API_URL}${this.getAttribute('url')}/${this.getAttribute('id')}`, {
          headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
          },
          method: 'DELETE', 
      })
      .then(response => {
                    
          if (!response.ok) throw response;

          return response.json();
      })
      .then(json => {

          document.dispatchEvent(new CustomEvent('updateTable'));
          document.dispatchEvent(new CustomEvent('message', {
              detail: {
                  message: json.message,
                  type: 'success'
              }
          }));
          
      })
      .catch(error =>  {

          if(error.status == '500'){
              console.log(error);
          };
      });
    };

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            .modal-delete {
                background-color: white;
                transform: translateY(-200%);
                position: fixed;
                left: 0;
                right: 0;
                margin-left: auto;
                margin-right: auto;
                top: -10%;
                transition: transform 0.5s;
                width: 40%;
            }
            .modal-delete.modal-active {
                top: 30%;
                transform: translateY(0);
            }
            .modal-delete .modal-delete-header {
                background-color: #d9d9d9;
                border-bottom: 1px solid #e9ecef;
                padding: 0.5em 1em;
                text-align: center;
            }
            .modal-delete .modal-delete-header h4 {
                font-size: 1.2em;
                margin: 0;
            }
            .modal-delete .modal-delete-footer {
                display: flex;
            }
            .modal-delete .modal-delete-footer .modal-delete-option {
                color: white;
                cursor: pointer;
                font-weight: 600;
                text-align: center;
                width: 50%;
            }
            .modal-delete .modal-delete-footer .modal-delete-option#delete-cancel {
                background-color: #02a8b1;
            }
            .modal-delete .modal-delete-footer .modal-delete-option#delete-confirm {
                background-color: #d74242;
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
                margin: 0;
                overflow: hidden;
                perspective: 3.125vmin;
            }

            .overlay::after {
                background-color: #340468;
                border-radius: 50%;
                box-shadow: 0 0 2.5vmin 2.5vmin #340468;
                content: "";
                height: 2.5vmin;
                left: 50%;
                position: absolute;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 2.5vmin;
              }
              
              
            #overlay.active {
                top: 0vh;
            }

            .polygon {
                -webkit-animation: 15s linear infinite polygon;
                animation: 15s linear infinite polygon;
                left: 50%;
                // position: absolute;
                top: 50%;
                transform-style: preserve-3d;
                transform: rotatex(90deg) rotatey(0) translatey(-25vmin);
                z-index: 5500;
              }
              
              @-webkit-keyframes polygon {
                100% {
                  transform: rotatex(90deg) rotatey(360deg) translatey(0);
                }
              }
              
              @keyframes polygon {
                100% {
                  transform: rotatex(90deg) rotatey(360deg) translatey(0);
                }
              }
              .side {
                background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/231848/fractal-fire-sky-seamless-background.jpg);
                background-size: 159.12989vmin 25%;
                filter: hue-rotate(-10deg);
                height: 100vmin;
                position: absolute;
                transform-origin: 0;
                width: calc(9.94562vmin + 1px);
              }
              .side:nth-child(1) {
                background-position: -9.94562vmin 0;
                transform: rotatey(22.5deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(2) {
                background-position: -19.89124vmin 0;
                transform: rotatey(45deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(3) {
                background-position: -29.83686vmin 0;
                transform: rotatey(67.5deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(4) {
                background-position: -39.78247vmin 0;
                transform: rotatey(90deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(5) {
                background-position: -49.72809vmin 0;
                transform: rotatey(112.5deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(6) {
                background-position: -59.67371vmin 0;
                transform: rotatey(135deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(7) {
                background-position: -69.61933vmin 0;
                transform: rotatey(157.5deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(8) {
                background-position: -79.56495vmin 0;
                transform: rotatey(180deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(9) {
                background-position: -89.51057vmin 0;
                transform: rotatey(202.5deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(10) {
                background-position: -99.45618vmin 0;
                transform: rotatey(225deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(11) {
                background-position: -109.4018vmin 0;
                transform: rotatey(247.5deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(12) {
                background-position: -119.34742vmin 0;
                transform: rotatey(270deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(13) {
                background-position: -129.29304vmin 0;
                transform: rotatey(292.5deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(14) {
                background-position: -139.23866vmin 0;
                transform: rotatey(315deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(15) {
                background-position: -149.18428vmin 0;
                transform: rotatey(337.5deg) translate3d(-50%, -50%, 25vmin);
              }
              .side:nth-child(16) {
                background-position: -159.12989vmin 0;
                transform: rotatey(360deg) translate3d(-50%, -50%, 25vmin);
              }

        </style>

        <div class="overlay" id="overlay">
            <div class="polygon">
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
                <div class="side"></div>
            </div>
            <div id="modal-delete" class="modal-delete modal">
                <div class="modal-delete-content">

                    <div class="modal-delete-header">
                        <h4>¿Quiere eliminar este registro?</h4>
                    </div>

                    <div class="modal-delete-footer">
                        <div class="modal-delete-option" id="delete-confirm">
                            <h4>Sí</h4>
                        </div>
                        <div class="modal-delete-option " id="delete-cancel">
                            <h4>No</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        `; 

        let overlay = this.shadow.getElementById('overlay');
        let modalDelete = this.shadow.getElementById('modal-delete');
        let deleteCancel = this.shadow.getElementById('delete-cancel');
        let deleteConfirm = this.shadow.getElementById('delete-confirm');

        deleteConfirm.addEventListener("click", () => {

            this.deleteRequest();
            modalDelete.classList.remove('modal-active'); 
            overlay.classList.remove('active');   

        });

        deleteCancel.addEventListener("click", () => {

            modalDelete.classList.remove('modal-active'); 
            overlay.classList.remove('active');   

        });
    }

    

}

customElements.define('modal-delete-component', ModalDelete);