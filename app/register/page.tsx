import type { Metadata } from "next";
import ProfileClient from "../profile/ProfileClient";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <ProfileClient />;
}
