"use client";

import { useFormStatus } from "react-dom";

/** Submit button that asks for confirmation before a destructive action. */
export function ConfirmButton({ message, children }: { message: string; children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
      className="admin-btn-ghost text-red-700 hover:bg-red-50 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

/** Primary submit button that shows progress while the action runs. */
export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="admin-btn">
      {pending ? "Хадгалж байна…" : children}
    </button>
  );
}
