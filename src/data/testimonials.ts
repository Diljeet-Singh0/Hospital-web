export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  content: string;
  treatment: string;
  image: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ravinder Kaur",
    location: "Amritsar",
    rating: 5,
    content:
      "I was admitted for a knee replacement surgery and the care I received was exceptional. Dr. Amit Singh and the entire staff went above and beyond. The hospital facilities are top-notch and the nursing staff is incredibly caring. Highly recommended!",
    treatment: "Knee Replacement Surgery",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Manoj Gupta",
    location: "Jalandhar",
    rating: 5,
    content:
      "My father had a cardiac emergency and was rushed to Paarvati Hospital. The response time was phenomenal. Dr. Rajesh Kumar took immediate action and saved his life. The post-operative care was excellent. We are forever grateful.",
    treatment: "Cardiac Emergency Treatment",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Simranjit Singh",
    location: "Ludhiana",
    rating: 5,
    content:
      "My wife delivered our first baby here and the experience was wonderful. Dr. Meera Gupta is incredibly experienced and made the entire process so smooth. The maternity ward is luxurious and the staff is supportive 24/7.",
    treatment: "Maternity & Delivery",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Anita Devi",
    location: "Bathinda",
    rating: 5,
    content:
      "I came for a cataract surgery on both eyes. Dr. Sandeep Malhotra explained everything in detail. The procedure was painless and my vision is better than ever. The hospital is clean and well-organized. Five stars without hesitation!",
    treatment: "Bilateral Cataract Surgery",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Harjeet Singh",
    location: "Tarn Taran",
    rating: 5,
    content:
      "The Neurosurgery team at this hospital is outstanding. My brother had a complicated spine condition and Dr. Priya Sharma handled it brilliantly. The physiotherapy department helped him walk again. Thank you for everything!",
    treatment: "Spine Surgery",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Kulwant Kaur",
    location: "Gurdaspur",
    rating: 5,
    content:
      "The dialysis unit is excellent. My husband has been getting dialysis here for 3 years now. The nephrologists are thorough, the machines are modern, and the staff is punctual. They treat patients like family.",
    treatment: "Dialysis Treatment",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop",
  },
];

export const stats = [
  { id: "1", value: 22, suffix: "+", label: "Years of Excellence" },
  { id: "2", value: 50000, suffix: "+", label: "Happy Patients" },
  { id: "3", value: 200, suffix: "+", label: "Surgeries Per Month" },
  { id: "4", value: 100, suffix: "+", label: "Hospital Beds" },
];

export const facilities = [
  "5 Modular Laminar Operation Theatre",
  "Emergency, ICU, HDU, Post Operative/Pre Operative Areas",
  "Ultrasound, X-Ray, Dialysis Unit",
  "24/7 Chemist Shop/Laboratory",
  "100+ Bedded Hospital",
  "Physiotherapy & Acupressure",
  "Cafeteria & Mess Facilities",
  "24/7 Power Backup",
  "Parking Facility Available Inside/Outside The Hospital",
  "Computerized Microbiology & Pathology Laboratory",
  "NICU & PICU",
  "Digital X-ray, Echo & Ultrasound",
];
