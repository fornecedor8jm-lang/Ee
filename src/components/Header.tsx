import { useState, useEffect, MouseEvent } from 'react';
import { Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Termos & CDC', href: '#termos' },
    { name: 'Pagamento', href: '#pagamento' },
    { name: 'Contato', href: '#contato' },
  ];

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-md border-b border-purple-500/20 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleScrollTo(e, '#inicio')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-xl md:text-2xl font-gothic font-extrabold tracking-widest text-white uppercase group-hover:text-[#d4af37] transition-colors">
              Lia D' Farrapo
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="font-sans text-xs uppercase font-bold tracking-widest text-gray-300 hover:text-[#d4af37] transition-all relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden lg:block">
            <a
              href="https://api.whatsapp.com/send?phone=556191345182&text=Ol%C3%A1%20Lia!%20Gostaria%20de%20agendar%20uma%20consulta%20de%20Or%C3%A1culo%20ou%20Magia.%20Quais%20os%20pr%C3%B3ximos%20passos%20para%20fazer%20o%20agendamento%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-800 to-purple-950 hover:from-purple-700 hover:to-purple-900 text-white font-sans text-xs uppercase font-bold tracking-widest border border-[#d4af37]/30 hover:border-[#d4af37]/60 shadow-[0_0_15px_rgba(106,13,173,0.3)] transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current text-white" />
              Agendar Consulta
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-purple-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/98 backdrop-blur-xl lg:hidden flex flex-col justify-between p-6 overflow-y-auto"
          >
            {/* Drawer Header with Title and Close Button */}
            <div className="flex justify-between items-center pb-4 border-b border-purple-500/10">
              <span className="text-xl font-gothic font-extrabold tracking-widest text-white uppercase">
                Lia D' Farrapo
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#d4af37] hover:text-white transition-colors cursor-pointer"
                aria-label="Fechar Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-6 my-auto py-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollTo(e, item.href)}
                  className="font-sans text-lg uppercase font-bold tracking-widest text-center text-gray-200 hover:text-[#d4af37] active:text-[#d4af37] py-3 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* WhatsApp Call-to-Action in Mobile Menu */}
            <a
              href="https://api.whatsapp.com/send?phone=556191345182&text=Ol%C3%A1%20Lia!%20Acessei%20o%20site%20pelo%20celular%20e%20gostaria%20de%20tirar%20d%C3%BAvidas%20sobre%20as%20Tiragens%20e%20as%20Magias.%20Como%20posso%20proceder%3F"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chamar Lia no WhatsApp"
              className="w-full inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-lg bg-gradient-to-r from-purple-800 to-purple-950 text-[#d4af37] font-sans text-sm uppercase font-bold tracking-widest border border-[#d4af37]/35 shadow-lg mb-8 transition-transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
