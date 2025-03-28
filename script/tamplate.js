function getCardTemplate(data) {
  return `
      <div class="card"  onclick="on(${data.id-1})">
          <div class="card_header">
              <div class="card_header_text">
                  <p class="poke_number">#${data.id}</p>
                  <p class="poke_name">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
              </div>
          </div>
          <div class="card_img_container" style="background-color: ${getColor(data.types[0].type.name)};">
              <img class="card_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png" alt="${data.name}">
          </div>
          <div class="card_footer">
              ${data.types
                  .map(
                      (type) =>
                          `<img class="element_icon" src="https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${type.type.name}.png" alt="${type.type.name}">`
                  )
                  .join("")}
          </div>
      </div>
  `;
}

function getOverlayCardTemplate(data) {
    return `
<div class="ov_card" id = "ov_card" onclick="event.stopPropagation()">
    <div class="ov_card_bg_container" style="background-color: ${getColor(data.types[0].type.name)};">
        <div class="ov_card_header">
            <div class="ov_card_header_text">
                <p class="ov_poke_number">#${data.id}</p>
                <p class="ov_poke_name">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
            </div>
        </div>
         <div class="ov_card_img_container">
            <img class="ov_card_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png" alt="${data.name}">
        </div>
        </div>
        <div class="ov_card_info_section"> 
            <div class="ov_card_navbar_section">
                <div class="ov_card_navbar">
                    <div onclick="getStatsInfo()" class="card_navbar_txt">Stats</div>
                    <div onclick="getMainInfo()"  class="card_navbar_txt">Main</div>
                    <div onclick="getEvoinfo()"  class="card_navbar_txt">Evo</div>
                </div>
                <div class="divider"></div>
            </div>
            <div id="ov_card_info" class="ov_card_info"></div>
        </div>
        <div class="ov_card_footer">
            <div class="next_section"><img onclick = "lastPicture(${data.id-1})" id="next1" class="next1" src="./icon/left.arrow.png"></div>
        <div class="ov_element_section">
            ${data.types
                .map(
                    (type) =>
                        `<img class="ov_element_icon" src="https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${type.type.name}.png" alt="${type.type.name}">`
                )
                .join("")}
        </div>
        <div class="next_section"><img onclick = "nextPicture(${data.id-1})" id="next2" class="next2" src="./icon/right.arrow.png"></div>
        </div>
        </div>
    `;
  }

  function getStatsTamplate(data){

    return`
    <div id="stats_info_container" class = "stats_info_container"> 
    <div class = "stats">
        <div class="stats_info">
            <div class="stats_txt_section">
                <div class="stats_txt">hp:</div>
                <div class="stats_txt">attack:</div>
                <div class="stats_txt">defense:</div> 
                <div class="stats_txt">special-attack:</div>
                <div class="stats_txt">special-defense:</div> 
                <div class="stats_txt">speed:</div>
            </div>               
            <div class="stats_bar_section">
                <div class="stats_bar_outer"><div class="stats_bar_inner" style="width:${data.stats.hp}%"></div></div>
                <div class="stats_bar_outer"><div class="stats_bar_inner" style="width:${data.stats.attack}%"></div></div>
                <div class="stats_bar_outer"><div class="stats_bar_inner" style="width:${data.stats.defense}%"></div></div>
                <div class="stats_bar_outer"><div class="stats_bar_inner" style="width:${data.stats.specialAttack}%"></div></div>
                <div class="stats_bar_outer"><div class="stats_bar_inner" style="width:${data.stats.specialDefense}%"></div></div>
                <div class="stats_bar_outer"><div class="stats_bar_inner" style="width:${data.stats.speed}%"></div></div>
            </div>
        </div>    
    </div>
    </div>
    `;
  }

  function getMainTamplate(data){

    let abilitiesText = "";
    let jsonText = JSON.stringify(data.abilities);
    let parseJSON = JSON.parse(jsonText);
    for(let n = 0; n < parseJSON.length; n++)
    {
        abilitiesText += parseJSON[n].ability.name + " ";
    }

    return`
    <div class="main_info_section">
        <div class="main_txt">Weight: <p class="main_info">${data.weight}</p></div>
        <div class="main_txt">Height: <p class="main_info">${data.height}</p></div>
        <div class="main_txt">Base experience: <p class="main_info">${data.base_experience}</p></div>
        <div class="main_txt">Ability: <p class="main_info">${abilitiesText}</p></div>
    </div>
    `;
  }

  //    <div>Height: ${data.po.height}</div>
  //    <div>Weight: ${data.stats.weight}</div>

  function getEvoTamplate(data){

    idx = [1,2,3];
    switch (data.evo_idx) {
        case 1:
            idx =  [data.id, data.id+1, data.id+2];
            break;
        case 2:
            idx =  [data.id-1, data.id, data.id+1];
            break;
        case 3:
            idx =  [data.id-2, data.id-1, data.id];
            break;
        
        default:
            break;
    }
    
    return`
     <div class="evo_container">
        <div class="evo_img_section">
           <img class="evo_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${idx[0]}.png">
        </div>
        <div class="arow_section"><img class="arow" src="./icon/arow.png"></div>
        <div class="evo_img_section">
            <img class="evo_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${idx[1]}.png">
        </div>
        <div class="arow_section"><img class="arow" src="./icon/arow.png"></div>
        <div class="evo_img_section">
            <img class="evo_img" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${idx[2]}.png">
        </div>
    </div>
    `;
  }

function getLoadScreenTamplate(i){
  return`
      <div class="load_screen_section">
          <img class="load_bg" src="./img/pokeball.png">
          <div class="load_text_section progress_text">
              <p ><div id="progress" class="laod_progress_number">${i}</div>von 
              <p class=" pokemon_amount_number">50</p>pokemons sind schohn geladen . . . </p>
          </div>
      </div>
`;
}

