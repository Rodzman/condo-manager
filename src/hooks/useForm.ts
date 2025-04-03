import { useState } from "react";
import { z } from "zod";

type FormErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormOptions<T> {
    initialValues: T;
    schema?: z.ZodType<T>;
    onSubmit: (values: T) => Promise<void> | void;
}

export function useForm<T extends Record<string, any>>({
    initialValues,
    schema,
    onSubmit,
}: UseFormOptions<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors<T>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const newValue = type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value;

        setValues((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        // Clear error when field is edited
        if (errors[name as keyof T]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const validate = (): boolean => {
        if (!schema) return true;

        try {
            schema.parse(values);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: FormErrors<T> = {};
                error.errors.forEach((err) => {
                    if (err.path.length > 0) {
                        const path = err.path[0] as keyof T;
                        newErrors[path] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await onSubmit(values);
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        resetForm,
        setValues,
    };
}
