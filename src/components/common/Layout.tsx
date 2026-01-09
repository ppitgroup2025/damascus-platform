import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import AuthModal from '../modals/AuthModal';
import { useLanguage } from '../../contexts/LanguageContext';

const Layout = ({ children }: { children: ReactNode }) => {
  const { language } = useLanguage();

  return (
    <div className="d-flex flex-column min-vh-100" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
      <AuthModal />
    </div>
  );
};

export default Layout;