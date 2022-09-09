/**
 * Generate the small pokemonCard
 */
function renderAllPokemonsHTML(responsePokemonSpecies, element, responsePokemonData, pokeId){
    return `
        <div onclick="renderPokemonCard('${element['name']}')" class="pokemonCave allCenter" style="background-color: ${responsePokemonSpecies['color']['name']};" onmouseover="this.style.boxShadow='1px 3px 15px 2px ${responsePokemonSpecies['color']['name']}';" onmouseout="this.style.boxShadow='';">
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


/**
 * Schow you the Pokemon in FullSize with there properties
 */
function generatePokemonCardHTML(pokeId, responsePokemonData, responsePokemonSpecies){
    return `
        <div id="pokeCard" class="allCenter cardStyle">
            <div class="containerCardHeader">
                <div class="card-header allCenter">
                    <span onclick="backToMain()" class="allCenter cp textShadow">
                        <img src="img/zuruck (1).png" alt="">
                        <span style="font-size: 20px;">Pokedex</span>
                    </span>
                    <span class="textShadow" style="text-align: right; font-size: 18px;">
                        ${pokeId}
                    </span>
                </div>
                
                <img src="${responsePokemonData['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
                <div class="pokemonSwitcherContainer">
                    <img onclick="backwardPokemon('${pokeId}')" class="pokeSwitcherArrow cp" src="img/zuruck.png" alt="">
                    <img onclick="forwardPokemon('${pokeId}')" class="pokeSwitcherArrow cp" style="transform: rotate(180deg);" src="img/zuruck.png" alt="">
                </div>
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


/**
 * Propertie ABOUT
 */
function generatePropertieAboutHTML(happiness, capture, score, gen, exp){
    return `
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


/**
 * Propertie BASESTATS
 */
function generateBaseStatsHTML(hpData, atkData, defData, spAtkData, spDefData, speedData){
    return `
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


/**
 * PROPERTIE EVOLUTION
 */
function generateEvolutionContainerHTML(){
    return `
        <div id="firstPokemon"></div>
        <div id="secondPokemon"></div>
        <div id="thirdPokemon"></div>
    `;
}

/**
 * EVOLUTION /// FIRST POKEMON
 */
function generateFirstPokemonHTML(resultFirstPokemon){
    return `
        <div class="evoStyle cp" onclick="renderPokemonCard('${resultFirstPokemon['species']['name']}')">
            <span class="white evotext">${resultFirstPokemon['species']['name']}</span>
            <img style="width: 100px; height: auto;" src="${resultFirstPokemon['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
        </div>
    `;
}

/**
 * EVOLUTION /// SECOND POKEMON
 */
function generateSecondPokemonHTML(resultSecondPokemon){
    return `
        <div class="evoStyle cp" onclick="renderPokemonCard('${resultSecondPokemon['species']['name']}')">
            <span class="white evotext">${resultSecondPokemon['species']['name']}</span>
            <img style="width: 100px; height: auto;" src="${resultSecondPokemon['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
        </div>   
    `;
}

/**
 * EVOLUTION /// THIRD POKEMON
 */
function generateThirdPokemonHTML(resultThirdPokemon){
    return `
        <div class="evoStyle cp" onclick="renderPokemonCard('${resultThirdPokemon['species']['name']}')">
            <span class="white evotext">${resultThirdPokemon['species']['name']}</span>
            <img style="width: 100px; height: auto;" src="${resultThirdPokemon['sprites']['other']['home']['front_default']}" class="img-fluid" alt="">
        </div>
    `;
}


/**
 * PROPERTIE MOVES
 */
function generateMovesHTML(element){
    return `
        <span class="white allCenter">
            <img style="width: 14px; height: auto; margin-right: 8px;" src="img/star.png" alt="star"> ${element['move']['name']}
        </span>
    `;
}


/**
 * SEARCH RESULT /// POKEMON NOT FOUND
 */
function generateNotSearchResultHTML(){
    return `
        <h1 class="notFound">Pokemon not found</h1>
    `;
}


/**
 * SEARCH RESULT /// POKEMON FOUND
 */
function generateFilteredPokemonsHTML(responsePokemonData, responsePokemonSpecies, pokeId){
    return `
        <div onclick="renderPokemonCard('${responsePokemonData['name']}')" class="pokemonCave allCenter" style="background-color: ${responsePokemonSpecies['color']['name']};" onmouseover="this.style.boxShadow='1px 3px 15px 2px ${responsePokemonSpecies['color']['name']}';" onmouseout="this.style.boxShadow='';">
            <div class="pokemonInfoContainer">
                <h3 class="textShadow">${responsePokemonData['name']}</h3>
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