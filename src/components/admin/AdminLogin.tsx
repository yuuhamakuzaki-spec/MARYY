import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Aperture, ShieldCheck, ArrowRight, Lock, Mail } from "lucide-react";
import { useAdminAuth } from "@/components/admin/AdminAuthContext";
import { Button } from "@/components/admin/ui";
import GradientWaves from "@/components/react-bits/Backgrounds/GradientWaves";

export function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [step, setStep] = useState<"credentials" | "mfa">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const mfaRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === "mfa" && mfaRefs.current[0]) {
      mfaRefs.current[0]?.focus();
    }
  }, [step]);

  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("mfa");
    }, 800);
  };

  const handleMfaChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...mfaCode];
    next[index] = value;
    setMfaCode(next);
    if (value && index < 5) {
      mfaRefs.current[index + 1]?.focus();
    }
  };

  const handleMfaKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !mfaCode[index] && index > 0) {
      mfaRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      handleMfaSubmit(e);
    }
  };

  const handleMfaPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 0) {
      const next = pasted.split("");
      while (next.length < 6) next.push("");
      setMfaCode(next);
      mfaRefs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleMfaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const code = mfaCode.join("");
    if (code.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login(email);
      navigate("/admin/dashboard");
    }, 600);
  };

  const handleBackToStore = () => {
    navigate("/");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-transparent px-4">
      <div className="fixed inset-0 z-0 h-screen w-full bg-black">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#ff00f7"
          crestColor="#5f00ff"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <button onClick={handleBackToStore} className="inline-flex items-center gap-2 text-white transition-colors hover:text-white/80" aria-label="Back to store">
            <Aperture className="h-6 w-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" strokeWidth={1.5} />
            <span className="text-lg font-semibold tracking-tight" style={{ textShadow: "0 2px 4px rgba(0,10,30,0.7)" }}>CrisSells Admin</span>
          </button>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-sky-950/40 p-8 shadow-[0_30px_120px_rgba(0,15,35,0.5)] backdrop-blur-2xl">
          {step === "credentials" && (
            <>
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-white" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>Administrator Sign In</h1>
                <p className="mt-1 text-[13px] text-white/60" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>Enter your credentials to access the admin dashboard.</p>
              </div>

              <form onSubmit={handleCredentialSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-email" className="text-[13px] font-medium text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                    <input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@crissells.com"
                      autoComplete="username"
                      className="w-full rounded-xl border border-white/15 bg-sky-950/40 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 backdrop-blur-sm focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-password" className="text-[13px] font-medium text-white/80" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                    <input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-white/15 bg-sky-950/40 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-white/40 backdrop-blur-sm focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 [color-scheme:dark]"
                    />
                  </div>
                </div>

                {error && (
                  <p className="rounded-xl bg-red-500/15 px-3 py-2 text-[13px] text-red-300 backdrop-blur-sm" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex items-center gap-2 rounded-xl bg-sky-500/10 px-3 py-2.5 text-xs text-sky-300/90 backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>Passwords are hashed with bcrypt. MFA required for all admin accounts.</span>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Verifying..." : "Continue"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            </>
          )}

          {step === "mfa" && (
            <>
              <div className="mb-6">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/15 backdrop-blur-sm">
                  <ShieldCheck className="h-6 w-6 text-sky-300" aria-hidden="true" />
                </div>
                <h1 className="text-xl font-semibold text-white" style={{ textShadow: "0 1px 3px rgba(0,10,30,0.6)" }}>Multi-Factor Authentication</h1>
                <p className="mt-1 text-[13px] text-white/60" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
                  Enter the 6-digit code from your authenticator app. For this demo, any 6 digits will work.
                </p>
              </div>

              <form onSubmit={handleMfaSubmit} className="space-y-4">
                <div className="flex justify-between gap-2" onPaste={handleMfaPaste}>
                  {mfaCode.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { mfaRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleMfaChange(i, e.target.value)}
                      onKeyDown={(e) => handleMfaKeyDown(i, e)}
                      aria-label={`MFA digit ${i + 1} of 6`}
                      className="h-14 w-12 rounded-xl border border-white/15 bg-sky-950/40 text-center text-xl font-bold text-white backdrop-blur-sm focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 [color-scheme:dark]"
                    />
                  ))}
                </div>

                {error && (
                  <p className="rounded-xl bg-red-500/15 px-3 py-2 text-[13px] text-red-300 backdrop-blur-sm" role="alert">
                    {error}
                  </p>
                )}

                <div className="flex gap-3">
                  <Button type="button" variant="secondary" className="flex-1" onClick={() => { setStep("credentials"); setMfaCode(["", "", "", "", "", ""]); setError(""); }}>
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Sign In"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-white/40" style={{ textShadow: "0 1px 2px rgba(0,10,30,0.5)" }}>
          CrisSells Admin &middot; Protected by MFA &middot; AES-256 encrypted sessions
        </p>
      </div>
    </div>
  );
}
