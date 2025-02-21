import { NextResponse } from "next/server";
import db from '@/libs/db';
import bcrypt from 'bcrypt';

export async function POST(request){
    try{
        const payload = await request.json();

        const { name, lastname, email, password  } = payload;

        // Validación de datos requeridos
        if (!name || !lastname || !email || !password) {
            return NextResponse.json({
                message: "Faltan datos requeridos.",
            }, { status: 400 });
        }

        // Verificar si el correo se encuentra registrado
        const emailFound = await db.users.findUnique({ where: { email } });

        if (emailFound) {
            return NextResponse.json({ message: "El correo: " + payload.email + "  ya se encuentra registrado." }, { status: 400 });
        }

        // Estructura de datos para la creación del usuario
        const userData = {
            name,
            lastname,
            email,
            password
        };

        // Crear el usuario en la base de datos
        const newUser = await db.users.create({ data: userData });

        console.log("Usuario registrado con éxito");
        return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });

    } catch (error) {
        console.error("Error al crear el usuario:", error);
        return NextResponse.json({
            message: "Error interno en el servidor.",
            error: error.message,
        }, { status: 500 });
    }
    
}