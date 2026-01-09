import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { UIProvider } from './contexts/UIContext';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Quotation from './pages/Quotation';
import Translations from './pages/Translations';
import Localizations from './pages/Localizations';
import Solutions from './pages/Solutions';
import About from './pages/About';

const AppRoutes = () => {
  const { language } = useLanguage();

  return (
    <Routes>
      {/* Redirect root to current language */}
      <Route path="/" element={<Navigate to={`/${language}`} replace />} />

      {/* Language Routes */}
      {['en', 'ar'].map((lang) => (
        <Route key={lang} path={`/${lang}`}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="quotation" element={<Quotation />} />
          <Route path="services/translations" element={<Translations />} />
          <Route path="services/localizations" element={<Localizations />} />
          <Route path="services/solutions" element={<Solutions />} />
        </Route>
      ))}

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to={`/${language}`} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <LanguageProvider>
      <UIProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </UIProvider>
    </LanguageProvider>
  );
}

export default App;