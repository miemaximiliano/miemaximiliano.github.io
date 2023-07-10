const baseURL = 'https://rickandmortyapi.com/api/character';
const getCharactersButton = document.getElementById('getCharactersButton');
const filtersForm = document.getElementById('filtersForm');
const characterDataContainer = document.querySelector('#characterData tbody');

getCharactersButton.addEventListener('click', getCharacters);
filtersForm.addEventListener('submit', filterCharacters);

function getCharacters() {
  fetch(baseURL)
    .then(response => response.json())
    .then(data => displayCharacterData(data));
}

function filterCharacters(event) {
  event.preventDefault();

  const nameFilterValue = document.getElementById('nameFilter').value;
  const statusFilterValue = document.getElementById('statusFilter').value;
  const speciesFilterValue = document.getElementById('speciesFilter').value;
  const typeFilterValue = document.getElementById('typeFilter').value;
  const genderFilterValue = document.getElementById('genderFilter').value;

  const filters = [];

  if (nameFilterValue) {
    filters.push(`name=${nameFilterValue}`);
  }

  if (statusFilterValue) {
    filters.push(`status=${statusFilterValue}`);
  }

  if (speciesFilterValue) {
    filters.push(`species=${speciesFilterValue}`);
  }

  if (typeFilterValue) {
    filters.push(`type=${typeFilterValue}`);
  }

  if (genderFilterValue) {
    filters.push(`gender=${genderFilterValue}`);
  }

  const filteredURL = `${baseURL}?${filters.join('&')}`;

  fetch(filteredURL)
    .then(response => response.json())
    .then(data => displayCharacterData(data));
}

function displayCharacterData(data) {
  characterDataContainer.innerHTML = '';

  data.results.forEach((character) => {
    const row = document.createElement('tr');

    const name = createTableCell(character.name);
    const status = createTableCell(character.status);
    const species = createTableCell(character.species);
    const type = createTableCell(character.type);
    const gender = createTableCell(character.gender);

    row.appendChild(name);
    row.appendChild(status);
    row.appendChild(species);
    row.appendChild(type);
    row.appendChild(gender);

    characterDataContainer.appendChild(row);
  });

  document.getElementById('characterData').style.display = 'table';
}

function createTableCell(text) {
  const cell = document.createElement('td');
  cell.textContent = text;
  return cell;
}
