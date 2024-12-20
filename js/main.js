document.querySelector('button').addEventListener('click', getFetch);

function getFetch() {
  const poke1 = document.querySelector('#poke1').value.toLowerCase();
  const poke2 = document.querySelector('#poke2').value.toLowerCase();
  const url = 'https://pokeapi.co/api/v2/pokemon/' + poke1;
  const url2 = 'https://pokeapi.co/api/v2/pokemon/' + poke2;
  
  let pokeData = [];
  let pokeImg = [];

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Pokémon not found');
      }
      return res.json();
    })
    .then(data => {
      pokeData.push(data);
      pokeImg.push(data.sprites.front_shiny);
      return fetch(url2);
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Pokémon not found');
      }
      return res.json();
    })
    .then(data => {
      pokeData.push(data);
      pokeImg.push(data.sprites.front_shiny);
      
      const poke1Power = calculatePower(pokeData[0]);
      const poke2Power = calculatePower(pokeData[1]);
      const winner = poke1Power > poke2Power ? poke1 : poke2;
      
      document.querySelector('.result').innerHTML = `
        <div class="pokemon-container">
            <img id="pokeImg1" src="${pokeImg[0]}" alt="Pokémon 1" />
            <img id="pokeImg2" src="${pokeImg[1]}" alt="Pokémon 2" />
        </div>
        <h2>${winner} wins!</h2>
      `;
    })
    .catch(err => {
      console.log(`error ${err}`);
      document.querySelector('h2').innerText = 'Error: Pokémon not found';
    });
}

function calculatePower(pokemon) {
  return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
}