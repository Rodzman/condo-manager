import { Metadata } from "next";
import { redirect } from "next/navigation";
import { UserManagementTable } from "@/components/features/admin";
import { getUsers } from "@/server/actions/user";
import { Suspense } from "react";
import { ROLES } from "@/constants/roles";
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

  const users = await getUsers();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          Manage user roles and permissions
        </p>
      </div>

      <Suspense fallback={<div>Loading users...</div>}>
        <UserManagementTable users={users} />
      </Suspense>
    </div>
  );
}
