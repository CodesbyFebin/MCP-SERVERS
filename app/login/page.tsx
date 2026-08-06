import type { Metadata } from "next";
import LoginForm from "../../src/components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to MCPServer.in editorial.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access the MCPServer.in editorial dashboard.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
