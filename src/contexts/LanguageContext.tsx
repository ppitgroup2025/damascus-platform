import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type Language = 'en' | 'ar';

type LocalizedStrings = {
  [key: string]: string | ((...args: any[]) => string);
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, ...args: any[]) => string;
  dir: 'ltr' | 'rtl';
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const localizedStrings: Record<Language, LocalizedStrings> = {
    en: {
      fileSelected: (count: number) => `${count} file(s) selected.`,
      fileSizeLimitError: (size: number) => `Error: exceeds ${size}MB limit.`,
      noFilesSelected: 'No files selected.',
      uploading: (fileName: string, progress: number) => `Uploading: "${fileName}" (${Math.round(progress)}%)...`,
      uploaded: (fileName: string) => `Uploaded: "${fileName}"`,
      uploadFailed: (fileName: string, message: string) => `Failed to upload "${fileName}": ${message}`,
      generalUploadError: 'File upload failed. Please try again.',
      sending: 'Sending...',
      messageSentSuccess: 'Your request has been sent successfully!',
      messageSendFailed: 'Failed to send request. Please try again later.',
      proceed: 'Proceed',
      noFilesSelectedYet: 'No files selected yet.',
      selectedFilesTitle: 'Selected Files:',
      uploadedFilesTitle: 'Uploaded Files:',
      noFilesForValidation: 'Please select files for upload.',
      langMismatch: 'Source and target languages must differ.',
      invalidPageCount: 'Please enter a valid page count.',
      invalidWordCount: 'Please enter a valid word count.',
      modalSendRequest: 'Send Request',
      modalSendingFiles: 'Uploading Files...',
      modalSendingEmail: 'Sending Email...',
      certifiedTranslation: 'Certified Translation',
      standardCertifiedTranslation: 'Standard Certified Translation',
      pages: 'pages',
      page: 'page',
      professionalTranslation: 'Professional Translation',
      words: 'words',
      word: 'word',
      urgent: 'Urgent',
      normal: 'Normal',
      pricePerPage: 'Price per page',
      pricePerWord: 'Price per word',
      urgencyFee: 'Urgency Fee',
      from: 'From',
      to: 'To',
      count: 'Count',
      totalPrice: 'Total Price',
      uploadFiles: 'Upload File(s)',
      continueToOptions: 'Continue to Options',
      goBack: 'Go Back',
      quoteSummary: 'Quote Summary',
      delivery: 'Delivery',
      urgency: 'Do you require urgency?',
      // Nav & General
      home: 'Home',
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      getQuote: 'Get a Quote',
      resources: 'Resources',
      howItWorks: 'How it Works',
      testimonials: 'Testimonials',
      faq: 'FAQ',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms',
      damascusTranslation: 'Damascus Translation Services',
      copyright: '© 2025 Damascus Translation Services. All rights reserved.',
      // Auth Modal
      welcome: 'Welcome',
      emailComponents: 'Email',
      password: 'Password',
      signUp: 'Sign Up',
      logIn: 'Log In',
      or: 'or',
      continueWithGoogle: 'Continue with Google',
      // Quotation Modal
      completeYourRequest: 'Complete Your Request',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      cancelUpload: 'Cancel Upload',
      sendRequest: 'Send Request',
      requestSent: 'Your request has been sent successfully!',
      cancel: 'Cancel',
      english: 'English',
      arabic: 'Arabic',
      french: 'French',
      german: 'German',
      loginToProceed: 'Please log in first to proceed with your request',
      sessionExpired: 'Session expired. Please log in again.',
      checkEmailConfirmation: 'Account created! Please check your email to confirm.',
      invalidCredentials: 'Invalid login credentials. If you just signed up, please check your email.',
    },
    ar: {
      fileSelected: (count: number) => `${count} ملف(ملفات) مختارة.`,
      fileSizeLimitError: (size: number) => `خطأ: يتجاوز الحد الأقصى للحجم ${size} ميجابايت.`,
      noFilesSelected: 'لم يتم اختيار ملفات.',
      uploading: (fileName: string, progress: number) => `جاري الرفع: "${fileName}" (${Math.round(progress)}%)...`,
      uploaded: (fileName: string) => `تم الرفع: "${fileName}"`,
      uploadFailed: (fileName: string, message: string) => `فشل رفع "${fileName}": ${message}`,
      generalUploadError: 'فشل تحميل الملف. الرجاء المحاولة مرة أخرى.',
      sending: 'جاري الإرسال...',
      messageSentSuccess: 'تم إرسال طلبك بنجاح!',
      messageSendFailed: 'فشل إرسال الطلب. الرجاء المحاولة مرة أخرى لاحقًا.',
      proceed: 'إرسال',
      noFilesSelectedYet: 'لم يتم اختيار ملفات بعد.',
      selectedFilesTitle: 'الملفات المختارة:',
      uploadedFilesTitle: 'الملفات المرفوعة:',
      noFilesForValidation: 'الرجاء تحديد ملفات للرفع.',
      langMismatch: 'يجب أن تختلف اللغة الأساسية عن المستهدفة.',
      invalidPageCount: 'الرجاء إدخال عدد صفحات صحيح.',
      invalidWordCount: 'الرجاء إدخال عدد كلمات صحيح.',
      modalSendRequest: 'إرسال الطلب',
      modalSendingFiles: 'جاري رفع الملفات...',
      modalSendingEmail: 'جاري إرسال البريد...',
      certifiedTranslation: 'ترجمة معتمدة',
      standardCertifiedTranslation: 'ترجمة معتمدة قياسية',
      pages: 'صفحات',
      page: 'صفحة',
      professionalTranslation: 'ترجمة احترافية',
      words: 'كلمات',
      word: 'كلمة',
      urgent: 'مستعجل',
      normal: 'عادي',
      pricePerPage: 'السعر لكل صفحة',
      pricePerWord: 'السعر لكل كلمة',
      urgencyFee: 'رسوم الاستعجال',
      from: 'من',
      to: 'إلى',
      count: 'العدد',
      totalPrice: 'السعر الإجمالي',
      uploadFiles: 'رفع الملفات',
      continueToOptions: 'متابعة إلى الخيارات',
      goBack: 'رجوع',
      quoteSummary: 'ملخص السعر',
      delivery: 'التسليم',
      urgency: 'هل تحتاج إلى خدمة عاجلة؟',
       // Nav & General
      home: 'الرئيسية',
      services: 'خدماتنا',
      about: 'من نحن',
      contact: 'اتصل بنا',
      getQuote: 'اطلب عرض سعر',
      resources: 'مصادر',
      howItWorks: 'كيف نعمل',
      testimonials: 'آراء العملاء',
      faq: 'الأسئلة الشائعة',
      privacyPolicy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      damascusTranslation: 'مكتب دمشق للترجمة',
      copyright: '© 2025 مكتب دمشق للترجمة. جميع الحقوق محفوظة.',
      // Auth Modal
      welcome: 'أهلاً بك',
      emailComponents: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signUp: 'إنشاء حساب',
      logIn: 'تـسـجـيل دخـول',
      or: 'أو',
      continueWithGoogle: 'المتابعة عبر جوجل',
      // Quotation Modal
      completeYourRequest: 'أكمل طلبك',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      message: 'الرسالة',
      cancelUpload: 'إلغاء الرفع',
      sendRequest: 'إرسال الطلب',
      requestSent: 'تم إرسال طلبك بنجاح!',
      cancel: 'إلغاء',
      english: 'الإنجليزية',
      arabic: 'العربية',
      french: 'الفرنسية',
      german: 'الألمانية',
      loginToProceed: 'يرجى تسجيل الدخول أولاً لمتابعة طلبك',
      sessionExpired: 'انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.',
      checkEmailConfirmation: 'تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني للتأكيد.',
      invalidCredentials: 'بيانات الاعتماد غير صالحة. إذا قمت بالتسجيل للتو، يرجى التحقق من بريدك الإلكتروني.',
    }
  };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  
  // Initialize language from URL or default to 'en'
  const getInitialLanguage = (): Language => {
    const pathParts = location.pathname.split('/');
    const langInPath = pathParts[1] as Language;
    if (langInPath === 'en' || langInPath === 'ar') {
      return langInPath;
    }
    return 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  // Update language when URL changes (e.g. user manually changes URL or hard refresh)
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const langInPath = pathParts[1] as Language;
    
    if ((langInPath === 'en' || langInPath === 'ar') && langInPath !== language) {
      setLanguage(langInPath);
    }
  }, [location.pathname, language]);

  // Handle document attributes and font loading
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string, ...args: any[]) => {
    const str = localizedStrings[language][key];
    if (typeof str === 'function') {
      return str(...args);
    }
    return str || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir: language === 'ar' ? 'rtl' : 'ltr' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
