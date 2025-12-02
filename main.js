const navLinks = document.querySelectorAll('#main-nav a');
const checkbox = document.getElementById('menu-toggle-checkbox');

if (navLinks.length > 0 && checkbox) {
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Desmarca la casilla (cierra el menú)
            if (checkbox.checked) {
                checkbox.checked = false;
            }
        });
    });
}

const contactForm = document.querySelector('.contact-form');
const formActionUrl = contactForm ? contactForm.getAttribute('action') : null;

if (contactForm && formActionUrl) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // SIEMPRE detenemos el envío por defecto para manejarlo con fetch

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // 1. Validar y Confirmar
        if (nombre === '' || email === '' || mensaje === '') {
            alert('Por favor, completa todos los campos obligatorios antes de enviar.');
            return; 
        }

        const confirmacion = confirm('¿Estás seguro de que deseas enviar este mensaje?');

        if (!confirmacion) {
            return; // Si el usuario cancela, salimos de la función sin enviar
        }
        
        // Opcional: Deshabilitar el botón y mostrar que se está cargando
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        // 2. Enviar los datos de forma asíncrona (usando la URL de Formspree)
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(formActionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // 3. Si es exitoso, vaciamos el formulario y notificamos
                contactForm.reset();
                alert('¡Mensaje enviado con éxito! Te contactaré pronto.'); 
            } else {
                // Manejo de errores de Formspree
                alert('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error de red:', error);
            alert('Error de conexión. Verifica tu red o intenta más tarde.');
        } finally {
            // Habilitar el botón nuevamente
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar Mensaje';
        }
    });
}