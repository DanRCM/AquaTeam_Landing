// main.js
import { saveVote } from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SCROLL REVEAL CON DELAY
  // Buscamos todo lo que tenga 'data-animate' O las clases 'fade-in-up'
  const elementsToAnimate = document.querySelectorAll('[data-animate], .fade-in-up');

  // Añadimos la clase para ocultarlos inicialmente
  elementsToAnimate.forEach(el => {
    el.classList.add('hidden-element');
    
    // Si el elemento tiene un style="--delay: Xms", el CSS transition-delay lo usará automáticamente
    // Pero asegurémonos de leerlo si queremos control extra en JS (opcional)
    const delay = el.style.getPropertyValue('--delay');
    if(delay) {
      el.style.transitionDelay = delay;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Añadimos la clase para mostrar
        entry.target.classList.add('show-element');
        entry.target.classList.remove('hidden-element');
        
        // Dejamos de observar una vez que ya apareció (para que no parpadee al subir y bajar)
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Un poco más sensible (10%)
    rootMargin: "0px 0px -50px 0px" // Activa un poco antes de llegar abajo
  });

  elementsToAnimate.forEach(el => observer.observe(el));


  // 2. NAV SCROLL EFFECT
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
    } else {
      navbar.style.boxShadow = "none";
      navbar.style.background = "rgba(255, 255, 255, 0.85)";
    }
  });

  // 3. MENU MOVIL
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if(hamburger) {
    hamburger.addEventListener('click', () => {
      // Toggle simple para mostrar menú en movil
      // Por ahora un alert simple como placeholder o una clase 'active'
      const isActive = navLinks.style.display === 'flex';
      
      if(!isActive && window.innerWidth < 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.right = '5%';
        navLinks.style.background = 'white';
        navLinks.style.padding = '2rem';
        navLinks.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        navLinks.style.borderRadius = '10px';
      } else {
         navLinks.style.display = ''; // Revertir a CSS original
      }
    });
  }

// 4. LÓGICA DE ENCUESTA FIREBASE
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const userNameInput = document.getElementById('user-name');
  
  const pollForm = document.getElementById('poll-form');
  const pollLoading = document.getElementById('poll-loading');
  const pollThanks = document.getElementById('poll-thanks');
  const pollError = document.getElementById('poll-error');
  const thanksNameSpan = document.getElementById('thanks-name');

  const handleVote = async (decision) => {
    // 1. Validar nombre (Opcional, pero recomendado)
    const userName = userNameInput.value.trim() || "Anónimo";

    // 2. UI de Carga
    pollForm.style.display = 'none'; // Ocultamos formulario
    pollLoading.style.display = 'block'; // Mostramos "Guardando..."
    pollError.style.display = 'none';

    console.log("Intentando guardar voto:", decision, "Usuario:", userName); // Para debug

    // 3. Intentar guardar
    const success = await saveVote(decision, userName);

    // 4. Ocultar carga
    pollLoading.style.display = 'none';

    if (success) {
      console.log("¡Voto guardado con éxito!");
      // Personalizar mensaje
      if(userName !== "Anónimo") {
        thanksNameSpan.textContent = userName;
      }
      // Mostrar gracias
      pollThanks.style.display = 'block';
      setTimeout(() => {
        pollThanks.classList.remove('hidden-element');
        pollThanks.classList.add('show-element');
      }, 10);
    } else {
      console.error("Falló el guardado en Firebase.");
      // Mostrar error y volver a mostrar formulario
      pollError.style.display = 'block';
      pollForm.style.display = 'block'; // Devolvemos el form para que intente de nuevo
    }
  };

  if(btnYes && btnNo) {
    btnYes.addEventListener('click', () => handleVote('SI'));
    btnNo.addEventListener('click', () => handleVote('NO'));
  }
});