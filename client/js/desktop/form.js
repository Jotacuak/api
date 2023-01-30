export let form = () => {

    let storeButton = document.getElementById('store-button');

    if (storeButton){

        storeButton.addEventListener("click", (event) =>{

            event.preventDefault();

            let form = document.getElementById('admin-form');
            let formData = new FormData(form);
            let formDataJson = Object.fromEntries(formData.entries());
            let url = form.action;

            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken'),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataJson)
            })
            .then(response => {
                    
                if (!response.ok) throw response;

                document.dispatchEvent(new CustomEvent('message', {
                    detail: {
                        text: "Todo bien",
                        type: "success",
                    }
                }));

                return response.json();

            })
            .catch(error => {

                document.dispatchEvent(new CustomEvent('message', {
                    detail: {
                        text: error.statusText,
                        type: "mistake",
                    }
                }));

                console.log(error);
            
            });

        })
    }
}