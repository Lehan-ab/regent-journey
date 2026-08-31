import React, { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Explorer | Regent Journey",
  description:
    "Personalized onboarding for new prospects of the Rotaract Club of Seethawaka Regent. Create your character, choose your companion, discover your interests, and enter the realm.",
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center font-pixel text-xs text-regent-gold flex items-center gap-2">
            <span className="w-3 h-3 bg-regent-gold animate-ping" />
            <span>PREPARING THE GATEWAY...</span>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
