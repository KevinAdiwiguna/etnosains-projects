import { Sidebar } from "@/components/shared/sidebar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <Sidebar session={session} />

      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
