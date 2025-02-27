import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <section
      id="inicio"
      className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-[#1B3C8C] bg-opacity-70" />
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Fundación Elojim Jadach
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Transformando vidas, construyendo futuros
        </p>
        <Button
          size="lg"
          className="bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors">
          Conoce más
        </Button>
      </div>
    </section>
  );
};

export default Header;
