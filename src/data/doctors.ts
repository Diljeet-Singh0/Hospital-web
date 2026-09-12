export type Doctor = {
  id: string;
  name: string;
  qualification: string;
  specialty: string;
  specialtyId: string;
  experience: string;
  bio: string;
  image: string;
  achievements: string[];
  languages: string[];
};

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Rajesh Kumar",
    qualification: "MD, DM (Cardiology)",
    specialty: "Cardiology",
    specialtyId: "cardiology",
    experience: "18+ years",
    bio: "Senior Consultant Cardiologist with expertise in interventional cardiology, having performed over 5000 angiographies and 2000 angioplasties.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop",
    achievements: ["Gold Medal in DM Cardiology", "Fellow of European Society of Cardiology", "5000+ Procedures"],
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: "2",
    name: "Dr. Priya Sharma",
    qualification: "MS, MCh (Neurosurgery)",
    specialty: "Neurosciences",
    specialtyId: "neurology",
    experience: "15+ years",
    bio: "Leading Neurosurgeon specializing in minimally invasive brain and spine surgeries with a focus on patient outcomes and quality of life.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop",
    achievements: ["2000+ Surgeries", "Member of Neurological Society of India", "Spine Surgery Specialist"],
    languages: ["English", "Hindi"],
  },
  {
    id: "3",
    name: "Dr. Amit Singh",
    qualification: "MS Ortho, DNB",
    specialty: "Orthopaedics",
    specialtyId: "orthopedics",
    experience: "20+ years",
    bio: "Renowned Orthopaedic Surgeon with specialization in joint replacements and sports injuries. Pioneer of minimally invasive knee surgery in the region.",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop",
    achievements: ["3500+ Joint Replacements", "Sports Medicine Expert", "Robotic Surgery Trained"],
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: "4",
    name: "Dr. Anjali Verma",
    qualification: "MD Paediatrics",
    specialty: "Paediatrics",
    specialtyId: "paediatrics",
    experience: "12+ years",
    bio: "Compassionate Paediatrician with special interest in neonatal care and developmental paediatrics. Trained in top institutions across India.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&auto=format&fit=crop",
    achievements: ["NICU Specialist", "Lactation Consultant", "Developmental Pediatrics"],
    languages: ["English", "Hindi"],
  },
  {
    id: "5",
    name: "Dr. Sandeep Malhotra",
    qualification: "MS, DNB (Ophthalmology)",
    specialty: "Ophthalmology",
    specialtyId: "ophthalmology",
    experience: "16+ years",
    bio: "Ophthalmologist specializing in cataract and refractive surgeries. One of the highest volumes Lasik surgeons in North India.",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&auto=format&fit=crop",
    achievements: ["15000+ Cataract Surgeries", "Fellow International Council of Ophthalmology", "Lasik Expert"],
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: "6",
    name: "Dr. Meera Gupta",
    qualification: "MD, DNB (Obs & Gynae)",
    specialty: "Obstetrics & Gynaecology",
    specialtyId: "gynaecology",
    experience: "19+ years",
    bio: "Senior Obstetrician and Gynaecologist with expertise in high-risk pregnancies and laparoscopic gynaecological surgeries.",
    image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&auto=format&fit=crop",
    achievements: ["10000+ Deliveries", "Laparoscopic Gynae Surgeon", "Fertility Specialist"],
    languages: ["English", "Hindi", "Punjabi"],
  },
  {
    id: "7",
    name: "Dr. Vikram Ahuja",
    qualification: "MS Gen Surgery, FACS",
    specialty: "General Surgery",
    specialtyId: "generalsurgery",
    experience: "17+ years",
    bio: "General Surgeon specializing in advanced laparoscopic and gastrointestinal surgeries. Known for excellent patient outcomes.",
    image: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&auto=format&fit=crop",
    achievements: ["Fellow of American College of Surgeons", "Advanced Laparoscopy", "Bariatric Surgery"],
    languages: ["English", "Hindi"],
  },
  {
    id: "8",
    name: "Dr. Nidhi Batra",
    qualification: "MD (Dermatology)",
    specialty: "Oncology",
    specialtyId: "oncology",
    experience: "14+ years",
    bio: "Medical Oncologist with comprehensive training in cancer treatment. Focus on personalized medicine and targeted therapies.",
    image: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=600&auto=format&fit=crop",
    achievements: ["Oncology Certified", "Targeted Therapy Expert", "Supportive Care"],
    languages: ["English", "Hindi"],
  },
];
