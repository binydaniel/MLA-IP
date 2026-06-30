import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface SignInProps {
    onSuccess: () => void;
    onSwitchToSignUp: () => void;
    inputCls: string;
    iconCls: string;
    inputStyle: React.CSSProperties;
}

export default function SignInForm({ onSuccess, onSwitchToSignUp, inputCls, iconCls, inputStyle }: SignInProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-white/50 font-mono">
                    Email Address
                </label>
                <div className="relative">
                    <Mail size={14} className={iconCls} />
                    <input
                        type="email"
                        placeholder="abebe.kebede@mla.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`${inputCls} pl-10 pr-4`}
                        style={inputStyle}
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-white/50 font-mono">
                    Password
                </label>
                <div className="relative">
                    <Lock size={14} className={iconCls} />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`${inputCls} pl-10 pr-10`}
                        style={inputStyle}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                </div>
            </div>

            <div className="flex justify-end">
                <button type="button" className="text-xs text-[#b8860b] hover:underline">
                    Forgot password?
                </button>
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white bg-[#b8860b] hover:bg-[#a07808] transition-all mt-2"
            >
                Sign In
                <ArrowRight size={15} />
            </button>

            <p className="text-center text-xs mt-6 text-white/30">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    className="font-medium text-[#b8860b] hover:underline"
                >
                    Sign up
                </button>
            </p>
        </form>
    );
}