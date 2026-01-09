import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Solutions = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      pageTitle: "Creative Language Solutions",
      pageSubtitle: "Beyond Translation - Content Innovation & Media Adaptation.",
      mainImg: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
      features: [
        {
          title: "Content Development",
          items: "Multilingual Copywriting | Transcreation | Brand Localization\nMarketing Content | Technical Writing | Press Kits"
        },
        {
          title: "Media Solutions",
          items: "Video Subtitling (Films/Documentaries/E-learning)\nTranscription (Interviews/Meetings) | Voice-over Scripts"
        },
        {
          title: "Quality Enhancement",
          items: "Professional Proofreading | Terminology Management\nFormatting & Desktop Publishing | Consistency Checks"
        }
      ],
      ctaTitle: "Bring Your Creative Vision to Life?",
      ctaSubtitle: "Let's build something great together. Get a free, no-obligation quote from our creative team.",
      ctaBtn: "Get a Quote"
    },
    ar: {
      pageTitle: "الحلول الإبداعية",
      pageSubtitle: "من صياغة الروايات المقنعة إلى إنتاج المحتوى المرئي الجذاب، تساعد حلولنا الإبداعية قصة علامتك التجارية على الصدى عبر الثقافات.",
      sections: [
        {
          title: "إنشاء المحتوى متعدد اللغات",
          desc: "تفاعل مع جمهورك العالمي بمحتوى أصلي وعالي الجودة تم إنشاؤه بواسطة فريقنا من الكتاب والاستراتيجيين الدوليين. نحن نطور محتوى لم تتم ترجمته فحسب، بل وُلد من فهم عميق للثقافة المستهدفة.",
          img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
          list: [
            { bold: "المقالات والمنشورات:", text: "محتوى مُحسَّن لمحركات البحث يجذب الزوار ويرسخ المصداقية." },
            { bold: "محتوى وسائل التواصل الاجتماعي:", text: "منشورات ذات صلة ثقافية تثير التفاعل." },
            { bold: "النصوص التسويقية:", text: "نصوص إعلانية مقنعة، صفحات هبوط، وحملات بريد إلكتروني تحقق التحويلات." }
          ],
          reverse: false
        },
        {
          title: "الفيديوهات التوضيحية",
          desc: "بسّط الأفكار المعقدة واجذب انتباه جمهورك بفيديوهات رسوم متحركة توضيحية مخصصة. نتولى عملية الإنتاج بأكملها، من كتابة السيناريو والتصوير القصصي إلى الرسوم المتحركة والتعليق الصوتي متعدد اللغات.",
          img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80",
          list: [
            { bold: "رسوم متحركة ثنائية وثلاثية الأبعاد:", text: "رسوم متحركة عالية الجودة تتناسب مع هوية علامتك التجارية." },
            { bold: "توطين السيناريو:", text: "تكييف النص ليكون فعالاً ثقافياً، وليس مجرد ترجمة حرفية." },
            { bold: "مواهب صوتية عالمية:", text: "شبكة من المعلقين الصوتيين المحترفين لسرد أصيل." }
          ],
          reverse: true
        },
        {
          title: "التدقيق اللغوي والتحرير",
          desc: "تأكد من أن المحتوى الخاص بك لا تشوبه شائبة واحترافي وجاهز للنشر. يقوم محررونا الخبراء بمراجعة مستنداتك للتأكد من الدقة النحوية والأسلوب والنبرة والملاءمة الثقافية، مما يضيف اللمسة النهائية التي تبني المصداقية.",
          img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
          list: [
            { bold: "التحرير الأكاديمي:", text: "إتقان الأبحاث والأطروحات والرسائل العلمية." },
            { bold: "التدقيق اللغوي للأعمال:", text: "صقل التقارير والمقترحات والمواد التسويقية." },
            { bold: "المراجعة بعد الترجمة:", text: "فحص نهائي من قبل لغوي ناطق باللغة الأم لضمان الجودة." }
          ],
          reverse: false
        }
      ],
      ctaTitle: "هل أنت مستعد لإحياء رؤيتك الإبداعية؟",
      ctaSubtitle: "دعنا نبني شيئاً رائعاً معاً. احصل على عرض سعر مجاني وغير ملزم من فريقنا الإبداعي.",
      ctaBtn: "احصل على عرض سعر"
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c: any = content[language];

  return (
    <main>
      {/* Page Header */}
      <header className="page-header">
        <div className="container">
          <h1 className="page-title">{c.pageTitle}</h1>
          <p className="page-subtitle">{c.pageSubtitle}</p>
        </div>
      </header>

      {/* Main Content Section */}
      {language === 'en' ? (
        <section className="service-detail-section">
          <div className="container">
            {/* Centered Image */}
            <div className="row justify-content-center mb-5">
              <div className="col-md-8 text-center">
                <img src={c.mainImg} className="img-fluid rounded-3 shadow-sm" alt="Creative content creation" />
              </div>
            </div>

            {/* Content Creation Boxes */}
            <div className="row g-4">
              {c.features.map((feature: any, idx: number) => (
                <div className="col-md-6 col-lg-4" key={idx}>
                  <div className="feature-card h-100">
                    <h5 className="category-title">{feature.title}</h5>
                    <p className="category-items" style={{ whiteSpace: 'pre-line' }}>
                      {feature.items}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {c.sections.map((section: any, idx: number) => (
            <section className="service-detail-section" key={idx}>
              <div className="container">
                <div className={`row align-items-center g-5 ${section.reverse ? 'flex-row-reverse' : ''}`}>
                  <div className="col-lg-6">
                    <img src={section.img} className="img-fluid rounded-3 shadow-sm" alt={section.title} />
                  </div>
                  <div className="col-lg-6">
                    <h2>{section.title}</h2>
                    <p>{section.desc}</p>
                    <ul>
                      {section.list.map((li: any, i: number) => (
                        <li key={i}>
                          <strong>{li.bold}</strong> {li.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </>
      )}

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

export default Solutions;
