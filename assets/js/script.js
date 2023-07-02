async function registrarJuego(nombreJuego, pkPlataforma) {
    try {

        console.log({ nombreJuego, pkPlataforma },"lo que se envia al server");

        const response = await fetch('https://apyi7ymuuu2wd2wu44zb36oiwi.apigateway.us-ashburn-1.oci.customer-oci.com/api/registrarJuego', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: { nombreJuego, pkPlataforma }
        }); 

        console.log(response, "response del server");
        
    } catch (error) {
        console.log(error);
    }
}

async function onClickButton() {
    const platformSelect = document.getElementById('platformSelect');
    const gameTitleInput = document.getElementById('gameTitleInput');

    const selectedPlatform = platformSelect.value;
    const gameTitle = gameTitleInput.value;

    console.log(selectedPlatform, gameTitle);

    await registrarJuego(gameTitle, selectedPlatform);
    gameTitleInput.setAttribute('value', '');
}