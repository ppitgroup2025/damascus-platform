import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="footer mt-auto">
      <div className="container">
        <div className="footer-links">
          <a href="#" className="footer-link">{t('home')}</a>
          <a href="#services" className="footer-link">{t('services')}</a>
          <a href="#how" className="footer-link">{language === 'en' ? 'How it Works' : 'كيف تعمل'}</a>
          <a href="#testimonials" className="footer-link">{t('testimonials')}</a>
          <a href="#faq" className="footer-link">{t('faq')}</a>
          <a href="#contact" className="footer-link">{t('contact')}</a>
          <a href="#" className="footer-link">{t('privacyPolicy')}</a>
          <a href="#" className="footer-link">{t('terms')}</a>
        </div>
        <div className="social-icons">
          <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="mb-0 text-center">
          © {new Date().getFullYear()} {language === 'en' ? 'Damascus Translation Services. All rights reserved.' : 'دمشق لخدمات الترجمة. جميع الحقوق محفوظة.'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;