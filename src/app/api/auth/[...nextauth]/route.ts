import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const hadler = NextAuth(authOptions);

export {hadler as GET, hadler as POST}