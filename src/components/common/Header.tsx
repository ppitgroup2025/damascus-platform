import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { useUI } from '../../contexts/UIContext';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const { openAuthModal } = useUI();
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    const newPath = location.pathname.replace(`/${language}`, `/${newLang}`);
    navigate(newPath);
    setIsNavCollapsed(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate(`/${language}`);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      // Auto-collapse mobile menu on scroll for smooth user experience
      if (window.scrollY > 20 && !isNavCollapsed) {
        setIsNavCollapsed(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNavCollapsed]);

  const closeNav = () => setIsNavCollapsed(true);

  return (
    <nav className={clsx("navbar navbar-expand-lg navbar-light bg-white sticky-top", { "shadow-sm": isScrolled })}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-3" to={`/${language}`} onClick={closeNav}>
          <img src="/images/text.png" alt="Logo" width="80" height="80" style={{ objectFit: 'cover' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={clsx("collapse navbar-collapse", { "show": !isNavCollapsed })} id="navbarNav">
          <ul className={clsx("navbar-nav align-items-center gap-2 pt-3 pt-lg-0", language === 'ar' ? 'me-auto' : 'ms-auto')}>
            <li className="nav-item w-100 w-lg-auto">
              <Link className="navbar-custom-btn w-100" to={`/${language}`} onClick={closeNav}>{t('home')}</Link>
            </li>
            <li className="nav-item w-100 w-lg-auto">
              <Link className="navbar-custom-btn w-100" to={`/${language}/#services`} onClick={closeNav}>{t('services')}</Link>
            </li>
            <li className="nav-item w-100 w-lg-auto">
              <Link className="navbar-custom-btn w-100" to={`/${language}/about`} onClick={closeNav}>{t('about')}</Link>
            </li>
            <li className="nav-item w-100 w-lg-auto">
              <button className="navbar-custom-btn fw-bold w-100" onClick={toggleLanguage}>
                {language === 'en' ? 'AR' : 'EN'}
              </button>
            </li>
            <li className="nav-item w-100 w-lg-auto">
              {currentUser ? (
                <div className="dropdown w-100">
                  <button 
                    className="navbar-custom-btn dropdown-toggle w-100 d-flex align-items-center justify-content-center gap-2" 
                    type="button" 
                    id="userDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                  >
                    <div 
                      className="rounded-circle d-flex align-items-center justify-content-center" 
                      style={{ width: '28px', height: '28px', fontSize: '12px', backgroundColor: 'var(--primary)', color: 'white' }}
                    >
                      {currentUser.email?.[0].toUpperCase() || 'U'}
                    </div>
                  </button>
                  <ul className={clsx("dropdown-menu dropdown-menu-end shadow-sm", { "text-end": language === 'ar', "w-100": true })} aria-labelledby="userDropdown">
                    <li className="px-3 py-2 border-bottom small text-muted">
                      {currentUser.email}
                    </li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className={clsx("fas fa-sign-out-alt", language === 'ar' ? 'ms-2' : 'me-2')}></i>
                        {language === 'en' ? 'Log Out' : 'تسجيل الخروج'}
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <button 
                  className="navbar-custom-btn w-100 fw-bold"
                  onClick={() => {
                    closeNav();
                    openAuthModal();
                  }}
                >
                  {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                </button>
              )}
            </li>
            <li className="nav-item w-100 w-lg-auto">
              <Link to={`/${language}/quotation`} className="navbar-custom-btn fw-bold w-100" onClick={closeNav}>
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
