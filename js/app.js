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
}

langToggle.addEventListener('click', () => setLanguage(currentLang === 'tr' ? 'en' : 'tr'));

document.getElementById('brief-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const brief = currentLang === 'tr'
    ? `Yeni proje talebi\n\nMarka: ${data.get('brand')}\nİhtiyaç: ${data.get('need')}\nNot: ${data.get('message')}`
    : `New project inquiry\n\nBrand: ${data.get('brand')}\nNeed: ${data.get('need')}\nNotes: ${data.get('message')}`;
  const result = document.querySelector('.form-result');
  try {
    await navigator.clipboard.writeText(brief);
    result.textContent = currentLang === 'tr' ? 'Proje özeti panonuza kopyalandı. İletişim kanalı eklendiğinde doğrudan gönderebilirsiniz.' : 'Your project brief is copied. You can send it directly once the contact channel is added.';
  } catch {
    result.textContent = currentLang === 'tr' ? 'Proje özetiniz hazır. İletişim kanalı eklendiğinde doğrudan gönderebilirsiniz.' : 'Your project brief is ready. You can send it directly once the contact channel is added.';
  }
});

const projectTrigger = document.querySelector('.project-large');
const projectModal = document.getElementById('pennylane-modal');
const projectPanel = projectModal?.querySelector('.project-modal-panel');
let lastFocusedElement;

function closeProjectModal() {
  if (!projectModal || projectModal.hidden) return;
  projectModal.hidden = true;
  document.body.style.overflow = '';
  lastFocusedElement?.focus();
}

function openProjectModal() {
  if (!projectModal) return;
  lastFocusedElement = document.activeElement;
  projectModal.hidden = false;
  document.body.style.overflow = 'hidden';
  projectPanel?.focus();
}

if (projectTrigger) {
  projectTrigger.classList.add('project-trigger');
  projectTrigger.tabIndex = 0;
  projectTrigger.setAttribute('role', 'button');
  projectTrigger.setAttribute('aria-haspopup', 'dialog');
  projectTrigger.setAttribute('aria-controls', 'pennylane-modal');
  projectTrigger.addEventListener('click', openProjectModal);
  projectTrigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectModal();
    }
  });
}

projectModal?.querySelectorAll('[data-project-close]').forEach((control) => control.addEventListener('click', closeProjectModal));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeProjectModal();
});
