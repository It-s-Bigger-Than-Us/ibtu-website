export interface Partner {
  title: string;
  category: string;
  partnerType: string;
}

export const partners: Partner[] = [
  // Financial / Foundation
  { title: "A-mark Foundation", category: "Financial & Foundation", partnerType: "Foundation" },
  { title: "Brantley & Ashley Essary Charitable Fund", category: "Financial & Foundation", partnerType: "Foundation" },
  { title: "Brothers Brother Foundation", category: "Financial & Foundation", partnerType: "Foundation" },
  { title: "Disney Family Foundation", category: "Financial & Foundation", partnerType: "Foundation" },
  { title: "Goldman Sachs", category: "Financial & Foundation", partnerType: "Corporate" },
  { title: "Health Net", category: "Financial & Foundation", partnerType: "Corporate" },
  { title: "JLH Foundation", category: "Financial & Foundation", partnerType: "Foundation" },
  { title: "CORE", category: "Financial & Foundation", partnerType: "Organization" },
  { title: "Robert L. Zangrillo Family Foundation", category: "Financial & Foundation", partnerType: "Foundation" },

  // Brand & In-Kind
  { title: "lululemon", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Baby2Baby", category: "Brand & In-Kind", partnerType: "Organization" },
  { title: "Sol de Janeiro", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Supreme", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Nike", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Apple", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Google", category: "Brand & In-Kind", partnerType: "Corporate" },
  { title: "Target", category: "Brand & In-Kind", partnerType: "Corporate" },
  { title: "Adidas", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Bombas", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Pacsun", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Erewhon", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "L'Occitane", category: "Brand & In-Kind", partnerType: "Brand" },
  { title: "Pepsi", category: "Brand & In-Kind", partnerType: "Corporate" },
  { title: "DoorDash", category: "Brand & In-Kind", partnerType: "Corporate" },
  { title: "AT&T", category: "Brand & In-Kind", partnerType: "Corporate" },
  { title: "United Healthcare", category: "Brand & In-Kind", partnerType: "Corporate" },
  { title: "Shell", category: "Brand & In-Kind", partnerType: "Corporate" },
  { title: "LA28", category: "Brand & In-Kind", partnerType: "Organization" },
  { title: "FOX", category: "Brand & In-Kind", partnerType: "Media" },
  { title: "BET+", category: "Brand & In-Kind", partnerType: "Media" },
  { title: "TBWA\\Chiat\\Day", category: "Brand & In-Kind", partnerType: "Agency" },
  { title: "LA Rams", category: "Brand & In-Kind", partnerType: "Sports" },

  // Government & Civic
  { title: "Congresswoman Sydney Kamlager-Dove", category: "Government & Civic", partnerType: "Federal" },
  { title: "Senator Lola Smallwood-Cuevas", category: "Government & Civic", partnerType: "State" },
  { title: "Assemblymember Isaac G. Bryan", category: "Government & Civic", partnerType: "State" },
  { title: "Supervisor Holly J. Mitchell", category: "Government & Civic", partnerType: "County" },
  { title: "Mayor Karen Bass", category: "Government & Civic", partnerType: "City" },
  { title: "CM Marqueece Harris-Dawson (CD8)", category: "Government & Civic", partnerType: "City" },
  { title: "CM Heather Hutt (CD10)", category: "Government & Civic", partnerType: "City" },
  { title: "CM Traci Park (CD11)", category: "Government & Civic", partnerType: "City" },
  { title: "LAUSD", category: "Government & Civic", partnerType: "School District" },
  { title: "UTLA", category: "Government & Civic", partnerType: "Union" },
  { title: "HACLA", category: "Government & Civic", partnerType: "Housing Authority" },

  // Education
  { title: "Alliance College-Ready Public Schools", category: "Education", partnerType: "School Network" },
  { title: "Inglewood USD", category: "Education", partnerType: "School District" },
  { title: "Heart of Los Angeles", category: "Education", partnerType: "Youth Organization" },
  { title: "LA84 Foundation", category: "Education", partnerType: "Foundation" },
  { title: "LA Promise Fund", category: "Education", partnerType: "Foundation" },
  { title: "Iovine & Young Center", category: "Education", partnerType: "Arts Organization" },
  { title: "SoLa Robotics", category: "Education", partnerType: "Youth Organization" },
  { title: "Crenshaw High School Alumni Association", category: "Education", partnerType: "Alumni" },

  // Health & Wellness
  { title: "Charles Drew University", category: "Health & Wellness", partnerType: "Healthcare" },
  { title: "Liberty Dental", category: "Health & Wellness", partnerType: "Healthcare" },
  { title: "LA Care Health Plan", category: "Health & Wellness", partnerType: "Healthcare" },
  { title: "USC All of Us", category: "Health & Wellness", partnerType: "Research" },
  { title: "Keck School of Medicine USC", category: "Health & Wellness", partnerType: "Healthcare" },
  { title: "Black OM Wellness", category: "Health & Wellness", partnerType: "Wellness" },
  { title: "Tena Health", category: "Health & Wellness", partnerType: "Healthcare" },
  { title: "Peloton", category: "Health & Wellness", partnerType: "Wellness" },

  // Community & Crisis
  { title: "SoLa Impact", category: "Community & Crisis", partnerType: "Community" },
  { title: "One Church", category: "Community & Crisis", partnerType: "Faith-Based" },
  { title: "Khalsa Aid", category: "Community & Crisis", partnerType: "Humanitarian" },
  { title: "United MegaCare", category: "Community & Crisis", partnerType: "Faith-Based" },
  { title: "Westside Food Bank", category: "Community & Crisis", partnerType: "Food Bank" },
  { title: "ECOS Group", category: "Community & Crisis", partnerType: "Community" },
];

export function getPartnersByCategory(): Record<string, Partner[]> {
  const grouped: Record<string, Partner[]> = {};
  for (const p of partners) {
    if (!grouped[p.category]) grouped[p.category] = [];
    grouped[p.category].push(p);
  }
  return grouped;
}
