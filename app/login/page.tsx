import type { Metadata } from "next";
import ProfileClient from "../profile/ProfileClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/login",
    languages: {
      "en-IN": "/login",
      "en": "/login",
        }
  },
};

export default function LoginPage() {
  return <ProfileClient />;
}
