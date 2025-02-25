import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import db from "@/libs/db"
import bcrypt from "bcrypt"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {label: "Email", placeholder: "ejemplo@gmail.com"},
                password: {label: "Password", type: "password", placeholder: "*******"}
            }, 
            async authorize(credentials, req) {
                // console.log(credentials)

                const userFound = await db.users.findUnique({
                    where: {
                        email: credentials.email
                    }
                })

                if (!userFound || !(await bcrypt.compare(credentials.password, userFound.password))) {
                    throw new Error("Credenciales incorrectas");
                }

                // Mensaje en consola para éxito de inicio de sesión
                console.log(`Inicio de sesión exitoso para el usuario: ${userFound.name}`);

                //DATOS PARA LA CREACIÓN DE UN TOKEN EN EL FRONTEND
                return {
                    id: userFound.id,
                    name: userFound.name,
                    lastname: userFound.lastname,
                    email: userFound.email,
                    id_rol: userFound.id_rol
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 2*60*60,
        updateAge: 30*60,
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id_rol = token.id_rol; // Incluye el rol en la sesión
            session.user.document = token.email; //incluir el email en la sesión
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
            token.id_rol = user.id_rol; // Almacena el rol en el token
            token.email = user.email //almacenar el document 
            }
            return token;
        },
    },

};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};