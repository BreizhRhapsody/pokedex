// Loading of the page

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  if (!id || id < 1 || id > 151) {
    window.location.href = "./index.html";
    return;
  }

  loadPokemon(id);
});

// Get informations from pokedex.json

async function loadPokemon(id) {
  try {
    const response = await fetch("pokedex.json");
    const pokemons = await response.json();

    // Find the pokemon with the id
    const pokemon = pokemons.find((p) => p.id === id);
    if (!pokemon) return;

    displayPokemonDetails(pokemon, id);
  } catch (error) {
    console.error("Erreur lors du chargement du Pokémon :", error);
  }
}

// Insert informations into the HTML

function displayPokemonDetails(pokemon, currentId) {
  // Name et number
  const title = document.querySelector(".details__title");
  const number = document.querySelector(".details__number");
  title.textContent = pokemon.name_fr;
  number.textContent = `#${pokemon.id}`;

  // Image
  const img = document.querySelector(".details__img img");
  img.src = pokemon.image;
  img.alt = pokemon.name_fr;

  // Sound
  const sound = document.querySelector(".details__sound");
  const audio = new Audio(pokemon.cry_url);
  sound.textContent = "";
  sound.addEventListener("click", () => audio.play());

  // Types
  const typesDiv = document.querySelector(".details__types");
  typesDiv.innerHTML = "";

  const typeMap = {
    Normal: "normal",
    Feu: "fire",
    Eau: "water",
    Électrik: "electric",
    Plante: "grass",
    Glace: "ice",
    Combat: "fighting",
    Poison: "poison",
    Sol: "ground",
    Vol: "flying",
    Psy: "psychic",
    Insecte: "bug",
    Roche: "rock",
    Spectre: "ghost",
    Dragon: "dragon",
    Acier: "steel",
    Fée: "fairy",
  };

  // Add a class to the main according to the type

  function setMainTypeClass(pokemon) {
    const main = document.querySelector("main");

    // Supprime toutes les classes de type existantes
    main.className = main.className.replace(/\btype-\S+/g, "").trim();
    const firstTypeFr = pokemon.types[0];
    const firstTypeEn = typeMap[firstTypeFr];

    if (firstTypeEn) {
      main.classList.add(`type-${firstTypeEn}`);
    }
  }

  setMainTypeClass(pokemon);

  pokemon.types.forEach((typeFr) => {
    const typeEn = typeMap[typeFr];
    if (!typeEn) return;

    const wrapper = document.createElement("span");
    wrapper.classList.add("type-tooltip");
    wrapper.setAttribute("tabindex", "0");
    wrapper.setAttribute("data-tooltip", typeFr);

    const img = document.createElement("img");
    img.src = `images/types/${typeEn}.svg`;
    img.alt = `Type ${typeFr}`;

    wrapper.appendChild(img);
    typesDiv.appendChild(wrapper);
  });

  // Stats
  document.querySelector(
    ".details__stats_hp_stat"
  ).textContent = `${pokemon.stats.hp}`;
  document.querySelector(
    ".details__stats_attack_stat"
  ).textContent = `${pokemon.stats.attack}`;
  document.querySelector(
    ".details__stats_defense_stat"
  ).textContent = `${pokemon.stats.defense}`;
  document.querySelector(
    ".details__stats_spAttack_stat"
  ).textContent = `${pokemon.stats.sp_attack}`;
  document.querySelector(
    ".details__stats_spDefense_stat"
  ).textContent = `${pokemon.stats.sp_defense}`;

  // Weaknesses
  const weaknessesDiv = document.querySelector(".details__weaknesses_types");
  weaknessesDiv.innerHTML = "";

  pokemon.weaknesses.forEach((typeFr) => {
    const typeEn = typeMap[typeFr];
    if (!typeEn) return;

    const span = document.createElement("span");
    span.classList.add("type", `type-${typeEn}`);
    span.textContent = typeFr;

    weaknessesDiv.appendChild(span);
  });

  // Resistances
  const resistancesDiv = document.querySelector(".details__resistances_types");
  resistancesDiv.innerHTML = "";

  pokemon.resistances.forEach((typeFr) => {
    const typeEn = typeMap[typeFr];
    if (!typeEn) return;

    const span = document.createElement("span");
    span.classList.add("type", `type-${typeEn}`);
    span.textContent = typeFr;

    resistancesDiv.appendChild(span);
  });

  // Navigation previous Pokemon / next Pokemon
  const prevBtn = document.querySelector(".details__img_prev");
  const nextBtn = document.querySelector(".details__img_next");

  if (currentId > 1) {
    prevBtn.href = `details.html?id=${currentId - 1}`;
    prevBtn.classList.remove("is-disabled");
  } else {
    prevBtn.href = "#";
    prevBtn.classList.add("is-disabled");
  }

  if (currentId < 151) {
    nextBtn.href = `details.html?id=${currentId + 1}`;
    nextBtn.classList.remove("is-disabled");
  } else {
    nextBtn.href = "#";
    nextBtn.classList.add("is-disabled");
  }
}
