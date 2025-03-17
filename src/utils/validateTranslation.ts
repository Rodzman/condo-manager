import { translationSchema, TranslationSchema } from '@/schemas/translationSchema';

export function validateTranslation(translations: unknown): TranslationSchema {
    try {
        return translationSchema.parse(translations);
    } catch (error) {
        console.error('Invalid translation file structure:', error);
        throw new Error('Invalid translation file structure');
    }
}

export function validateTranslationPath(path: string): boolean {
    const parts = path.split('.');
    let current: any = translationSchema.shape;

    for (const part of parts) {
        if (!current[part]) {
            return false;
        }
        current = current[part].shape;
    }

    return true;
}
