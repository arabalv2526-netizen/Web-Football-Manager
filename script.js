let initialScroll = 0;

/**
 * Amaga el header quan es baixa el scroll i ho mostra quan es puja 
 * També es mostra sempre al principi de la pàgina
 */
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll < 50) {
        header.classList.remove('amagat');
    } else if (currentScroll > initialScroll) {
        header.classList.add('amagat');
    } else {
        header.classList.remove('amagat');
    }

    initialScroll = currentScroll;
});

