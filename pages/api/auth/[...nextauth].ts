import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        {
            id: "vipps",
            idToken: true,
            name: "Vipps",
            type: "oauth",
            wellKnown: process.env.VIPPS_WELLKNOWN_URL as string,
            authorization: {
                params: { scope: "openid phoneNumber name" },
            },
            clientId: process.env.VIPPS_CLIENT_ID,
            clientSecret: process.env.VIPPS_CLIENT_SECRET,
            checks: ["state"],
            profile(profile) {
                console.log("profile", profile);
                return {
                    id: profile.sub,
                    name: profile.name,
                    role: profile.role ?? "user",
                    coupons: profile.coupons ?? 0,
                };
            },
            userinfo: {
                async request(context) {
                    const data = await fetch(
                        process.env.VIPPS_USERINFO_URL as string,
                        {
                            headers: {
                                authorization: `Bearer ${context.tokens.access_token}`,
                            },
                        }
                    );
                    const response = await data.json();
                    console.log("response", response);

                    return response;
                },
            },
        },
    ],
    callbacks: {
        async redirect() {
            return "/hjem";
        },
        async session({ session, token, user }) {
            session.user.role = user.role;
            session.user.coupons = user.coupons;
            session.user.id = user.id;

            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);
