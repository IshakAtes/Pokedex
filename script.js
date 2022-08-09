function init(){
    responseApi();
}


async function responseApi(){
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log(responseAsJson)
    renderPokemon(responseAsJson)
}

async function renderPokemon(responseAsJson){
    for (let i = 0; i < responseAsJson['results'].length; i++) {
        const element = responseAsJson['results'][i];
        let pokemonData = await fetch(element['url']);
        let responsePokemonData = await pokemonData.json();
        // console.log(responsePokemonData);
        let pokemonSpecies = await fetch(responsePokemonData['species']['url'])
        let responsePokemonSpecies = await pokemonSpecies.json();
        console.log(responsePokemonSpecies);
        let renderContainer = document.getElementById('renderPokemonContainer');
        renderContainer.innerHTML += `
            <div class="pokemonCave rounded allCenter">
                <div>
                    <h3>${element['name']}</h3>
                    <div>${responsePokemonSpecies['genera']['7']['genus']}</div>
                    <div>${responsePokemonSpecies['habitat']['name']}</div>
                </div>
                <img src="${responsePokemonData['sprites']['front_default']}" class="img-fluid" alt="">     
            </div>
        `;
    }
}