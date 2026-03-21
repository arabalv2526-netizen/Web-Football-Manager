const escuts = {
    'FC Barcelona': '../img/escuts/barcelona.png',
    'Real Madrid CF': '../img/escuts/real-madrid.png',
    'Atlético de Madrid': '../img/escuts/atletico-madrid.png',
    'Sevilla FC': '../img/escuts/sevilla.png',
    'Real Sociedad': '../img/escuts/real-sociedad.png',
    'Real Betis': '../img/escuts/betis.png',
    'Athletic Club': '../img/escuts/athletic.png',
    'Valencia CF': '../img/escuts/valencia.png',
    'RCD Espanyol': '../img/escuts/espanyol.png',
    'Deportivo Abanca': '../img/escuts/deportivo.png',
    'SD Eibar': '../img/escuts/eibar.png',
    'Granada CF': '../img/escuts/granada.png',
    'Levante UD': '../img/escuts/levante.png',
    'Las Palmas': '../img/escuts/las-palmas.png',
    'Real Valladolid': '../img/escuts/valladolid.png',
    'Cádiz CF': '../img/escuts/cadiz.png',
    'Rayo Vallecano': '../img/escuts/rayo-vallecano.png',
    'Leganés': '../img/escuts/leganes.png',
    'Alavés': '../img/escuts/alaves.png',
    'Celta Vigo': '../img/escuts/celta-vigo.png'
};


Promise.all([
    fetch('data/FM_partits_masc.json').then(res => res.json()),
    fetch('data/jugadores.json').then(res => res.json())
])
.then(([partits, equips]) => {
    const equipsOrdenats = [...equips]
        .map(equip => ({
            ...equip,
            mitja: Math.round(equip.jugadors.reduce((acc, j) => acc + j.qualitat, 0) / equip.jugadors.length)
        }))
        .sort((a, b) => b.mitja - a.mitja);

    renderPartits(partits);
    renderClassificacio(equipsOrdenats);
    renderGolejadors(equips);
    renderPodio(equipsOrdenats);
})
.catch(err => console.error('Error carregant dades:', err));


// Podio dels 3 primers equips
function renderPodio(equips) {
    const container = document.querySelector('.podio-equips');

    const ordrePodio = [equips[1], equips[0], equips[2]];

    ordrePodio.forEach(equip => {
        const div = document.createElement('div');
        div.classList.add('equip');

        const img = document.createElement('img');
        img.src = escuts[equip.equip] || equip.escut;
        img.alt = equip.equip;

        const span = document.createElement('span');
        span.textContent = equip.equip;

        div.append(img, span);
        container.appendChild(div);
    });
}

// Partits destacats i restants
function renderPartits(partits) {
    const container = document.getElementById('partits-container');

    partits.forEach((partit, index) => {
        const [goalsLocal, goalsVisitant] = partit.resultat.split('-');
        const card = document.createElement('div');
        card.classList.add('partit', index === 0 ? 'destacat' : 'simple');

        if (index === 0) {
            const estat = document.createElement('span');
            estat.classList.add('estat');
            estat.textContent = 'FINALITZAT';

            const fila = document.createElement('div');
            fila.classList.add('fila-destacat');

            const escutLocal = document.createElement('img');
            escutLocal.src = partit.equip_local.escut;
            escutLocal.classList.add('escut');

            const resultat = document.createElement('div');
            resultat.classList.add('resultat-gran');
            resultat.textContent = `${goalsLocal} - ${goalsVisitant}`;

            const escutVisitant = document.createElement('img');
            escutVisitant.src = partit.equip_visitant.escut;
            escutVisitant.classList.add('escut');

            fila.append(escutLocal, resultat, escutVisitant);

            const nomLocal = document.createElement('span');
            nomLocal.classList.add('equip-nom-destacat');
            nomLocal.textContent = partit.equip_local.nom.toUpperCase();

            const nomVisitant = document.createElement('span');
            nomVisitant.classList.add('equip-nom-destacat');
            nomVisitant.textContent = partit.equip_visitant.nom.toUpperCase();

            fila.prepend(nomLocal);
            fila.append(nomVisitant);
            card.append(estat, fila);

        } else {
            const nomLocal = document.createElement('span');
            nomLocal.classList.add('equip-nom', 'local');
            nomLocal.textContent = partit.equip_local.nom;

            const escutLocal = document.createElement('img');
            escutLocal.src = partit.equip_local.escut;
            escutLocal.classList.add('escut-petit');

            const resultat = document.createElement('div');
            resultat.classList.add('resultat-petit');

            const gols = document.createElement('div');
            gols.classList.add('gols');

            const gLocal = document.createElement('span');
            gLocal.textContent = goalsLocal;

            const separador = document.createElement('span');
            separador.textContent = '-';

            const gVisitant = document.createElement('span');
            gVisitant.textContent = goalsVisitant;

            gols.append(gLocal, separador, gVisitant);

            const estat = document.createElement('span');
            estat.classList.add('estat-simple');
            estat.textContent = 'FINALITZAT';

            resultat.append(gols, estat);

            const escutVisitant = document.createElement('img');
            escutVisitant.src = partit.equip_visitant.escut;
            escutVisitant.classList.add('escut-petit');

            const nomVisitant = document.createElement('span');
            nomVisitant.classList.add('equip-nom', 'visitant');
            nomVisitant.textContent = partit.equip_visitant.nom;

            card.append(nomLocal, escutLocal, resultat, escutVisitant, nomVisitant);
        }

        setTimeout(() => card.classList.add('visible'), index * 100);
        container.appendChild(card);
    });
}

