import {
  Search,
  FileText,
  RefreshCw,
  Tag,
  ShieldAlert, LayoutDashboard,
} from "lucide-react";
import type {
  Section,
  SearchRecord,
  SearchStatus,
  Procedure,
} from "./types.ts";

export const accentColors: { search: string; filing: string; renewal: string; recordals: string; invalidation: string } = {
  search: "#1a4a7a",
  filing: "#0d5c3a",
  renewal: "#5a2d82",
  recordals: "#7a3a00",
  invalidation: "#8b1a1a",
};

export const bgAccentColors: {
    search: string;
    filing: string;
    renewal: string;
    recordals: string;
    invalidation: string
} = {
  search: "#e8f0f8",
  filing: "#e6f3ed",
  renewal: "#f0eaf7",
  recordals: "#f5ede0",
  invalidation: "#f8e8e8",
};

export const navItems = [
  {
    id: "dashboard" as Section,
    label: "Dashboard",
    icon: <LayoutDashboard size={15} />,
  },
  {
    id: "client" as Section,
    label: "Client",
    icon: <RefreshCw size={15} />,
  },
  {
    id: "search" as Section,
    label: "Trademark Search",
    icon: <Search size={15} />,
  },
  {
    id: "filing" as Section,
    label: "Filing",
    icon: <FileText size={15} />,
  },
  {
    id: "renewal" as Section,
    label: "Renewal",
    icon: <RefreshCw size={15} />,
  },
  {
    id: "recordals" as Section,
    label: "Recordals",
    icon: <Tag size={15} />,
  },
  {
    id: "invalidation" as Section,
    label: "Invalidation",
    icon: <ShieldAlert size={15} />,
  }
];

export const procedures: Procedure[] = [
  {
    id: "search",
    title: "Trademark Search",
    subtitle: "Pre-filing clearance procedure",
    icon: <Search size={18} />,
    steps: [
      {
        number: 1,
        title: "Receive Client Instructions",
        description:
          "Receive instructions from the client to conduct a trademark search.",
      },
      {
        number: 2,
        title: "Register Instruction",
        description:
          "Record the instruction in the MLA-IP System.",
      },
      {
        number: 3,
        title: "File Search Application",
        description:
          "Submit the search application to the relevant IP office.",
      },
      {
        number: 4,
        title: "Obtain Search Results",
        description:
          "Receive and review the official search results from the registry.",
      },
      {
        number: 4,
        title: "Obtain Search Results",
        description:
          "Receive and review the official search results from the registry.",
      },
    ],
  },
  {
    id: "filing",
    title: "Trademark Filing",
    subtitle: "New application registration",
    icon: <FileText size={18} />,
    steps: [
      {
        number: 1,
        title: "Receive Client Instructions & Documents",
        description:
          "Receive instructions from the client to file a new trademark and record in the MLA-IP System.",
        documents: [
          "Power of Attorney (POA)",
          "Foreign trademark registration certificate",
          "Business license",
        ],
      },
      {
        number: 2,
        title: "File the Application",
        description:
          "The filing is done through one of two channels.",
        substeps: [
          {
            label: "E-Service Portal",
            detail:
              "The e-service portal generates a tracking number for the file.",
          },
          {
            label: "Manual — EIPA Office",
            detail:
              "Submitted manually to the EIPA office IPAS system, which assigns a separate application number.",
          },
        ],
      },
      {
        number: 3,
        title: "Examination Phase",
        description:
          "The application undergoes two-stage examination at EIPA.",
        substeps: [
          {
            label: "Formality Examination",
            detail:
              "The formality team checks whether all required documents are fulfilled before passing to substantive examination.",
          },
          {
            label: "Substantive Examination",
            detail:
              "The team assesses trademark eligibility under governing laws. If accepted, the mark proceeds to advertisement. If not, a Notification of Amendment is issued.",
          },
        ],
        notes: [
          "If an Official Action (Notification of Amendment) is issued, the applicant must respond within 90 days from receipt.",
          "Failure to respond within 90 days results in the application being deemed abandoned.",
          "If the response is rejected, the applicant may appeal to EIPA's Tribunal.",
        ],
      },
      {
        number: 4,
        title: "Call for Opposition (Advertisement)",
        description:
          "If there is no notification or the response is accepted, a call for opposition is published.",
        notes: [
          "Any interested party may oppose registration within 60 days of the opposition publication.",
          "If opposition is filed, each party submits their arguments for adjudication.",
        ],
      },
      {
        number: 5,
        title: "Payment & Certificate",
        description:
          "If no opposition is filed after the 60-day window, the applicant proceeds to pay the certificate fee and obtain the registration certificate.",
        notes: [
          "Payment must be made within 3 months after the lapse of the 60-day opposition period.",
          "Failure to pay within this 3-month period results in the trademark being deemed abandoned.",
        ],
      },
    ],
  },
  {
    id: "renewal",
    title: "Trademark Renewal",
    subtitle: "7-year renewal cycle",
    icon: <RefreshCw size={18} />,
    purpose:
      "A trademark is renewed every seven years. Renewal shall be made within 3 months after expiry. After this period, renewal may still be made within a further six months subject to a late penalty.",
    steps: [
      {
        number: 1,
        title: "Receive Client Instructions & Documents",
        description:
          "Receive renewal instructions from the client and obtain required documents.",
        documents: [
          "Registration Certificate",
          "Power of Attorney (POA)",
        ],
      },
      {
        number: 2,
        title: "File Renewal Application & Pay Fees",
        description:
          "Submit the renewal application and make payment of both the filing fee and renewal fee together in one transaction.",
      },
      {
        number: 3,
        title: "Advertisement",
        description:
          "Advertise the renewal for a mandatory period of 60 days.",
      },
      {
        number: 4,
        title: "Obtain Renewal Certificate",
        description:
          "Receive the Renewal Certificate from the Registry upon successful completion.",
      },
    ],
  },
  {
    id: "recordals",
    title: "Recordals",
    subtitle: "Post-registration changes",
    icon: <Tag size={18} />,
    steps: [
      {
        number: 1,
        title: "Change of Address",
        description:
          "When the owner of a registered trademark changes their initial registered address.",
        documents: ["Fresh POA reflecting the new address"],
        notes: [
          "No advertisement is required for a change of address recordal.",
        ],
      },
      {
        number: 2,
        title: "Change of Name",
        description:
          "When the owner of a registered trademark changes their initial registered name.",
        documents: [
          "Foreign Change of Name Certificate",
          "Fresh POA reflecting the new company name",
        ],
        notes: [
          "Advertisement of the recordal of change of name is required.",
        ],
      },
      {
        number: 3,
        title: "Assignment (Transfer of Ownership)",
        description:
          "When a right on a registered trademark or an application is assigned in whole or in part.",
        documents: [
          "POA on behalf of both companies",
          "Notarized Deed of Assignment",
        ],
        notes: [
          "Advertisement of the recordal of assignment is required.",
        ],
      },
    ],
  },
  {
    id: "invalidation",
    title: "Invalidation",
    subtitle: "Invalidation",
    icon: <ShieldAlert size={18} />,
    purpose:
      "",
    steps: [
      {
        number: 1,
        title: "",
        description:
          "",
        documents: [
          "Completed EIPA application form (4 copies + softcopy)",
          "Power of Attorney (POA)",
          "Any supporting evidence",
        ],
        notes: [
          "Payment of prescribed fees must accompany the application.",
        ],
      },
      {
        number: 2,
        title: "Archive Check & Notification",
        description:
          "",
      },
      {
        number: 3,
        title: "Owner's Response",
        description:
          "",
        notes: [
          "",
        ],
      },
      {
        number: 4,
        title: "Oral Hearing",
        description:
          "",
      },
      {
        number: 5,
        title: "Decision",
        description:
          "",
        notes: [
          "",
        ],
      },
    ],
  },
];

