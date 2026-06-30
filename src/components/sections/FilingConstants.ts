import React from "react";

export const accent = "#0d5c3a";
export const bgAccent = "#e6f3ed";
export const gold = "#b8860b";

export const fldCls =
    "w-full rounded-lg px-3.5 py-2.5 text-sm outline-none transition-all border";

export const fldSty = {
    background: "#fdfaf4",
    borderColor: "rgba(13,27,46,0.15)",
    color: "#0d1b2e",
};

export const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => (e.currentTarget.style.borderColor = accent);

export const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => (e.currentTarget.style.borderColor = "rgba(13,27,46,0.15)");

export const colorsMap = {
    amber: {
        bg: "#fff9ee",
        border: "rgba(184,134,11,0.25)",
        icon: gold,
        text: "#7a5500",
    },
    red: {
        bg: "#fff0f0",
        border: "rgba(192,57,43,0.25)",
        icon: "#c0392b",
        text: "#8b1a1a",
    },
    green: {
        bg: "#e6f3ed",
        border: "rgba(13,92,58,0.25)",
        icon: accent,
        text: "#0d3d28",
    },
    blue: {
        bg: "#e8f0f8",
        border: "rgba(26,74,122,0.25)",
        icon: "#1a4a7a",
        text: "#1a4a7a",
    },
};

export const statusMap = {
    pending: {
        label: "Pending",
        bg: "#f5ede0",
        text: "#7a3a00",
        dot: gold,
    },
    active: {
        label: "In Progress",
        bg: "#e8f0f8",
        text: "#1a4a7a",
        dot: "#1a4a7a",
    },
    pass: {
        label: "Passed",
        bg: bgAccent,
        text: accent,
        dot: accent,
    },
    fail: {
        label: "Failed",
        bg: "#fff0f0",
        text: "#8b1a1a",
        dot: "#c0392b",
    },
};

export const dashboardStats = [
    { label: "Client Registered", step: 1, status: "done" },
    { label: "Application Filed", step: 2, status: "done" },
    { label: "Examination", step: 3, status: "active" },
    { label: "Opposition Period", step: 4, status: "pending" },
    { label: "Payment & Certificate", step: 5, status: "pending" },
];

export const dashboardDocs = [
    "Power of Attorney (POA)",
    "EIPA Application Form",
    "Official Action Response Template",
    "Counter-Statement Template",
    "Certificate of Registration (Pending)",
];

export const step5Docs = [
    "Trademark Registration Certificate (PDF)",
    "EIPA Official Receipt",
    "Registration Summary Report",
];

export const step2ApplicantDocs = [
    "POA — Notarized",
    "Registration Certificate",
    "Business License",
];

export const titlesMap: Record<number, string> = {
    0: "Filing Dashboard",
    1: "Step 1 — Client Instructions",
    2: "Step 2 — File Application",
    3: "Step 3 — Examination Phase",
    4: "Step 4 — Call for Opposition",
    5: "Step 5 — Payment",
};

export class statColor {
}