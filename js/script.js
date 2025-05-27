document.addEventListener('DOMContentLoaded', function() {
    // --- Atualiza o ano no rodapé ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Navegação Fixa com Mudança de Estilo ao Rolar ---
    const nav = document.getElementById('main-nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
    
    // --- Active link na navegação ---
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    const sections = document.querySelectorAll('main section[id]'); // Seleciona seções com ID dentro do main

    function updateActiveLink() {
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - nav.offsetHeight - 50; // Ajuste com altura da nav e um offset
            if (window.scrollY >= sectionTop) {
                currentSectionId = "#" + section.getAttribute('id');
            }
        });

        // Caso especial para o topo da página (hero section)
        if (window.scrollY < (document.getElementById('hero-section').offsetHeight - nav.offsetHeight) / 2 ) {
             currentSectionId = "#hero-section";
        }


        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);


    // --- Contador Regressivo ---
    // Data da eleição: 06 de Julho de 2025, 09:00:00 (DOMINGO)
    const electionDate = new Date(2025, 6, 6, 9, 0, 0).getTime(); // Corrigido para 2025

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = electionDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        if (distance < 0) {
            clearInterval(timerInterval);
            const timerDiv = document.getElementById('timer');
            const countdownTitle = document.querySelector('#countdown-timer h3');
            if (timerDiv) {
                timerDiv.innerHTML = "<span style='font-size: 1.5rem; color: var(--primary-red);'>A ELEIÇÃO COMEÇOU OU JÁ ACONTECEU!</span>";
            }
            if (countdownTitle) {
                countdownTitle.style.display = 'none';
            }
        }
    }, 1000);

    // --- Inicializar AOS (Animate On Scroll) ---
    AOS.init({
        duration: 800,
        once: true,   
        offset: 50,   
    });

    // --- Adicionar evento ao calendário ---
    document.getElementById('add-to-calendar').addEventListener('click', function() {
        const event = {
            title: 'Eleições Diretas do PT - Vote Nelsinho',
            location: 'Emef Marechal Bittencourt, Rua Avelino Lopes, Centro - Osasco',
            description: 'Participe das eleições diretas do PT e vote no Nelsinho para Presidente do PT Osasco!',
            startDate: '20250706T120000Z', // Corrigido para 2025
            endDate: '20250706T200000Z',   // Corrigido para 2025
        };

        const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}
DTSTART:${event.startDate}
DTEND:${event.endDate}
END:VEVENT
END:VCALENDAR
        `.trim();

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'eleicao-pt-nelsinho.ics';
        link.click();

        URL.revokeObjectURL(url);
    });

    // --- Lógica do Modal ---
    const modal = document.getElementById("chapaModal");
    const openModalBtn = document.getElementById("openModal");
    const closeModalBtn = document.querySelector(".close");

    // Abre o modal
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Fecha o modal ao clicar no botão de fechar
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Fecha o modal ao clicar fora do conteúdo
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});