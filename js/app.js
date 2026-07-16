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
