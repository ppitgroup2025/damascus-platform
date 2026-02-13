import { useRef, useEffect, useState } from 'react';
import { useUI } from '../../contexts/UIContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useUI();
  const { dir, t } = useLanguage();
  const { login, signup, googleSignIn } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      setError('');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAuthModalOpen]);

  const handleSignup = async () => {
    /* 
       We only close the modal if we have an active session (user is logged in).
       If email confirmation is required, Supabase returns a User but Session is null.
       In that case, we show a success message telling the user to check their email.
    */
    try {
      const data = await signup(email, password);
      if (data?.user && !data?.session) {
         setError('');
         // We use a specific success state or just borrow setError with a different color/prefix for now to keep it simple, 
         // but better to add a success state.
         // Let's add a local success message state.
         setSuccessMessage(t('checkEmailConfirmation') || 'Account created! Please check your email to confirm.');
         // Do NOT close the modal. Let them see the message.
      } else {
         // Session active, close modal
         closeAuthModal();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError('');
    setSuccessMessage('');
    setLoading(true);
    try {
      await login(email, password);
      // If we get here, login successful
      closeAuthModal();
    } catch (err: any) {
      // Supabase "Invalid login credentials" is generic.
      // It could mean wrong password OR email not confirmed.
      if (err.message.includes('Invalid login credentials')) {
         setError(t('invalidCredentials') || 'Invalid login credentials. If you just signed up, please check your email.');
      } else {
         setError(err.message || 'Failed to log in');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await googleSignIn();
      closeAuthModal();
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              id="auth-password"
              className="form-control mb-3"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <div
                id="auth-error"
                style={{ color: 'red', fontSize: '0.8rem', marginBottom: '10px' }}
              >
                {error}
              </div>
            )}
            {successMessage && (
              <div
                id="auth-success"
                style={{ color: 'green', fontSize: '0.8rem', marginBottom: '10px' }}
              >
                {successMessage}
              </div>
            )}
            <button
              type="button"
              id="signup-button"
              className="btn btn-warning w-100 mb-2"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? '...' : t('signUp')}
            </button>
            <button
              type="button"
              id="login-button"
              className="btn btn-primary w-100 mb-3"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? '...' : t('logIn')}
            </button>
          </form>
          <hr />
          <div className="or-text">{t('or')}</div>
          <button 
            id="google-signin" 
            className="google-btn" 
            onClick={handleGoogleSignIn}
            disabled={loading}
          >
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

