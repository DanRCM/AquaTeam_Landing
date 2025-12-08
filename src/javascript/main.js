// Esperamos a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. SCROLL REVEAL ANIMATION
  // Seleccionamos todo lo que tenga el atributo 'data-animate'
  const elementsToAnimate = document.querySelectorAll('[data-animate]');

  // Añadimos clase inicial
  elementsToAnimate.forEach(el => el.classList.add('hidden-element'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-element');
        entry.target.classList.remove('hidden-element');
      }
    });
  }, {
    threshold: 0.15 // Se activa cuando el 15% del elemento es visible
  });

  elementsToAnimate.forEach(el => observer.observe(el));

  // 2. NAV SCROLL EFFECT
  // Cambia el fondo del nav cuando bajas
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.85)";
      navbar.style.boxShadow = "none";
    }
  });

  // 3. LOGICA MENÚ MOVIL (SIMPLE)
  const hamburger = document.querySelector('.hamburger');
  // Aquí puedes añadir lógica para abrir un menú lateral si lo deseas
  if(hamburger) {
    hamburger.addEventListener('click', () => {
      alert("Aquí se desplegaría el menú móvil");
    });
  }
});