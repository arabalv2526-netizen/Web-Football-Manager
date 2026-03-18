let equips = [];
const container = document.getElementById("equips-container");
const leftBtn = document.querySelector(".fletxa-esquerra");
const rightBtn = document.querySelector(".fletxa-dreta");

let pagina = 0;
const perPagina = 4;

fetch("/data/jugadores.json")
    .then(res => res.json())
    .then(data => {
        equips = data;
        render();
    });

function render() {
    container.innerHTML = "";

    const start = pagina * perPagina;
    const end = start + perPagina;
    const visibles = equips.slice(start, end);

    visibles.forEach(e => {
        container.innerHTML += `
            <a href="equip.html?team=${encodeURIComponent(e.equip)}" class="equip-card">
                <img src="${e.escut}">
                <p>${e.equip}</p>
            </a>
        `;
    });
}

// Flechas
rightBtn.onclick = () => {
    if ((pagina + 1) * perPagina < equips.length) {
        pagina++;
        render();
    }
};

leftBtn.onclick = () => {
    if (pagina > 0) {
        pagina--;
        render();
    }
};

