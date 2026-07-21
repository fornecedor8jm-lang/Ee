import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TERMS_CLAUSES } from '../data';
import { Scale, ChevronDown, Check, Info } from 'lucide-react';

export default function TermsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(4); // Default expand the Clause 5 because it's the most crucial (Contact prior to payment)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16" id="termos">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[#d4af37] text-xs font-mono uppercase mb-4 tracking-wider">
          <Scale className="w-3.5 h-3.5" />
          Relação Ética e de Consumo
        </div>
        <h2 className="text-3xl md:text-4xl font-gothic font-bold text-white tracking-wide uppercase mb-3">
          Termos, Condições & CDC
        </h2>
        <p className="font-serif text-lg text-gray-300 max-w-xl mx-auto italic">
          "Pela transparência, respeito às leis e equilíbrio espiritual e material em cada atendimento prestado."
        </p>
      </div>

      {/* Main warning box */}
      <div className="mb-8 p-4 bg-purple-950/20 border border-purple-500/25 rounded-xl flex gap-3 items-start">
        <Info className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
        <div className="text-left text-xs text-gray-300 font-sans leading-relaxed">
          <p>
            Nossos termos e condições operam em estrita harmonia com a Lei Federal Brasileira nº 8.078/1990 (Código de Defesa do Consumidor - CDC). Garantimos o seu pleno direito de esclarecimento prévio e proteção em todas as etapas da contratação oracular e ritualística.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {TERMS_CLAUSES.map((clause, idx) => {
          const isExpanded = expandedIndex === idx;
          const isClauseFive = idx === 4; // Contato Prévio
          
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-300 ${
                isExpanded 
                  ? 'bg-[#10081e]/90 border-purple-500/40 shadow-[0_0_15px_rgba(106,13,173,0.15)]' 
                  : isClauseFive
                    ? 'bg-[#0f0913]/75 border-[#d4af37]/30 hover:border-purple-500/35'
                    : 'bg-[#050308]/90 border-purple-950 hover:border-purple-500/20'
              }`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full flex items-center justify-between p-5 text-left cursor-pointer select-none"
              >
                <div className="flex items-center gap-3.5">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                    isClauseFive
                      ? 'bg-[#d4af37]/15 border-[#d4af37]/40 text-[#d4af37]'
                      : 'bg-purple-950/40 border-purple-500/20 text-purple-300'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <span className="block font-mono text-[10px] text-purple-400 uppercase tracking-widest font-semibold">
                      {clause.reference}
                    </span>
                    <h3 className={`font-gothic font-bold text-base md:text-lg tracking-wide ${
                      isClauseFive ? 'text-[#d4af37]' : 'text-white'
                    }`}>
                      {clause.title}
                    </h3>
                  </div>
                </div>
                
                <ChevronDown className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180 text-[#d4af37]' : ''
                }`} />
              </button>

              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden border-t border-purple-500/10"
                  >
                    <div className="p-5 md:p-6 text-left">
                      <p className="font-serif text-sm text-gray-200 mb-5 leading-relaxed italic">
                        "{clause.description}"
                      </p>

                      <div className="space-y-3 bg-black/40 p-4 rounded-lg border border-purple-500/5">
                        {clause.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans leading-relaxed">
                            <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>

                      {isClauseFive && (
                        <div className="mt-5 p-3.5 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-lg">
                          <p className="text-[11px] font-sans text-[#d4af37] leading-relaxed">
                            <strong>Aviso Importante:</strong> Ao concluir qualquer transação financeira em nosso site, o usuário declara automaticamente estar ciente e de acordo com esta cláusula de consulta anterior obrigatória.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
