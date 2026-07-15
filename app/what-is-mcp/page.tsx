import { Metadata } from "next";
import WhatIsMcpClient from "./WhatIsMcpClient";

export const metadata: Metadata = {
  title: "What Is MCP (Model Context Protocol)? - Model Context Protocol Hub",
  description: "Learn what the Model Context Protocol (MCP) is, how client-server connections work, and explore our comprehensive directory of supported integrations and related topics.",
};

export default function Page() {
  return <WhatIsMcpClient />;
}
