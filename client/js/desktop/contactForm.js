export let contactForm = () => {

    let contactButton = document.getElementById('contact-button');

    if (contactButton){

        contactButton.addEventListener("click", (event) =>{

            event.preventDefault();

            let form = document.getElementById('contact-form');
            let formData = new FormData(form);
            let formDataJson = Object.fromEntries(formData.entries());
            let url = form.action;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataJson)
            })
            .then(response => {
                    
                if (!response.ok) throw response;

                return response.json();

            })
            .catch(error => {

                console.log(error);
                
            });

        })
    }
}