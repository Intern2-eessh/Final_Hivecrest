/**
 * The Hivecrest × GJ Global portfolio, in one place.
 *
 * Hivecrest is a dealership partner of GJ Global; these are partner products
 * the company extends access to, which is why they live apart from the
 * engineered services in lib/services.ts. Content is taken from the company
 * brochure (Company Brochure PDF, pages 6 to 13).
 *
 * One brochure defect worth recording: the AutoCare 360 page (11) carries GJ
 * Edu's capability list, pasted in by mistake. Its capabilities below are
 * therefore drawn only from AutoCare's own description sentence — booking,
 * job cards, inventory, billing, service tracking — rather than invented.
 */

export interface PortfolioProduct {
  /** Two-digit index, same architectural role as a service id. */
  id: string;
  /** Route segment under /portfolio. */
  slug: string;
  name: string;
  /** The system label from the brochure's portfolio spread. */
  system: string;
  /** The brochure's one-sentence description. */
  overview: string;
  /** The brochure's positioning line, sentence-cased from its caps banner. */
  position: string;
  /** Short tags for the hero row, drawn from the capability list. */
  chips: string[];
  capabilities: string[];
  /** The brochure's closing results line. */
  outcome: string;
  image: string;
  metaDescription: string;
}

export const PORTFOLIO: PortfolioProduct[] = [
  {
    id: "01",
    slug: "attendix",
    name: "Attendix",
    system: "Smart Attendance Management System",
    overview:
      "Attendix automates workforce attendance using AI-powered face recognition, geo-fencing, and real-time reporting.",
    position: "Automate attendance. Improve accountability.",
    chips: ["Face recognition", "Geo-fencing", "Real-time reporting"],
    capabilities: [
      "AI-based face recognition",
      "Geo-fencing & location validation",
      "Real-time attendance reporting",
      "Mobile & web access",
      "Leave request management",
      "Break-time logging",
      "Workforce monitoring",
    ],
    outcome: "Reduce manual errors. Improve transparency. Strengthen workforce accountability.",
    image: "/assets/portfolio/attendix.webp",
    metaDescription:
      "Attendix, a smart attendance management system: AI-based face recognition, geo-fencing, real-time reporting, leave management and workforce monitoring.",
  },
  {
    id: "02",
    slug: "assetpro",
    name: "AssetPro",
    system: "Asset Management System",
    overview:
      "AssetPro provides complete asset lifecycle management to help organizations track, maintain, and optimize their assets.",
    position: "Track. Maintain. Optimize.",
    chips: ["Asset tracking", "Lifecycle management", "Maintenance"],
    capabilities: [
      "Real-time asset tracking",
      "Barcode & serial number tracking",
      "Asset lifecycle management",
      "Preventive maintenance",
      "Corrective maintenance",
      "Secure asset transfers",
      "Bulk asset onboarding",
      "Purchase-to-disposal tracking",
    ],
    outcome: "Reduce losses. Improve utilization. Control operational costs.",
    image: "/assets/portfolio/assetpro.webp",
    metaDescription:
      "AssetPro, an asset management system: real-time tracking, barcode and serial number tracking, lifecycle management, preventive and corrective maintenance.",
  },
  {
    id: "03",
    slug: "gj-health",
    name: "GJ Health",
    system: "Hospital Management System",
    overview: "GJ Health integrates key hospital operations into a unified management platform.",
    position: "Smarter healthcare. Better outcomes.",
    chips: ["OP / IP management", "EMR", "Telemedicine"],
    capabilities: [
      "OP / IP management",
      "Pharmacy management",
      "Billing & insurance",
      "Laboratory management",
      "Electronic Medical Records",
      "Patient portal",
      "Doctor & staff modules",
      "Appointment & scheduling",
      "Multi-branch management",
      "Telemedicine integration",
    ],
    outcome: "Streamline workflows. Improve operational visibility. Enhance patient experience.",
    image: "/assets/portfolio/gj_health.webp",
    metaDescription:
      "GJ Health, a hospital management system: OP/IP management, pharmacy, billing and insurance, laboratory, EMR, patient portal and telemedicine integration.",
  },
  {
    id: "04",
    slug: "gj-edu",
    name: "GJ Edu",
    system: "Education Management System",
    overview:
      "GJ Edu digitizes academic and administrative operations for schools, colleges, and training institutions.",
    position: "Smarter learning. Seamless management.",
    chips: ["Admissions", "Student portal", "Examinations"],
    capabilities: [
      "Online admission & enrollment",
      "Student & parent portal",
      "Attendance management",
      "Teacher module",
      "Examination & evaluation",
      "Grading",
      "Fee management",
      "Library management",
      "Transport management",
      "Multi-branch management",
      "Communication tools",
    ],
    outcome: "Reduce paperwork. Connect stakeholders. Improve institutional visibility.",
    image: "/assets/portfolio/gj_edu.webp",
    metaDescription:
      "GJ Edu, an education management system for schools, colleges and training institutions: admissions, portals, attendance, examinations, fees and transport.",
  },
  {
    id: "05",
    slug: "autocare-360",
    name: "AutoCare 360",
    system: "Garage Management System",
    overview:
      "AutoCare 360 digitizes garage workflows from booking and job cards to inventory, billing, and service tracking.",
    position: "Simplify service. Accelerate operations.",
    chips: ["Job cards", "Inventory", "Service tracking"],
    capabilities: [
      "Service booking",
      "Job card management",
      "Inventory management",
      "Billing",
      "Service tracking",
    ],
    outcome: "Improve workshop efficiency. Strengthen customer experience. Streamline operations.",
    image: "/assets/portfolio/autocare_360.webp",
    metaDescription:
      "AutoCare 360, a garage management system that digitizes workshop workflows: service booking, job cards, inventory, billing and service tracking.",
  },
  {
    id: "06",
    slug: "parkezy",
    name: "ParkEZY",
    system: "Smart Parking Management System",
    overview:
      "ParkEZY combines IoT, RFID, ANPR, FASTag, digital payments, and real-time analytics to automate parking operations.",
    position: "Smart parking. Smarter operations.",
    chips: ["RFID / ANPR / FASTag", "Cashless payments", "Occupancy analytics"],
    capabilities: [
      "RFID / ANPR / FASTag entry & exit",
      "Real-time slot availability",
      "Automated space allocation",
      "Cashless payments",
      "Digital tickets & receipts",
      "Valet management",
      "Employee parking",
      "Mobile booking & alerts",
      "Occupancy analytics",
      "Revenue & usage reports",
    ],
    outcome: "Reduce waiting time. Improve space utilization. Enable data-driven parking management.",
    image: "/assets/portfolio/parkezy.webp",
    metaDescription:
      "ParkEZY, a smart parking management system: RFID, ANPR and FASTag entry, real-time slot availability, cashless payments, valet management and occupancy analytics.",
  },
  {
    id: "07",
    slug: "gj-concierge",
    name: "GJ Concierge",
    system: "Hospitality & Service Management System",
    overview:
      "GJ Concierge is a web and mobile platform designed for hotels, restaurants, and resorts.",
    position: "Enhancing guest experience. Simplifying operations.",
    chips: ["Food ordering", "Room service", "QR feedback"],
    capabilities: [
      "Food ordering",
      "Digital bill payments",
      "Real-time order tracking",
      "QR-based feedback",
      "Complaint management",
      "Room service requests",
      "Housekeeping requests",
      "Contactless guest services",
      "Digital guest interaction",
      "Restaurant integration",
    ],
    outcome: "Reduce service delays. Improve guest satisfaction. Increase operational efficiency.",
    image: "/assets/portfolio/gj_concierge.webp",
    metaDescription:
      "GJ Concierge, a hospitality and service management platform for hotels, restaurants and resorts: food ordering, room service, housekeeping and contactless guest services.",
  },
];

/** Route path for a portfolio product page. */
export const portfolioPath = (slug: string) => `/portfolio/${slug}`;
