import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import '../styles/Quotation.css';
import { Modal, Button, ProgressBar } from 'react-bootstrap';
import { supabase } from '../lib/supabase';
import { useUI } from '../contexts/UIContext';

type QuoteType = 'certified' | 'professional';
type Urgency = 'none' | 'priority';

const Quotation = () => {
  const { language, t } = useLanguage();
  const { openAuthModal } = useUI();
  const [activeTab, setActiveTab] = useState<QuoteType>('certified');
  
  // Form State
  const [certifiedFrom, setCertifiedFrom] = useState('English');
  const [certifiedTo, setCertifiedTo] = useState('English');
  const [certifiedPages, setCertifiedPages] = useState<number>(0);
  const [certifiedUrgency, setCertifiedUrgency] = useState<Urgency>('none');
  const [certifiedFiles, setCertifiedFiles] = useState<FileList | null>(null);

  const [professionalFrom, setProfessionalFrom] = useState('English');
  const [professionalTo, setProfessionalTo] = useState('English');
  const [professionalWords, setProfessionalWords] = useState<number>(0);
  const [professionalUrgency, setProfessionalUrgency] = useState<Urgency>('none');
  const [professionalFiles, setProfessionalFiles] = useState<FileList | null>(null);

  // Validation State
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Summary State
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');

  // Modal & Upload State
  const [showModal, setShowModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Effect to calculate quote
  useEffect(() => {
    let price = 0;
    let days = 2;
    const isPriority = (activeTab === 'certified' ? certifiedUrgency : professionalUrgency) === 'priority';

    if (activeTab === 'certified') {
      const basePrice = 31.75;
      const urgencyFee = (isPriority && certifiedPages > 0) ? 7.94 : 0;
      price = certifiedPages > 0 ? (certifiedPages * basePrice + urgencyFee) : 0;
      days = isPriority ? 1 : 2;
    } else {
      const rate = 0.1;
      const urgencyFee = (isPriority && professionalWords > 0) ? 4.75 : 0;
      price = professionalWords > 0 ? (professionalWords * rate + urgencyFee) : 0;
      days = isPriority ? 1 : 2;
    }

    setTotalPrice(price);

    const date = new Date();
    date.setDate(date.getDate() + days);
    
    // Format date based on language
    setDeliveryDate(date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'long', month: 'long', day: 'numeric' }));

  }, [activeTab, certifiedPages, certifiedUrgency, professionalWords, professionalUrgency, language, certifiedFrom, certifiedTo, professionalFrom, professionalTo]);

  const handleContinue = async () => {
    const newErrors: {[key: string]: string} = {};
    const isCert = activeTab === 'certified';

    // 1. Validation
    if (isCert) {
      if (!certifiedFiles || certifiedFiles.length === 0) newErrors.file = t('noFilesForValidation');
      if (certifiedFrom === certifiedTo) newErrors.lang = t('langMismatch');
      if (certifiedPages <= 0) newErrors.pages = t('invalidPageCount');
    } else {
      if (!professionalFiles || professionalFiles.length === 0) newErrors.fileProf = t('noFilesForValidation');
      if (professionalFrom === professionalTo) newErrors.langProf = t('langMismatch');
      if (professionalWords <= 0) newErrors.words = t('invalidWordCount');
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    // 2. Auth Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert(language === 'ar' ? "يرجى تسجيل الدخول أولاً لمتابعة طلبك" : "Please log in first to proceed with your request");
      openAuthModal();
      return;
    }

    setShowModal(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Session expired. Please log in again.");
      setIsUploading(false);
      return;
    }

    const filesToUpload = activeTab === 'certified' ? certifiedFiles : professionalFiles;
    const uploadedUrls: string[] = [];

    if (filesToUpload) {
      const totalFiles = filesToUpload.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = filesToUpload[i];
        
        // Sanitize filename: remove special characters and spaces
        const asciiOnly = file.name.replace(/[^\x00-\x7F]/g, "");
        const cleanName = asciiOnly.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '');
        const baseName = cleanName.split('.')[0] || 'document';
        const extension = file.name.split('.').pop() || '';
        
        // IMPORTANT: Path must start with UID to match the folder RLS policy
        const fileName = `${user.id}/${Date.now()}_${baseName}.${extension}`;
        
        const { error } = await supabase.storage
          .from('quotations')
          .upload(fileName, file);

        if (error) {
          console.error("Upload error:", error);
          alert("Upload failed for: " + file.name);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('quotations')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
        setUploadProgress(((i + 1) / totalFiles) * 100);
      }
    }

    console.log("Request Data:", {
      userId: user.id,
      ...formData,
      type: activeTab,
      totalPrice,
      deliveryDate,
      files: uploadedUrls
    });

    alert(t('requestSent') || "Request Sent!");
    setIsUploading(false);
    setShowModal(false);
    setUploadProgress(0);
  };



  return (
    <div className="container mt-5">
      <div className="content-wrapper">
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'certified' ? 'active' : ''}`}
            onClick={() => setActiveTab('certified')}
          >
            {t('certifiedTranslation')}
          </div>
          <div 
            className={`tab ${activeTab === 'professional' ? 'active' : ''}`}
            onClick={() => setActiveTab('professional')}
          >
            {t('professionalTranslation')}
          </div>
        </div>

        <div className="main-container">
          <div className="form-section">
            {activeTab === 'certified' ? (
              <div id="certifiedForm">
                <div className="form-group">
                  <label>{t('from')}</label>
                  <select value={certifiedFrom} onChange={(e) => setCertifiedFrom(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('to')}</label>
                  <select value={certifiedTo} onChange={(e) => setCertifiedTo(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                  {errors.lang && <div className="error-message">{errors.lang}</div>}
                </div>
                <div className="form-group">
                  <label>{t('uploadFiles')}</label>
                  <input type="file" multiple onChange={(e) => { setCertifiedFiles(e.target.files); }} />
                  {errors.file && <div className="error-message">{errors.file}</div>}
                </div>
                <div className="form-group">
                  <label>{t('count')} ({t('pages')})</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={certifiedPages} 
                    onChange={(e) => setCertifiedPages(parseInt(e.target.value) || 0)} 
                  />
                  <small>1 {t('page')} = 250 {t('words')} max</small>
                   {errors.pages && <div className="error-message">{errors.pages}</div>}
                </div>
                <div className="form-group">
                   <label>{t('urgency')}</label>
                   <div className="radio-group">
                     <label>
                       <input 
                         type="radio" 
                         name="certUrgency" 
                         checked={certifiedUrgency === 'none'} 
                         onChange={() => setCertifiedUrgency('none')} 
                       /> {t('normal')}
                     </label>
                     <label>
                       <input 
                         type="radio" 
                         name="certUrgency" 
                         checked={certifiedUrgency === 'priority'} 
                         onChange={() => setCertifiedUrgency('priority')} 
                       /> {t('urgent')}
                     </label>
                   </div>
                </div>
              </div>
            ) : (
               <div id="professionalForm">
                  <div className="form-group">
                  <label>{t('from')}</label>
                  <select value={professionalFrom} onChange={(e) => setProfessionalFrom(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('to')}</label>
                  <select value={professionalTo} onChange={(e) => setProfessionalTo(e.target.value)}>
                    <option value="English">English</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                   {errors.langProf && <div className="error-message">{errors.langProf}</div>}
                </div>
                 <div className="form-group">
                  <label>{t('uploadFiles')}</label>
                  <input type="file" multiple onChange={(e) => { setProfessionalFiles(e.target.files); }} />
                   {errors.fileProf && <div className="error-message">{errors.fileProf}</div>}
                </div>
                <div className="form-group">
                  <label>{t('count')} ({t('words')})</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={professionalWords} 
                    onChange={(e) => setProfessionalWords(parseInt(e.target.value) || 0)} 
                  />
                   {errors.words && <div className="error-message">{errors.words}</div>}
                </div>
                <div className="form-group">
                   <label>{t('urgency')}</label>
                   <div className="radio-group">
                     <label>
                       <input 
                         type="radio" 
                         name="profUrgency" 
                         checked={professionalUrgency === 'none'} 
                         onChange={() => setProfessionalUrgency('none')} 
                       /> {t('normal')}
                     </label>
                     <label>
                       <input 
                         type="radio" 
                         name="profUrgency" 
                         checked={professionalUrgency === 'priority'} 
                         onChange={() => setProfessionalUrgency('priority')} 
                       /> {t('urgent')}
                     </label>
                   </div>
                </div>
               </div>
            )}

            <button className="continue-btn" onClick={handleContinue}>{t('continueToOptions')}</button>
            <Link to="/"><button className="goback-btn">{t('goBack')}</button></Link>
          </div>

          <div className="quote-summary">
            <h3>{t('quoteSummary')}</h3>
            <div>{activeTab === 'certified' ? t('certifiedTranslation') : t('professionalTranslation')}</div>
            <div>{language === 'ar' ? `السعر: $${totalPrice.toFixed(2)}` : `Price: $${totalPrice.toFixed(2)}`}</div>
            <div>{t('delivery')}: {deliveryDate}</div>
            <div className="quote-total">
               {t('totalPrice')}: ${totalPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => !isUploading && setShowModal(false)} centered>
        <Modal.Header closeButton={!isUploading}>
          <Modal.Title>{t('completeYourRequest') || 'Complete Your Request'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleModalSubmit}>
            <div className="mb-3">
              <label className="form-label">{t('name') || 'Name'}</label>
              <input 
                type="text" 
                className="form-control" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
                disabled={isUploading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('email') || 'Email'}</label>
              <input 
                type="email" 
                className="form-control" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
                disabled={isUploading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">{t('message') || 'Message'}</label>
              <textarea 
                className="form-control" 
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                disabled={isUploading}
              ></textarea>
            </div>
            
            {isUploading && (
              <div className="mb-3">
                <ProgressBar now={uploadProgress} label={`${Math.round(uploadProgress)}%`} animated />
                <small className="text-muted d-block mt-1 text-center">Uploading files...</small>
              </div>
            )}

            <Button variant="primary" type="submit" className="w-100" disabled={isUploading}>
              {isUploading ? (t('sending') || 'Sending...') : (t('sendRequest') || 'Send Request')}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Quotation;

