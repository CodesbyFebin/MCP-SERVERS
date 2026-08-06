import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account for MCPServer.in editorial.",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create an account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Registration is currently invite-only. Contact the MCPServer.in team for access.
          </p>
        </div>
      </div>
    </div>
  );
}
