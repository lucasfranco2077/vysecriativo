document.querySelectorAll('[data-contact]').forEach(link => {const service=link.dataset.service;const message=service?`Olá, VYSE! Gostaria de saber mais sobre ${service}.`:'Olá, VYSE! Quero conversar sobre vídeos estratégicos e tráfego pago para minha empresa.';link.href=`https://wa.me/5521972273385?text=${encodeURIComponent(message)}`;});
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
