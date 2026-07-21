import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/profile",
    languages: {
      "en-IN": "/profile",
      "en": "/profile",
    }
  },
};

export default function ProfilePage() {
  return <ProfileClient />;
}
