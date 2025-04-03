import { auth } from "@/auth";
import { ROLES } from "@/constants/roles";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== ROLES.ADMIN) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome to the admin page</p>

      <Link href="/admin/users">Users</Link>
    </div>
  );
}
