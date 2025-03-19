import { NextResponse } from 'next/server';
import { db } from '@/server/db';

export const runtime = 'edge';

export async function GET() {
    try {
        // Test the connection with a simple query
        const result = await db.$queryRaw`SELECT current_timestamp`;

        return NextResponse.json({
            status: 'success',
            message: 'Database connection successful',
            timestamp: result
        });
    } catch (error) {
        console.error('Database connection error:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Database connection failed',
            error: error instanceof Error ? error.message : String(error)
        }, { status: 500 });
    }
}
