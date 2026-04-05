export interface ImpactStat {
  value: string;
  label: string;
  year: "2025" | "Cumulative";
  category: string;
  sortOrder: number;
}

export const impactStats: ImpactStat[] = [
  // 2025
  { value: "28,025", label: "Students Served", year: "2025", category: "Education", sortOrder: 1 },
  { value: "34", label: "School Sites", year: "2025", category: "Education", sortOrder: 2 },
  { value: "5,000+", label: "Fire Relief Families Stabilized", year: "2025", category: "Crisis Response", sortOrder: 3 },
  { value: "324", label: "Hub Active Clients", year: "2025", category: "Crisis Response", sortOrder: 4 },
  { value: "7,581", label: "Hub Assistance Instances", year: "2025", category: "Crisis Response", sortOrder: 5 },
  { value: "$4.5M+", label: "In-Kind Value Mobilized", year: "2025", category: "Resources", sortOrder: 6 },
  { value: "300+", label: "Partners Activated", year: "2025", category: "Partnerships", sortOrder: 7 },
  { value: "18,550+", label: "Backpacks Distributed (All-time)", year: "2025", category: "Education", sortOrder: 8 },
  { value: "75+", label: "Media Placements", year: "2025", category: "Media", sortOrder: 9 },

  // Cumulative
  { value: "62,475+", label: "Students Served Since 2020", year: "Cumulative", category: "Education", sortOrder: 1 },
  { value: "875,500+", label: "Pounds of Food Distributed", year: "Cumulative", category: "Community Health", sortOrder: 2 },
  { value: "145,000+", label: "Families Served (All Programs)", year: "Cumulative", category: "Impact", sortOrder: 3 },
  { value: "300+", label: "Partners & Sponsors", year: "Cumulative", category: "Partnerships", sortOrder: 4 },
  { value: "7,500+", label: "Volunteers Activated", year: "Cumulative", category: "Community", sortOrder: 5 },
  { value: "23", label: "Awards & Recognitions", year: "Cumulative", category: "Recognition", sortOrder: 6 },
  { value: "6", label: "Consecutive Years of Service", year: "Cumulative", category: "Impact", sortOrder: 7 },
  { value: "389+", label: "Food Distribution Events", year: "Cumulative", category: "Community Health", sortOrder: 8 },
  { value: "50+", label: "Healthcare Partner Organizations", year: "Cumulative", category: "Health", sortOrder: 9 },
  { value: "17,500+", label: "Back 2 School Attendees", year: "Cumulative", category: "Events", sortOrder: 10 },
];

export const digitalReach = {
  reach: "2.47M",
  views: "1.07M",
  profileVisits: "122K",
  contentPieces: "836",
  websiteVisits: "74,678",
  demographics: "78.9% women, 21.1% men | 83.3% ages 25-54",
};
