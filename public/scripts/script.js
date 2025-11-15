document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('satisfaction-form');
    const suggestions = document.getElementById('suggestions');
    const charCounter = document.getElementById('char-counter');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    const formStatus = document.getElementById('form-status');
    const termsAccept = document.getElementById('terms-accept');

    console.log('Elementos cargados:', { form, suggestions, submitBtn, termsAccept });

    // Contador de caracteres
    suggestions.addEventListener('input', () => {
        const remaining = suggestions.maxLength - suggestions.value.length;
        charCounter.textContent = `${remaining}/300`;
    });

    // Simulación de envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Formulario enviado. Terms checked:', termsAccept.checked);
        
        // Validar el formulario (incluyendo el checkbox requerido)
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Validar que el checkbox esté marcado (validación adicional)
        if (!termsAccept.checked) {
            formStatus.textContent = 'Debes aceptar los términos y condiciones para continuar.';
            formStatus.className = 'form-status error';
            return;
        }

        // Estado de carga
        btnText.textContent = 'Enviando...';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;
        formStatus.textContent = '';
        formStatus.className = 'form-status';

        // Simular una llamada a un backend
        setTimeout(() => {
            const isSuccess = Math.random() > 0.2; // 80% de éxito

            if (isSuccess) {
                formStatus.textContent = '¡Gracias por tu opinión! La hemos recibido correctamente.';
                formStatus.classList.add('success');
                form.reset();
                charCounter.textContent = '300/300';
            } else {
                formStatus.textContent = 'Hubo un error al enviar tu opinión. Por favor, inténtalo de nuevo.';
                formStatus.classList.add('error');
            }

            // Restaurar botón
            btnText.textContent = 'Enviar Opinión';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;

        }, 1500);
    });

    // --- Lógica del Formulario de Contacto ---
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');
    const contactCharCounter = document.getElementById('contact-char-counter');
    const contactFormStatus = document.getElementById('contact-form-status');

    // Contador de caracteres del formulario de contacto
    contactMessage.addEventListener('input', () => {
        const remaining = contactMessage.maxLength - contactMessage.value.length;
        contactCharCounter.textContent = `${remaining}/500`;
    });

    // Envío del formulario de contacto
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactFormStatus.textContent = '';
        contactFormStatus.className = 'form-status';

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        // Generar número de ticket aleatorio
        const ticketId = `TCK-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${new Date().getFullYear()}`;

        contactFormStatus.textContent = `¡Gracias por contactarnos! Tu mensaje ha sido recibido. Tu número de ticket es: ${ticketId}`;
        contactFormStatus.classList.add('success');
        
        contactForm.reset();
        contactCharCounter.textContent = '500/500';
    });

    // --- Lógica de la Sección FAQ ---
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSearch = document.getElementById('faq-search');
    const scrollToContactBtn = document.getElementById('scroll-to-contact');

    // Funcionalidad del acordeón
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            question.setAttribute('aria-expanded', !isExpanded);
            answer.style.maxHeight = isExpanded ? null : answer.scrollHeight + 'px';
            icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        });
    });

    // Funcionalidad de búsqueda
    faqSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question span').textContent.toLowerCase();
            if (questionText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Botón de scroll a contacto
    scrollToContactBtn.addEventListener('click', () => {
        document.getElementById('contact-section').scrollIntoView({
            behavior: 'smooth'
        });
    });

    // ===== FUNCIONALIDAD DEL CARRUSEL =====
    const slides = document.querySelectorAll('.carousel-slide');
    const nextBtn = document.querySelector('.carousel-controls .next');
    const prevBtn = document.querySelector('.carousel-controls .prev');

    if (slides.length > 0 && nextBtn && prevBtn) {
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, idx) => {
                slide.classList.toggle('active', idx === index);
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });

        // Auto-advance carrusel cada 6 segundos
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 6000);
    }
});
