const pokemonOl = document.getElementById('pokemonOl')
loadMoreButton = document.getElementById('loadMoreButton')
searchInput = document.querySelector('.box input');
searchButton = document.querySelector('.box i');

limit = 9
let offset = 0

function loadPokemonsItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <div class="detail">
                    <img src="${pokemon.photo}" alt="${pokemon.name}>
                </div>
                <span class="name">${pokemon.name}</span>
                <ol class="types">${pokemon.types.map((type) => `<li class= "type ${type}">${type}</li>`).join('')}</ol>
                </li>
            `).join('')
        pokemonOl.innerHTML += newHtml
    }
    )
}

function clearPokemonList() {
    pokemonOl.innerHTML = ''
}

function searchPokemon(pokemonName) {
    clearPokemonList();
    pokeApi.searchPokemons(pokemonName).then((pokemons = []) => {
        pokemons.forEach((pokemon) => {
            pokeApi.getPokemonDetail(pokemon).then((getPokemonDetail) => {
                const newHtml = `
                <li class="pokemon ${pokemonDetail.type}">
                        <span class="number">#${pokemonDetail.number}</span>
                        <div class="detail">
                            <img src="${pokemonDetail.photo}" alt="${pokemonDetail.name}">
                        </div>
                        <span class="name">${pokemonDetail.name}</span>
                        <ol class="types">${pokemonDetail.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}</ol>
                    </li>
                `;
                pokemonOl.innerHTML += newHtml
            })
        })
    })
}

loadPokemonsItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonsItens(offset, limit)
})

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim().toLowerCase()
    if (searchTerm !== '') {
        searchPokemon({ url: `https://pokeapi.co/api/v2/pokemon/${searchTerm}`})
    }
})

searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = searchInput.value.trim().toLowerCase()
        if (searchTerm !== '') {
            searchPokemon({url: `https://pokeapi.co/api/v2/pokemon/${searchTerm}`})
        }
    }
})