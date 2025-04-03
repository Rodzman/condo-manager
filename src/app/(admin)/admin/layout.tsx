import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { ROLES } from "@/constants/roles";
import { AdminSidebar } from "@/components/features/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard | Condo Manager",
  description: "Administration dashboard for condo management system",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || session.user.role !== ROLES.ADMIN) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
