const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeExperience = document.querySelector('[data-poke-experience]');
//const pokeHeight = document.querySelector('[data-poke-height]')
//const pokeWeight = document.querySelector('[data-poke-weight]')

const typeColors = {
    electric: '#EFB20A',
    normal: '#8DA813',
    fire: '#E43E05',
    water: '#7DBAF2',
    ice: '#67C8E9',
    rock: '#A28B45',
    flying: '#90A0E9',
    grass: '#509218',
    psychic: '#E1447C',
    ghost: '#5959AA',
    bug: ' #8B9912',
    poison: '#662168',
    ground: '#C3A54D',
    dragon: '#7862D9',
    steel: '#ABABB8',
    fighting: '#9E9711',
    fairy: '#EAB1EA',
    dark: '#392B21',
    default: '#C2788F',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
    .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.other["official-artwork"].front_default
    //const sprite = data.sprites.front_default;
    const { stats, types } = data;
    
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nª ${data.id}`
    pokeExperience.textContent = `Experience: ${data.base_experience}`
    //pokeHeight.textContent = `Height: ${data.height}`
    //pokeWeight.textContent = `Weight: ${data.weight}`
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types [1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '10px 10px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'Invalid name or ID, please try again';
    pokeImg.setAttribute('src', './img/shadow.png');
    pokeImg.style.background = '#f4ecf4';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.innerHTML = '';
    pokeExperience.innerHTML = '';
}

//////Mostrar 150 pokemones
const pokedex = document.getElementById('pokedex');
const fetchPokemon = () => {
    const promises = [];
    for(let i=1; i<=898; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites.other["official-artwork"].front_default,
            type: result.types.map((type) =>type.type.name).join(', '),
            id: result.id,
            experience: result.base_experience
        }));
        displayPokemon(pokemon);
    });
}

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
    .map(
        (pokeman) => `
    <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle">Type: ${pokeman.type}</p>
        <p class="card-subtitle">Experience: ${pokeman.experience}</p>
    </li>
        `
    )
    .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();