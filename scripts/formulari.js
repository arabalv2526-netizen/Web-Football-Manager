'use strict';

//Jugadors o entrenadors
const btnJugador = document.getElementById('btn-jugador');
const btnEntrenador = document.getElementById('btn-entrenador');
const campPosicio = document.getElementById('camp-posicio');

btnJugador.addEventListener('click', () => {
    btnJugador.classList.add('actiu');
    btnEntrenador.classList.remove('actiu');
    campPosicio.style.display = 'flex';
});

btnEntrenador.addEventListener('click', () => {
    btnEntrenador.classList.add('actiu');
    btnJugador.classList.remove('actiu');
    campPosicio.style.display = 'none';
});

//Posicions
const posicions = ['Porter', 'Defensa', 'Migcampista', 'Davanter'];
const selectPosicio = document.querySelector('#select-posicio');

posicions.forEach(posicio => {
    const option = document.createElement('option');
    option.value = posicio;
    option.textContent = posicio;
    selectPosicio.appendChild(option);
});

// Equips
const equips = [
    'FC Barcelona',
    'Real Madrid CF',
    'Atlético de Madrid',
    'Sevilla FC',
    'Real Sociedad',
    'Real Betis',
    'Athletic Club',
    'Valencia CF',
    'RCD Espanyol',
    'Deportivo Abanca',
    'SD Eibar',
    'Granada CF',
    'Levante UD', 
    'Las Palmas',
    'Real Valladolid',
    'Cádiz CF',
    'Getafe CF',
    'Villarreal CF',
    'Rayo Vallecano',
    'Leganés',
    'Alavés',
    'Celta Vigo',
    'Osasuna', 
    'Mallorca',
    'Sevilla',
    'Valencia',
];

const selectEquip = document.querySelector('#select-equip');

equips.forEach(nom => {
    const option = document.createElement('option');
    option.value = nom;
    option.textContent = nom;
    selectEquip.appendChild(option);
});

// Carrega d'imatge
const uploadArea = document.getElementById("upload-area");
const inputFile = document.getElementById("input-file");

uploadArea.addEventListener("click", () => {
    inputFile.click();
});