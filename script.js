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
    let responsePokemonData = await responsePokemon.json();
    console.log(responsePokemonData);
    let pokemonSpecies = await fetch(responsePokemonData['species']['url'])
    let responsePokemonSpecies = await pokemonSpecies.json();
    let pokeId = idFormater(responsePokemonData['id']);
    console.log(responsePokemonSpecies)

    document.getElementById('overlay').style.display = 'unset';
    document.getElementById('renderPokemonCards').style.display = 'flex';
    let renderCard = document.getElementById('pokemonCardContainer')
    renderCard.innerHTML = '';
    renderCard.innerHTML = generatePokemonCardHTML(pokeId, responsePokemonData, responsePokemonSpecies)
}


function generatePokemonCardHTML(pokeId, responsePokemonData, responsePokemonSpecies){
    return `
        <div id="pokeCard" class="allCenter cardStyle" style="background-color: ${responsePokemonSpecies['color']['name']};">
            <div class="containerCardHeader">
                <div class="card-header allCenter">
                    <span onclick="backToMain()" class="allCenter cp textShadow">
                        <img src="img/pfeilWhite.png" alt="">
                        <span style="font-size: 20px;">Pokedex</span>
                    </span>
                    <span class="textShadow" style="text-align: right; font-size: 18px;">
                        ${pokeId}
                    </span>
                </div>
                
                <img src="${responsePokemonData['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
            </div>
        </div>
        <div class="allCenter">
            <h1 class="pokemonCardName">${responsePokemonSpecies['name']}</h1>
        </div>
        <div class="allCenter">
            <div class="pokeType">
                <span class="cardSpanStyle mb-2">${responsePokemonData['types'][0]['type']['name']}</span>
                <span class="cardText">${responsePokemonData['weight'] + ' lbs'}</span>
                <span style="color: rgba(241, 226, 203, 0.781);">Weight</span>
            </div>
            <div class="pokeType">
                <span class="cardSpanStyle mb-2">${responsePokemonSpecies['habitat']['name']}</span>
                <span class="cardText">${responsePokemonData['height'] + ' feet'}</span>
                <span style="color: rgba(241, 226, 203, 0.781);">Height</span>
            </div>
        </div>

        <div class="pokeType">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About</button>
                    <button onclick="baseStats(${responsePokemonData['stats']['0']['base_stat']}, ${responsePokemonData['stats']['1']['base_stat']}, ${responsePokemonData['stats']['2']['base_stat']}, ${responsePokemonData['stats']['3']['base_stat']}, ${responsePokemonData['stats']['4']['base_stat']}, ${responsePokemonData['stats']['5']['base_stat']})" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Base Stats</button>
                    <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Evolution</button>
                    <button class="nav-link" id="nav-disabled-tab" data-bs-toggle="tab" data-bs-target="#nav-disabled" type="button" role="tab" aria-controls="nav-disabled" aria-selected="false">Moves</button>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0"></div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"></div>
                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabindex="0"></div>
                <div class="tab-pane fade" id="nav-disabled" role="tabpanel" aria-labelledby="nav-disabled-tab" tabindex="0"></div>
            </div>
        </div>
    `;
}


function baseStats(hpData, atkData, defData, spAtkData, spDefData, speedData){
    document.getElementById('nav-profile').innerHTML = '';
    document.getElementById('nav-profile').innerHTML = `
        <div class="allCenter statMargin">
            <span class="white statStyle">HP</span>
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" aria-label="Success example" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${hpData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">ATK</span>
            <div class="progress">
                <div class="progress-bar bg-danger" role="progressbar" aria-label="Info example" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">${atkData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">DEF</span>
            <div class="progress">
                <div class="progress-bar bg-info" role="progressbar" aria-label="Warning example" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">${defData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">SP-ATK</span>
            <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" aria-label="Danger example" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${spAtkData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">SP-DEF</span>
            <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">${spDefData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">SPEED</span>
            <div class="progress">
                <div class="progress-bar bg-secondary" role="progressbar" aria-label="Danger example" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">${speedData}</div>
            </div>
        </div>
    `;
}


function backToMain(){
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('renderPokemonCards').style.display = 'none';
}


function stopEvent(event){
    event.stopPropagation();
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