export const assignedUsers = [
  "Selam Abebee",
  "Yonas Bekele",
  "Hiwot Alemu",
  "Dawit Girma",
  "Meron Haile",
];

export const statusStyles: Record<
  SearchStatus,
  { bg: string; text: string; dot: string }
> = {
  Completed: { bg: "#e6f3ed", text: "#0d5c3a", dot: "#0d5c3a" },
  "In Progress": {
    bg: "#e8f0f8",
    text: "#1a4a7a",
    dot: "#1a4a7a",
  },
  Pending: { bg: "#f5ede0", text: "#7a3a00", dot: "#b8860b" },
  Rejected: { bg: "#f8e8e8", text: "#8b1a1a", dot: "#c0392b" },
};

export const initialRecords: SearchRecord[] = [
  {
    orderNumber: "MLA-2024-0081",
    clientName: "Habesha Breweries S.C.",
    dateReceived: "2024-11-04",
    status: "Completed",
    assignedUser: "Selam Abebee",
    searchOutput: "Search output -1",
  },
  {
    orderNumber: "MLA-2024-0082",
    clientName: "Ethiopian Airlines Group",
    dateReceived: "2024-11-07",
    status: "In Progress",
    assignedUser: "Yonas Bekele",
    searchOutput: "Search output -2",
  },
  {
    orderNumber: "MLA-2024-0083",
    clientName: "Dashen Bank S.C.",
    dateReceived: "2024-11-12",
    status: "Pending",
    assignedUser: "Hiwot Alemu",
    searchOutput: "Search output -3",
  },
  {
    orderNumber: "MLA-2024-0084",
    clientName: "BGI Ethiopia PLC",
    dateReceived: "2024-11-15",
    status: "Completed",
    assignedUser: "Dawit Girma",
    searchOutput: "Search output -4",
  },
  {
    orderNumber: "MLA-2024-0085",
    clientName: "Safaricom Ethiopia PLC",
    dateReceived: "2024-11-18",
    status: "In Progress",
    assignedUser: "Meron Haile",
    searchOutput: "Search output -5",
  },
  {
    orderNumber: "MLA-2024-0086",
    clientName: "Zemen Bank S.C.",
    dateReceived: "2024-11-21",
    status: "Pending",
    assignedUser: "Selam Abebee",
    searchOutput: "Search output -6",
  },
  {
    orderNumber: "MLA-2024-0087",
    clientName: "Meta Abo Brewery PLC",
    dateReceived: "2024-11-25",
    status: "Pending",
    assignedUser: "Yonas Bekele",
    searchOutput: "Search output -7",
  },
  {
    orderNumber: "MLA-2024-0088",
    clientName: "Tsedey Bank S.C.",
    dateReceived: "2024-11-28",
    status: "Completed",
    assignedUser: "Hiwot Alemu",
    searchOutput: "Search output -8",
  },
  {
    orderNumber: "MLA-2024-0089",
    clientName: "Addis Ababa Water & Sewerage Auth.",
    dateReceived: "2024-12-02",
    status: "Pending",
    assignedUser: "Dawit Girma",
    searchOutput: "Search output -9",
  },
  {
    orderNumber: "MLA-2024-0090",
    clientName: "Ethiopian Insurance Corporation",
    dateReceived: "2024-12-05",
    status: "In Progress",
    assignedUser: "Meron Haile",
    searchOutput: "Search output 10",
  },
];