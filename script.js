let pokeCounter = 20;
let loadingNext = false;

function init(){
    responseApi();
}


async function responseApi(){
    let url = 'https://pokeapi.co/api/v2/pokemon';
    let response = await fetch(url);
    let responseAsJson = await response.json();
    getPokemonDatas(responseAsJson);
    document.getElementById('renderPokemonContainer').innerHTML = '';
    document.getElementById('searchField').value = '';
}


async function getPokemonDatas(responseAsJson){
    for (let i = 0; i < responseAsJson['results'].length; i++) {
        const element = responseAsJson['results'][i];
        let pokemonData = await fetch(element['url']);
        let responsePokemonData = await pokemonData.json();
        let pokemonSpecies = await fetch(responsePokemonData['species']['url']);
        let responsePokemonSpecies = await pokemonSpecies.json();
        let pokeId = idFormater(responsePokemonSpecies['id']);

        renderPokemon(responsePokemonSpecies, element, responsePokemonData, pokeId);
    }
    // if (responseAsJson['next'] == `https://pokeapi.co/api/v2/pokemon?offset=${pokeCounter}&limit=20`) {
    //     loadNextPokemons();
    // }
}


/**
 * ON-SCROLL
 */
window.onscroll = function(ev) {
    if (!loadingNext && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500)) {
        loadingNext = true;
        loadNextPokemons();
    }
};


/**
 * LOAD NEXT POKEMONS
 */
async function loadNextPokemons(){
    let nextUrl = `https://pokeapi.co/api/v2/pokemon?offset=${pokeCounter}&limit=20`;
    let response = await fetch(nextUrl);
    let responseNextPokemonJson = await response.json();
    pokeCounter = pokeCounter + 20;
    await getPokemonDatas(responseNextPokemonJson);
    loadingNext = false;
}


/**
 * RENDER POKEMON
 */
function renderPokemon(responsePokemonSpecies, element, responsePokemonData, pokeId){
    let renderContainer = document.getElementById('renderPokemonContainer');
    renderContainer.innerHTML += renderAllPokemonsHTML(responsePokemonSpecies, element, responsePokemonData, pokeId);
}


/**
 * GENERATE FULLSIZE POKEMONCARD WITH THEIR PROPERTIES
 */
async function renderPokemonCard(pokeName){
    let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    let responsePokemon = await fetch(url);
    let responsePokemonData = await responsePokemon.json();
    let pokemonSpecies = await fetch(responsePokemonData['species']['url']);
    let responsePokemonSpecies = await pokemonSpecies.json();
    let pokeId = idFormater(responsePokemonData['id']);

    document.getElementById('body').style.overflow = 'hidden';
    document.getElementById('overlay').style.display = 'unset';
    document.getElementById('renderPokemonCards').style.display = 'flex';
    let renderCard = document.getElementById('pokemonCardContainer');
    renderCard.innerHTML = '';
    renderCard.innerHTML = generatePokemonCardHTML(pokeId, responsePokemonData, responsePokemonSpecies);
}


function about(happiness, capture, score, gen, exp){
    document.getElementById('nav-home').innerHTML = '';
    document.getElementById('nav-home').innerHTML = generatePropertieAboutHTML(happiness, capture, score, gen, exp);
}


function baseStats(hpData, atkData, defData, spAtkData, spDefData, speedData){
    document.getElementById('nav-profile').innerHTML = '';
    document.getElementById('nav-profile').innerHTML = generateBaseStatsHTML(hpData, atkData, defData, spAtkData, spDefData, speedData);
}


async function evolution(chainUrl){
    try {
        let responseEvolution = await fetch(chainUrl);
        let responsePokemonChain = await responseEvolution.json();
        // catch the json from First Pokemon
        let pokemonChainUrl = `https://pokeapi.co/api/v2/pokemon/${responsePokemonChain['chain']['species']['name']}`;
        let firstPokemonFetch = await fetch(pokemonChainUrl);
        let resultFirstPokemon = await firstPokemonFetch.json();

        document.getElementById('nav-evolution').innerHTML = generateEvolutionContainerHTML();
        if (resultFirstPokemon) {
            document.getElementById('firstPokemon').innerHTML = generateFirstPokemonHTML(resultFirstPokemon);
        }
        // catch the json from second Pokemon
        let secondpokemonChainUrl = `https://pokeapi.co/api/v2/pokemon/${responsePokemonChain['chain']['evolves_to'][0]['species']['name']}`;
        let secondPokemonFetch = await fetch(secondpokemonChainUrl);
        let resultSecondPokemon = await secondPokemonFetch.json();
        if (resultSecondPokemon) {
            document.getElementById('secondPokemon').innerHTML = generateSecondPokemonHTML(resultSecondPokemon);
        }
        // catch the json from third Pokemon
        let lastChainUrl = `https://pokeapi.co/api/v2/pokemon/${responsePokemonChain['chain']['evolves_to'][0]['evolves_to'][0]['species']['name']}`;
        let evo = await fetch(lastChainUrl);
        let resultThirdPokemon = await evo.json();
        if (resultThirdPokemon) {
            document.getElementById('thirdPokemon').innerHTML = generateThirdPokemonHTML(resultThirdPokemon);
        }
    } catch (error) {
        console.log(error)
    }
}


async function moves(pokemonName){
    let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    let urlPokemon = await fetch(url);
    let pokemonInfos = await urlPokemon.json();
    document.getElementById('nav-evolution').innerHTML = ''; //evolution container exist but hide, that's why I must clear the nav-evolution Container here.
    document.getElementById('moveId').innerHTML = '';
    for (let i = 0; i < pokemonInfos['moves'].length; i++) {
        const element = pokemonInfos['moves'][i];
        document.getElementById('moveId').innerHTML += generateMovesHTML(element);
    }
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


async function filterPokemon(){
    let search = document.getElementById('searchField').value;
    search = search.toLowerCase();
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${search}`;
        let responsePokemon = await fetch(url);
        let responsePokemonData = await responsePokemon.json();
        let pokemonSpecies = await fetch(responsePokemonData['species']['url'])
        let responsePokemonSpecies = await pokemonSpecies.json();
        let pokeId = idFormater(responsePokemonData['id']);

        document.getElementById('renderPokemonContainer').innerHTML = '';
        document.getElementById('renderPokemonContainer').innerHTML = await generateFilteredPokemonsHTML(responsePokemonData, responsePokemonSpecies, pokeId);
    } catch (error) {
        document.getElementById('renderPokemonContainer').innerHTML = generateNotSearchResultHTML();
    }
    if (search == 0) {
        document.getElementById('renderPokemonContainer').innerHTML = '';
        responseApi();
    }
}


/**
 * Pokemon Forward and Backward function in Pokemon Card
 */
function backwardPokemon(pokeId){
    let myNumber = parseInt(pokeId.replace(/^[^0-9]+/, ''), 10);
    let pokeIdReverse = myNumber - 1;
    if(myNumber > 1) {
        renderPokemonCard(pokeIdReverse)
    } else {
        document.getElementById('arrowLeft').style.opacity = '0';
        document.getElementById('arrowLeft').classList.remove('cp');
    }
}

function forwardPokemon(pokeId){
    let myNumber = parseInt(pokeId.replace(/^[^0-9]+/, ''), 10);
    let pokeIdReverse = myNumber + 1;
    if(myNumber < 386) {
        renderPokemonCard(pokeIdReverse)
    } else {
        document.getElementById('arrowRight').style.opacity = '0';
        document.getElementById('arrowRight').classList.remove('cp');
    }
}