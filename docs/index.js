const main = document.querySelector('main')
const $ul = document.querySelector('.pokemon')
const spinner = document.createElement('img')

document.addEventListener('DOMContentLoaded', (event) => {
  displayLoadingIcon()
})

function addPokemon (pokemon) {
  const $li = document.createElement('li')
  const $div = document.createElement('div')
  $div.classList = 'pokemon-listing'
  $div.innerHTML = `
    <figure>
      <img class="pokeball" src="images/pokeball.png" alt="small pokeball" />
      <img class="card-image" src="${pokemon.sprites.front_default}" alt="${capitalizeName(pokemon.name)}" />
      <figcaption><a href="pokemon.html?pokemon=${pokemon.name}">${capitalizeName(pokemon.name)}</a></figcaption>
    </figure>
  `
  $ul.append($li)
  $li.append($div)
  spinner.classList.add('hidden')
}

window.fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
  .then((response) => response.json())
  .then((response) => {
    const pokemonList = response.results
    const requests = pokemonList
      .map((pokemon) => pokemon.url)
      .map(url => {
        return window.fetch(url)
          .then(response => response.json())
      })
    return Promise.all(requests)
  }).then(responses => {
    responses.forEach(response => {
      addPokemon(response)
    })
  })

function displayLoadingIcon () {
  spinner.classList.add('spinner')
  spinner.src = 'images/loading-icon.gif'
  main.append(spinner)
}

function capitalizeName (string) {
  return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.Length)
    }`
}
