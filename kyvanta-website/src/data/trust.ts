export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  verified?: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: 'Kyvanta helped us identify automation opportunities we didn\'t know existed. Their AI Opportunity Audit saved us months of trial and error.',
    author: 'NEEDS BUSINESS INPUT',
    role: 'NEEDS BUSINESS INPUT',
    company: 'NEEDS BUSINESS INPUT',
  },
  // --- REFERENCE DATA FROM COMPETITOR ANALYSIS (not Kyvanta testimonials) ---
  // iGenuine Learning testimonials format (educational institution feedback):
  // {
  //   id: 'ref-igenuine-1',
  //   quote: 'The program has made a positive impact on our institution\'s students — bridged theoretical knowledge with real-world skills.',
  //   author: 'Training & Placement Team',
  //   role: 'Training & Placement Team',
  //   company: 'Sankara College of Science and Commerce',
  //   verified: true,
  // },
  // {
  //   id: 'ref-igenuine-2',
  //   quote: 'The training program delivered great value to our institution by enhancing students\' professional competencies, communication skills, and overall workplace readiness.',
  //   author: 'Training & Placement Team',
  //   role: 'Training & Placement Team',
  //   company: 'PSG Institute of Technology & Applied Research',
  //   verified: true,
  // },
  // {
  //   id: 'ref-igenuine-3',
  //   quote: 'Excellent resource person. The way he taught our students was interesting and made them eager to learn.',
  //   author: 'Training & Placement Team',
  //   role: 'Training & Placement Team',
  //   company: 'Kamaraj College of Engineering & Technology',
  //   verified: true,
  // },
  // {
  //   id: 'ref-igenuine-4',
  //   quote: 'Excellent in terms of assessment follow-up and continuous process improvement.',
  //   author: 'Training & Placement Team',
  //   role: 'Training & Placement Team',
  //   company: 'RP Sarathy Institute of Technology',
  //   verified: true,
  // },
  // {
  //   id: 'ref-igenuine-5',
  //   quote: 'Training supported our objective of preparing students for career readiness and industry expectations.',
  //   author: 'Training & Placement Team',
  //   role: 'Training & Placement Team',
  //   company: 'PPG Group of Institutions',
  //   verified: true,
  // },
  // {
  //   id: 'ref-igenuine-6',
  //   quote: 'I truly appreciate the coordination from the SPOC team — always available whenever we needed information.',
  //   author: 'Training & Placement Team',
  //   role: 'Training & Placement Team',
  //   company: 'Kumaraguru College of Technology',
  //   verified: true,
  // },
];

export interface ClientLogo {
  name: string
  url?: string
  industry?: string
}

export const clientLogos: ClientLogo[] = [
  { name: 'NEEDS BUSINESS INPUT - Add client logos with permission' },
  // --- REFERENCE DATA FROM COMPETITOR ANALYSIS (not Kyvanta clients) ---
  // InfySkill placement partners (students placed at these companies):
  // { name: 'Amazon', url: 'https://www.amazon.com', industry: 'Technology' },
  // { name: 'Google', url: 'https://www.google.com', industry: 'Technology' },
  // { name: 'Microsoft', url: 'https://www.microsoft.com', industry: 'Technology' },
  // { name: 'TCS', url: 'https://www.tcs.com', industry: 'IT Services' },
  // { name: 'Wipro', url: 'https://www.wipro.com', industry: 'IT Services' },
  // { name: 'Cognizant', url: 'https://www.cognizant.com', industry: 'IT Services' },
  // { name: 'Capgemini', url: 'https://www.capgemini.com', industry: 'IT Services' },
  // { name: 'Accenture', url: 'https://www.accenture.com', industry: 'IT Services' },
  // { name: 'HCL', url: 'https://www.hcltech.com', industry: 'IT Services' },
  // { name: 'Tech Mahindra', url: 'https://www.techmahindra.com', industry: 'IT Services' },
  // { name: 'Kaar Technologies', url: '#', industry: 'IT Services' },
  // iGenuine Learning institutional partners:
  // { name: 'Kumaraguru College of Technology', industry: 'Education' },
  // { name: 'Kongu Engineering College', industry: 'Education' },
  // { name: 'Eshwar College of Engineering', industry: 'Education' },
  // { name: 'NSRIET', industry: 'Education' },
  // { name: 'VTU', industry: 'Education' },
];

