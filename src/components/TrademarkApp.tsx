import React, { useState } from 'react'
import { Gavel } from "lucide-react";
import type { Section } from "./types";
import { navItems } from "./data";
import TrademarkSearch from "../components/sections/TrademarkSearch";
import Filing from "./sections/Filing";
import Renewal from "./sections/Renewal";
import Recordals from "./sections/Recordals";
import Invalidation from "./sections/Invalidation";
import ClientsPage from "./sections/Client.tsx";
import IPDashboardWrapper from "./sections/Dashboard.tsx";


const sectionMap: Record<Section, React.ReactNode> = {
    dashboard: <IPDashboardWrapper />,
    client: <ClientsPage />,
    search: <TrademarkSearch />,
    filing: <Filing />,
    renewal: <Renewal />,
    recordals: <Recordals />,
    invalidation: <Invalidation />,
};

export default function TrademarkApp() {
    const [active, setActive] = useState<Section>("dashboard");

    return (
        <div
            className="min-h-screen flex"
            style={{
                fontFamily: "'Inter', sans-serif",
                background: "#f5f0e8",
            }}
        >
            {/* Sidebar */}
            <aside
                className="w-60 flex-shrink-0 flex flex-col border-r"
                style={{
                    background: "#0d1b2e",
                    borderColor: "rgba(255,255,255,0.06)",
                    position: "sticky",
                    top: 0,
                    height: "100vh",
                }}
            >
                <div
                    className="px-6 pt-8 pb-6 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <Gavel size={16} style={{ color: "#b8860b" }} />
                        <span
                            className="text-xs font-semibold uppercase tracking-widest"
                            style={{
                                color: "#b8860b",
                                fontFamily: "'DM Mono', monospace",
                            }}
                        >
              MLA · IP
            </span>
                    </div>
                    <h1
                        className="text-lg leading-tight"
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            color: "#f5f0e8",
                        }}
                    >
                        Trademark Procedures
                    </h1>
                    <p
                        className="text-xs mt-1"
                        style={{ color: "rgba(245,240,232,0.45)" }}
                    ></p>
                </div>

                <nav className="flex-1 py-4 px-3">
                    <p
                        className="text-xs uppercase tracking-widest px-3 mb-3"
                        style={{
                            color: "rgba(245,240,232,0.3)",
                            fontFamily: "'DM Mono', monospace",
                        }}
                    >
                    Menu
                    </p>
                    <ul className="space-y-0.5">
                        {navItems.map((item) => {
                            const isActive = active === item.id;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActive(item.id)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left transition-all"
                                        style={{
                                            background: isActive
                                                ? "rgba(184,134,11,0.15)"
                                                : "transparent",
                                            color: isActive
                                                ? "#b8860b"
                                                : "rgba(245,240,232,0.6)",
                                            fontWeight: isActive ? 500 : 400,
                                            borderLeft: isActive
                                                ? "2px solid #b8860b"
                                                : "2px solid transparent",
                                        }}
                                    >
                                    <span
                                        style={{ opacity: isActive ? 1 : 0.7 }}
                                    >
                                      {item.icon}
                                    </span>
                                        {item.label}
                                    </button>
                                </li>
                                    );
                                 })}
                    </ul>
                </nav>

                <div
                    className="px-5 py-4 border-t"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                    <p
                        className="text-xs"
                        style={{
                            color: "rgba(245,240,232,0.25)",
                            lineHeight: 1.6,
                        }}
                    >
                        MLA
                    </p>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto flex flex-col">
                {sectionMap[active]}
            </main>
        </div>
    );
}