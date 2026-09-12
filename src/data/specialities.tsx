import {
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  Droplets,
  Stethoscope,
  Flower2,
  Shield,
  BrainCircuit,
  ScanLine,
  Syringe,
} from "lucide-react";

export type Speciality = {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  shortDescription: string;
  features: string[];
};

export const specialities: Speciality[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    icon: Heart,
    shortDescription: "Advanced heart care with modern cardiac facilities",
    description:
      "Our Department of Cardiology provides comprehensive cardiovascular care with state-of-the-art diagnostic and treatment facilities. Our experienced cardiologists handle everything from routine checkups to complex cardiac surgeries.",
    features: [
      "24/7 Cardiac Emergency Care",
      "Angiography & Angioplasty",
      "Pacemaker Implantation",
      "Echocardiography & TMT",
      "Cardiac Rehabilitation",
      "Preventive Cardiology",
    ],
  },
  {
    id: "neurology",
    name: "Neurosciences",
    icon: Brain,
    shortDescription: "Expert care for brain, spine and nervous system disorders",
    description:
      "The Department of Neurosciences offers comprehensive care for disorders affecting the brain, spinal cord, and nervous system. Our team of neurologists and neurosurgeons provide both surgical and non-surgical treatments.",
    features: [
      "Brain & Spine Surgery",
      "Stroke Management",
      "Epilepsy Treatment",
      "Migraine & Headache Clinic",
      "Neuro Rehabilitation",
      "Sleep Disorder Center",
    ],
  },
  {
    id: "orthopedics",
    name: "Orthopaedics",
    icon: Bone,
    shortDescription: "Joint replacement, sports medicine & fracture care",
    description:
      "Our Orthopaedics department specializes in musculoskeletal care including joint replacements, sports injuries, and complex fracture management. We use minimally invasive techniques for faster recovery.",
    features: [
      "Knee & Hip Replacement",
      "Sports Medicine",
      "Arthroscopy",
      "Spine Surgery",
      "Paediatric Orthopaedics",
      "Fracture Management",
    ],
  },
  {
    id: "paediatrics",
    name: "Paediatrics",
    icon: Baby,
    shortDescription: "Specialized care for newborns, children & adolescents",
    description:
      "The Paediatrics department provides comprehensive medical care for infants, children, and adolescents. Our NICU is equipped with the latest technology to care for premature and critically ill newborns.",
    features: [
      "Level III NICU",
      "Paediatric ICU",
      "Vaccination Center",
      "Developmental Pediatrics",
      "Neonatal Surgery",
      "Growth & Development Clinic",
    ],
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    icon: Eye,
    shortDescription: "Comprehensive eye care and advanced vision correction",
    description:
      "Our Ophthalmology department offers a full spectrum of eye care services from routine eye exams to advanced surgical procedures. We use cutting-edge technology for diagnosis and treatment.",
    features: [
      "Cataract Surgery",
      "Lasik & Refractive Surgery",
      "Glaucoma Treatment",
      "Retina Services",
      "Paediatric Ophthalmology",
      "Cornea Transplant",
    ],
  },
  {
    id: "urology",
    name: "Urology & Nephrology",
    icon: Droplets,
    shortDescription: "Kidney, bladder and male reproductive health",
    description:
      "The Urology & Nephrology department provides comprehensive care for urinary tract and kidney disorders. Our dialysis unit operates 24/7 with advanced monitoring systems.",
    features: [
      "24/7 Dialysis Unit",
      "Kidney Transplant Program",
      "Laser Urology",
      "Lithotripsy",
      "Prostate Treatment",
      "Uro-oncology",
    ],
  },
  {
    id: "gynaecology",
    name: "Obstetrics & Gynaecology",
    icon: Flower2,
    shortDescription: "Complete women's health and maternity care",
    description:
      "Our Obstetrics & Gynaecology department provides compassionate care for women through all stages of life. From puberty through menopause and beyond, we offer comprehensive women's health services.",
    features: [
      "Maternity & Delivery Suites",
      "High-Risk Pregnancy Care",
      "Fertility Treatment",
      "Laparoscopic Gynae Surgery",
      "Menopause Clinic",
      "Well Woman Checkups",
    ],
  },
  {
    id: "generalsurgery",
    name: "General Surgery",
    icon: Stethoscope,
    shortDescription: "Minimally invasive and advanced surgical procedures",
    description:
      "The Department of General Surgery offers a wide range of surgical services using both open and minimally invasive (laparoscopic) techniques. Our modular operation theatres ensure the highest standards of safety.",
    features: [
      "Laparoscopic Surgery",
      "Gastrointestinal Surgery",
      "Hernia Repair",
      "Thyroid Surgery",
      "Breast Surgery",
      "Day Care Procedures",
    ],
  },
  {
    id: "oncology",
    name: "Oncology",
    icon: Shield,
    shortDescription: "Comprehensive cancer diagnosis and treatment",
    description:
      "Our Oncology department provides comprehensive cancer care including medical oncology, surgical oncology, and supportive care. Our multidisciplinary team ensures personalized treatment for every patient.",
    features: [
      "Chemotherapy",
      "Surgical Oncology",
      "Cancer Screening",
      "Palliative Care",
      "Tumor Board",
      "Support Groups",
    ],
  },
  {
    id: "psychiatry",
    name: "Mental Health",
    icon: BrainCircuit,
    shortDescription: "Psychiatric care and mental wellness services",
    description:
      "Our Mental Health department provides compassionate care for various psychological and psychiatric conditions. We offer both outpatient and inpatient services with a focus on holistic wellness.",
    features: [
      "Psychiatric Consultation",
      "Counseling & Psychotherapy",
      "De-addiction Center",
      "Child Psychiatry",
      "Stress Management",
      "Support Groups",
    ],
  },
  {
    id: "radiology",
    name: "Radiology & Imaging",
    icon: ScanLine,
    shortDescription: "Advanced diagnostic imaging and interventional radiology",
    description:
      "The Department of Radiology & Imaging is equipped with the latest technology for accurate diagnosis. Our experienced radiologists ensure precise imaging and timely reports.",
    features: [
      "Digital X-Ray",
      "Ultrasound & Doppler",
      "CT Scan",
      "MRI",
      "Mammography",
      "Interventional Radiology",
    ],
  },
  {
    id: "dental",
    name: "Dental & Maxillofacial",
    icon: Syringe,
    shortDescription: "Complete oral health and facial surgery",
    description:
      "Our Dental department offers comprehensive oral health care including general dentistry, orthodontics, and maxillofacial surgery. Modern equipment ensures pain-free and efficient treatments.",
    features: [
      "General Dentistry",
      "Orthodontics & Braces",
      "Dental Implants",
      "Root Canal Treatment",
      "Oral Surgery",
      "Cosmetic Dentistry",
    ],
  },
];
