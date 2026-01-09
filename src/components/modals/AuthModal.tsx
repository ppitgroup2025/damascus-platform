import { useRef, useEffect } from 'react';
import { useUI } from '../../contexts/UIContext';
import { useLanguage } from '../../contexts/LanguageContext';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useUI();
  const { dir, t } = useLanguage(); // To support RTL/LTR if needed, though styles seem to handle some
  const modalRef = useRef<HTMLDivElement>(null);

  // Close when keydown ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <>
      <div id="auth-modal" style={{ display: 'flex' }} role="dialog" aria-modal="true" dir={dir}>
        <div className="modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <button 
            id="auth-close" 
            className="close-btn" 
            aria-label="Close" 
            onClick={closeAuthModal}
          >
            ×
          </button>
          <h2>{t('welcome')}</h2>
          <form id="auth-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              id="auth-email"
              className="form-control mb-3"
              placeholder={t('emailComponents')}
              required
            />
            <input
              type="password"
              id="auth-password"
              className="form-control mb-3"
              placeholder={t('password')}
              required
            />
            <div
              id="auth-error"
              style={{ color: 'red', fontSize: '0.9rem', marginBottom: '10px' }}
            ></div>
            <button
              type="button"
              id="signup-button"
              className="btn btn-warning w-100 mb-3"
            >
              {t('signUp')}
            </button>
            <button
              type="button"
              id="login-button"
              className="btn btn-primary w-100 mb-3"
            >
              {t('logIn')}
            </button>
          </form>
          <hr />
          <div className="or-text">{t('or')}</div>
          <button id="google-signin" className="google-btn">
            <i className="fab fa-google"></i> {t('continueWithGoogle')}
          </button>
        </div>
      </div>
      <div 
        id="overlay" 
        className="overlay" 
        style={{ display: 'block' }} 
        onClick={closeAuthModal}
      ></div>
    </>
  );
};

export default AuthModal;
