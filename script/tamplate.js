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

