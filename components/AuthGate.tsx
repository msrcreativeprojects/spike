"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { GLOW_COLOR } from "@/types/puzzle";

// SMS-ready helpers — uncomment + enable Supabase Phone provider when A2P 10DLC is registered
// function formatPhone(raw: string): string {
//   const d = raw.slice(0, 10);
//   if (d.length <= 3) return d;
//   if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
//   return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
// }
// function toE164(digits: string): string { return `+1${digits}`; }
// function maskPhone(digits: string): string { return `••• ••• ${digits.slice(6)}`; }

interface AuthGateProps {
  onAuth: () => void;
  onGuest: () => void;
}

const DIGIT_COUNT = 6;

export default function AuthGate({ onAuth, onGuest }: AuthGateProps) {
  const [email, setEmail] = useState("");
  const [digits, setDigits] = useState<string[]>(Array(DIGIT_COUNT).fill(""));
  const [step, setStep] = useState<"input" | "code">("input");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const digitRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "code") {
      digitRefs.current[0]?.focus();
    }
  }, [step]);

  const handleSendCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (loading || !email.trim()) return;

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

      setDigits(Array(DIGIT_COUNT).fill(""));
      setStep("code");
    },
    [email, loading]
  );

  const submitCode = useCallback(
    async (codeDigits: string[]) => {
      const token = codeDigits.join("");
      if (token.length < DIGIT_COUNT || loading) return;

      setLoading(true);
      setError("");

      const supabase = createClient();
      const { error: authError } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token,
        type: "email",
      });

      // SMS path (when Twilio + A2P 10DLC ready):
      // const { error: authError } = await supabase.auth.verifyOtp({
      //   phone: toE164(phone),
      //   token,
      //   type: "sms",
      // });

      setLoading(false);

      if (authError) {
        setError("Invalid code. Try again.");
        setDigits(Array(DIGIT_COUNT).fill(""));
        digitRefs.current[0]?.focus();
        return;
      }

      onAuth();
    },
    [email, loading, onAuth]
  );

  const handleDigitChange = useCallback(
    (index: number, value: string) => {
      const digit = value.replace(/\D/g, "").slice(-1);
      const next = [...digits];
      next[index] = digit;
      setDigits(next);
      setError("");

      if (digit && index < DIGIT_COUNT - 1) {
        digitRefs.current[index + 1]?.focus();
      }

      if (next.every((d) => d !== "")) {
        submitCode(next);
      }
    },
    [digits, submitCode]
  );

  const handleDigitKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        if (digits[index]) {
          const next = [...digits];
          next[index] = "";
          setDigits(next);
        } else if (index > 0) {
          digitRefs.current[index - 1]?.focus();
          const next = [...digits];
          next[index - 1] = "";
          setDigits(next);
        }
      }
    },
    [digits]
  );

  const handleDigitPaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, DIGIT_COUNT);
      if (!pasted) return;
      const next = Array(DIGIT_COUNT).fill("");
      pasted.split("").forEach((ch, i) => { next[i] = ch; });
      setDigits(next);
      setError("");
      const focusIndex = Math.min(pasted.length, DIGIT_COUNT - 1);
      digitRefs.current[focusIndex]?.focus();
      if (pasted.length === DIGIT_COUNT) {
        submitCode(next);
      }
    },
    [submitCode]
  );

  const canSend = email.trim().length > 0;

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in w-full">
      <p className="text-sm text-white/50 text-center">
        {step === "input" ? (
          <>
            Start your{" "}
            <span
              className="font-semibold animate-glow-text-pulse"
              style={{ color: GLOW_COLOR }}
            >
              spike tape
            </span>{" "}
            collection.
          </>
        ) : (
          <span>Check your email.</span>
        )}
      </p>

      {step === "input" ? (
        <form onSubmit={handleSendCode} className="w-full flex flex-col gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            placeholder="your@email.com"
            autoFocus
            className="w-full border border-white/10 bg-white/[0.04] px-3 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/20 transition-colors"
          />

          <button
            type="submit"
            disabled={loading || !canSend}
            className="w-full py-3.5 text-[11px] font-semibold uppercase tracking-[0.25em] bg-white/90 text-black hover:bg-white active:scale-[0.98] transition-all disabled:opacity-40"
          >
            {loading ? "Sending…" : "Send Code"}
          </button>
        </form>
      ) : (
        <div className="w-full flex flex-col gap-3 items-center">
          <p className="text-xs text-white/30 text-center">Code sent to {email}</p>

          <div className="flex gap-2 justify-center" onPaste={handleDigitPaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { digitRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigitChange(i, e.target.value)}
                onKeyDown={(e) => handleDigitKeyDown(i, e)}
                disabled={loading}
                className="w-11 h-12 text-center text-lg font-semibold text-white bg-white/[0.04] border border-white/10 outline-none focus:border-[#ff2d8a]/60 transition-colors disabled:opacity-40"
                style={d ? { borderColor: "rgba(255,45,138,0.3)" } : undefined}
              />
            ))}
          </div>

          {loading && (
            <p className="text-xs text-white/30">Verifying…</p>
          )}

          <button
            type="button"
            onClick={() => { setStep("input"); setDigits(Array(DIGIT_COUNT).fill("")); setError(""); }}
            className="text-xs text-white/25 hover:text-white/45 transition-colors"
          >
            Use a different email.
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-400/70 text-center -mt-2">{error}</p>
      )}

      <button
        onClick={onGuest}
        className="text-xs text-white/20 hover:text-white/35 transition-colors"
      >
        Not now
      </button>

      <p className="text-[11px] text-white/15 text-center leading-relaxed">
        Your info is private.
        <br />
        Your show business is your own business.
      </p>
    </div>
  );
}
