import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import clsx from 'clsx';
// Import Bootstrap JS for Carousel functionality
// Import Bootstrap JS for Carousel functionality
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import QuoteSlideButton from '../components/common/QuoteSlideButton';

const Home = () => {
  const { language, t } = useLanguage();

  const content = {
    en: {
      heroTitle: "Delivering Quality Translation Services",
      heroDesc: "Damascus Translation Office delivers certified multilingual translations for businesses, NGOs, and government entities. Our Yemen-based team of expert translators specializes in",
      heroPoints: [
        "Legal & Financial Documents",
        "Medical & Technical Manuals",
        "Marketing & Academic Materials",
        "Media Localization & Subtitling",
        "Conference Interpretation"
      ],
      servicesTitle: "Our Translation Services",
      services: [
        {
          title: "Professional Document Translation",
          desc: "- Certified Translation<br />- Professional Translation<br />- Technical Translation",
          link: `/en/services/translations`,
          icon: "fas fa-file-alt"
        },
        {
          title: "Expert Interpretation Services",
          desc: "- Simultaneous<br />- Consecutive<br />- Remote Interpretation",
          link: `/en/services/localizations`,
          icon: "fas fa-headset"
        },
        {
          title: "Creative Language Solutions",
          desc: "- Content Development<br />- Media Solutions<br />- Quality Enhancement",
          link: `/en/services/solutions`,
          icon: "fas fa-photo-video"
        }
      ],
      howTitle: "How it Works",
      steps: [
        { title: "1. Upload Your Documents", desc: "Send us your files online or by email. We accept all formats and ensure confidentiality.", icon: "fas fa-upload" },
        { title: "2. Get a Quote & Confirm", desc: "Receive a transparent quote. Confirm your order and we’ll assign a specialist translator.", icon: "fas fa-user-check" },
        { title: "3. Receive Your Translation", desc: "Get your certified translation delivered digitally or by post, ready for official use.", icon: "fas fa-file-signature" }
      ],
      resourcesTitle: "Resources",
      resources: [
        { name: "Doha dictionary", desc: "Stay updated with the latest trends, challenges, and best practices in the global translation and localization industry.", link: "https://www.dohadictionary.org/", img: "/assets/images/dawha.jpg", btn: "Visit" },
        { name: "Ryadh dictionary", desc: "A comprehensive A-Z glossary of common and technical terms used in the translation and legal documentation fields.", link: "https://dictionary.ksaa.gov.sa/", img: "/assets/images/ryadh.jpg", btn: "Visit" },
        { name: "Abu Dhabi Arabic Language Center", desc: "A specialized digital dictionary to support digital Arabic content with the most common Arabic terms according to Arabic digital blogs", link: "https://dictionary.alc.ae/", img: "/assets/images/abu dhabi.png", btn: "Visit" }
      ],
      contactTitle: "Contact Us",
      contactName: "Name",
      contactEmail: "Email",
      contactService: "Service Needed",
      contactMessage: "Message",
      contactSelectService: "Select a service",
      contactServicesList: ["Document Translation", "Creative Language Solutions", "Interpretation", "Other"],
      more: "More",
      send: "Send"
    },
    ar: {
      heroTitle: "ترجمات معتمدة...سريعة وموثوقة",
      heroDesc: "تقدم دمشق للترجمة خدمات ترجمة معتمدة وتجارية سهلة الطلب وبأسعار معقولة ودقيقة ويتم تسليمها بسرعة - نعمل على مبدأ الموثوقية والكفاءة، مما يجعلنا الخيار الأول",
      heroPoints: [
        "ترجمات معتمدة وقانونية لأكثر من 25 دولة",
        "ترجمات متخصصة للاستخدام التجاري والقانوني",
        "خدمات التوثيق القانوني العالمي (أبوستيل)",
        "خدمات الترجمة الطبية والتقنية",
        "الترجمة الفورية للمؤتمرات"
      ],
      servicesTitle: "خدمات الترجمة لدينا",
      services: [
        {
          title: "ترجمة المستندات",
          desc: "ترجمة معتمدة للعقود القانونية، السجلات الأكاديمية، والمستندات التجارية، والشهادات الشخصية مع خيارات التوثيق.",
          link: `/ar/services/translations`,
          icon: "fas fa-file-alt"
        },
        {
          title: "ترجمة المواقع الإلكترونية",
          desc: "ترجمة وتكييف ثقافي كامل لموقعك الإلكتروني لجعل محتواك يتناسب مع الجمهور الدولي المستهدف.",
          link: `/ar/services/localizations`,
          icon: "fas fa-headset"
        },
        {
          title: "الحلول الإبداعية",
          desc: "- إنشاء المحتوى<br />- فيديوهات توضيحية<br />- تدقيق لغوي",
          link: `/ar/services/solutions`,
          icon: "fas fa-photo-video"
        }
      ],
      howTitle: "كيف تعمل الخدمة",
      steps: [
        { title: "1. حمّل مستنداتك", desc: "أرسل لنا ملفاتك عبر الإنترنت أو البريد الإلكتروني. نقبل جميع الصيغ ونضمن السرية.", icon: "fas fa-upload" },
        { title: "2. احصل على عرض سعر وأكد", desc: "استلم عرض سعر شفاف. أكد طلبك وسنعين مترجم متخصص.", icon: "fas fa-user-check" },
        { title: "3. استلم ترجمتك", desc: "احصل على ترجمتك المعتمدة عبر البريد الإلكتروني أو البريد العادي، جاهزة للاستخدام الرسمي.", icon: "fas fa-file-signature" }
      ],
      resourcesTitle: "المصادر",
      resources: [
        { name: "معجم الدوحة", desc: "ابق على اطلاع بأحدث الاتجاهات والتحديات وأفضل الممارسات في صناعة الترجمة والتعريب العالمية.", link: "https://www.dohadictionary.org/", img: "/assets/images/dawha.jpg", btn: "زيارة" },
        { name: "معجم الرياض", desc: "مسرد شامل من الألف إلى الياء للمصطلحات الشائعة والتقنية المستخدمة في مجالات الترجمة والوثائق القانونية.", link: "https://dictionary.ksaa.gov.sa/", img: "/assets/images/ryadh.jpg", btn: "زيارة" },
        { name: "مركز أبوظبي للغة العربية", desc: "قاموس رقمي متخصص لدعم المحتوى العربي الرقمي بأكثر المصطلحات العربية شيوعًا وفقًا للمدونات الرقمية العربية", link: "https://dictionary.alc.ae/", img: "/assets/images/abu dhabi.png", btn: "زيارة" }
      ],
      contactTitle: "تواصل معنا",
      contactName: "الاسم",
      contactEmail: "البريد الإلكتروني",
      contactService: "الخدمة المطلوبة",
      contactMessage: "الرسالة",
      contactSelectService: "اختر خدمة",
      contactServicesList: ["ترجمة المستندات", "ترجمة المواقع الإلكترونية", "الترجمة الفورية", "أخرى"],
      more: "المزيد",
      send: "تابع"
    }
  };

  const c = content[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(t('messageSentSuccess'));
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4 mb-lg-0 hero-text-col">
              <h1 className="display-4 fw-bold mb-3">{c.heroTitle}</h1>
              <p className="lead mb-4">{c.heroDesc}</p>
              <ul className="list-unstyled mb-4">
                {c.heroPoints.map((point, idx) => (
                  <li key={idx} className="mb-2">
                    <i className={clsx("fas fa-check-circle text-success", language === 'ar' ? 'ms-2' : 'me-2')}></i>
                    {point}
                  </li>
                ))}
              </ul>
              <Link to={`/${language}/quotation`} className="btn btn-primary px-4 py-2 fw-bold">
                {t('getQuote')}
              </Link>
            </div>
            <div className="col-lg-6 text-center">
              {/* UPDATED HERO IMAGE PATH */}
              <img src="/images/heroimgicon.png" className="img-fluid hero-image" alt="Translation Illustration" />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">{c.servicesTitle}</h2>
          <div className="row g-4">
            {c.services.map((service, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="service-card">
                  <div className="service-icon">
                    <i className={service.icon}></i>
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: service.desc }} />
                  <Link to={service.link} className="service-card-cta">
                    <span>{c.more}</span>
                    <i className={clsx("fas", language === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right')}></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how" className="how-section">
        <div className="container">
          <h2 className="section-title">{c.howTitle}</h2>
          <div className="row g-4">
            {c.steps.map((step, idx) => (
              <div className="col-md-4" key={idx}>
                <div className="how-step">
                  <div className="step-icon"><i className={step.icon}></i></div>
                  <div className="how-step-title">{step.title}</div>
                  <div>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES CAROUSEL SECTION */}
      <section id="resources" className="resources-section">
        <div className="container">
          <h2 className="section-title">{c.resourcesTitle}</h2>
          <div id="resourcesCarousel" className="carousel slide" data-bs-interval="false">
            <div className="carousel-inner">
              {c.resources.map((res, idx) => (
                <div className={clsx("carousel-item", idx === 0 && "active")} key={idx}>
                  <div className="resource-card">
                    <img src={res.img} className="resource-logo" alt="Resource Logo" />
                    <h5 className="resource-name">{res.name}</h5>
                    <p className="resource-desc">{res.desc}</p>
                    <a href={res.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                      <span>{res.btn}</span>
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev custom-carousel-control-prev-resources" type="button" data-bs-target="#resourcesCarousel" data-bs-slide="prev">
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next custom-carousel-control-resources" type="button" data-bs-target="#resourcesCarousel" data-bs-slide="next">
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">{c.contactTitle}</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="contact-form">
                <form id="contactForm" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">{c.contactName}</label>
                      <input type="text" className="form-control" id="name" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">{c.contactEmail}</label>
                      <input type="email" className="form-control" id="email" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="service" className="form-label">{c.contactService}</label>
                    <select className="form-select" id="service" required defaultValue="">
                      <option value="" disabled>{c.contactSelectService}</option>
                      {c.contactServicesList.map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">{c.contactMessage}</label>
                    <textarea className="form-control" id="message" rows={5} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-3 fw-bold">
                    {c.send}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuoteSlideButton />
    </div>
  );
};

export default Home;