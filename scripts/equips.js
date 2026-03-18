let equips = [];
const container = document.getElementById("equips-container");
const leftBtn = document.querySelector(".fletxa-esquerra");
const rightBtn = document.querySelector(".fletxa-dreta");

let pagina = 0;
const perPagina = 4;

fetch("data/jugadores.json")
    .then(res => res.json())
    .then(data => {
        equips = data;
        render();
    });

function render() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    const start = pagina * perPagina;
    const end = start + perPagina;
    const visibles = equips.slice(start, end);

    visibles.forEach(e => {
        const a = document.createElement("a");
        a.href = `veure_equip.html?team=${encodeURIComponent(e.equip)}`;
        a.className = "equip-card";

        const img = document.createElement("img");
        img.src = e.escut;

        const p = document.createElement("p");
        p.textContent = e.equip;

        a.appendChild(img);
        a.appendChild(p);

        container.appendChild(a);
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