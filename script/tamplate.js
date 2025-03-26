function getCardTemplate(data) {
  return `
      <div class="card" >
          <div class="card_header">
              <div class="card_header_text">
                  <p class="poke_number">#${data.id}</p>
                  <p class="poke_name">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</p>
              </div>
          </div>
          <div class="card_img_container" style="background-color: ${getCollor(data.types[0].type.name)};">
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
<div class="ov_card">
    <div class="ov_card_bg_container" style="background-color: ${getCollor(data.types[0].type.name)};">
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
                    <div onclick="" class="card_navbar_txt">Stats</div>
                    <div onclick=""  class="card_navbar_txt">Ability</div>
                    <div  onclick=""  class="card_navbar_txt">Evo</div>
                </div>
                <div class="divider"></div>
            </div>
            <div id="ov_card_info" class="ov_card_info"></div>
        </div>
        <div class="ov_element_section">
            ${data.types
                .map(
                    (type) =>
                        `<img class="ov_element_icon" src="https://raw.githubusercontent.com/msikma/pokesprite/master/misc/types/gen8/${type.type.name}.png" alt="${type.type.name}">`
                )
                .join("")}
        </div>
    </div>
    `;
  }

  function getStatsTamplate(data){

    return`
    <div id="stats_info">
        hp              ${data.stats.hp}
        attack          ${data.stats[1]}
        defense         ${data.stats[2]}
        special-attack  ${data.stats[3]}
        special-defense ${data.stats[4]}
        speed            
    </div>
    `;
  }

  function getAbilityTamplate(){
    
  }

  function getEvoTamplate(){
    
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

