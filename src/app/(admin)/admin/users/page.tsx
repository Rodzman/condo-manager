import { Metadata } from "next";
import { redirect } from "next/navigation";
import UserManagementTable from "@/components/admin/UserManagementTable";
import { ROLES } from "@/constants/roles";
import { db } from "@/server/db";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage user accounts and permissions",
};

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== ROLES.ADMIN) {
    redirect("/auth/signin?callbackUrl=/admin/users");
  }

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 50, // Fetch the most recent 50 users
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions for the condo management system.
        </p>
      </div>
      <UserManagementTable users={users} />
    </div>
  );
}
