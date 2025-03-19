/**
 * Format a number as currency (BRL)
 */
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

/**
 * Format a date to a localized string
 */
export function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR');
}

/**
 * Format a date and time to a localized string
 */
export function formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString('pt-BR');
}

/**
 * Format a phone number to (XX) XXXXX-XXXX
 */
export function formatPhone(phone: string): string {
    // Remove non-numeric characters
    const cleaned = phone.replace(/\D/g, '');

    // Format based on length
    if (cleaned.length === 11) {
        return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
    } else if (cleaned.length === 10) {
        return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
    }

    // Return original if not valid
    return phone;
}

/**
 * Format a CPF to XXX.XXX.XXX-XX
 */
export function formatCPF(cpf: string): string {
    // Remove non-numeric characters
    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length !== 11) {
        return cpf;
    }

    return `${cleaned.substring(0, 3)}.${cleaned.substring(3, 6)}.${cleaned.substring(6, 9)}-${cleaned.substring(9)}`;
}

/**
 * Format a CNPJ to XX.XXX.XXX/XXXX-XX
 */
export function formatCNPJ(cnpj: string): string {
    // Remove non-numeric characters
    const cleaned = cnpj.replace(/\D/g, '');

    if (cleaned.length !== 14) {
        return cnpj;
    }

    return `${cleaned.substring(0, 2)}.${cleaned.substring(2, 5)}.${cleaned.substring(5, 8)}/${cleaned.substring(8, 12)}-${cleaned.substring(12)}`;
}
