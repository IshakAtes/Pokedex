let pokeCounter = 20;

function init(){
    responseApi();
}


async function responseApi(){
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    console.log(responseAsJson)
    getPokemonDatas(responseAsJson)
}


async function getPokemonDatas(responseAsJson){
    for (let i = 0; i < responseAsJson['results'].length; i++) {
        const element = responseAsJson['results'][i];
        let pokemonData = await fetch(element['url']);
        let responsePokemonData = await pokemonData.json();
        // console.log(responsePokemonData);
        let pokemonSpecies = await fetch(responsePokemonData['species']['url'])
        let responsePokemonSpecies = await pokemonSpecies.json();
        // console.log(responsePokemonSpecies);
        let pokeId = idFormater(responsePokemonSpecies['id']);

        renderPokemon(responsePokemonSpecies, element, responsePokemonData, pokeId);
    }
    // if (responseAsJson['next'] == `https://pokeapi.co/api/v2/pokemon?offset=${pokeCounter}&limit=20`) {
    //     loadNextPokemons();
    // }
}


function renderPokemon(responsePokemonSpecies, element, responsePokemonData, pokeId){
    let renderContainer = document.getElementById('renderPokemonContainer');
    renderContainer.innerHTML += `
        <div onclick="renderPokemonCard('${element['name']}')" class="pokemonCave allCenter" style="background-color: ${responsePokemonSpecies['color']['name']};">
            <div class="pokemonInfoContainer">
                <h3 class="textShadow">${element['name']}</h3>
                <span class="spanStyle mb-2 textShadow">${responsePokemonData['types'][0]['type']['name']}</span>
                <span class="spanStyle mb-2 textShadow">${responsePokemonSpecies['habitat']['name']}</span>
            </div>
            <div class="pokemonImgContainer allCenter">
                <div class="textShadow" style="text-align: right; margin-right: -75px; padding-bottom: 10px; opacity: 0.9; font-size: 18px;">${pokeId}</div>
                <img class="pokemonsImg" src="${responsePokemonData['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
                <img class="pokeballImg" src="img/catching_pokemon_black_24dp.svg" alt="">     
            </div>
        </div>
    `;
}


async function renderPokemonCard(pokeName){
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    let responsePokemon = await fetch(url);
    let responsePokemonInfoAsJson = await responsePokemon.json();
    console.log(responsePokemonInfoAsJson);
    let pokemonSpecies = await fetch(responsePokemonInfoAsJson['species']['url'])
    let responsePokemonSpecies = await pokemonSpecies.json();
    let pokeId = idFormater(responsePokemonInfoAsJson['id']);
    console.log(responsePokemonSpecies)

    document.getElementById('overlay').style.display = 'unset';
    document.getElementById('renderPokemonCards').style.display = 'flex';
    let renderCard = document.getElementById('pokemonCardContainer')
    renderCard.innerHTML = '';
    renderCard.innerHTML = `
    <div id="pokeCard" class="allCenter cardStyle" style="background-color: ${responsePokemonSpecies['color']['name']};">
        <div class="containerCardHeader">
            <div class="card-header allCenter">
                <span onclick="backToMain()" class="allCenter cp textShadow">
                    <img src="img/pfeilWhite.png" alt="">
                    <span style="font-size: 30px;">Pokedex</span>
                </span>
                <span class="textShadow" style="text-align: right; font-size: 20px;">${pokeId}</span>
            </div>
            <img src="${responsePokemonInfoAsJson['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
        </div>
    </div>
    `;
}


function backToMain(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('renderPokemonCards').style.display = 'none';
}


function idFormater(responseId){
    if(responseId < 10){return ('#00' + responseId)};
    if(responseId < 100){return ('#0' + responseId)};
    if(responseId >= 100){return ('#' + responseId)};
}


// async function loadNextPokemons(){
//     let nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=${pokeCounter}&limit=20`;
//     let response = await fetch(nextUrl);
//     let responseNextPokemonJson = await response.json();
//     pokeCounter = pokeCounter + 20;
//     getPokemonDatas(responseNextPokemonJson);
// }