"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { User } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import { ROLES, ROLE_DESCRIPTIONS, type Role } from "@/constants/roles";
import { api } from "@/trpc/react";

interface UserManagementTableProps {
  users: User[];
}

export default function UserManagementTable({
  users,
}: UserManagementTableProps) {
  const [managedUsers, setManagedUsers] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState("");

  const updateRoleMutation = api.user.updateRole.useMutation({
    onSuccess: (updatedUser) => {
      setManagedUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
      toast.success(
        `Role updated for ${updatedUser.name || updatedUser.email}`,
      );
    },
    onError: (error) => {
      toast.error(`Failed to update role: ${error.message}`);
    },
  });

  const handleRoleChange = (userId: string, newRole: Role) => {
    updateRoleMutation.mutate({ userId, role: newRole });
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
                        <Button variant="outline" size="sm">
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
                            disabled={user.role === value}
                          >
                            {key}
                            {user.role === value && " (Current)"}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            size="sm"
                            asChild
                          >
                            <a href={`/admin/users/${user.id}`}>View Details</a>
                          </Button>
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
