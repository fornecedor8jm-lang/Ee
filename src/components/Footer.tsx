import { MouseEvent } from 'react';
import { Scale, MessageCircle, MapPin, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="w-full bg-[#030206] border-t border-purple-500/25 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative smoky glow */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#4b0082]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand details */}
          <div className="md:col-span-2 text-left space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-gothic font-extrabold text-white uppercase tracking-wider">
                Lia D' Farrapo
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            </div>
            <p className="font-mono text-xs uppercase text-purple-400 tracking-widest font-semibold">
              Oráculo & Magia
            </p>
            <p className="font-serif text-sm text-gray-300 max-w-sm leading-relaxed italic">
              "A espiritualidade guia, mas quem escolhe é você. Encontre clareza, proteção e abertura de caminhos através de sabedoria ancestral."
            </p>
          </div>

          {/* Col 2: Navigation shortcuts */}
          <div className="text-left space-y-3.5">
            <h4 className="font-gothic font-bold text-white text-sm tracking-widest uppercase">
              Atalhos Rápidos
            </h4>
            <ul className="space-y-2.5 font-sans text-xs uppercase font-bold tracking-wider text-gray-400">
              <li>
                <a href="#inicio" onClick={(e) => handleScrollTo(e, '#inicio')} className="hover:text-[#d4af37] transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#oraculo" onClick={(e) => handleScrollTo(e, '#oraculo')} className="hover:text-[#d4af37] transition-colors">
                  Oráculo Diário
                </a>
              </li>
              <li>
                <a href="#servicos" onClick={(e) => handleScrollTo(e, '#servicos')} className="hover:text-[#d4af37] transition-colors">
                  Tabela de Serviços
                </a>
              </li>
              <li>
                <a href="#termos" onClick={(e) => handleScrollTo(e, '#termos')} className="hover:text-[#d4af37] transition-colors">
                  Termos e CDC
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Safe Payment Shortcut */}
          <div className="text-left space-y-3.5">
            <h4 className="font-gothic font-bold text-white text-sm tracking-widest uppercase">
              Pix & Identidade
            </h4>
            <div className="space-y-2 text-xs font-sans text-gray-300">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Titular: Cecilia Mundim</span>
              </p>
              <p className="font-mono text-[11px] text-gray-400 bg-purple-950/20 p-2 rounded border border-purple-500/10">
                Pix CPF: 091.561.091-48
              </p>
              <p className="text-[10px] text-gray-400 italic">
                *Obrigatório entrar em contato via WhatsApp antes do pagamento.
              </p>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-purple-500/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          {/* Legal Compliance */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-mono uppercase tracking-widest text-purple-400">
              <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Conformidade Legal & Consumidor</span>
            </div>
            <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">
              Este site está em estrita conformidade com o <strong>Código de Defesa do Consumidor (Lei nº 8.078/1990)</strong>, garantindo transparência de preços, descrições precisas e o direito à informação clara. Atendimento místico destinado exclusivamente a maiores de 18 anos.
            </p>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-400 font-sans shrink-0">
            <p>© {currentYear} Lia D' Farrapo. Todos os direitos reservados.</p>
            <p className="text-[10px] text-gray-500 mt-1 flex items-center justify-center md:justify-end gap-1">
              Feito com <Heart className="w-3 h-3 text-red-700 fill-current" /> para Cecilia Mundim.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
