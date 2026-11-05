document.querySelectorAll('[data-contact]').forEach(link => {const service=link.dataset.service;const message=service?`Olá, VYSE! Gostaria de saber mais sobre ${service}.`:'Olá, VYSE! Gostaria de um orçamento de vídeos para minha empresa.';link.href=`https://wa.me/5521972273385?text=${encodeURIComponent(message)}`;});
document.getElementById('year').textContent=new Date().getFullYear();

const planRail = document.querySelector('.plan-grid');
const planNext = document.querySelector('.plan-next');
if (planRail && planNext) {
  planNext.addEventListener('click', () => {
    const cards = [...planRail.querySelectorAll('.product-plan')];
    if (!cards.length) return;
    const railRect = planRail.getBoundingClientRect();
    const inset = parseFloat(getComputedStyle(planRail).paddingLeft) || 0;
    let activeIndex = 0;
    let nearest = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - railRect.left - inset);
      if (distance < nearest) { nearest = distance; activeIndex = index; }
    });
    const target = cards[(activeIndex + 1) % cards.length];
    planRail.scrollTo({
      left: planRail.scrollLeft + target.getBoundingClientRect().left - railRect.left - inset,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    });
  });
}

function positionPlanArrow() {
  const section = document.querySelector('#planos');
  const artwork = document.querySelector('.product-plan .plan-art');
  if (!section || !artwork) return;
  const sectionRect = section.getBoundingClientRect();
  const artRect = artwork.getBoundingClientRect();
  section.style.setProperty('--plan-arrow-top', (artRect.top - sectionRect.top + artRect.height / 2) + 'px');
}
positionPlanArrow();
window.addEventListener('resize', positionPlanArrow);
window.addEventListener('load', positionPlanArrow);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(positionPlanArrow);

const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.getElementById('site-menu');
if (menuToggle && siteMenu) {
  function setMenuOpen(open, restoreFocus = false) {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    siteMenu.hidden = !open;
    if (restoreFocus) menuToggle.focus();
  }
  menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
  siteMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-menu')) setMenuOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') setMenuOpen(false, true);
  });
  document.addEventListener('focusin', event => {
    if (!event.target.closest('.header-menu')) setMenuOpen(false);
  });
}
