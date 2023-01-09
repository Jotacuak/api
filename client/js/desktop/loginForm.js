export let loginForm = () => {

    let submitButton = document.getElementById('submit-button');
    let form = document.getElementById('admin-faqs-form');

    if(submitButton) {

        submitButton.addEventListener('click', (event) => {

            event.preventDefault();

            let form = document.getElementById('admin-login-form');
            let formData = new FormData(form);
            let formDataJson = Object.fromEntries(formData.entries());
            let url = form.action;
           
            fetch(url, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataJson)
    
            }).then(response => {
    
                if (!response.ok) throw response.json();
    
                return response.json();
    
            }).then(data => {
    
                sessionStorage.setItem('accessToken', data.accessToken);
    
            }).catch(error => {
    
                error.then(errorMessage => {
                    console.log(errorMessage.message);
                });
            });
    
        });
    };
};