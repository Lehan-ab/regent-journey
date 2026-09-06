"use client";

import { useEffect } from "react";

export default function PwaRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          // Successfully registered service worker
        })
        .catch((err) => {
          // Failed to register service worker (silent fallback)
        });
    }
  }, []);

  return null;
}
