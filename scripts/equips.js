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

/* -- CARRUSEL JUGADORAS -- */

const cajaCarrusel = document.querySelector(".caixa-carrusel");
const flechaIzq = document.querySelector(".fletxa-esquerra-jug");
const flechaDer = document.querySelector(".fletxa-dreta-jug");
const buscador = document.getElementById("buscador-jugadoras");

// Arrays
let jugadorasOriginal = []; // todas las jugadoras
let jugadoras = [];         // jugadoras visibles (filtradas o no)

let currentIndex = 0;


// ===============================
//   CREAR UNA TARJETA
// ===============================

function crearCard(j, claseExtra = "") {
    const card = document.createElement("div");
    card.classList.add("jugadora-card");
    if (claseExtra) card.classList.add(claseExtra);

    const img = document.createElement("img");
    img.src = j.foto;
    img.alt = j.nombre;

    const nombre = document.createElement("h3");
    nombre.textContent = j.nombre;

    const info = document.createElement("p");
    info.textContent = `${j.posicion} • ${j.dorsal}`;

    const calidad = document.createElement("span");
    calidad.classList.add("calidad");
    calidad.textContent = `Qualitat: ${j.calidad}`;

    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(info);
    card.appendChild(calidad);

    return card;
}


// ===============================
//   RENDERIZAR 3 JUGADORAS
// ===============================

function renderCarrusel() {
    cajaCarrusel.innerHTML = "";

    if (jugadoras.length === 0) return;

    const total = jugadoras.length;

    const izquierda = jugadoras[(currentIndex - 1 + total) % total];
    const centro = jugadoras[currentIndex];
    const derecha = jugadoras[(currentIndex + 1) % total];

    const cardIzq = crearCard(izquierda, "left");
    const cardCentro = crearCard(centro, "center");
    const cardDer = crearCard(derecha, "right");

    // ⭐ CLICK EN LA CARTA CENTRAL → ABRIR PÁGINA DE LA JUGADORA
    cardCentro.addEventListener("click", () => {
        window.location.href = `veure_jugadora.html?nombre=${encodeURIComponent(centro.nombre)}`;
    });

    cajaCarrusel.appendChild(cardIzq);
    cajaCarrusel.appendChild(cardCentro);
    cajaCarrusel.appendChild(cardDer);
}


// ===============================
//   FLECHAS DEL CARRUSEL
// ===============================

flechaDer.addEventListener("click", () => {
    if (jugadoras.length === 0) return;
    currentIndex = (currentIndex + 1) % jugadoras.length;
    renderCarrusel();
});

flechaIzq.addEventListener("click", () => {
    if (jugadoras.length === 0) return;
    currentIndex = (currentIndex - 1 + jugadoras.length) % jugadoras.length;
    renderCarrusel();
});


// ===============================
//   BUSCADOR
// ===============================

buscador.addEventListener("input", e => {
    const texto = e.target.value.toLowerCase();

    if (texto === "") {
        jugadoras = [...jugadorasOriginal];
        currentIndex = 0;
        renderCarrusel();
        return;
    }

    const filtradas = jugadorasOriginal.filter(j =>
        j.nombre.toLowerCase().includes(texto)
    );

    jugadoras = filtradas;
    currentIndex = 0;
    renderCarrusel();
});


// ===============================
//   CARGAR JSON EXTERNO
// ===============================

fetch("data/info_jugadoras.json")
    .then(res => res.json())
    .then(data => {
        jugadorasOriginal = data;
        jugadoras = [...jugadorasOriginal];
        renderCarrusel();
    })
    .catch(err => console.error("Error cargando JSON:", err));

/* -- ENTRENADORS -- */
const gridEntrenadores = document.querySelector(".entrenadores-grid");

fetch("data/jugadores.json")
    .then(res => res.json())
    .then(data => {

        // MOSTRAR TODOS LOS ENTRENADORES
        data.forEach(equip => {
            const entrenador = equip.entrenador;

            // Tarjeta
            const card = document.createElement("div");
            card.classList.add("entrenador-card");

            // Foto
            const img = document.createElement("img");
            img.src = entrenador.foto;
            img.alt = entrenador.nomPersona;

            // Contenedor info
            const info = document.createElement("div");
            info.classList.add("entrenador-info");

            // Fila nombre + escudo
            const fila = document.createElement("div");
            fila.classList.add("fila-entrenador");

            const nombre = document.createElement("h3");
            nombre.textContent = entrenador.nomPersona;

            const escudo = document.createElement("img");
            escudo.classList.add("escudo-equipo");
            escudo.src = equip.escut;

            fila.appendChild(nombre);
            fila.appendChild(escudo);

            // Equipo
            const equipo = document.createElement("p");
            equipo.textContent = equip.equip;

            info.appendChild(fila);
            info.appendChild(equipo);

            // Montar tarjeta
            card.appendChild(img);
            card.appendChild(info);

            gridEntrenadores.appendChild(card);
        });
    });



    