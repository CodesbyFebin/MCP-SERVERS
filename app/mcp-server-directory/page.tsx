import { permanentRedirect } from "next/navigation";

export default function LegacyDirectoryRedirect() {
  permanentRedirect("/servers/");
}
