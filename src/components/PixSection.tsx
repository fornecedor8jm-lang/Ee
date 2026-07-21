import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, QrCode, AlertTriangle, ArrowRight, MessageCircle } from 'lucide-react';

export default function PixSection() {
  const [copied, setCopied] = useState(false);
  const pixKey = '091.561.091-48';
  const ownerName = 'Cecilia Mundim';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getWhatsAppReceiptLink = () => {
    const text = `Olá Cecilia! Realizei o Pix para confirmação do meu trabalho espiritual. Gostaria de enviar o comprovante por aqui para darmos início ao meu atendimento!`;
    return `https://api.whatsapp.com/send?phone=556191345182&text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 scroll-mt-24 md:scroll-mt-28" id="pagamento">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[#d4af37] text-xs font-mono uppercase mb-4 tracking-wider">
          <QrCode className="w-3.5 h-3.5" />
          Acerto de Consultas & Rituais
        </div>
        <h2 className="text-3xl md:text-4xl font-gothic font-bold text-white tracking-wide uppercase mb-3">
          Informações de Pagamento
        </h2>
        <p className="font-serif text-lg text-gray-300 max-w-xl mx-auto italic">
          "A energia do dinheiro é uma troca justa pelo Axé e tempo dedicado à sua consulta."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Left Side: Instructions and CDC Warning */}
        <div className="bg-[#0b0716]/90 border border-purple-900/30 rounded-xl p-6 md:p-8 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 text-[#d4af37] mb-4">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-gothic font-bold text-lg tracking-wide uppercase">
                Atenção Obrigatória!
              </h3>
            </div>
            
            <p className="font-serif text-sm text-gray-300 leading-relaxed mb-4">
              Em total conformidade com o Código de Defesa do Consumidor (CDC), 
              <strong className="text-purple-300"> não efetue nenhum pagamento antes de conversar conosco no WhatsApp.</strong>
            </p>

            <ul className="space-y-3.5 font-sans text-xs text-gray-400 mb-6">
              <li className="flex items-start gap-2.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Confirme a disponibilidade do atendimento espiritual e esclareça suas dúvidas sobre a tiragem.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Valide se o trabalho/magia selecionada é o mais indicado para a sua situação atual.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Alinhe o prazo aproximado de entrega do seu oráculo ou finalização das magias.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-purple-500/10 pt-4">
            <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Método Seguro de Cobrança
            </span>
          </div>
        </div>

        {/* Right Side: The PIX key card */}
        <div className="bg-gradient-to-b from-[#170e2b] to-[#0a0515] border border-purple-500/30 rounded-xl p-6 md:p-8 flex flex-col justify-between shadow-[0_0_25px_rgba(75,0,130,0.35)] relative overflow-hidden group">
          {/* Decorative background pulse */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/15 blur-2xl rounded-full group-hover:scale-125 transition-transform duration-700" />
          
          <div className="relative">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-[#d4af37] font-mono tracking-widest font-semibold uppercase">
                Chave Oficial Pix
              </span>
              <span className="px-2 py-0.5 bg-green-950/40 border border-green-500/30 rounded text-[10px] font-semibold text-green-400 uppercase font-mono">
                Ativo para Recebimento
              </span>
            </div>

            {/* Key Container */}
            <div className="bg-black/50 border border-purple-500/15 p-4 rounded-lg mb-6">
              <span className="block text-[10px] text-purple-400 font-mono uppercase mb-1">
                Tipo de Chave: CPF
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xl md:text-2xl font-mono text-white tracking-wide font-bold">
                  {pixKey}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 bg-purple-900/30 border border-purple-500/20 rounded-md text-purple-300 hover:text-white hover:bg-purple-800/40 transition-all cursor-pointer relative"
                  title="Copiar Chave PIX"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Check className="w-5 h-5 text-green-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Copy className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Owner Details */}
            <div className="space-y-3 mb-6 font-serif">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 italic">Beneficiário:</span>
                <span className="text-white font-semibold font-gothic tracking-wide">{ownerName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400 italic">Forma de Envio:</span>
                <span className="text-purple-300 font-mono text-xs">Comprovante via WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-purple-500/10 flex flex-col gap-3">
            <button
              onClick={handleCopy}
              className={`w-full py-2.5 rounded-lg font-sans text-xs uppercase font-bold tracking-widest transition-all ${
                copied
                  ? 'bg-green-950/40 border border-green-500/40 text-green-300'
                  : 'bg-purple-900/40 hover:bg-[#4b0082]/60 border border-[#d4af37]/30 text-white'
              }`}
            >
              {copied ? 'Chave Copiada! ✨' : 'Copiar Chave CPF'}
            </button>

            <a
              href={getWhatsAppReceiptLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-purple-800 to-purple-950 hover:from-purple-700 hover:to-purple-900 text-[#d4af37] hover:text-white font-sans text-xs uppercase font-bold tracking-widest shadow-md border border-[#d4af37]/20 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#d4af37]" />
              Enviar Comprovante
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
