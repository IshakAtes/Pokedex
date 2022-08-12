let pokeCounter = 20;

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
        // console.log(responsePokemonSpecies);
        let pokeId = idFormater(responsePokemonSpecies['id']);
        let renderContainer = document.getElementById('renderPokemonContainer');
        renderContainer.innerHTML += `
            <div class="pokemonCave allCenter" style="background-color: ${responsePokemonSpecies['color']['name']};">
                <div class="pokemonInfoContainer">
                    <h3>${element['name']}</h3>
                    <span class="spanStyle mb-2">${responsePokemonData['types'][0]['type']['name']}</span>
                    <span class="spanStyle mb-2">${responsePokemonSpecies['habitat']['name']}</span>
                </div>
                <div>
                    <div style="text-align: right; margin-right: 10px;">${pokeId}</div>
                    <img src="${responsePokemonData['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">     
                </div>
            </div>
        `;
    }
    if (responseAsJson['next'] == `https://pokeapi.co/api/v2/pokemon?offset=${pokeCounter}&limit=20`) {
        loadNextPokemons();
    }
}

function idFormater(responseId){
    if(responseId < 10){return ('#00' + responseId)};
    if(responseId < 100){return ('#0' + responseId)};
    if(responseId >= 100){return ('#' + responseId)};
}

async function loadNextPokemons(){
    let nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=${pokeCounter}&limit=20`;
    let response = await fetch(nextUrl);
    let responseNextPokemonJson = await response.json();
    console.log(responseNextPokemonJson);
    pokeCounter = pokeCounter + 20;
    renderPokemon(responseNextPokemonJson);
}