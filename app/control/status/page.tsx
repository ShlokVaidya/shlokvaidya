"use client";

import { useState } from "react";
import { STATUS_MAP } from "@/lib/status";

type Step = "email" | "otp" | "panel";

export default function AdminStatusPage() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [state, setState] = useState<keyof typeof STATUS_MAP>("building");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  async function requestOtp() {
    setLoading(true);
    setInfo("");

    const res = await fetch("/api/admin/request-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (res.ok) {
      setStep("otp");
    } else {
      setInfo("Failed to send OTP");
    }
  }

  async function verifyOtp() {
    setLoading(true);
    setInfo("");

    const res = await fetch("/api/admin/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    setLoading(false);

    if (res.ok) {
      setStep("panel");
    } else {
      setInfo("Invalid OTP");
    }
  }

  async function updateStatus() {
    setLoading(true);
    setInfo("");

    const res = await fetch("/api/status/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, message }),
    });

    setLoading(false);

    if (res.ok) {
      setInfo("Status updated");
      setMessage("");
    } else {
      setInfo("Update failed");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-sm space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold text-center">Admin Control</h1>

        {step === "email" && (
          <>
            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
            <button
              onClick={requestOtp}
              disabled={loading}
              className="w-full rounded-md bg-black text-white py-2"
            >
              Send OTP
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full rounded-md bg-black text-white py-2"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === "panel" && (
          <>
            <select
              aria-label="select"
              value={state}
              onChange={(e) =>
                setState(e.target.value as keyof typeof STATUS_MAP)
              }
              className="w-full rounded-md border px-3 py-2"
            >
              {Object.entries(STATUS_MAP).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Optional message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />

            <button
              onClick={updateStatus}
              disabled={loading}
              className="w-full rounded-md bg-black text-white py-2"
            >
              Update Status
            </button>
          </>
        )}

        {info && (
          <p className="text-sm text-center text-neutral-600">{info}</p>
        )}
      </div>
    </main>
  );
}