export interface TeamMember {
  name: string
  role: string
  bio: string
  linkedin?: string
}

export const team: TeamMember[] = [
  {
    name: 'NEEDS BUSINESS INPUT',
    role: 'Founder',
    bio: 'NEEDS BUSINESS INPUT',
  },
  // --- REFERENCE DATA FROM COMPETITOR ANALYSIS (not Kyvanta team) ---
  // Teckybot leadership team:
  // {
  //   name: 'Nallamilli Venkata Reddy',
  //   role: 'Founder & CEO',
  //   bio: 'Founded Teckybot in 2014, leading STEM education and Industry 4.0 training initiatives.',
  // },
  // {
  //   name: 'Prem Vanamu',
  //   role: 'Chief Operating Officer',
  //   bio: 'Oversees operations at Teckybot, focusing on scaling Industry 4.0 training programs.',
  // },
  // {
  //   name: 'Revatipati M',
  //   role: 'Chief Technology Officer',
  //   bio: 'Leads technology development and R&D initiatives at Teckybot.',
  // },
  // {
  //   name: 'Nallamilli Harika',
  //   role: 'Managing Director',
  //   bio: 'Co-leads strategic direction and business development at Teckybot.',
  // },
];

export interface Certification {
  name: string
  issuer: string
  year?: string
}

export const certifications: Certification[] = [
  { name: 'NEEDS BUSINESS INPUT - Add certifications if applicable', issuer: 'NEEDS BUSINESS INPUT' },
  // --- REFERENCE DATA FROM COMPETITOR ANALYSIS (InfySkill certifications) ---
  // { name: 'ISO Certified', issuer: 'ISO', year: '2024' },
  // { name: 'DPIIT Startup India', issuer: 'Government of India', year: '2024' },
  // { name: 'MCA Registered', issuer: 'Ministry of Corporate Affairs', year: '2024' },
  // { name: 'AICTE Approved', issuer: 'AICTE', year: '2024' },
  // { name: 'MSME Approved', issuer: 'MSME', year: '2024' },
];

export const trustSignals = {
  yearsInBusiness: 'NEEDS BUSINESS INPUT',
  projectsDelivered: 'NEEDS BUSINESS INPUT',
  clientSatisfaction: 'NEEDS BUSINESS INPUT',
  responseTime: 'Within 24 hours',
  // --- REFERENCE DATA FROM COMPETITOR ANALYSIS ---
  // Teckybot: 25,000+ students trained, founded 2014 (10+ years)
  // iGenuine Learning: 129,000+ learners empowered, 40+ institutions, 11+ govt projects, 237+ partners, 95% satisfaction
  // InfySkill: 0+ (placeholder counters), certifications from ISO, DPIIT, MCA, AICTE, MSME
};

export interface SocialLink {
  platform: string
  url: string
}

export const socialLinks: SocialLink[] = [
  { platform: 'LinkedIn', url: 'https://linkedin.com/company/kyvanta-innovation' },
  { platform: 'Twitter', url: 'https://twitter.com/kyvantainnovation' },
  { platform: 'Instagram', url: 'https://instagram.com/kyvantainnovation' },
];

export const contactInfo = {
  email: 'hello@kyvantainnovations.com',
  phone: '+91-XXXXXXXXXX',
  address: 'NEEDS BUSINESS INPUT',
  responseTime: 'Within 24 hours',
  // --- REFERENCE DATA FROM COMPETITOR ANALYSIS ---
  // Teckybot: +91 88861 22886, info@teckybot.com, Visakhapatnam, AP
  // InfySkill: +91 9080087187, +91 9347140822, infyskilledutech@gmail.com, Visakhapatnam, AP
  // iGenuine Learning: +91 78450 01115, helpdesk@igenuinelearning.com, Coimbatore, TN
};
