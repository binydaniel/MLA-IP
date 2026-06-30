import type {ReactNode} from "react";

export interface FieldLabelProps {
    children: ReactNode;
}

export interface SectionCardProps {
    title: string;
    icon: ReactNode;
    children: ReactNode;
}

export interface PrimaryBtnProps {
    onClick?: () => void;
    children: ReactNode;
    disabled?: boolean;
}

export interface NoteProps {
    children: ReactNode;
    variant?: "amber" | "red" | "green" | "blue";
}

export interface ProgressTrackerProps {
    active: number;
    maxReached: number;
    onSelect: (n: number) => void;
}

export interface UploadZoneProps {
    label: string;
    files: string[];
    onFiles: (names: string[]) => void;
}

export interface CountdownPillProps {
    days: number;
    total: number;
    label: string;
    danger?: boolean;
}

export interface ToggleProps {
    checked: boolean;
    onChange: (v: boolean) => void;
    label?: string;
}

export interface StatusBadgeProps {
    status: "pending" | "pass" | "fail" | "active";
}

export interface StepProps {
    onNext: () => void;
}