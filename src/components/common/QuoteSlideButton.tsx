import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

const QuoteSlideButton = () => {
    const { language, t } = useLanguage();
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const hero = document.querySelector('.hero-section') as HTMLElement;
            const contact = document.getElementById('contact') as HTMLElement;
            const navbarHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 80;

            if (hero && contact) {
                const heroBottom = hero.offsetHeight;
                const contactTop = contact.offsetTop;
                const scrollY = window.scrollY;

                // Show button when scrolled past hero but before contact section
                const shouldShow = scrollY > heroBottom && scrollY < contactTop - navbarHeight;
                setShow(shouldShow);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const slideBtnClass = `btn btn-primary px-4 py-2 fw-bold quote-slide-btn ${show ? 'show' : ''}`;

    return (
        <Link 
            to={`/${language}/quotation`} 
            className={slideBtnClass} 
            id="quoteSlideBtn"
        >
            {t('getQuote')}
        </Link>
    );
};

export default QuoteSlideButton;
