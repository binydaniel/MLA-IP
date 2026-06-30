import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

interface SignUpProps {
    onSuccess: () => void;
    onSwitchToSignIn: () => void;
    onError: (msg: string) => void;
    inputCls: string;
    iconCls: string;
    inputStyle: React.CSSProperties;
}

export default function SignUpForm({ onSuccess, onSwitchToSignIn, onError, inputCls, iconCls, inputStyle }: SignUpProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            onError("Passwords do not match.");
            return;
        }
        if (!email || !password) {
            onError("Please fill in all required fields.");
            return;
        }
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-white/50 font-mono">
                    Full Name
                </label>
                <div className="relative">
                    <User size={14} className={iconCls} />
                    <input
                        type="text"
                        placeholder="Abebe Girma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`${inputCls} pl-10 pr-4`}
                        style={inputStyle}
                    />
                </div>
            </div>

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

            <div>
                <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-white/50 font-mono">
                    Confirm Password
                </label>
                <div className="relative">
                    <Lock size={14} className={iconCls} />
                    <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        className={`${inputCls} pl-10 pr-10`}
                        style={inputStyle}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                    >
                        {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white bg-[#b8860b] hover:bg-[#a07808] transition-all mt-4"
            >
                Create Account
                <ArrowRight size={15} />
            </button>

            <p className="text-center text-xs mt-6 text-white/30">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToSignIn}
                    className="font-medium text-[#b8860b] hover:underline"
                >
                    Sign in
                </button>
            </p>
        </form>
    );
}