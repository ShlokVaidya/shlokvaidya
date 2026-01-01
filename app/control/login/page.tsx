"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lock } from "lucide-react";

type Step = "otp-request" | "otp-verify";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("otp-request");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestOtp() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setStep("otp-verify");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      if (res.ok) {
        // Wait a moment for the cookie to be set
        await new Promise(resolve => setTimeout(resolve, 100));
        // Redirect to control panel
        router.push("/control/status");
        router.refresh();
      } else {
        setError("Invalid OTP. Please try again.");
        setOtp("");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-background/80 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border/50 bg-card/80 shadow-xl shadow-primary/10 backdrop-blur p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Admin Access</h1>
            <p className="text-sm text-muted-foreground">
              Secure authentication required
            </p>
          </div>

          {/* OTP Request Step */}
          {step === "otp-request" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Click below to receive a one-time password via email
              </p>
              <button
                onClick={requestOtp}
                disabled={loading}
                className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* OTP Verify Step */}
          {step === "otp-verify" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-medium text-foreground">
                  One-Time Password
                </label>
                <p className="text-xs text-muted-foreground">
                  Check your email for the 6-digit code
                </p>
                <input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyDown={(e) => e.key === "Enter" && verifyOtp()}
                  disabled={loading}
                  maxLength={6}
                  className="w-full rounded-lg border border-border/70 bg-background px-4 py-2.5 text-sm text-center tracking-widest outline-none transition focus:border-primary/60 focus:ring-1 focus:ring-primary/20 disabled:opacity-50"
                />
              </div>

              <button
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full rounded-lg bg-primary text-primary-foreground font-semibold py-2.5 transition hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                onClick={() => {
                  setStep("otp-request");
                  setOtp("");
                  setError("");
                }}
                disabled={loading}
                className="w-full rounded-lg border border-border/70 text-foreground font-semibold py-2.5 transition hover:border-border hover:bg-background/50 disabled:opacity-50"
              >
                Back
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Info */}
          <p className="text-xs text-center text-muted-foreground">
            Only authorized admins can access the control panel
          </p>
        </div>
      </div>
    </main>
  );
}
