document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. LÓGICA DEL OBSERVAR DE SCROLL (Salto Vertical)
    // ==========================================================================
    const snapContainer = document.querySelector('.snap-container');
    
    if (snapContainer) {
        const observerOptions = {
            root: snapContainer, 
            rootMargin: '0px', 
            threshold: 0.5 
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('en-pantalla');
                } else {
                    entry.target.classList.remove('en-pantalla');
                }
            });
        }, observerOptions);

        const tarjetas = document.querySelectorAll('.reveal-scroll-item');
        tarjetas.forEach(tarjeta => {
            scrollObserver.observe(tarjeta);
        });
    }

    // ==========================================================================
    // 2. LÓGICA DEL CARRUSEL DE PROYECTOS (Scroll Horizontal)
    // ==========================================================================
    const track = document.querySelector('.carousel-track');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const dots = document.querySelectorAll('.carousel-pagination .dot');

    if (track && btnPrev && btnNext) {
        const scrollAmount = 396; 

        btnNext.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        track.addEventListener('scroll', () => {
            const scrollRatio = track.scrollLeft / (track.scrollWidth - track.clientWidth);
            let activeIndex = Math.round(scrollRatio * (dots.length - 1));
            activeIndex = Math.max(0, Math.min(activeIndex, dots.length - 1));

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                track.scrollTo({ left: index * scrollAmount, behavior: 'smooth' });
            });
        });
    }
});