let initialScroll = 0;

/**
 * Amaga el header quan es baixa el scroll i ho mostra quan es puja 
 * També es mostra sempre al principi de la pàgina
 */
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll < 50) {
        // Al principi, sempre visible
        header.classList.remove('amagat');
    } else if (currentScroll > initialScroll) {
        // Baixant → amaga
        document.querySelector('header').classList.add('amagat');
    } else {
        // Pujant → mostra
        document.querySelector('header').classList.remove('amagat');
    }

    initialScroll = currentScroll;
});