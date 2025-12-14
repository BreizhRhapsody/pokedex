// Constants and application state

const pokemonList = document.querySelector(".index__pokemonList_wrapper");
const pagination = document.querySelector("#pagination");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");
const filterButton = document.querySelector(".index__filter_sortButton");
const filterContainer = document.querySelector(".index__filter_sortList");

const POKEMONS_PER_PAGE = 12;

let allPokemons = [];
let currentPokemons = [];
let currentPage = 1;

// Initial data fetch

fetch("pokedex.json")
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data;
    currentPokemons = data;
    currentPage = getPageFromURL();
    render();
  });

// Update the list, pagination and "not found" message

function render() {
  displayPokemons(currentPokemons, currentPage);
}

// Displays the Pokémon cards for the current page.

function displayPokemons(pokemons, page = 1) {
  // Handle "no results" message (single source of truth)
  notFoundMessage.style.display = pokemons.length === 0 ? "block" : "none";

  pokemonList.innerHTML = "";
  pagination.innerHTML = "";

  if (pokemons.length === 0) return;

  const totalPages = Math.ceil(pokemons.length / POKEMONS_PER_PAGE);
  currentPage = Math.min(page, totalPages);

  const start = (currentPage - 1) * POKEMONS_PER_PAGE;
  const end = start + POKEMONS_PER_PAGE;

  pokemons.slice(start, end).forEach(createPokemonCard);

  displayPagination(pokemons.length);
}

// Creates and appends a Pokémon card to the list.

function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("index__pokemonList_wrapper_card");
  card.dataset.id = pokemon.id;

  card.innerHTML = `
    <p>(#${pokemon.id})</p>
    <img src="${pokemon.image}" alt="${pokemon.name_fr}">
    <h2>${pokemon.name_fr}</h2>
  `;

  pokemonList.appendChild(card);
}

// Displays pagination buttons with ellipsis when needed.

function displayPagination(totalPokemons) {
  const totalPages = Math.ceil(totalPokemons / POKEMONS_PER_PAGE);

  const prevBtn = createPageButton("", currentPage - 1, currentPage === 1);
  prevBtn.classList.add("index__pokemonList_pagination_prev");
  pagination.appendChild(prevBtn);

  const pages = getVisiblePages(totalPages);

  pages.forEach((page) => {
    if (page === "...") {
      const span = document.createElement("span");
      span.textContent = "...";
      span.classList.add("ellipsis");
      pagination.appendChild(span);
    } else {
      const btn = createPageButton(page, page, false);
      if (page === currentPage) btn.classList.add("active");
      pagination.appendChild(btn);
    }
  });

  const nextBtn = createPageButton(
    "",
    currentPage + 1,
    currentPage === totalPages
  );
  nextBtn.classList.add("index__pokemonList_pagination_next");
  pagination.appendChild(nextBtn);
}

// Returns the list of visible page numbers with ellipsis.

function getVisiblePages(totalPages) {
  const pages = [1];

  if (currentPage > 3) pages.push("...");

  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) pages.push(i);
  }

  if (currentPage < totalPages - 2) pages.push("...");

  if (totalPages > 1) pages.push(totalPages);

  return pages;
}

// Creates a pagination button

function createPageButton(label, page, disabled) {
  const button = document.createElement("button");
  button.textContent = label;
  button.disabled = disabled;

  button.addEventListener("click", () => {
    currentPage = page;
    updateURL(page);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return button;
}

// Reads the page number from the URL query string

function getPageFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("page")) || 1;
}

// Updates the page number in the URL without reloading

function updateURL(page) {
  const params = new URLSearchParams(window.location.search);
  params.set("page", page);
  history.pushState(null, "", `?${params.toString()}`);
}

// Redirects to the Pokémon details page when clicking a card.

pokemonList.addEventListener("click", (event) => {
  const card = event.target.closest(".index__pokemonList_wrapper_card");
  if (!card) return;

  window.location.href = `./details.html?id=${card.dataset.id}`;
});

// Handles search input and applies filters.

searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  if (!searchTerm) {
    currentPokemons = allPokemons;
  } else if (numberFilter.checked) {
    currentPokemons = allPokemons.filter((pokemon) =>
      String(pokemon.id).startsWith(searchTerm)
    );
  } else if (nameFilter.checked) {
    currentPokemons = allPokemons.filter((pokemon) =>
      pokemon.name_fr.toLowerCase().startsWith(searchTerm)
    );
  }

  currentPage = 1;
  updateURL(1);
  render();
}

// Clears the search input and resets the Pokémon list

const closeButton = document.querySelector(".index__filter_search_close");
closeButton.addEventListener("click", clearSearch);
searchInput.addEventListener("input", toggleCloseButton);

function clearSearch() {
  searchInput.value = "";
  currentPokemons = allPokemons;
  currentPage = 1;
  updateURL(1);
  render();
  toggleCloseButton();
}

function toggleCloseButton() {
  if (searchInput.value.trim() !== "") {
    closeButton.classList.add("visible");
  } else {
    closeButton.classList.remove("visible");
  }
}

toggleCloseButton();

// Display filters when click on button

filterButton.addEventListener("click", toggleFilters);

function toggleFilters() {
  filterContainer.classList.toggle("visible");
}