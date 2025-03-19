// import { NextResponse } from 'next/server';
// import { Pool } from '@neondatabase/serverless';

// export const runtime = 'edge';

// export async function GET() {
//     let pool: Pool | undefined;

//     try {
//         if (!process.env.DATABASE_URL_DIRECT) {
//             throw new Error('DATABASE_URL_DIRECT is not defined');
//         }

//         console.log('Attempting to connect with:',
//             process.env.DATABASE_URL_DIRECT.replace(/(\/\/[^:]+:)[^@]+/, '$1*****')
//         );

//         pool = new Pool({
//             connectionString: process.env.DATABASE_URL_DIRECT,
//             ssl: false,
//             connectionTimeoutMillis: 5000,
//             idleTimeoutMillis: 120000
//         });

//         // Test raw connection first
//         console.log('Executing query...');
//         const result = await pool.query('SELECT version(), current_timestamp');

//         return NextResponse.json({
//             status: 'success',
//             message: 'Database connection successful',
//             data: {
//                 version: result.rows[0].version,
//                 timestamp: result.rows[0].current_timestamp
//             }
//         });
//     } catch (error) {
//         console.error('Database connection error:', error);

//         let errorMessage: string;
//         if (error instanceof Error) {
//             errorMessage = error.message;
//         } else if (typeof error === 'object' && error !== null) {
//             errorMessage = JSON.stringify(error);
//         } else {
//             errorMessage = String(error);
//         }

//         return NextResponse.json({
//             status: 'error',
//             message: 'Database connection failed',
//             error: errorMessage,
//             env: {
//                 nodeEnv: process.env.NODE_ENV,
//                 hasUrl: !!process.env.DATABASE_URL_DIRECT,
//                 connectionString: process.env.DATABASE_URL_DIRECT?.replace(/(\/\/[^:]+:)[^@]+/, '$1*****')
//             }
//         }, { status: 500 });
//     } finally {
//         if (pool) {
//             try {
//                 await pool.end();
//                 console.log('Pool closed successfully');
//             } catch (e) {
//                 console.error('Error closing pool:', e);
//             }
//         }
//     }
// }

// src/app/api/db-test/route.ts
import { NextResponse } from "next/server";
import { db as prisma } from "@/server/db";

export async function GET() {
    try {
        // Faz uma consulta simples para testar a conexão
        await prisma.$queryRaw`SELECT 1`;
        return NextResponse.json({ status: "success", message: "DB Connection Successful" });
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ status: "error", message: "DB Connection Failed" }, { status: 500 });
    }
}
