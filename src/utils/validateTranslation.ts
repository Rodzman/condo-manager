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

    for (let i = 0; i < parts.length; i++) {
        const key = parts[i];
        const next = current[key];

        if (!next) {
            return false;
        }

        const isLast = i === parts.length - 1;

        if ('shape' in next) {
            current = next.shape;
        } else if (!isLast) {
            // reached a leaf node but there are still segments
            return false;
        }
    }

    return true;
}
