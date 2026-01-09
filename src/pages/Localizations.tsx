import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Localizations = () => {
    const { language } = useLanguage();

    const content = {
        en: {
            pageTitle: "Digital Localization Services - Damascus Translation",
            headerTitle: "Digital Localization Services",
            headerSubtitle: "Real-Time Interpretation Solutions - Bridging Language Barriers.",
            mainImg: "/images/students-working-study-group.jpg",
            features: [
                {
                    title: "On-Site Interpretation",
                    desc: "Simultaneous (Conference Booths) | Consecutive (Meetings/Workshops)\nField Visits | Court Proceedings | Medical Consultations"
                },
                {
                    title: "Remote Interpretation",
                    desc: "Video Conference Support (Zoom/Teams)\nPhone Interpretation | Webinar Coverage\n24/7 Emergency Interpretation"
                },
                {
                    title: "Specialized Sectors",
                    desc: "Government Meetings | NGO Field Missions | Business Negotiations\nAcademic Conferences | Healthcare Encounters"
                }
            ],
            commitmentTitle: "Our Commitment to Excellence",
            commitmentCards: [
                { icon: "fa-solid fa-check-double", title: "Quality Assurance", desc: "Every project undergoes a multi-step review process for accuracy and consistency." },
                { icon: "fa-solid fa-users-gear", title: "Expert Teams", desc: "Our network includes localization engineers and subject-matter experts." },
                { icon: "fa-solid fa-bolt", title: "Agile Workflow", desc: "We integrate with your development cycle for continuous localization and fast delivery." },
                { icon: "fa-solid fa-shield-halved", title: "Confidentiality", desc: "Your source code and documents are handled with the utmost security and strict NDAs." }
            ],
            ctaTitle: "Ready for a Global Audience?",
            ctaSubtitle: "Let's discuss your localization needs. Get a free, no-obligation quote from our team today.",
            ctaBtn: "Get a Quote"
        },
        ar: {
            pageTitle: "خدمات التوطين الرقمي - دمشق للترجمة",
            headerTitle: "التوطين الرقمي",
            headerSubtitle: "تجاوز حدود الترجمة. نحن نكيف محتواك الرقمي وبرمجياتك وحملاتك التسويقية للتواصل مع الجماهير المحلية على المستوى الثقافي والوظيفي.",
            mainImg: "/images/students-working-study-group.jpg",
            sections: [
                {
                    title: "توطين المواقع الإلكترونية",
                    desc: "الموقع الإلكتروني العالمي الناجح يبدو محلياً لكل زائر. نحن نتجاوز الترجمة الحرفية لنكيف تجربة المستخدم بأكملها، من واجهة المستخدم والصور إلى طرق الدفع والعادات المحلية.",
                    list: [
                        { label: "التكيف الثقافي:", text: "تعديل الرسومات والألوان والأسلوب ليتوافق مع القيم المحلية." },
                        { label: "تحسين محركات البحث التقني (SEO):", text: "تنفيذ علامات hreflang، وتحسين الكلمات المفتاحية المحلية، وهياكل المواقع الدولية." },
                        { label: "التكامل مع أنظمة إدارة المحتوى:", text: "العمل مباشرة داخل نظام إدارة المحتوى الخاص بك لسير عمل سلس." }
                    ],
                    reverse: false
                },
                {
                    title: "توطين البرمجيات وتطبيقات الجوال",
                    desc: "أطلق برامجك أو تطبيقاتك في أسواق جديدة بثقة. يعمل مهندسو التوطين واللغويون لدينا معاً لضمان أن تطبيقك عملي، سهل الاستخدام، ومناسب ثقافياً للمستخدمين في كل مكان.",
                    list: [
                        { label: "تكييف واجهة المستخدم/تجربة المستخدم:", text: "تغيير حجم مربعات الحوار وتعديل التخطيطات لتناسب اللغات المختلفة." },
                        { label: "استخراج النصوص البرمجية:", text: "فصل النصوص المضمنة في الكود لتسهيل عملية الترجمة." },
                        { label: "الاختبار اللغوي والوظيفي:", text: "ضمان جودة صارم لاكتشاف الأخطاء والتناقضات الثقافية قبل الإصدار." }
                    ],
                    reverse: true
                }
            ],
            commitmentTitle: "التزامنا بالتميز",
            commitmentCards: [
                { icon: "fa-solid fa-check-double", title: "ضمان الجودة", desc: "يخضع كل مشروع لعملية مراجعة متعددة الخطوات لضمان الدقة والاتساق." },
                { icon: "fa-solid fa-users-gear", title: "فرق متخصصة", desc: "تضم شبكتنا مهندسي توطين وخبراء متخصصين في مجالاتهم." },
                { icon: "fa-solid fa-bolt", title: "سير عمل مرن", desc: "نتكامل مع دورة التطوير الخاصة بك لتوطين مستمر وتسليم سريع." },
                { icon: "fa-solid fa-shield-halved", title: "السرية", desc: "يتم التعامل مع الكود المصدري والمستندات الخاصة بك بأقصى درجات الأمان واتفاقيات سرية صارمة." }
            ],
            ctaTitle: "هل أنت مستعد لجمهور عالمي؟",
            ctaSubtitle: "دعنا نناقش احتياجات التوطين الخاصة بك. احصل على عرض سعر مجاني وغير ملزم من فريقنا اليوم.",
            ctaBtn: "احصل على عرض سعر"
        }
    };

    // Cast to any because the structure differs significantly between en/ar (en has features, ar has sections)
    // Using any is safer than complex union types for this direct migration.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c: any = content[language];

    return (
        <main>
            {/* Page Header */}
            <header className="page-header">
                <div className="container">
                    <h1 className="page-title">{c.headerTitle}</h1>
                    <p className="page-subtitle">{c.headerSubtitle}</p>
                </div>
            </header>

            {/* Main Content Section */}
            <section className="service-detail-section">
                <div className="container">
                    {language === 'en' ? (
                        <>
                            <div className="row justify-content-center mb-5">
                                <div className="col-md-8 text-center">
                                    <img src={c.mainImg} className="img-fluid rounded-3 shadow-sm" alt="Interpretation services visual" />
                                </div>
                            </div>
                            <div className="row g-4">
                                {c.features.map((feature: any, idx: number) => (
                                    <div className="col-md-6 col-lg-4" key={idx}>
                                        <div className="feature-card h-100">
                                            <h5 className="category-title">{feature.title}</h5>
                                            <p className="category-items" style={{ whiteSpace: 'pre-line' }}>{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {c.sections.map((sec: any, idx: number) => (
                                <div className={`row align-items-center g-5 mb-5 ${sec.reverse ? 'flex-row-reverse' : ''}`} key={idx}>
                                    <div className="col-lg-6">
                                        <img src={c.mainImg} className="img-fluid rounded-3 shadow-sm" alt={sec.title} />
                                    </div>
                                    <div className="col-lg-6">
                                        <h2>{sec.title}</h2>
                                        <p>{sec.desc}</p>
                                        <ul>
                                            {sec.list.map((item: any, i: number) => (
                                                <li key={i}>
                                                    <strong>{item.label}</strong> {item.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="service-detail-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className={language === 'ar' ? "section-title" : ""} style={{ fontWeight: 700, color: 'var(--dark)', fontSize: '2.2rem' }}>
                            {c.commitmentTitle}
                        </h2>
                    </div>
                    <div className="row g-4">
                        {c.commitmentCards.map((card: any, idx: number) => (
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
                    <p>{c.ctaSubtitle}</p>
                    <Link to={`/${language}/quotation`} className="btn btn-primary btn-lg px-5 py-3">
                        {c.ctaBtn}
                    </Link>
                </div>
            </section>
        </main>
    );
};

export default Localizations;
