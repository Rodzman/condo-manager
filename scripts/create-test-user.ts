import { db } from "@/server/db";
import bcryptjs from "bcryptjs";

async function createTestUser() {
    const email = "test@example.com";
    const password = "test123"; // Change this to your preferred password

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = await db.user.create({
            data: {
                email,
                name: "Test User",
                password: hashedPassword,
            },
        });

        console.log("Test user created:", user);
    } catch (error) {
        console.error("Error creating test user:", error);
    } finally {
        await db.$disconnect();
    }
}

createTestUser();
