import type { TranslationSchema } from '@/schemas/translationSchema';

export const LanguageKeys: TranslationSchema = {
    COMMON: {
        SAVE: 'COMMON.SAVE',
        CANCEL: 'COMMON.CANCEL',
        DELETE: 'COMMON.DELETE',
        EDIT: 'COMMON.EDIT',
        ITEMS_COUNT: 'COMMON.ITEMS_COUNT',
        WELCOME_USER: 'COMMON.WELCOME_USER'
    },
    AUTH: {
        LOGIN: 'AUTH.LOGIN',
        LOGOUT: 'AUTH.LOGOUT',
        EMAIL: 'AUTH.EMAIL',
        PASSWORD: 'AUTH.PASSWORD',
        LAST_LOGIN: 'AUTH.LAST_LOGIN'
    },
    DASHBOARD: {
        TITLE: 'DASHBOARD.TITLE',
        WELCOME: 'DASHBOARD.WELCOME',
        BALANCE: 'DASHBOARD.BALANCE'
    },
    UNITS: {
        TITLE: 'UNITS.TITLE',
        LOADING: 'UNITS.LOADING',
        LOAD_ERROR: 'UNITS.LOAD_ERROR',
        ERRORS: {
            CREATE_FAIL: 'UNITS.ERRORS.CREATE_FAIL',
            UPDATE_FAIL: 'UNITS.ERRORS.UPDATE_FAIL',
            DELETE_FAIL: 'UNITS.ERRORS.DELETE_FAIL',
            ADD_RESIDENT_FAIL: 'UNITS.ERRORS.ADD_RESIDENT_FAIL',
            UPDATE_RESIDENT_FAIL: 'UNITS.ERRORS.UPDATE_RESIDENT_FAIL',
            DELETE_RESIDENT_FAIL: 'UNITS.ERRORS.DELETE_RESIDENT_FAIL',
            ADD_VEHICLE_FAIL: 'UNITS.ERRORS.ADD_VEHICLE_FAIL',
            UPDATE_VEHICLE_FAIL: 'UNITS.ERRORS.UPDATE_VEHICLE_FAIL',
            DELETE_VEHICLE_FAIL: 'UNITS.ERRORS.DELETE_VEHICLE_FAIL'
        }
    }
} as const;
