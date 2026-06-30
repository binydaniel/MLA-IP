import { useState } from "react";
import { Gavel, AlertCircle, Mail, Lock } from "lucide-react";
import SignUpForm from "./SignUpForm";

interface Props {
  onEnter: () => void;
}

export default function AuthPage({ onEnter }: Props) {
  const [view, setView] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");

  const handleSwitchView = (targetView: "login" | "signup") => {
    setView(targetView);
    setError("");
  };

  // Instant bypass handler
  const handleBypassLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onEnter(); // Fire layout switch instantly without validation
  };

  // Reusable CSS layout classes & configuration structures injected into children
  const inputStyle = { background: "rgba(255,255,255,0.05)", color: "#f5f0e8" };
  const inputCls = "w-full rounded-lg py-3 pl-10 pr-4 text-sm outline-none transition-all border border-white/10 focus:border-[#b8860b] bg-transparent";
  const iconCls = "absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30";

  return (
      <div
          className="min-h-screen flex text-antialiased"
          style={{ fontFamily: "'Inter', sans-serif", background: "#0d1b2e" }}
      >
        {/* Left branding panel */}
        <div
            className="hidden lg:flex flex-col justify-between w-[45%] flex-shrink-0 px-14 py-14 border-r border-white/5"
            style={{ background: "linear-gradient(160deg, #0d1b2e 0%, #122540 60%, #0a1520 100%)" }}
        >
          <div>
            <div className="text-xs uppercase tracking-widest mb-4 font-semibold text-[#b8860b]/70 font-mono">
              MLA - IP
            </div>
            <h1
                className="text-4xl leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
            >
              Trademark<br />Procedures<br />Follow-Up
            </h1>
            <p className="text-sm leading-relaxed text-white/45 max-w-[320px]">
              A complete IP followup system for MLA's IP team automating search,
              filing, renewal, recordals of internal team.
            </p>
          </div>
          <p className="text-xs text-white/20">© 2026 MLA</p>
        </div>

        {/* Right context-switching form panel */}
        <div className="flex-1 flex items-center justify-center px-6 py-14">
          <div className="w-full max-w-sm">
            {/* Responsive Mobile Header Logo */}
            <div className="flex items-center gap-2 mb-8 lg:hidden">
              <Gavel size={16} className="text-[#b8860b]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#b8860b] font-mono">
              MLA · IP
            </span>
            </div>

            {/* Toggle Buttons Container */}
            <div className="flex rounded-lg p-1 mb-8 bg-white/5 border border-white/10">
              {(["login", "signup"] as const).map((mode) => (
                  <button
                      key={mode}
                      type="button"
                      onClick={() => handleSwitchView(mode)}
                      className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${
                          view === mode ? "text-white bg-[#b8860b]" : "text-white/40 bg-transparent"
                      }`}
                  >
                    {mode === "login" ? "Sign In" : "Create Account"}
                  </button>
              ))}
            </div>

            {/* Header Description Message string values */}
            <div className="mb-6">
              <h2
                  className="text-2xl mb-1"
                  style={{ fontFamily: "'Playfair Display', serif", color: "#f5f0e8" }}
              >
                {view === "login" ? "Welcome back" : "Create your account"}
              </h2>
              <p className="text-xs text-white/35">
                {view === "login" ? "Sign in." : "Register to access the full procedures guide."}
              </p>
            </div>

            {/* Conditional Sub-Form Layer Render */}
            {view === "login" ? (
                /* Swapped out internal SignInForm with an explicit bypass layout block */
                <form onSubmit={handleBypassLogin} className="space-y-4">
                  <div className="relative">
                    <Mail size={16} className={iconCls} />
                    <input
                        type="text"
                        placeholder="Username or email"
                        defaultValue="user@mla.legal"
                        className={inputCls}
                        style={inputStyle}
                    />
                  </div>
                  <div className="relative">
                    <Lock size={16} className={iconCls} />
                    <input
                        type="password"
                        placeholder="Password"
                        defaultValue="••••••••"
                        className={inputCls}
                        style={inputStyle}
                    />
                  </div>
                  <button
                      type="submit"
                      className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all bg-[#b8860b] hover:opacity-90 active:scale-[0.99] mt-2"
                  >
                    Sign In
                  </button>
                </form>
            ) : (
                <SignUpForm
                    onSuccess={onEnter}
                    onSwitchToSignIn={() => handleSwitchView("login")}
                    onError={(msg) => setError(msg)}
                    inputCls={inputCls}
                    iconCls={iconCls}
                    inputStyle={inputStyle}
                />
            )}

            {/* Centralized Shared Error Notification Layer */}
            {error && (
                <div
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs border border-[#cc3c2e]/30 text-[#f09090] mt-4"
                    style={{ background: "rgba(192,57,43,0.15)" }}
                >
                  <AlertCircle size={12} />
                  {error}
                </div>
            )}
          </div>
        </div>
      </div>
  );
}