/**
 * Application roles and their permission levels
 */
export const ROLES = {
    ADMIN: "admin",
    MANAGER: "manager",
    RESIDENT: "resident",
    STAFF: "staff",
    SECURITY: "security",
    GUEST: "guest",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/**
 * Role descriptions for display purposes
 */
export const ROLE_DESCRIPTIONS: Record<Role, string> = {
    [ROLES.ADMIN]: "Full access to all system features and settings",
    [ROLES.MANAGER]: "Can manage properties, residents, and staff but cannot modify system configurations",
    [ROLES.RESIDENT]: "Regular condominium resident with access to personal area and common functionalities",
    [ROLES.STAFF]: "Maintenance and operational staff with task management permissions",
    [ROLES.SECURITY]: "Security personnel with visitor and entry/exit management capabilities",
    [ROLES.GUEST]: "Limited access to public information and visitor features",
};

/**
 * Role hierarchy from highest to lowest permission level
 */
export const ROLE_HIERARCHY: Role[] = [
    ROLES.ADMIN,
    ROLES.MANAGER,
    ROLES.STAFF,
    ROLES.SECURITY,
    ROLES.RESIDENT,
    ROLES.GUEST,
];

/**
 * Check if a role has permission over another role
 */
export function hasRolePermission(userRole: Role, targetRole: Role): boolean {
    const userRoleIndex = ROLE_HIERARCHY.indexOf(userRole);
    const targetRoleIndex = ROLE_HIERARCHY.indexOf(targetRole);

    // Lower index means higher permission
    return userRoleIndex <= targetRoleIndex;
}
