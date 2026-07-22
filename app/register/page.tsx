import type { Metadata } from "next";
import ProfileClient from "../profile/ProfileClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/register",
    languages: {
      "en-IN": "/register",
      "en": "/register",
        }
  },
};

export default function RegisterPage() {
  return <ProfileClient />;
}
