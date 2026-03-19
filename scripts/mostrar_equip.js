// 1. Leer el parámetro ?team=...
const params = new URLSearchParams(window.location.search);
const teamName = params.get("team");

// 2. Seleccionar contenedores del HTML
const infoEquip = document.getElementById("info-equip");
const entrenadorBox = document.getElementById("entrenador");
const jugadoresBox = document.getElementById("jugadores-equip");

// 3. Cargar JSON
fetch("data/jugadores.json")
    .then(res => res.json())
    .then(data => {
        const equip = data.find(e => e.equip === teamName);

        if (!equip) {
            const p = document.createElement("p");
            p.textContent = "Equip no trobat.";
            infoEquip.appendChild(p);
            return;
        }

        // -------------------------
        // CABECERA DEL EQUIPO
        // -------------------------

        const img = document.createElement("img");
        img.src = equip.escut;
        img.alt = "Escut " + equip.equip;
        img.classList.add("escut-equip");

        const textDiv = document.createElement("div");
        textDiv.classList.add("text-equip");

        const h1 = document.createElement("h1");
        h1.textContent = equip.equip;

        textDiv.appendChild(h1);

        infoEquip.appendChild(img);
        infoEquip.appendChild(textDiv);

        // -------------------------
        // ENTRENADOR
        // -------------------------

        const h2Entr = document.createElement("h2");
        h2Entr.textContent = "ENTRENADOR";

        const card = document.createElement("div");
        card.classList.add("entrenador-card");

        const imgEntr = document.createElement("img");
        imgEntr.src = equip.entrenador.foto;
        imgEntr.alt = equip.entrenador.nomPersona;

        const infoEntr = document.createElement("div");
        infoEntr.classList.add("entrenador-info");

        const h3Entr = document.createElement("h3");
        h3Entr.textContent = equip.entrenador.nomPersona;

        infoEntr.appendChild(h3Entr);
        card.appendChild(imgEntr);
        card.appendChild(infoEntr);

        entrenadorBox.appendChild(h2Entr);
        entrenadorBox.appendChild(card);

        // -------------------------
        // JUGADORES
        // -------------------------

        equip.jugadors.forEach(j => {
            const card = document.createElement("div");
            card.classList.add("jugador-card");

            const img = document.createElement("img");
            img.src = j.foto;
            img.alt = j.nomPersona;

            const h3 = document.createElement("h3");
            h3.textContent = j.nomPersona;

            const pos = document.createElement("p");
            pos.classList.add("posicio");
            pos.textContent = j.posicio;

            const dorsal = document.createElement("p");
            dorsal.textContent = "Dorsal: " + j.dorsal;

            const qualitat = document.createElement("p");
            qualitat.textContent = "Qualitat: " + j.qualitat;

            card.appendChild(img);
            card.appendChild(h3);
            card.appendChild(pos);
            card.appendChild(dorsal);
            card.appendChild(qualitat);

            jugadoresBox.appendChild(card);
        });
    })
    .catch(err => {
        console.error(err);
        const p = document.createElement("p");
        p.textContent = "Error carregant les dades.";
        infoEquip.appendChild(p);
    });


// ===============================
//   MOSTRAR JUGADORA INDIVIDUAL
// ===============================

const paramsJug = new URLSearchParams(window.location.search);
const nombreJugadora = paramsJug.get("nombre");

// Solo ejecutar si estamos en la página de jugadora
if (nombreJugadora) {

    const infoJugadoraHeader = document.getElementById("info-jugadora");

    // 1. Cargar datos de la jugadora
    fetch("data/info_jugadoras.json")
        .then(res => res.json())
        .then(data => {

            const jugadora = data.find(j => j.nombre === nombreJugadora);
            if (!jugadora) return;

            // Rellenar ficha de jugadora
            document.getElementById("nom").textContent = jugadora.nombre;
            document.getElementById("foto").src = jugadora.foto;
            document.getElementById("posicio").textContent = "Posició: " + jugadora.posicion;
            document.getElementById("dorsal").textContent = "Dorsal: " + jugadora.dorsal;
            document.getElementById("qualitat").textContent = "Qualitat: " + jugadora.calidad;

            // 2. Cargar escudo del equipo de la jugadora
            fetch("data/jugadores.json")
                .then(res => res.json())
                .then(equipos => {

                    const equip = equipos.find(e => e.equip === jugadora.equipo);
                    if (!equip) return;

                    // Crear escudo + nombre del equipo
                    const img = document.createElement("img");
                    img.src = equip.escut;
                    img.alt = "Escut " + equip.equip;
                    img.classList.add("escut-equip");

                    const textDiv = document.createElement("div");
                    textDiv.classList.add("text-equip");

                    const h1 = document.createElement("h1");
                    h1.textContent = equip.equip;

                    textDiv.appendChild(h1);

                    // Insertar en la cabecera de jugadora
                    infoJugadoraHeader.appendChild(img);
                    infoJugadoraHeader.appendChild(textDiv);
                });
        });
}