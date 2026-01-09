import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUI } from '../../contexts/UIContext';
import clsx from 'clsx';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { openAuthModal } = useUI();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    // Replace current language prefix in URL with the new one
    const newPath = location.pathname.replace(`/${language}`, `/${newLang}`);
    navigate(newPath);
    setIsNavCollapsed(true);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeNav = () => setIsNavCollapsed(true);

  return (
    <nav className={clsx("navbar navbar-expand-lg navbar-light bg-white sticky-top", { "shadow-sm": isScrolled })}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-3" to={`/${language}`} onClick={closeNav}>
          {/* UPDATED LOGO IMAGE PATH */}
          <img src="/images/text.png" alt="Logo" width="80" height="80" style={{ objectFit: 'cover' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={clsx("collapse navbar-collapse flex-grow-0", { "show": !isNavCollapsed })} id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <Link className="nav-link" to={`/${language}`} onClick={closeNav}>{t('home')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${language}/#services`} onClick={closeNav}>{t('services')}</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${language}/about`} onClick={closeNav}>{t('about')}</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link text-decoration-none fw-bold" onClick={toggleLanguage}>
                {language === 'en' ? 'AR' : 'EN'}
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="btn btn-outline-primary"
                onClick={() => {
                  closeNav();
                  openAuthModal();
                }}
              >
                {language === 'en' ? 'Sign Up / Log In' : 'تسجيل / دخول'}
              </button>
            </li>
            <li className="nav-item">
              <Link to={`/${language}/quotation`} className="btn btn-primary px-4 py-2 fw-bold" onClick={closeNav}>
                {t('getQuote')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;