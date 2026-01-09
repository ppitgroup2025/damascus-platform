import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Translations = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            pageTitle: "Professional Document Translation",
            pageSubtitle: "Certified Document Translation Services - Precision Across Industries.",
            categories: [
                {
                    title: "Legal Translation",
                    items: "Contracts & Agreements | Litigation Documents | Trademarks/Copyrights | Licenses | Arbitration Papers | Terms & Conditions"
                },
                {
                    title: "Technical Translation",
                    items: "Engineering Manuals | Scientific Papers | Technical Data Sheets | User Guides | Renewable Energy Docs | Operating Procedures"
                },
                {
                    title: "Medical Translation",
                    items: "Patient Records | Medical Journals | Drug Labeling | Case Reports | Medical Device Manuals | Research Findings"
                },
                {
                    title: "Financial Translation",
                    items: "Bank Documents | Financial Reports | Balance Sheets | AML/CFT Compliance | Accounting Records | Correspondence"
                },
                {
                    title: "Academic Translation",
                    items: "Research Papers | Theses/Dissertations | Textbooks | Certificates | Education Projects | Academic Articles"
                },
                {
                    title: "Media & Marketing Translation",
                    items: "Press Releases | Ad Campaigns | Social Media Content | Brochures | Websites | Newsletters"
                }
            ],
            commitmentTitle: "Our Commitment to Excellence",
            commitmentCards: [
                {
                    icon: "fa-solid fa-check-double",
                    title: "Quality Assurance",
                    desc: "Every translation undergoes a multi-step review process to ensure accuracy and consistency."
                },
                {
                    icon: "fa-solid fa-users-gear",
                    title: "Expert Linguists",
                    desc: "Our global network consists of native-speaking, subject-matter experts in over 100 languages."
                },
                {
                    icon: "fa-solid fa-bolt",
                    title: "Fast Turnaround",
                    desc: "We leverage cutting-edge technology to deliver high-quality translations on your schedule."
                },
                {
                    icon: "fa-solid fa-shield-halved",
                    title: "Confidentiality",
                    desc: "Your documents are handled with the utmost security, protected by strict NDAs and secure servers."
                }
            ],
            ctaTitle: "Ready to Start Your Project?",
            ctaText: "Let's discuss your translation needs. Get a free, no-obligation quote from our team today.",
            ctaBtn: "Get a Quote"
        },
        ar: {
            pageTitle: "خدمات الترجمة واللغات",
            pageSubtitle: "ترجمات دقيقة، معتمدة، ومناسبة ثقافياً لجمهور عالمي. نهتم بكل التفاصيل لضمان وصول رسالتك بشكل مثالي في أي مكان في العالم.",
            categories: [
                {
                    title: "الترجمة القانونية",
                    items: "العقود والاتفاقيات | الوثائق القضائية | حقوق النشر والعلامات التجارية | التراخيص | أوراق التحكيم | الشروط والأحكام"
                },
                {
                    title: "الترجمة التقنية",
                    items: "أدلة التشغيل | أوراق علمية | نشرات فنية | كتيبات المستخدم | الطاقة المتجددة | إجراءات التشغيل"
                },
                {
                    title: "الترجمة الطبية",
                    items: "سجلات المرضى | الدوريات الطبية | ملصقات الأدوية | تقارير الحالات | كتيبات الأجهزة الطبية | النتائج البحثية"
                },
                {
                    title: "الترجمة المالية",
                    items: "وثائق البنوك | تقارير مالية | الميزانيات | تقارير الامتثال | السجلات المحاسبية | المراسلات"
                },
                {
                    title: "الترجمة الأكاديمية",
                    items: "أبحاث علمية | رسائل ماجستير ودكتوراه | كتب تعليمية | شهادات | مشاريع تعليمية | مقالات أكاديمية"
                },
                {
                    title: "ترجمة التسويق والإعلام",
                    items: "بيانات صحفية | حملات إعلانية | محتوى السوشال ميديا | كتيبات | مواقع إلكترونية | نشرات إخبارية"
                }
            ],
            commitmentTitle: "التزامنا بالتميز",
            commitmentCards: [
                {
                    icon: "fa-solid fa-check-double",
                    title: "ضمان الجودة",
                    desc: "تخضع كل ترجمة لعملية مراجعة متعددة الخطوات لضمان الدقة والاتساق."
                },
                {
                    icon: "fa-solid fa-users-gear",
                    title: "خبراء لغويون",
                    desc: "تتألف شبكتنا العالمية من خبراء ناطقين باللغة الأم ومتخصصين في مجالاتهم بأكثر من 100 لغة."
                },
                {
                    icon: "fa-solid fa-bolt",
                    title: "تسليم سريع",
                    desc: "نحن نستخدم أحدث التقنيات لتقديم ترجمات عالية الجودة في الموعد المحدد."
                },
                {
                    icon: "fa-solid fa-shield-halved",
                    title: "السرية",
                    desc: "يتم التعامل مع مستنداتك بأقصى درجات الأمان، محمية باتفاقيات سرية صارمة وخوادم آمنة."
                }
            ],
            ctaTitle: "هل أنت مستعد لبدء مشروعك؟",
            ctaText: "دعنا نناقش احتياجات الترجمة الخاصة بك. احصل على عرض سعر مجاني وغير ملزم من فريقنا اليوم.",
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

            {/* Document Translation Section */}
            <section className="service-detail-section">
                <div className="container">
                    {/* Centered Image */}
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-8 text-center">
                            <img
                                src="/images/students-working-study-group.jpg"
                                className="img-fluid rounded-3 shadow-sm"
                                alt="Official document translation"
                            />
                        </div>
                    </div>

                    {/* Separate Boxes for Each Category */}
                    <div className="row g-4">
                        {c.categories.map((cat, idx) => (
                            <div className="col-md-6 col-lg-4" key={idx}>
                                <div className={`feature-card h-100 ${language === 'ar' ? 'text-end' : ''}`}>
                                    <h5 className="category-title">{cat.title}</h5>
                                    <p className="category-items">{cat.items}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="service-detail-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="section-title" style={{ color: 'var(--dark)', fontSize: '2.2rem' }}>
                            {c.commitmentTitle}
                        </h2>
                    </div>
                    <div className="row g-4">
                        {c.commitmentCards.map((card, idx) => (
                            <div className="col-lg-3 col-md-6" key={idx}>
                                <div className="feature-card text-center">
                                    <div className="icon">
                                        <i className={card.icon}></i>
                                    </div>
                                    <h5>{card.title}</h5>
                                    <p className="mb-0">{card.desc}</p>
                                </div>
                            </div>
                        ))}
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

export default Translations;
