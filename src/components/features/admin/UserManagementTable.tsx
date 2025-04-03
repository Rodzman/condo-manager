"use client";

import { useState, useTransition } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { type User } from "@/types/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLES, type Role } from "@/constants/roles";
import { updateUserRole } from "@/server/actions/user-management";

interface UserManagementTableProps {
  users: User[];
}

export default function UserManagementTable({
  users,
}: UserManagementTableProps) {
  const [managedUsers, setManagedUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = async (userId: string, newRole: Role) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("role", newRole);

    startTransition(async () => {
      const result = await updateUserRole(formData);

      if (result.success && result.user) {
        setManagedUsers((prev) =>
          prev.map((user) =>
            user.id === result.user?.id ? result.user : user,
          ),
        );
        toast.success(
          `Role updated for ${result.user.name || result.user.email}`,
        );
      } else {
        toast.error(`Failed to update role: ${result.error}`);
      }
    });
  };

  const filteredUsers = managedUsers.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.name?.toLowerCase().includes(searchTermLower) ||
      false ||
      user.email?.toLowerCase().includes(searchTermLower) ||
      false ||
      user.role?.toLowerCase().includes(searchTermLower) ||
      false
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Badge variant="secondary">
            {filteredUsers.length} user{filteredUsers.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {user.image && (
                        <img
                          src={user.image}
                          alt={user.name || "User"}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      {user.name || "Unnamed User"}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.role === ROLES.ADMIN
                          ? "destructive"
                          : user.role === ROLES.MANAGER
                            ? "secondary"
                            : "default"
                      }
                    >
                      {user.role || ROLES.GUEST}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.createdAt
                      ? formatDistanceToNow(new Date(user.createdAt), {
                          addSuffix: true,
                        })
                      : "Unknown"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={isPending}
                        >
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {Object.entries(ROLES).map(([key, value]) => (
                          <DropdownMenuItem
                            key={key}
                            onClick={() => handleRoleChange(user.id, value)}
                            disabled={user.role === value || isPending}
                          >
                            {key}
                            {user.role === value && " (Current)"}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <a
                            href={`/admin/users/${user.id}`}
                            className="flex w-full justify-start"
                          >
                            View Details
                          </a>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="rounded-md border p-8 text-center">
          No users found matching search criteria
        </div>
      )}
    </div>
  );
}
