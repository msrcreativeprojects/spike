"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { GLOW_COLOR } from "@/types/puzzle";

interface AuthGateProps {
  onAuth: () => void;
  onGuest: () => void;
}

export default function AuthGate({ onAuth, onGuest }: AuthGateProps) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || loading) return;

      setLoading(true);
      setError("");

      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { shouldCreateUser: true },
      });

      setLoading(false);

      if (authError) {
        setError("Could not send code. Try again.");
        return;
      }

      setStep("code");
    },
    [email, loading]
  );

  const handleVerifyCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!code.trim() || loading) return;

      setLoading(true);
      setError("");

      const supabase = createClient();
      const { error: authError } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: code.trim(),
        type: "email",
      });

      setLoading(false);

      if (authError) {
        setError("Invalid code. Try again.");
        return;
      }

      onAuth();
    },
    [email, code, loading, onAuth]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-8 animate-fade-in">
      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40 mb-2">
          {step === "email" ? "SIGN IN" : "ENTER CODE"}
        </p>
        <p className="text-sm text-white/50">
          {step === "email" ? (
            <>
              Play &amp; start your{" "}
              <span
                className="font-semibold animate-glow-text-pulse"
                style={{ color: GLOW_COLOR }}
              >
                spike tape
              </span>{" "}
              collection.
            </>
          ) : (
            `We sent a code to ${email}`
          )}
        </p>
      </div>

      {step === "email" ? (
        <form onSubmit={handleSendCode} className="w-full max-w-[280px]">
          <div className="flex gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              autoFocus
              className="flex-1 border border-r-0 border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/20 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest bg-[#ff2d8a] text-white hover:bg-[#ff45a0] active:scale-[0.97] transition-all disabled:opacity-40 disabled:hover:bg-[#ff2d8a]"
              style={{ boxShadow: "0 0 12px rgba(255,45,138,0.3)" }}
            >
              {loading ? "..." : "Go"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="w-full max-w-[280px]">
          <div className="flex gap-0">
            <input
              type="text"
              inputMode="numeric"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="6-digit code"
              autoFocus
              maxLength={6}
              className="flex-1 border border-r-0 border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white text-center tracking-[0.3em] placeholder:text-white/25 placeholder:tracking-normal outline-none focus:border-white/20 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest bg-white/90 text-black hover:bg-white active:scale-[0.97] transition-all disabled:opacity-40 disabled:hover:bg-white/90"
            >
              {loading ? "..." : "Verify"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError("");
            }}
            className="mt-3 w-full text-center text-xs text-white/25 hover:text-white/40 transition-colors"
          >
            Use a different email
          </button>
        </form>
      )}

      {error && (
        <p className="text-xs text-red-400/70">{error}</p>
      )}

      <button
        onClick={onGuest}
        className="text-xs text-white/20 hover:text-white/35 transition-colors"
      >
        Play as guest
      </button>

      <p className="text-[11px] text-white/15 text-center leading-relaxed max-w-[260px]">
        We keep your email private.
        <br />
        Your show business is your own business.
      </p>
    </div>
  );
}
