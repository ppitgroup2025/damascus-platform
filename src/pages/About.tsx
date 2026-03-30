import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      pageTitle: "Our Story",
      pageSubtitle: "Connecting cultures and bridging communication gaps with precision, passion, and professionalism.",
      missionTitle: "Our Mission",
      missionP1: "At Damascus Translation, our mission is to deliver flawless and culturally nuanced language solutions that empower our clients to succeed in the global marketplace. We believe that every word matters and strive to provide translations that are not only accurate but also resonate with the target audience.",
      missionP2: "We are committed to leveraging a combination of expert human linguists and cutting-edge technology to ensure quality, speed, and confidentiality in everything we do.",
      missionAlt: "A diverse team collaborating in a modern office",
      ctaTitle: "Ready to Work With Us?",
      ctaText: "Let's discuss your translation needs. Get a free, no-obligation quote from our team today.",
      ctaBtn: "Get a Quote"
    },
    ar: {
      pageTitle: "قصتنا",
      pageSubtitle: "نصل الثقافات ونسد فجوات التواصل بالدقة والشغف والاحترافية.",
      missionTitle: "مهمتنا",
      missionP1: "في دمشق للترجمة، مهمتنا هي تقديم حلول لغوية خالية من العيوب ومتناغمة ثقافيًا تمكّن عملاءنا من النجاح في السوق العالمي. نؤمن بأن كل كلمة لها أهميتها ونسعى لتقديم ترجمات ليست دقيقة فحسب، بل يتردد صداها لدى الجمهور المستهدف.",
      missionP2: "نحن ملتزمون بالجمع بين اللغويين الخبراء وأحدث التقنيات لضمان الجودة والسرعة والسرية في كل ما نقوم به.",
      missionAlt: "فريق متنوع يتعاون في مكتب حديث",
      ctaTitle: "هل أنت مستعد للعمل معنا؟",
      ctaText: "دعنا نناقش احتياجات الترجمة الخاصة بك. احصل على عرض أسعار مجاني وغير ملزم من فريقنا اليوم.",
      ctaBtn: "احصل على عرض سعر"
    }
  };

  const c = content[language];

  return (
    <main>
      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">{c.pageTitle}</h1>
          <p className="page-subtitle">{c.pageSubtitle}</p>
        </div>
      </header>

      {/* Our Mission Section */}
      <section className="service-detail-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80" 
                className="img-fluid rounded-3 shadow-sm" 
                alt={c.missionAlt} 
              />
            </div>
            <div className="col-lg-6">
              <h2>{c.missionTitle}</h2>
              <p>{c.missionP1}</p>
              <p>{c.missionP2}</p>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaText}</p>
          <Link to={`/${language}/quotation`} className="btn btn-primary btn-lg px-5 py-3">
            {c.ctaBtn}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default About;
