export type Language = 'EN' | 'TA' | 'HI';

export interface Translations {
  appName: string;
  subTitle: string;
  tagline: string;
  attribution: string;
  
  // Nav
  home: string;
  cases: string;
  capture: string;
  evidence: string;
  ai: string;
  more: string;
  
  // Quick Actions
  captureEvidence: string;
  scanDocument: string;
  uploadEvidence: string;
  recordAudio: string;
  
  // Emergency
  emergencyAssistance: string;
  call112: string;
  emergencyDesc: string;
  police: string;
  ambulance: string;
  fire: string;
  emergencyDisclaimer: string;
  
  // Dashboard & Metrics
  activeCases: string;
  evidenceItems: string;
  openLeads: string;
  aiAnalyses: string;
  activeInvestigations: string;
  newCase: string;
  
  // Data Saver & Status
  dataSaver: string;
  dataSaverOn: string;
  dataSaverOff: string;
  online: string;
  offline: string;
  
  // Levels
  level1: string;
  level2: string;
  level3: string;
  level4: string;
  level5: string;
  
  // Discrepancy
  discrepancyDetected: string;
  supported: string;
  requiresVerification: string;
  verifyEvidence: string;
  humanVerified: string;
}

export const LOCALIZATION: Record<Language, Translations> = {
  EN: {
    appName: 'HARI INVESTIGATOR AI',
    subTitle: 'AI-assisted investigation intelligence',
    tagline: 'Observe. Connect. Investigate.',
    attribution: 'Created by Hari Bot & Business Solutions',
    
    home: 'HOME',
    cases: 'CASES',
    capture: 'CAPTURE',
    evidence: 'EVIDENCE',
    ai: 'AI',
    more: 'MORE',
    
    captureEvidence: 'CAPTURE EVIDENCE',
    scanDocument: 'SCAN DOCUMENT',
    uploadEvidence: 'UPLOAD EVIDENCE',
    recordAudio: 'RECORD AUDIO',
    
    emergencyAssistance: 'INDIA EMERGENCY ASSISTANCE',
    call112: 'CALL 112',
    emergencyDesc: '112 is India’s unified nationwide emergency response system.',
    police: 'Police (100 / 112)',
    ambulance: 'Ambulance (108 / 112)',
    fire: 'Fire (101 / 112)',
    emergencyDisclaimer: 'HARI INVESTIGATOR AI is an investigation workspace, not an official police service. Use 112 for immediate danger.',
    
    activeCases: 'ACTIVE CASES',
    evidenceItems: 'EVIDENCE ITEMS',
    openLeads: 'OPEN LEADS',
    aiAnalyses: 'AI ANALYSES',
    activeInvestigations: 'ACTIVE INVESTIGATIONS',
    newCase: '+ NEW CASE',
    
    dataSaver: 'Data Saver',
    dataSaverOn: 'Data Saver Active',
    dataSaverOff: 'Full Resolution Mode',
    online: 'Online',
    offline: 'Offline',
    
    level1: 'LEVEL 1: OBSERVED FACT',
    level2: 'LEVEL 2: EXTRACTED DATA',
    level3: 'LEVEL 3: AI INFERENCE',
    level4: 'LEVEL 4: UNVERIFIED',
    level5: 'LEVEL 5: UNKNOWN',
    
    discrepancyDetected: 'DISCREPANCY DETECTED',
    supported: 'SUPPORTED',
    requiresVerification: 'REQUIRES VERIFICATION',
    verifyEvidence: 'VERIFY EVIDENCE',
    humanVerified: 'HUMAN VERIFIED'
  },
  TA: {
    appName: 'ஹரி இன்வெஸ்டிகேட்டர் AI',
    subTitle: 'செயற்கை நுண்ணறிவு புலனாய்வு அமைப்பு',
    tagline: 'கவனி. இணை. புலனாய்வு செய்.',
    attribution: 'ஹரி பாட் & பிசினஸ் சொல்யூஷன்ஸ் உருவாக்கியது',
    
    home: 'முகப்பு',
    cases: 'வழக்குகள்',
    capture: 'படம் பிடி',
    evidence: 'ஆதாரங்கள்',
    ai: 'AI',
    more: 'மேலும்',
    
    captureEvidence: 'ஆதாரம் படம் பிடி',
    scanDocument: 'ஆவணம் ஸ்கேன் செய்',
    uploadEvidence: 'ஆதாரம் பதிவேற்று',
    recordAudio: 'ஒலிப்பதிவு செய்',
    
    emergencyAssistance: 'இந்திய அவசர உதவி எண் 112',
    call112: '112 அழைக்கவும்',
    emergencyDesc: '112 என்பது இந்தியாவின் ஒருங்கிணைந்த அவசர உதவி எண் ஆகும்.',
    police: 'காவல்துறை (100 / 112)',
    ambulance: 'ஆம்புலன்ஸ் (108 / 112)',
    fire: 'தீயணைப்பு துறை (101 / 112)',
    emergencyDisclaimer: 'ஹரி இன்வெஸ்டிகேட்டர் AI ஒரு புலனாய்வு செயலி, அரசு அவசர சேவை அல்ல. அவசரத்திற்கு 112 ஐ அழைக்கவும்.',
    
    activeCases: 'செயலில் உள்ள வழக்குகள்',
    evidenceItems: 'ஆதாரங்களின் எண்ணிக்கை',
    openLeads: 'புலனாய்வு வழிகள்',
    aiAnalyses: 'AI பகுப்பாய்வுகள்',
    activeInvestigations: 'நடப்பு புலனாய்வுகள்',
    newCase: '+ புதிய வழக்கு',
    
    dataSaver: 'டேட்டா சேவர்',
    dataSaverOn: 'டேட்டா சேவர் ஆன்',
    dataSaverOff: 'முழுத்திறன் பயன்முறை',
    online: 'இணைப்பில் உள்ளது',
    offline: 'இணைப்பிலில்லை',
    
    level1: 'நிலை 1: நேரடி உண்மை',
    level2: 'நிலை 2: பெறப்பட்ட விவரம்',
    level3: 'நிலை 3: AI யூகம்',
    level4: 'நிலை 4: சரிபார்க்கப்படாதது',
    level5: 'நிலை 5: தெரியாதது',
    
    discrepancyDetected: 'முரண்பாடு கண்டறியப்பட்டது',
    supported: 'உறுதி செய்யப்பட்டது',
    requiresVerification: 'சரிபார்ப்பு தேவை',
    verifyEvidence: 'ஆதாரம் சரிபார்',
    humanVerified: 'மனிதரால் சரிபார்க்கப்பட்டது'
  },
  HI: {
    appName: 'हरि इन्वेस्टिगेशन AI',
    subTitle: 'एआई-सहायता प्राप्त जांच प्रणाली',
    tagline: 'अवलोकन करें। जोड़ें। जांच करें।',
    attribution: 'हरि बॉट एंड बिजनेस सॉल्यूशंस द्वारा निर्मित',
    
    home: 'होम',
    cases: 'मामले',
    capture: 'कैप्चर',
    evidence: 'साक्ष्य',
    ai: 'एआई',
    more: 'अधिक',
    
    captureEvidence: 'साक्ष्य कैप्चर करें',
    scanDocument: 'दस्तावेज़ स्कैन करें',
    uploadEvidence: 'साक्ष्य अपलोड करें',
    recordAudio: 'ऑडियो रिकॉर्ड करें',
    
    emergencyAssistance: 'भारत आपातकालीन सहायता (112)',
    call112: '112 पर कॉल करें',
    emergencyDesc: '112 भारत की एकीकृत राष्ट्रीय आपातकालीन प्रतिक्रिया प्रणाली है।',
    police: 'पुलिस (100 / 112)',
    ambulance: 'एम्बुलेंस (108 / 112)',
    fire: 'दमकल (101 / 112)',
    emergencyDisclaimer: 'हरि इन्वेस्टिगेशन AI एक जांच वर्कस्पेस है, सरकारी आपातकालीन सेवा नहीं। आपात स्थिति में 112 का उपयोग करें।',
    
    activeCases: 'सक्रिय मामले',
    evidenceItems: 'साक्ष्य वस्तुएं',
    openLeads: 'जांच सुराग',
    aiAnalyses: 'एआई विश्लेषण',
    activeInvestigations: 'सक्रिय जांच',
    newCase: '+ नया मामला',
    
    dataSaver: 'डेटा सेवर',
    dataSaverOn: 'डेटा सेवर सक्रिय',
    dataSaverOff: 'पूर्ण रिज़ॉल्यूशन मोड',
    online: 'ऑनलाइन',
    offline: 'ऑफ़लाइन',
    
    level1: 'स्तर 1: प्रत्यक्ष तथ्य',
    level2: 'स्तर 2: निकाला गया डेटा',
    level3: 'स्तर 3: एआई अनुमान',
    level4: 'स्तर 4: असत्यापित',
    level5: 'स्तर 5: अज्ञात',
    
    discrepancyDetected: 'विसंगति पाई गई',
    supported: 'समर्थित',
    requiresVerification: 'सत्यापन आवश्यक',
    verifyEvidence: 'साक्ष्य सत्यापित करें',
    humanVerified: 'मानव द्वारा सत्यापित'
  }
};
