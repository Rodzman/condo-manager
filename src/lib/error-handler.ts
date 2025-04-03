import { TRPCError } from "@trpc/server";
import { toast } from "sonner";

// Error types to standardize error handling
export enum ErrorType {
    VALIDATION = "VALIDATION",
    AUTHENTICATION = "AUTHENTICATION",
    AUTHORIZATION = "AUTHORIZATION",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    INTERNAL = "INTERNAL",
    NETWORK = "NETWORK",
}

// Error codes to HTTP status mapping
export const errorToHttpStatus = {
    [ErrorType.VALIDATION]: 400,
    [ErrorType.AUTHENTICATION]: 401,
    [ErrorType.AUTHORIZATION]: 403,
    [ErrorType.NOT_FOUND]: 404,
    [ErrorType.CONFLICT]: 409,
    [ErrorType.INTERNAL]: 500,
    [ErrorType.NETWORK]: 500,
};

// Application error class
export class AppError extends Error {
    public readonly type: ErrorType;
    public readonly context?: Record<string, unknown>;

    constructor(message: string, type: ErrorType, context?: Record<string, unknown>) {
        super(message);
        this.name = "AppError";
        this.type = type;
        this.context = context;
    }
}

// Convert AppError to TRPC error for consistent API responses
export function handleTRPCError(error: unknown) {
    // If it's already a TRPC error, just return it
    if (error instanceof TRPCError) {
        return error;
    }

    // If it's our custom error, convert to TRPC error
    if (error instanceof AppError) {
        return new TRPCError({
            code: mapErrorTypeToTRPCCode(error.type),
            message: error.message,
            cause: error,
        });
    }

    // Log unexpected errors in development
    if (process.env.NODE_ENV !== "production") {
        console.error("Unhandled error:", error);
    }

    // Default case: return a generic internal error
    return new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
        cause: error,
    });
}

// Map our error types to TRPC error codes
function mapErrorTypeToTRPCCode(errorType: ErrorType): TRPCError["code"] {
    switch (errorType) {
        case ErrorType.VALIDATION:
            return "BAD_REQUEST";
        case ErrorType.AUTHENTICATION:
            return "UNAUTHORIZED";
        case ErrorType.AUTHORIZATION:
            return "FORBIDDEN";
        case ErrorType.NOT_FOUND:
            return "NOT_FOUND";
        case ErrorType.CONFLICT:
            return "CONFLICT";
        case ErrorType.NETWORK:
            return "CLIENT_CLOSED_REQUEST";
        case ErrorType.INTERNAL:
        default:
            return "INTERNAL_SERVER_ERROR";
    }
}

// Client-side error handler to display appropriate UI feedback
export function handleClientError(error: unknown) {
    if (error instanceof AppError) {
        // Handle specific error types with custom UI treatment
        switch (error.type) {
            case ErrorType.VALIDATION:
                toast.error(`Validation error: ${error.message}`);
                break;
            case ErrorType.AUTHENTICATION:
                toast.error("Authentication required");
                // Optionally redirect to login
                break;
            case ErrorType.AUTHORIZATION:
                toast.error("You don't have permission to perform this action");
                break;
            case ErrorType.NOT_FOUND:
                toast.error(`Not found: ${error.message}`);
                break;
            default:
                toast.error(error.message || "An error occurred");
        }
        return;
    }

    // Generic error handling
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    toast.error(message);
}

// Helper to throw consistent errors throughout the application
export function throwError(message: string, type: ErrorType, context?: Record<string, unknown>) {
    throw new AppError(message, type, context);
}
