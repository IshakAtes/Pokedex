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
    if (responseAsJson['next'] == `https://pokeapi.co/api/v2/pokemon?offset=${pokeCounter}&limit=20`) {
        loadNextPokemons();
    }
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
    console.log(responsePokemonSpecies);

    document.getElementById('body').style.overflow = 'hidden';
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
        <div class="pokeInfoStyle allCenter">
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
                    <button onclick="about(${responsePokemonSpecies['base_happiness']}, ${responsePokemonSpecies['capture_rate']}, ${responsePokemonSpecies['pal_park_encounters']['0']['base_score']}, '${responsePokemonSpecies['genera']['7']['genus']}', ${responsePokemonData['base_experience']})" class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">About</button>
                    <button onclick="baseStats(${responsePokemonData['stats']['0']['base_stat']}, ${responsePokemonData['stats']['1']['base_stat']}, ${responsePokemonData['stats']['2']['base_stat']}, ${responsePokemonData['stats']['3']['base_stat']}, ${responsePokemonData['stats']['4']['base_stat']}, ${responsePokemonData['stats']['5']['base_stat']})" class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Base Stats</button>
                    <button onclick="evolution('${responsePokemonSpecies['evolution_chain']['url']}')" class="nav-link" id="nav-evolution-tab" data-bs-toggle="tab" data-bs-target="#nav-evolution" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Evolution</button>
                    <button onclick="moves('${responsePokemonSpecies['name']}')" class="nav-link" id="nav-moves-tab" data-bs-toggle="tab" data-bs-target="#nav-moves" type="button" role="tab" aria-controls="nav-moves" aria-selected="false">Moves</button>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <div class="aboutStyling">
                        <span style="color: rgba(241, 226, 203, 0.781);">Genus:</span>
                        <span class="white">${responsePokemonSpecies['genera']['7']['genus']}</span>
                    </div>
                    <div class="aboutStyling">
                        <span style="color: rgba(241, 226, 203, 0.781);">Base Exp:</span>
                        <span class="white">${responsePokemonData['base_experience']}</span>
                    </div>                
                    <div class="aboutStyling">
                        <span style="color: rgba(241, 226, 203, 0.781);">Base Score:</span>
                        <span class="white">${responsePokemonSpecies['base_happiness']}</span>
                    </div>
                    <div class="aboutStyling">
                        <span style="color: rgba(241, 226, 203, 0.781);">Happiness:</span>
                        <span class="white">${responsePokemonSpecies['capture_rate']}</span>
                    </div>
                    <div class="aboutStyling">
                        <span style="color: rgba(241, 226, 203, 0.781);">Capture:</span>
                        <span class="white">${responsePokemonSpecies['pal_park_encounters']['0']['base_score']}</span>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"></div>
                <div class="tab-pane fade allCenter" id="nav-evolution" role="tabpanel" aria-labelledby="nav-evolution-tab" tabindex="0"></div>
                <div class="tab-pane fade" id="nav-moves" role="tabpanel" aria-labelledby="nav-moves-tab" tabindex="0">
                    <div class="movesStyle overflow-auto" id="moveId">
                        <h1>Moves</h1>
                    </div>
                </div>
            </div>
        </div>
        
    `;
}


async function moves(pokemonName){
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let urlPokemon = await fetch(url);
    let pokemonInfos = await urlPokemon.json();
    console.log(pokemonInfos);
    document.getElementById('nav-evolution').innerHTML = ''; //evolution container exist but hide, that's why I must clear the nav-evolution Container here.
    document.getElementById('moveId').innerHTML = '';
    for (let i = 0; i < pokemonInfos['moves'].length; i++) {
        const element = pokemonInfos['moves'][i];
        document.getElementById('moveId').innerHTML += `<span class="white allCenter"><img style="width: 14px; height: auto; margin-right: 8px;" src="img/star.png" alt="star"> ${element['move']['name']}</span>`;
    }
}


function about(happiness, capture, score, gen, exp){
    document.getElementById('nav-home').innerHTML = '';
    document.getElementById('nav-home').innerHTML = `
        <div class="aboutStyling">
            <span style="color: rgba(241, 226, 203, 0.781);">Genus:</span>
            <span class="white">${gen}</span>
        </div>
        <div class="aboutStyling">
            <span style="color: rgba(241, 226, 203, 0.781);">Base Exp:</span>
            <span class="white">${exp}</span>
        </div>
        <div class="aboutStyling">
            <span style="color: rgba(241, 226, 203, 0.781);">Base Score:</span>
            <span class="white">${score}</span>
        </div>
        <div class="aboutStyling">
            <span style="color: rgba(241, 226, 203, 0.781);">Happiness:</span>
            <span class="white">${happiness}</span>
        </div>
        <div class="aboutStyling">
            <span style="color: rgba(241, 226, 203, 0.781);">Capture:</span>
            <span class="white">${capture}</span>
        </div>
    `;
}


function baseStats(hpData, atkData, defData, spAtkData, spDefData, speedData){
    document.getElementById('nav-profile').innerHTML = '';
    document.getElementById('nav-profile').innerHTML = `
        <div class="allCenter statMargin">
            <span class="white statStyle">HP</span>
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" aria-label="Success example" style="width: ${hpData}%" aria-valuenow="${hpData}" aria-valuemin="0" aria-valuemax="100">${hpData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">ATK</span>
            <div class="progress">
                <div class="progress-bar bg-danger" role="progressbar" aria-label="Info example" style="width: ${atkData}%" aria-valuenow="${atkData}" aria-valuemin="0" aria-valuemax="100">${atkData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">DEF</span>
            <div class="progress">
                <div class="progress-bar bg-info" role="progressbar" aria-label="Warning example" style="width: ${defData}%" aria-valuenow="${defData}" aria-valuemin="0" aria-valuemax="100">${defData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">SP-ATK</span>
            <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" aria-label="Danger example" style="width: ${spAtkData}%" aria-valuenow="${spAtkData}" aria-valuemin="0" aria-valuemax="100">${spAtkData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">SP-DEF</span>
            <div class="progress">
                <div class="progress-bar bg-warning" role="progressbar" aria-label="Warning example" style="width: ${spDefData}%" aria-valuenow="${spDefData}" aria-valuemin="0" aria-valuemax="100">${spDefData}</div>
            </div>
        </div>
        <div class="allCenter statMargin">
        <span class="white statStyle">SPEED</span>
            <div class="progress">
                <div class="progress-bar bg-secondary" role="progressbar" aria-label="Danger example" style="width: ${speedData}%" aria-valuenow="${speedData}" aria-valuemin="0" aria-valuemax="100">${speedData}</div>
            </div>
        </div>
    `;
}


async function evolution(chainUrl){
    let responseEvolution = await fetch(chainUrl);
    let responsePokemonChain = await responseEvolution.json();
    // catch the json from third Pokemon
    let lastChainUrl = `https://pokeapi.co/api/v2/pokemon/${responsePokemonChain['chain']['evolves_to']['0']['evolves_to']['0']['species']['name']}`;
    let evo = await fetch(lastChainUrl);
    let lastEvoFromPokemon = await evo.json();

    // catch the json from First Pokemon
    let pokemonChainUrl = `https://pokeapi.co/api/v2/pokemon/${responsePokemonChain['chain']['species']['name']}`;
    let firstPokemonFetch = await fetch(pokemonChainUrl)
    let resultFirstPokemon = await firstPokemonFetch.json();
    
    // catch the json from second Pokemon
    let secondpokemonChainUrl = `https://pokeapi.co/api/v2/pokemon/${responsePokemonChain['chain']['evolves_to']['0']['species']['name']}`;
    let secondPokemonFetch = await fetch(secondpokemonChainUrl)
    let resultSecondPokemon = await secondPokemonFetch.json();

    document.getElementById('nav-evolution').innerHTML = '';
    document.getElementById('nav-evolution').innerHTML = `
        <div class="evoStyle cp" onclick="renderPokemonCard('${responsePokemonChain['chain']['species']['name']}')">
            <span class="white evotext">${responsePokemonChain['chain']['species']['name']}</span>
            <img style="width: 100px; height: auto;" src="${resultFirstPokemon['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
        </div>
        <div class="evoStyle cp" onclick="renderPokemonCard('${responsePokemonChain['chain']['evolves_to']['0']['species']['name']}')">
            <span class="white evotext">${responsePokemonChain['chain']['evolves_to']['0']['species']['name']}</span>
            <img style="width: 100px; height: auto;" src="${resultSecondPokemon['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
        </div>
        <div class="evoStyle cp" onclick="renderPokemonCard('${responsePokemonChain['chain']['evolves_to']['0']['evolves_to']['0']['species']['name']}')">
            <span class="white evotext">${responsePokemonChain['chain']['evolves_to']['0']['evolves_to']['0']['species']['name']}</span>
            <img style="width: 100px; height: auto;" src="${lastEvoFromPokemon['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
        </div>
    `;
}


function backToMain(){
    document.getElementById('body').style.overflowY = 'auto';
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


async function loadNextPokemons(){
    let nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=${pokeCounter}&limit=20`;
    let response = await fetch(nextUrl);
    let responseNextPokemonJson = await response.json();
    pokeCounter = pokeCounter + 20;
    getPokemonDatas(responseNextPokemonJson);
}