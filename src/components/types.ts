export type Section = "dashboard" | "client" | "search" | "filing" | "renewal" | "recordals" | "invalidation";

export type SearchStatus = "Pending" | "In Progress" | "Completed" | "Rejected";

export interface SearchRecord {
  orderNumber: string;
  clientName: string;
  dateReceived: string;
  status: SearchStatus;
  assignedUser: string;
  searchOutput: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  documents?: string[];
  notes?: string[];
  substeps?: { label: string; detail: string }[];
}

export interface Procedure {
  id: Section;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  purpose?: string;
  steps: Step[];
}
