import nodemailer from "nodemailer";

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req) {
  try {
    const { nombre, email, asunto, mensaje } = await req.json();

    if (!nombre || !email || !asunto || !mensaje) {
      return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), {
        status: 400,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400 });
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false, // ⚠️ permite certificados autofirmados (solo para desarrollo)
        },
    });

    await transporter.sendMail({
      from: `"Formulario Web" <${process.env.EMAIL_USER}>`,
      to: "dylan34b2@gmail.com", // aquí llega el mensaje
      subject: `📬 Nuevo mensaje: ${asunto}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHTML(nombre)}</p>
        <p><strong>Email:</strong> ${escapeHTML(email)}</p>
        <p><strong>Asunto:</strong> ${escapeHTML(asunto)}</p>
        <p><strong>Mensaje:</strong><br/>${escapeHTML(mensaje).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error al enviar el correo:", error.message, error.stack);
    return new Response(JSON.stringify({ error: "Error al enviar el mensaje" }), {
      status: 500,
    });
  }
}
