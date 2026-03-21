fetch('data/partits_proxims.json')
    .then(res => res.json())
    .then(partits => {
        const container = document.getElementById("llista-partits");

        partits.sort((a, b) => new Date(a.data) - new Date(b.data));

        partits.forEach(partit => {
            const div = document.createElement("div");
            div.classList.add("partit");

            const dataHora = document.createElement("p");
            dataHora.classList.add("data-hora");

            const data = new Date(partit.data);
            const options = { weekday: "long", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" };
            dataHora.textContent = data.toLocaleString("ca-ES", options).toUpperCase();

            const equips = document.createElement("div");
            equips.classList.add("equips");

            const local = document.createElement("div");
            local.classList.add("equip");

            const escutLocal = document.createElement("img");
            escutLocal.src = partit.equip_local.escut;
            escutLocal.alt = partit.equip_local.nom;

            const nomLocal = document.createElement("span");
            nomLocal.textContent = partit.equip_local.nom;

            local.appendChild(escutLocal);
            local.appendChild(nomLocal);

            const vs = document.createElement("span");
            vs.classList.add("vs");
            vs.textContent = "VS";

            const visitant = document.createElement("div");
            visitant.classList.add("equip");

            const escutVisitant = document.createElement("img");
            escutVisitant.src = partit.equip_visitant.escut;
            escutVisitant.alt = partit.equip_visitant.nom;

            const nomVisitant = document.createElement("span");
            nomVisitant.textContent = partit.equip_visitant.nom;

            visitant.appendChild(escutVisitant);
            visitant.appendChild(nomVisitant);

            equips.appendChild(local);
            equips.appendChild(vs);
            equips.appendChild(visitant);

            const camp = document.createElement("p");
            camp.classList.add("camp");
            camp.textContent = partit.camp;

            div.appendChild(dataHora);
            div.appendChild(equips);
            div.appendChild(camp);

            container.appendChild(div);
        });
    });
