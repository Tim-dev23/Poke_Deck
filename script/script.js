let cardInfos = [];
const Base_url = "https://pokeapi.co/api/v2/pokemon/"

let cardIndex = 0;
let propertiesPokemeon = 0;

function onloadFunc() {
    document.getElementById("search_input").addEventListener("input", searchPokemon);
    getCard();
}

 async function getData(index){
    let response = await fetch(Base_url + index + "/", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return responseToJson = await response.json();
 }

 async function getCard(  ) {
    evo_idx_temp = 1;
    let loadCardsCount = 20;

    for (let i = 1; i <= loadCardsCount; i++) {
        try {
            const data = await getData(i);
            if( i < loadCardsCount){
                document.getElementById('card_section').style.display = "none";     
                let progress = document.getElementById("load_screen");
                progress.innerHTML = getLoadScreenTamplate(i);
            }else{
                document.getElementById("load_screen").style.display = "none";}
                document.getElementById('card_section').style.display = "";
                if (data) {
                    cardInfos.push({
                        name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                        id: data.id,
                        types: data.types,
                        abilities: data.abilities,
                        stats: {
                            hp: data.stats[0].base_stat,
                            attack: data.stats[1].base_stat,
                            defense: data.stats[2].base_stat,
                            specialAttack: data.stats[3].base_stat,
                            specialDefense: data.stats[4].base_stat,
                            speed: data.stats[5].base_stat,
                        },
                        weight: data.weight,
                        height: data.height,
                        base_experience: data.base_experience,
                        evo_idx: evo_idx_temp 
                    });
                    evo_idx_temp++;

                if(evo_idx_temp > 3)evo_idx_temp = 1;
                }
                else {
                    console.error(`Fehler beim Abrufen der Daten für Pokémon #${i}`);
                }
        } catch (error) {
                console.error(`Fehler beim Abrufen der Daten für Pokémon #${i}:`, error);
        }
    }
    renderCard();
}

async function renderCard() {
    const cardSection = document.querySelector(".card_section"); 
   cardSection.innerHTML = " ";
    for (let i = 0; i < cardInfos.length; i++) {
        try {
                const data = cardInfos[i];               
                const cardTemplate = getCardTemplate(data); 
                cardSection.innerHTML += cardTemplate; 
        } catch (error) {
            console.error(`Fehler beim Abrufen der Daten für Pokémon #${i}:`, error);
        }
    }
    console.log(cardInfos);
}

async function searchPokemon() {
    const input = document.getElementById("search_input").value.toLowerCase();
    const searchInfo = document.getElementById("search_info_text");
    if (input.length < 3 && input.length > 0) {
        searchInfo.innerHTML = "Please type min. 3 letters";
        return;
}
    if(input.length === 0){
        searchInfo.innerHTML = ""; 
        renderCard();
        return;
    }
    const filteredCards = cardInfos.filter(card => card.name.toLowerCase().includes(input));
    if (filteredCards.length > 0) {
        console.log(filteredCards);
        const cardSection = document.querySelector(".card_section");
        cardSection.innerHTML = "";
        for (let i = 0; i < filteredCards.length; i++) {
            const data = cardInfos[filteredCards[i].id - 1];
            const cardTemplate = getCardTemplate(data); 
            cardSection.innerHTML += cardTemplate;
        }
    } else {
        alert("Keiin Po0kemon gefunden")
    }
}

function getColor(type) {
    switch (type) {
        case "normal":
            return "#A8A77A";
        case "fire":
            return "#EE8130";
        case "water":
            return "#6390F0";
        case "electric":
            return "#F7D02C";
        case "grass":
            return "#7AC74C";
        case "ice":
            return "#96D9D6";
        case "fighting":
            return "#C22E28";
        case "poison":
            return "#A33EA1";
        case "ground":
            return "#E2BF65";
        case "flying":
            return "#A98FF3";
        case "psychic":
            return "#F95587";
        case "bug":
            return "#A6B91A";
        case "rock":
            return "#B6A136";
        case "ghost":
            return "#735797";
        case "dragon":
            return "#6F35FC";
        case "dark":
            return "#705746";
        case "steel":
            return "#B7B7CE";
        case "fairy":
            return "#D685AD";
        default:
            return "#000000";
    }   
}
        
function on(index) {
    document.getElementById("overlay").style.display = "flex";
    cardIndex = index;
    getOverlayCard(cardIndex);

    propertiesPokemeon = 0;
}

function off() {
    document.getElementById("overlay").style.display = "none";
}

function getOverlayCard(index){
    const ov = document.getElementById("overlay"); 
    const data = cardInfos[index]; 
    ov.innerHTML = getOverlayCardTemplate(data);

    switch (propertiesPokemeon) {
        case 0:
            getStatsInfo();
            break;
        case 1:
            getMainInfo();
            break;
        case 2:
            getEvoinfo();
            break;
        default:
            break;
    }
}

function getStatsInfo(){
    propertiesPokemeon = 0;
    let statsInfoField = document.getElementById("ov_card_info");
    statsInfoField.innerHTML = "";
    const data = cardInfos[cardIndex];
    statsInfoField.innerHTML = getStatsTamplate(data);
} 

function getMainInfo(){
    propertiesPokemeon = 1;
    let mainInfoField = document.getElementById("ov_card_info");
    mainInfoField.innerHTML = "";
    const data = cardInfos[cardIndex] ;
    mainInfoField.innerHTML = getMainTamplate(data);
}

function getEvoinfo(){
    propertiesPokemeon = 2;
    let evoInfoField = document.getElementById("ov_card_info");
    const data = cardInfos[cardIndex] ;
    evoInfoField.innerHTML = getEvoTamplate(data);
}

function nextPicture(index) {

    index++;
    if (index >= cardInfos.length) {
        index = cardInfos.length - 1; 
    }
    cardIndex = index;
    const data = cardInfos[index];
    getOverlayCard(index);
    switch (propertiesPokemeon) {
        case 0:
            getStatsInfo();
            break;
        case 1:
            getMainInfo();
            break;
        case 2:
            getEvoinfo();
            break;
        default:
            break;
    }
}

function lastPicture(index) {
    index--;
    if (index <= 0) {
        index = 0;
    }
    cardIndex = index;
    const data = cardInfos[index];
    getOverlayCard(index);
    switch (propertiesPokemeon) {
        case 0:
            getStatsInfo();
            break;
        case 1:
            getMainInfo();
            break;
        case 2:
            getEvoinfo();
            break;
        default:
            break;
    }
}

function loadMoreButton(cardIndex){
    for (let i = cardInfos; i < 20; index++) {
        let loadMorePokemons= cardInfos[cardIndex];
        let loadmore = document.getElementById('card_section');
        loadmore.innerHTML = loadMorePokemons
    }
}