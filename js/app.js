const langToggle = document.querySelector('.lang-toggle');
let currentLang = 'tr';

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-tr][data-en]').forEach((element) => {
    element.innerHTML = element.dataset[lang];
  });
  document.querySelectorAll('.lang-toggle span').forEach((span) => span.classList.remove('active'));
  document.querySelector(`.lang-toggle span${lang === 'tr' ? ':first-child' : ':last-child'}`).classList.add('active');
  syncMoreWorkToggle();
}

langToggle.addEventListener('click', () => setLanguage(currentLang === 'tr' ? 'en' : 'tr'));

document.getElementById('brief-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const result = document.querySelector('.form-result');
  
  submitBtn.disabled = true;
  result.textContent = currentLang === 'tr' ? 'Gönderiliyor...' : 'Sending...';

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        brand: data.get('brand'),
        need: data.get('need'),
        message: data.get('message')
      })
    });
    
    if (response.ok) {
      result.textContent = currentLang === 'tr' ? 'Mesajınız başarıyla iletildi.' : 'Your message has been sent successfully.';
      form.reset();
    } else {
      const errorData = await response.json();
      result.textContent = errorData.message || (currentLang === 'tr' ? 'Bir hata oluştu.' : 'An error occurred.');
    }
  } catch (err) {
    result.textContent = currentLang === 'tr' ? 'Bağlantı hatası oluştu.' : 'Connection error occurred.';
  } finally {
    submitBtn.disabled = false;
  }
});

function wireProjectModal(trigger, modal) {
  if (!trigger || !modal) return;
  const panel = modal.querySelector('.project-modal-panel');
  let lastFocusedElement;

  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    lastFocusedElement?.focus();
  };

  const openModal = () => {
    lastFocusedElement = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    panel?.focus();
  };

  trigger.classList.add('project-trigger');
  trigger.tabIndex = 0;
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', modal.id);
  trigger.addEventListener('click', openModal);
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openModal();
    }
  });
  modal.querySelectorAll('[data-project-close]').forEach((control) => control.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

const moreWorkToggle = document.querySelector('[data-more-work-toggle]');
const otherWorkGrid = document.getElementById('other-work-grid');

function syncMoreWorkToggle() {
  if (!moreWorkToggle || !otherWorkGrid) return;
  const isExpanded = moreWorkToggle.getAttribute('aria-expanded') === 'true';
  moreWorkToggle.dataset.tr = isExpanded ? 'Diğer çalışmaları gizle' : 'Diğer çalışmaları göster';
  moreWorkToggle.dataset.en = isExpanded ? 'Hide more work' : 'Show more work';
  moreWorkToggle.innerHTML = moreWorkToggle.dataset[currentLang];
}

if (moreWorkToggle && otherWorkGrid) {
  syncMoreWorkToggle();
  moreWorkToggle.addEventListener('click', () => {
    const shouldExpand = moreWorkToggle.getAttribute('aria-expanded') !== 'true';
    moreWorkToggle.setAttribute('aria-expanded', String(shouldExpand));
    otherWorkGrid.hidden = !shouldExpand;
    syncMoreWorkToggle();
  });
}

wireProjectModal(document.querySelector('.project-large'), document.getElementById('pennylane-modal'));
wireProjectModal(document.querySelector('img[src$="sdesign-mockup.jpg"]')?.closest('.project'), document.getElementById('sdesign-modal'));
wireProjectModal(document.querySelector('.elit-project'), document.getElementById('elitkoz-modal'));
wireProjectModal(document.querySelector('.falbaz-project'), document.getElementById('falbaz-modal'));
wireProjectModal(document.querySelector('.dicle-project'), document.getElementById('dicle-modal'));
