import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1B3C8C] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Fundación Elojim Jadach
            </h3>
            <p className="text-sm opacity-80">
              Transformando vidas, construyendo futuros más brillantes para
              nuestra comunidad.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#3B82F6] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#3B82F6] transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#3B82F6] transition-colors">
                  Programas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#3B82F6] transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>
                <Link
                  href="#"
                  className="hover:text-[#3B82F6] transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#3B82F6] transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-[#3B82F6] transition-colors">
                  Aviso Legal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-[#3B82F6] transition-colors">
                Facebook
              </Link>
              <Link
                href="https://x.com/elojimjadach?s=21"
                className="hover:text-[#3B82F6] transition-colors">
                Twitter
              </Link>
              <Link
                href="https://www.instagram.com/elojim.jadach_fdn?igsh=MnVwOHphaG85a3Bv&utm_source=qr"
                className="hover:text-[#3B82F6] transition-colors">
                Instagram
              </Link>
              <Link
                href="https://www.tiktok.com/@elojim.jadach?_t=ZS-8uO7nzo72rX&_r=1"
                className="hover:text-[#3B82F6] transition-colors">
                Tik Tok
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm opacity-80">
          <p>
            &copy; {new Date().getFullYear()} Fundación Elojim Jadach. Todos los
            derechos reservados. Nit-901714461-5
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