// Classificació general
function renderClassificacio(equips) {
    const container = document.querySelector('.classificacio');

    const titol = document.createElement('h2');
    titol.classList.add('title');
    titol.textContent = 'CLASSIFICACIÓ';

    const subtitol = document.createElement('p');
    subtitol.classList.add('sub-title');
    subtitol.textContent = 'Temporada 2025/26';

    const capcalera = document.createElement('div');
    capcalera.classList.add('clas-cols');

    const colPos = document.createElement('span');
    colPos.textContent = 'POS';
    const colEquip = document.createElement('span');
    colEquip.textContent = 'EQUIP';
    const colQual = document.createElement('span');
    colQual.textContent = 'VAL';

    capcalera.append(colPos, colEquip, colQual);
    container.append(titol, subtitol, capcalera);

    equips.forEach((equip, index) => {
        const pos = index + 1;

        const fila = document.createElement('div');
        fila.classList.add('clas-fila');
        if (pos <= 3) fila.classList.add(`top-${pos}`);

        const spanPos = document.createElement('span');
        spanPos.classList.add('clas-pos');
        spanPos.textContent = pos;

        const divEquip = document.createElement('div');
        divEquip.classList.add('clas-equip');

        const escut = document.createElement('img');
        escut.src = escuts[equip.equip] || equip.escut;
        escut.alt = equip.equip;

        const nomEquip = document.createElement('span');
        nomEquip.textContent = equip.equip;

        divEquip.append(escut, nomEquip);

        const spanVal = document.createElement('span');
        spanVal.classList.add('clas-pts');
        spanVal.textContent = equip.mitja;

        fila.append(spanPos, divEquip, spanVal);
        container.appendChild(fila);
    });
}

// Top jugadores golejadores
function renderGolejadors(equips) {
    const container = document.querySelector('.top-jugadors');
    const posLabels = ['1ª', '2ª', '3ª', '4ª', '5ª'];

    const top5 = equips
        .flatMap(equip => equip.jugadors.map(j => ({
            ...j,
            nomEquip: equip.equip
        })))
        .sort((a, b) => b.qualitat - a.qualitat)
        .slice(0, 5);

    const titol = document.createElement('h2');
    titol.classList.add('title');
    titol.textContent = 'TOP 5 JUGADORES';

    const subtitol = document.createElement('p');
    subtitol.classList.add('sub-title');
    subtitol.textContent = 'Lliga F 2025/26';

    container.append(titol, subtitol);

    top5.forEach((jugadora, index) => {
        const fila = document.createElement('div');
        fila.classList.add('gol-fila');

        const spanPos = document.createElement('span');
        spanPos.classList.add('gol-pos');
        spanPos.textContent = posLabels[index];

        const foto = document.createElement('img');
        foto.src = jugadora.foto;
        foto.alt = jugadora.nomPersona;

        const info = document.createElement('div');
        info.classList.add('gol-info');

        const nom = document.createElement('span');
        nom.classList.add('gol-nom');
        nom.textContent = jugadora.nomPersona;

        const equip = document.createElement('span');
        equip.classList.add('gol-equip');
        equip.textContent = jugadora.nomEquip.toUpperCase();

        info.append(nom, equip);

        const divGols = document.createElement('div');
        divGols.classList.add('gol-gols');

        const num = document.createElement('span');
        num.classList.add('gol-num');
        num.textContent = jugadora.qualitat;

        const label = document.createElement('span');
        label.classList.add('gol-label');
        label.textContent = 'QUAL';

        divGols.append(num, label);

        fila.append(spanPos, foto, info, divGols);
        container.appendChild(fila);
    });

    const boto = document.createElement('a');
    boto.classList.add('veure-mes');
    boto.textContent = 'VEURE TOTES LES JUGADORES';
    boto.href = 'equips.html';
    container.appendChild(boto);
}