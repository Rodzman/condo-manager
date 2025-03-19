/**
 * This is the client-side entrypoint for your tRPC API.
 * We re-export the api from the React Query setup to maintain backward compatibility.
 */
export { api, type RouterInputs, type RouterOutputs } from "@/trpc/react";
