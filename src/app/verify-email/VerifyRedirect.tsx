"use client";
import { useEffect } from "react";

export default function VerifyRedirect() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/login";
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}