const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { brand, need, message } = req.body;

  if (!brand || !message) {
    return res.status(400).json({ message: 'Lütfen gerekli alanları doldurun.' });
  }

  // Vercel ortam değişkenleri (.env) kullanılarak SMTP ayarları
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Sizin Gmail adresiniz
      pass: process.env.EMAIL_PASS  // Gmail Uygulama Şifreniz
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'mortibstudio@gmail.com', // E-postanın gideceği adres
    subject: `Yeni Proje Talebi: ${brand}`,
    text: `Marka/Ad: ${brand}\nİhtiyaç: ${need}\nMesaj: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Mesajınız başarıyla iletildi.' });
  } catch (error) {
    console.error('Mail Error:', error);
    return res.status(500).json({ message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' });
  }
}
