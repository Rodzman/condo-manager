import { z } from 'zod';

export const commonSchema = z.object({
    SAVE: z.string(),
    CANCEL: z.string(),
    DELETE: z.string(),
    EDIT: z.string(),
    ITEMS_COUNT: z.string(),
    WELCOME_USER: z.string(),
});

export const authSchema = z.object({
    LOGIN: z.string(),
    LOGOUT: z.string(),
    EMAIL: z.string(),
    PASSWORD: z.string(),
    LAST_LOGIN: z.string(),
});

export const dashboardSchema = z.object({
    TITLE: z.string(),
    WELCOME: z.string(),
    BALANCE: z.string(),
});

export const unitsErrorsSchema = z.object({
    CREATE_FAIL: z.string(),
    UPDATE_FAIL: z.string(),
    DELETE_FAIL: z.string(),
    ADD_RESIDENT_FAIL: z.string(),
    UPDATE_RESIDENT_FAIL: z.string(),
    DELETE_RESIDENT_FAIL: z.string(),
    ADD_VEHICLE_FAIL: z.string(),
    UPDATE_VEHICLE_FAIL: z.string(),
    DELETE_VEHICLE_FAIL: z.string(),
});

export const unitsSchema = z.object({
    TITLE: z.string(),
    LOADING: z.string(),
    LOAD_ERROR: z.string(),
    ERRORS: unitsErrorsSchema,
});

export const translationSchema = z.object({
    COMMON: commonSchema,
    AUTH: authSchema,
    DASHBOARD: dashboardSchema,
    UNITS: unitsSchema,
});

export type TranslationSchema = z.infer<typeof translationSchema>;
