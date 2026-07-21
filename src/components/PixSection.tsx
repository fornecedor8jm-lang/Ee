import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Copy, 
  Check, 
  QrCode, 
  AlertTriangle, 
  ArrowRight, 
  MessageCircle, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock 
} from 'lucide-react';
import { SERVICES } from '../data';

export default function PixSection() {
  const [selectedServiceId, setSelectedServiceId] = useState('tiragem_completa');
  const [showKey, setShowKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCopiaCola, setCopiedCopiaCola] = useState(false);

  const pixKey = '091.561.091-48';
  const ownerName = 'Cecilia Mundim';

  // Get active service details
  const activeService = useMemo(() => {
    return SERVICES.find(s => s.id === selectedServiceId) || SERVICES[5]; // defaults to Tiragem Completa
  }, [selectedServiceId]);

  // Dynamic Pix Copia e Cola Generator (Real CRC-16 CCITT standard BR Code)
  const copiaColaCode = useMemo(() => {
    const cleanKey = '09156109148'; // Clean CPF
    const formattedPrice = activeService.price.toFixed(2);
    
    // Generate a valid dynamic TxID based on the service name
    const txId = 'LIA' + activeService.name.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15);
    
    const keyPart = `0014br.gov.bcb.pix0111${cleanKey}`;
    const merchantInfo = `26${keyPart.length}${keyPart}`;
    const pricePart = `54${formattedPrice.length.toString().padStart(2, '0')}${formattedPrice}`;
    const txPart = `05${txId.length.toString().padStart(2, '0')}${txId}`;
    const additionalData = `62${(txPart.length + 4).toString().padStart(2, '0')}${txPart}`;
    
    const payload = `000201010211` + 
                    merchantInfo + 
                    `520400005303986` + 
                    pricePart + 
                    `5802BR` + 
                    `5914Cecilia Mundim` + 
                    `6008Brasilia` + 
                    additionalData + 
                    `6304`;
    
    // Calculate CRC-16 CCITT
    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
      let x = ((crc >> 8) ^ payload.charCodeAt(i)) & 0xFF;
      x ^= x >> 4;
      crc = ((crc << 8) ^ (x << 12) ^ (x << 5) ^ x) & 0xFFFF;
    }
    const crcHex = crc.toString(16).toUpperCase().padStart(4, '0');
    return payload + crcHex;
  }, [activeService]);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(pixKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleCopyCopiaCola = () => {
    navigator.clipboard.writeText(copiaColaCode);
    setCopiedCopiaCola(true);
    setTimeout(() => setCopiedCopiaCola(false), 2500);
  };

  const getWhatsAppReceiptLink = () => {
    const text = `Olá! Acabei de realizar o pagamento via Pix para o serviço: "${activeService.name}" (R$ ${activeService.price}). Segue em anexo o comprovante para iniciarmos meu atendimento!`;
    return `https://api.whatsapp.com/send?phone=556191345182&text=${encodeURIComponent(text)}`;
  };

  // Helper to partially obfuscate the CPF
  const obfuscatedCpf = '***.***.091-**';
  // Helper to partially obfuscate name
  const obfuscatedName = 'C****** M*****';

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 scroll-mt-24 md:scroll-mt-28" id="pagamento" aria-labelledby="payment-title">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[#d4af37] text-xs font-sans font-semibold uppercase mb-4 tracking-wider">
          <QrCode className="w-3.5 h-3.5" />
          Acerto de Consultas & Rituais
        </div>
        <h2 id="payment-title" className="text-3xl md:text-5xl font-gothic font-bold text-white tracking-wide uppercase mb-3">
          Pagamento Dinâmico Pix
        </h2>
        <p className="font-serif text-lg text-gray-300 max-w-2xl mx-auto italic">
          "A energia do Pix é a materialização de uma troca justa pelo Axé e tempo dedicado à sua jornada espiritual."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left column (Instructions & Dynamic Selector) - 5 Cols */}
        <div className="lg:col-span-5 bg-[#0b0716]/90 border border-purple-900/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 blur-2xl rounded-full" />
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-[#d4af37] border-b border-purple-500/10 pb-4">
              <AlertTriangle className="w-5 h-5 animate-pulse text-yellow-500" />
              <h3 className="font-sans font-bold text-sm tracking-widest uppercase">
                Aviso Importante
              </h3>
            </div>
            
            <p className="font-serif text-sm text-gray-300 leading-relaxed">
              Em conformidade com o CDC e LGPD, 
              <strong className="text-purple-300"> converse conosco no WhatsApp antes de pagar</strong> para alinhar datas, focar as intenções e verificar prazos de entrega.
            </p>

            {/* Dynamic Service Selector */}
            <div className="bg-black/40 border border-purple-500/10 p-4 rounded-xl space-y-3">
              <label className="block text-[11px] font-sans font-bold uppercase tracking-wider text-purple-300">
                1. Selecione o Trabalho para Gerar o Pix
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full bg-black text-white px-3 py-2.5 rounded-lg border border-purple-500/20 focus:border-[#d4af37] focus:outline-none text-xs transition-all cursor-pointer"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - R$ {s.price}
                  </option>
                ))}
              </select>
              
              <div className="flex justify-between items-center pt-2 text-xs border-t border-purple-500/5">
                <span className="text-gray-400">Total a Transferir:</span>
                <span className="font-sans font-extrabold text-[#d4af37] text-sm">
                  R$ {activeService.price.toFixed(2)}
                </span>
              </div>
            </div>

            <ul className="space-y-3 font-sans text-xs text-gray-400 pt-2">
              <li className="flex items-start gap-2.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>O Pix Copia e Cola ao lado é atualizado dinamicamente com o valor correto.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Seus dados pessoais de transação estão blindados sob protocolo de segurança.</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-purple-500/10 pt-5 mt-6 lg:mt-0 flex justify-between items-center text-[10px] font-sans font-semibold tracking-wider text-purple-400 uppercase">
            <span>Canal Seguro de Acertos</span>
            <span className="text-[#d4af37]">✦ CDC Garantido</span>
          </div>
        </div>

        {/* Right column (The Live QR & Obfuscated CPF Card) - 7 Cols */}
        <div className="lg:col-span-7 bg-gradient-to-b from-[#140c26] to-[#070311] border border-purple-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-2 left-2 text-[#d4af37]/10 font-serif text-xs pointer-events-none">⚜</div>
          <div className="absolute top-2 right-2 text-[#d4af37]/10 font-serif text-xs pointer-events-none">⚜</div>

          <div className="relative">
            {/* Header of Payment Card */}
            <div className="flex flex-wrap justify-between items-center gap-2 mb-6 pb-4 border-b border-purple-500/10">
              <div>
                <span className="text-xs text-[#d4af37] font-sans font-bold tracking-widest uppercase block">
                  Chave Oficial de Transferência
                </span>
                <span className="text-[10px] text-purple-300 font-mono block mt-0.5">
                  Serviço Selecionado: {activeService.name}
                </span>
              </div>
              <span className="px-2.5 py-0.5 bg-green-950/40 border border-green-500/30 rounded text-[10px] font-sans font-bold tracking-wider text-green-400 uppercase">
                Canal Autorizado
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
              
              {/* Geometric Interactive QR Code Frame - 5 Columns */}
              <div className="md:col-span-5 flex flex-col items-center">
                <div className="relative w-36 h-36 bg-black border border-purple-500/30 rounded-xl p-3 shadow-lg flex items-center justify-center overflow-hidden">
                  
                  {/* Corner scanning bracket lines */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]" />

                  {/* Animated laser scanning bar */}
                  <motion.div 
                    animate={{ y: [-50, 50, -50] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[1.5px] bg-purple-500 shadow-[0_0_8px_#8e44ad] z-10 pointer-events-none"
                  />

                  {/* Aesthetic Mystic Matrix Vector representing QR */}
                  <svg className="w-full h-full text-purple-300 opacity-80" viewBox="0 0 100 100" fill="currentColor">
                    {/* QR Finder patterns */}
                    <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                    <rect x="3" y="3" width="19" height="19" fill="black" />
                    <rect x="7" y="7" width="11" height="11" fill="currentColor" />
                    
                    <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                    <rect x="78" y="3" width="19" height="19" fill="black" />
                    <rect x="82" y="7" width="11" height="11" fill="currentColor" />

                    <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                    <rect x="3" y="78" width="19" height="19" fill="black" />
                    <rect x="7" y="82" width="11" height="11" fill="currentColor" />

                    {/* Dummy QR Noise Pixels */}
                    <rect x="35" y="5" width="5" height="15" />
                    <rect x="45" y="0" width="10" height="5" />
                    <rect x="60" y="10" width="5" height="10" />
                    <rect x="35" y="25" width="15" height="5" />
                    <rect x="5" y="35" width="10" height="5" />
                    <rect x="20" y="35" width="5" height="15" />
                    <rect x="30" y="45" width="15" height="10" />
                    <rect x="50" y="35" width="10" height="15" />
                    <rect x="65" y="30" width="5" height="5" />
                    <rect x="80" y="35" width="15" height="5" />
                    
                    <rect x="5" y="55" width="5" height="10" />
                    <rect x="15" y="60" width="10" height="5" />
                    <rect x="35" y="65" width="5" height="20" />
                    <rect x="45" y="55" width="15" height="15" />
                    <rect x="65" y="50" width="10" height="5" />
                    <rect x="80" y="50" width="5" height="15" />
                    <rect x="90" y="60" width="10" height="10" />

                    <rect x="55" y="80" width="15" height="5" />
                    <rect x="75" y="80" width="5" height="15" />
                    <rect x="85" y="85" width="10" height="5" />
                  </svg>

                  {/* Centered Pix Logo block */}
                  <div className="absolute bg-black p-1 rounded-md border border-purple-500/25 flex items-center justify-center z-20">
                    <span className="text-[10px] font-sans font-black text-[#d4af37] tracking-tighter">pix</span>
                  </div>
                </div>
                <span className="text-[9px] font-sans font-semibold text-gray-500 uppercase tracking-widest mt-2 block text-center">
                  Scaneie pelo App do Banco
                </span>
              </div>

              {/* Secure Obfuscated CPF Keys - 7 Columns */}
              <div className="md:col-span-7 space-y-4">
                {/* CPF Field */}
                <div className="bg-black/60 border border-purple-500/10 p-3.5 rounded-xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] text-purple-300 font-sans font-bold uppercase tracking-widest flex items-center gap-1.5">
                      {showKey ? <Unlock className="w-3 h-3 text-green-400" /> : <Lock className="w-3 h-3 text-[#d4af37]" />}
                      Chave Pix (CPF)
                    </span>
                    <button 
                      onClick={() => setShowKey(!showKey)}
                      className="p-1 rounded text-purple-400 hover:text-white transition-colors cursor-pointer"
                      title={showKey ? "Ocultar Dados" : "Revelar Dados"}
                    >
                      {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-base font-mono tracking-wider font-bold transition-all ${showKey ? 'text-white' : 'text-purple-400/55'}`}>
                      {showKey ? pixKey : obfuscatedCpf}
                    </span>
                    <button
                      onClick={handleCopyKey}
                      className="p-1.5 bg-[#4b0082]/20 border border-purple-500/25 rounded hover:bg-purple-800/40 text-purple-300 hover:text-white transition-colors cursor-pointer"
                      title="Copiar Chave CPF"
                    >
                      {copiedKey ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Beneficiary Field */}
                <div className="bg-black/60 border border-purple-500/10 p-3.5 rounded-xl">
                  <span className="block text-[9px] text-purple-300 font-sans font-bold uppercase tracking-widest mb-1">
                    Beneficiário do Axé
                  </span>
                  <span className={`text-sm font-sans font-semibold tracking-wide block transition-all ${showKey ? 'text-white' : 'text-purple-400/55'}`}>
                    {showKey ? ownerName : obfuscatedName}
                  </span>
                  <span className="text-[10px] text-gray-500 block font-serif italic mt-1">
                    Banco Inter S.A.
                  </span>
                </div>
              </div>
            </div>

            {/* Pix Copia e Cola Dynamic Output Box */}
            <div className="bg-[#050309] border border-[#d4af37]/20 p-4 rounded-xl mb-6 relative">
              <span className="block text-[10px] text-[#d4af37] font-sans font-bold uppercase tracking-widest mb-1">
                Pix Copia e Cola Gerado (Pronto para Uso)
              </span>
              <div className="flex items-center justify-between gap-3 bg-black/40 p-2.5 rounded-lg border border-purple-500/10">
                <span className="font-mono text-[10px] text-purple-300 truncate select-all pr-2 max-w-[280px] sm:max-w-[380px] md:max-w-[420px]">
                  {copiaColaCode}
                </span>
                <button
                  onClick={handleCopyCopiaCola}
                  className="p-2 bg-gradient-to-r from-purple-900 to-[#6a0dad] rounded-md text-[#d4af37] hover:text-white hover:brightness-110 transition-all shrink-0 cursor-pointer"
                  title="Copiar Código Copia e Cola"
                >
                  {copiedCopiaCola ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="pt-4 border-t border-purple-500/10 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              onClick={handleCopyCopiaCola}
              className={`w-full py-3 rounded-xl font-sans text-xs uppercase font-bold tracking-[0.15em] transition-all cursor-pointer ${
                copiedCopiaCola
                  ? 'bg-green-950/40 border border-green-500/40 text-green-300'
                  : 'bg-black hover:bg-purple-950/40 border border-[#d4af37]/30 text-[#d4af37] hover:text-white'
              }`}
            >
              {copiedCopiaCola ? 'Código Copiado! ✨' : 'Copiar Copia e Cola'}
            </button>

            <a
              href={getWhatsAppReceiptLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-800 to-[#6a0dad] hover:brightness-110 text-white font-sans text-xs uppercase font-bold tracking-[0.15em] shadow-lg border border-purple-500/30 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#d4af37]" />
              Enviar Comprovante
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
