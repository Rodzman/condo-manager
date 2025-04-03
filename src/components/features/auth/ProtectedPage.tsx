import { redirect } from "next/navigation";
import { auth } from "@/auth";

interface ProtectedPageProps {
  children: React.ReactNode;
  role?: string;
}

export async function ProtectedPage({ children, role }: ProtectedPageProps) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  // If role is specified, check if user has the required role
  if (role && session.user.role !== role) {
    redirect("/unauthorized");
  }

  return <>{children}</>;
}
