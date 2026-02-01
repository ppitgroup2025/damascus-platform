import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="footer mt-auto py-5 bg-light border-top">
      <div className="container">
        <div className="footer-links d-flex flex-wrap justify-content-center gap-4 mb-4">
          <Link to={`/${language}`} className="footer-link text-decoration-none text-muted">{t('home')}</Link>
          <Link to={`/${language}/#services`} className="footer-link text-decoration-none text-muted">{t('services')}</Link>
          <Link to={`/${language}/#how`} className="footer-link text-decoration-none text-muted">{language === 'en' ? 'How it Works' : 'كيف تعمل'}</Link>
          <Link to={`/${language}/#testimonials`} className="footer-link text-decoration-none text-muted">{t('testimonials')}</Link>
          <Link to={`/${language}/#faq`} className="footer-link text-decoration-none text-muted">{t('faq')}</Link>
          <Link to={`/${language}/#contact`} className="footer-link text-decoration-none text-muted">{t('contact')}</Link>
          <Link to={`/${language}/about`} className="footer-link text-decoration-none text-muted">{t('about')}</Link>
        </div>
        <div className="social-icons d-flex justify-content-center gap-3 mb-4">
          <a href="#" className="social-icon text-muted fs-5"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="social-icon text-muted fs-5"><i className="fab fa-twitter"></i></a>
          <a href="#" className="social-icon text-muted fs-5"><i className="fab fa-linkedin-in"></i></a>
          <a href="#" className="social-icon text-muted fs-5"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="mb-0 text-center">
          © {new Date().getFullYear()} {language === 'en' ? 'Damascus Translation Services. All rights reserved.' : 'دمشق لخدمات الترجمة. جميع الحقوق محفوظة.'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;