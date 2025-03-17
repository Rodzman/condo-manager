import IntlMessageFormat from 'intl-messageformat';
import defaultTranslations from '@/translations/pt-br.json';
import { validateTranslation, validateTranslationPath } from '@/utils/validateTranslation';
import type { LanguageKeys } from '@/constants/languageKeys';
import type { TranslationSchema } from '@/schemas/translationSchema';

type DeepDotNotation<T extends object> = {
    [K in keyof T]: T[K] extends object
    ? `${string & K}.${DeepDotNotation<T[K]>}`
    : string & K;
}[keyof T];

type TranslationKey = DeepDotNotation<typeof LanguageKeys>;

class TranslationService {
    private currentLanguage: string = 'pt-br';
    private translations: TranslationSchema;
    private formatters: Map<string, IntlMessageFormat> = new Map();

    constructor() {
        this.translations = validateTranslation(defaultTranslations);
        this.detectLanguage();
    }

    private detectLanguage() {
        const userLang = navigator.language.toLowerCase();
        const baseLang = userLang.split('-')[0] || 'pt-br';

        if (userLang === 'pt-br') {
            return; // Already using default
        }

        if (this.isSupported(baseLang)) {
            this.changeLanguage(baseLang);
        }
    }

    private isSupported(lang: string): boolean {
        return ['pt-br', 'en'].includes(lang);
    }

    async changeLanguage(lang: string) {
        try {
            const translations = await import(`@/translations/${lang}.json`);
            const validatedTranslations = validateTranslation(translations);
            this.translations = validatedTranslations;
            this.currentLanguage = lang;
            this.formatters.clear();
            document.dir = this.isRTL(lang) ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
        } catch (error) {
            console.error(`Failed to load ${lang} translations`, error);
            this.translations = validateTranslation(defaultTranslations);
            this.currentLanguage = 'pt-br';
        }
    }

    private isRTL(lang: string): boolean {
        return ['ar', 'he', 'fa'].includes(lang);
    }

    translate(key: string, values?: Record<string, any>): string {
        if (!validateTranslationPath(key)) {
            console.warn(`Invalid translation key: ${key}`);
            return key;
        }

        const message = this.getMessage(key);

        if (!message) {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }

        if (!values) {
            return message;
        }

        let formatter = this.formatters.get(key);
        if (!formatter) {
            formatter = new IntlMessageFormat(message, this.currentLanguage);
            this.formatters.set(key, formatter);
        }

        return formatter.format(values) as string;
    }

    private getMessage(key: string): string | undefined {
        const keys = key.split('.');
        let result: any = this.translations;

        for (const k of keys) {
            result = result[k];
            if (result === undefined) return undefined;
        }

        return result;
    }

    formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
        return new Intl.NumberFormat(this.currentLanguage, options).format(value);
    }

    formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string {
        return new Intl.DateTimeFormat(this.currentLanguage, options).format(date);
    }

    getCurrentLanguage(): string {
        return this.currentLanguage;
    }
}

export const translationService = new TranslationService();
