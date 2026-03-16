fetch('/data/FM_partits_masc.json')
    .then(res => res.json())
    .then(partits => {
        const container = document.getElementById('partits-container');

        partits.forEach((partit, index) => {
            const [goalsLocal, goalsVisitant] = partit.resultat.split('-');

            const card = document.createElement('div');
            card.classList.add('partit', index === 0 ? 'destacat' : 'simple');

            // Format destacat
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

                const noms = document.createElement('div');
                noms.classList.add('noms-destacat');

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
                // Format simple
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

            container.appendChild(card);
        });
    })
    .catch(err => console.error('Error carregant partits:', err));