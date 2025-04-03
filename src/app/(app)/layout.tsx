import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/features/layout";
import SessionProvider from "@/providers/SessionProvider";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log("🚀 ~ session:", session);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <SessionProvider session={session}>
      <div className="bg-background min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </SessionProvider>
  );
}
