import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { generateSlug } from "../src/lib/slug";

// ─── Prisma client setup (official Prisma 7 + Next.js pattern) ───────────────
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

// ─── Sample Data ──────────────────────────────────────────────────────────────

const PROFESSIONS = ["Nurse", "Doctor", "Pharmacist", "Lab Technician", "Medical Coder"];
const CITIES = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune", "Chennai"];

const COMPANIES = [
  "Apollo Hospitals",
  "Fortis Healthcare",
  "Max Healthcare",
  "Manipal Hospitals",
  "AIIMS",
  "Medanta",
  "Narayana Health",
  "Aster DM Healthcare",
  "Columbia Asia",
  "Cloudnine Hospitals",
];

const CATEGORIES = ["Full Time", "Part Time", "Contract", "Locum / Temporary"];

const JOB_TEMPLATES: Record<string, { titles: string[]; descriptions: string[] }> = {
  Nurse: {
    titles: [
      "Staff Nurse – General Ward",
      "Senior Staff Nurse – ICU",
      "OT Nurse – Operation Theatre",
      "Emergency Nurse – Casualty Department",
      "Paediatric Nurse – NICU",
    ],
    descriptions: [
      "We are looking for a qualified and compassionate Staff Nurse to join our team. The candidate should have a BSc Nursing or GNM degree with valid NMC registration. Responsibilities include patient care, administering medications, maintaining patient records, and coordinating with doctors and specialists.",
      "Seeking an experienced ICU Nurse with critical care expertise. The ideal candidate will have at least 2 years of ICU experience, strong clinical skills, and the ability to manage ventilators and critical care equipment. Excellent communication and teamwork skills required.",
      "Join our state-of-the-art Operation Theatre team. The OT Nurse will assist surgeons during procedures, maintain sterile environments, and manage surgical instruments. Experience in scrubbing and circulating duties is essential.",
    ],
  },
  Doctor: {
    titles: [
      "General Physician – OPD",
      "Resident Doctor – Internal Medicine",
      "Consultant Cardiologist",
      "Junior Doctor – Emergency Medicine",
      "Medical Officer – Primary Health",
    ],
    descriptions: [
      "We are hiring a qualified MBBS / MD Doctor to manage OPD consultations. The candidate will diagnose and treat patients, maintain medical records, and coordinate with specialists as needed. Strong diagnostic skills and patient communication are essential.",
      "Seeking a Resident Doctor for our Internal Medicine department. Responsibilities include ward rounds, patient management, case documentation, and supporting senior consultants. MD/DNB Internal Medicine preferred.",
      "Experienced Cardiologist needed for our cardiac care center. Must have DM or DNB Cardiology with at least 3 years of independent practice.",
    ],
  },
  Pharmacist: {
    titles: [
      "Clinical Pharmacist – Hospital",
      "Retail Pharmacist – Pharmacy Store",
      "Pharmacovigilance Officer",
      "Drug Information Pharmacist",
      "Compounding Pharmacist",
    ],
    descriptions: [
      "Looking for a registered Pharmacist to manage our hospital pharmacy. Responsibilities include dispensing medications, counselling patients, checking prescriptions for accuracy, maintaining drug inventory, and ensuring compliance with regulations. B.Pharm / M.Pharm required.",
      "Retail Pharmacist needed for our chain pharmacy. Duties include dispensing OTC and prescription medications, providing medication counselling, managing stock, and operating the pharmacy POS system.",
      "We are seeking a Pharmacovigilance Officer to manage adverse drug reactions reporting, regulatory submissions, and drug safety monitoring.",
    ],
  },
  "Lab Technician": {
    titles: [
      "Lab Technician – Pathology",
      "Senior Medical Lab Technician",
      "Radiology Technician – X-Ray & MRI",
      "Phlebotomist – Blood Collection",
      "Microbiology Lab Technician",
    ],
    descriptions: [
      "We are looking for a skilled Lab Technician to perform pathological tests including haematology, biochemistry and serology. DMLT or BMLT qualification with hands-on experience in a clinical laboratory required.",
      "Senior Medical Lab Technician needed to supervise daily lab operations, perform quality control, train junior staff, and liaise with clinicians. Minimum 3 years of experience and BSc MLT or equivalent required.",
      "Radiology Technician with experience in digital X-Ray, CT, and MRI operations required. Must be certified with AERB and have 1+ year of practical radiology experience.",
    ],
  },
  "Medical Coder": {
    titles: [
      "Medical Coder – ICD-10 & CPT",
      "Senior Medical Coder – Inpatient",
      "Coding Auditor – Quality Review",
      "HIM Specialist – Health Information",
      "Remote Medical Coder",
    ],
    descriptions: [
      "We are hiring a Medical Coder with expertise in ICD-10-CM, CPT, and HCPCS coding. The candidate will review medical records, assign accurate diagnostic and procedural codes, and ensure compliance with payer guidelines. CPC or CCS certification preferred.",
      "Senior Medical Coder needed for inpatient facility coding. Must have 3+ years of IP coding experience with DRG assignment knowledge.",
      "Coding Auditor to conduct internal and external coding audits, identify coding errors, provide feedback to coders, and track quality metrics.",
    ],
  },
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(daysAgo: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysAgo));
  return d;
}

function generateJobId(profession: string, city: string, idx: number): string {
  return `HJP-${profession.slice(0, 3).toUpperCase()}-${city.slice(0, 3).toUpperCase()}-${String(idx).padStart(4, "0")}`;
}

// ─── Seed Function ────────────────────────────────────────────────────────────

export async function main() {
  console.log("🌱 Seeding healthcare jobs...\n");

  let totalCreated = 0;
  let jobIndex = 1;

  for (const profession of PROFESSIONS) {
    for (const city of CITIES) {
      const template = JOB_TEMPLATES[profession];
      const numJobs = Math.floor(Math.random() * 4) + 3; // 3–6 jobs per combo

      for (let i = 0; i < numJobs; i++) {
        const jobId = generateJobId(profession, city, jobIndex++);
        const title = randomFrom(template.titles);
        const description = randomFrom(template.descriptions);
        const company = randomFrom(COMPANIES);
        const category = randomFrom(CATEGORIES);
        const postedDate = randomDate(60);
        const slug = generateSlug(profession, city);

        await prisma.job.upsert({
          where: { jobId },
          update: {},
          create: {
            jobId,
            title,
            slug,
            profession,
            location: city,
            description,
            applyLink: `https://careers.example.com/apply/${jobId.toLowerCase()}`,
            company,
            category,
            postedDate,
          },
        });

        totalCreated++;
      }
      console.log(`  ✓ ${profession} jobs in ${city} seeded`);
    }
  }

  console.log(
    `\n✅ Seed complete — ${totalCreated} jobs created across ${PROFESSIONS.length} professions × ${CITIES.length} cities`
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
