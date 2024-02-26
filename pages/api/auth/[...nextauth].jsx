import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectDatabase, existingUser} from "../../../helpers/db-utils";
import {verifyPassword} from "../../../helpers/auth";
export const authOptions = {
    session: {
        jwt: true, // This is optional as it's already true by default
        encryption: true,
        jwtSecret: process.env.NEXTAUTH_SECRET,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        },
        user: {
            role: 'user', // Set a default role if necessary
        },
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const client = await connectDatabase();
                try {
                    const user = await existingUser(client, { email: credentials.email, role: credentials.role }, process.env.mongodb_database, process.env.mongodb_database_user);

                    if (!user) {
                        await client.close();
                        console.error("No user found during authentication.");
                        return null;
                    }

                    const isValid = await verifyPassword(credentials.password, user.password);

                    if (!isValid) {
                        await client.close();
                        console.error("Invalid credentials provided during authentication.");
                        return null;
                    }

                    // Set the role from the user data

                    const { email, firstName, role } = user;

// Assign the role to the user object
                    user.role = role;

// Return user information including the role
                    return { firstName, email, role };
                } catch (error) {
                    console.error("Authentication error:", error);
                    throw error; // Rethrow the error to be caught elsewhere if needed
                } finally {
                    await client.close();
                }
            }

        }),
    ],
}
export default NextAuth(authOptions)