import { NextResponse } from "next/server";
import db from '@/libs/db';
import bcrypt from 'bcryptjs';

export async function POST(request){
    try{
        const payload = await request.json();
        console.log("📥 Payload recibido:", payload);

        const { name, lastName, email, password, rolId } = payload;

        if (!name || !lastName || !email || !password || rolId === undefined) {
            console.log("❌ Faltan datos requeridos");
            return NextResponse.json({ message: "Faltan datos requeridos." }, { status: 400 });
        }

        const emailFound = await db.users.findUnique({ where: { email } });
        if (emailFound) {
            console.log("❌ Email ya registrado:", email);
            return NextResponse.json({ message: `El correo ${email} ya se encuentra registrado.` }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔐 Contraseña hasheada");

        const userData = {
            name,
            lastName,
            email,
            password: hashedPassword,
            rolId: rolId || 1,
        };

        console.log("📤 Datos a guardar:", userData);

        const newUser = await db.users.create({ data: userData });

        console.log("✅ Usuario creado con éxito:", newUser);
        return NextResponse.json({ message: "Usuario registrado con éxito" }, { status: 201 });

    } catch (error) {
        console.error("🔥 Error en registro:", error);
        return NextResponse.json({
            message: "Error interno en el servidor.",
            error: error.message,
        }, { status: 500 });
    }
}
