import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  MessageCircle, 
  Sparkles, 
  Compass, 
  HelpCircle, 
  Send,
  Heart,
  ShieldAlert,
  Moon,
  Calendar,
  User,
  HeartHandshake,
  CheckCircle2,
  Phone,
  Mail
} from 'lucide-react';

import GlowBackground from './components/GlowBackground';
import Header from './components/Header';
import ServiceSection from './components/ServiceSection';
import PixSection from './components/PixSection';
import TermsSection from './components/TermsSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import { SERVICES } from './data';

export default function App() {
  const [contactCategory, setContactCategory] = useState('Tiragem Completa');
  const [clientName, setClientName] = useState('');
  const [clientDob, setClientDob] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerDob, setPartnerDob] = useState('');
  const [specificDetails, setSpecificDetails] = useState('');
  const [photoSentConfirm, setPhotoSentConfirm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const formatDateInput = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    } else {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    }
  };

  const formatPhoneInput = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length === 0) {
      return '';
    } else if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
  };

  const handleSelectService = (serviceName: string) => {
    setContactCategory(serviceName);
    const formElement = document.getElementById('contato');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSendContact = (e: FormEvent) => {
    e.preventDefault();
    
    if (!clientName.trim()) {
      alert("Por favor, informe seu Nome Completo para o atendimento.");
      return;
    }
    if (!clientDob.trim()) {
      alert("Por favor, informe sua Data de Nascimento.");
      return;
    }
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 10) {
      alert("Por favor, informe um WhatsApp/Telefone de contato válido com DDD.");
      return;
    }
    if (clientEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientEmail.trim())) {
      alert("Por favor, insira um e-mail com formato válido ou deixe o campo em branco.");
      return;
    }
    if (!termsAccepted) {
      alert("Por favor, declare-se ciente de que o envio representa apenas uma solicitação inicial de atendimento.");
      return;
    }

    const selectedServiceObj = SERVICES.find(s => s.name === contactCategory) || SERVICES[0];
    const priceFormatted = `R$ ${selectedServiceObj.price}`;

    let msg = `Olá Lia! Gostaria de fazer uma solicitação de serviço institucional.\n\n`;
    msg += `🔮 *SERVIÇO SOLICITADO:* ${contactCategory} (${priceFormatted})\n\n`;
    msg += `👤 *DADOS DO SOLICITANTE:*\n`;
    msg += `- *Nome Completo:* ${clientName.trim()}\n`;
    msg += `- *Data de Nascimento:* ${clientDob.trim()}\n`;
    msg += `- *WhatsApp/Celular:* ${clientPhone.trim()}\n`;
    if (clientEmail.trim()) {
      msg += `- *E-mail:* ${clientEmail.trim()}\n`;
    }

    const needsPartner = [
      'Amor e Relacionamentos',
      'Adoçamento Amoroso',
      'Atração Amorosa',
      'Corte de Laços'
    ].includes(contactCategory) || contactCategory.toLowerCase().includes('amor') || contactCategory.toLowerCase().includes('adoçamento') || contactCategory.toLowerCase().includes('corte');

    if (needsPartner) {
      msg += `\n❤️ *DADOS DA SEGUNDA PESSOA (PARCEIRO/OUTRO):*\n`;
      msg += `- *Nome Completo:* ${partnerName.trim() || 'Não informado'}\n`;
      msg += `- *Data de Nascimento:* ${partnerDob.trim() || 'Não informado'}\n`;
    }

    msg += `\n📝 *INFORMAÇÕES ADICIONAIS / INTENÇÃO:*\n`;
    msg += `${specificDetails.trim() || 'Não informado'}\n`;

    if (selectedServiceObj.category === 'coletivos') {
      msg += `\n✨ *FOTO DE ROSTO:* ${photoSentConfirm ? 'Confirmado que enviará pelo WhatsApp' : 'Não confirmado'}\n`;
    }

    msg += `\n---\n`;
    msg += `⚠️ *Aviso Legal (CDC):* O envio desta mensagem automática representa apenas uma solicitação inicial de contato e análise profissional. O agendamento, prazo e contratação do serviço serão combinados e validados pelo profissional no canal de atendimento do WhatsApp antes de qualquer pagamento.`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=556191345182&text=${encodeURIComponent(msg)}`;
    
    // Abrir em uma nova aba com segurança a partir de dentro do iframe
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const mainWhatsAppUrl = "https://api.whatsapp.com/send?phone=556191345182&text=Ol%C3%A1%20Lia!%20Acessei%20o%20site%20e%20gostaria%20de%20tirar%20d%C3%BAvidas%20gerais%20sobre%20os%20seus%20servi%C3%A7os%20de%20Or%C3%A1culo%20e%20Magias.%20Como%20funciona%20o%20agendamento%3F";

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-purple-900 selection:text-[#d4af37]">
      {/* Immersive Atmospheric Glow */}
      <GlowBackground />

      {/* Glassmorphic Fixed Navigation Bar */}
      <Header />

      {/* 1. HERO SECTION (HOME) */}
      <section 
        id="inicio" 
        className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden px-4"
      >
        <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
          
          {/* Decorative Mystic Star (Pentagram) and Candle layout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative mb-6 flex justify-center items-center"
          >
            {/* Centered glowing pentacle vector design */}
            <svg 
              className="w-28 h-28 text-purple-600/30 animate-spin animate-purple-glow" 
              style={{ animationDuration: '30s' }} 
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" />
              <path d="M50 12 L79 78 L18 38 L82 38 L21 78 Z" />
            </svg>

            {/* Glowing Moon Icon in Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-purple-950/55 border border-purple-500/30 flex items-center justify-center text-xl text-[#d4af37] animate-pulse">
                🔮
              </div>
            </div>

            {/* Candle Left */}
            <div className="absolute -left-12 bottom-0 hidden sm:flex flex-col items-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1], y: [0, -1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-3 h-3 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[2px] mb-1"
              />
              <div className="w-1.5 h-10 bg-purple-950 border-x border-purple-800/40 rounded-t" />
            </div>

            {/* Candle Right */}
            <div className="absolute -right-12 bottom-0 hidden sm:flex flex-col items-center">
              <motion.div
                animate={{ scale: [1.1, 0.95, 1.1], y: [0, -1.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-3 h-3 bg-gradient-to-t from-orange-500 to-yellow-300 rounded-full blur-[2px] mb-1"
              />
              <div className="w-1.5 h-12 bg-purple-950 border-x border-purple-800/40 rounded-t" />
            </div>
          </motion.div>

          {/* Subtitle / Pre-Title */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-mono text-xs md:text-sm uppercase tracking-[0.4em] text-[#d4af37] font-semibold mb-3 flex items-center gap-2 animate-gold-glow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Oráculo & Magia
          </motion.p>

          {/* Title - Gothic Decorative Font */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-gothic font-extrabold text-4xl sm:text-6xl md:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-purple-400 drop-shadow-[0_5px_15px_rgba(75,0,130,0.6)] mb-4 select-none leading-none"
          >
            LIA D' FARRAPO
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center gap-1.5 md:gap-3 text-xs md:text-sm font-sans tracking-widest text-purple-300 uppercase font-bold mb-8 bg-purple-950/20 px-5 py-2 rounded-full border border-purple-500/10"
          >
            <span>Intuição</span>
            <span className="text-[#d4af37]">•</span>
            <span>Axé</span>
            <span className="text-[#d4af37]">•</span>
            <span>Caminhos</span>
            <span className="text-[#d4af37]">•</span>
            <span>Transformação</span>
          </motion.div>

          {/* Core Quotation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-lg mb-10 text-center"
          >
            <p className="font-serif text-lg md:text-2xl text-gray-200 italic leading-relaxed">
              "A espiritualidade guia, mas quem escolhe é você."
            </p>
            <div className="w-20 h-[1.5px] bg-[#d4af37]/30 mx-auto mt-4" />
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <a
              href={mainWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-800 via-purple-950 to-black hover:from-purple-700 hover:to-purple-900 text-[#d4af37] hover:text-white font-sans text-xs uppercase font-bold tracking-[0.2em] shadow-[0_0_20px_rgba(106,13,173,0.5)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all border border-[#d4af37]/45"
            >
              <MessageCircle className="w-4 h-4 fill-current text-[#d4af37]" />
              Agende sua Consulta
            </a>

            <a
              href="#servicos"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('servicos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-1 px-8 py-4 rounded-xl bg-black/40 border border-purple-500/25 text-gray-300 hover:text-white hover:bg-purple-950/20 hover:border-purple-500/55 font-sans text-xs uppercase font-bold tracking-wider transition-all"
            >
              Explorar Serviços
            </a>
          </motion.div>
        </div>

        {/* Floating/flickering candles decor at corners */}
        <div className="absolute bottom-10 left-10 hidden md:flex flex-col items-center opacity-60">
          <Flame className="w-6 h-6 text-purple-500 animate-pulse" />
          <div className="w-2 h-16 bg-gradient-to-b from-purple-950 to-black rounded-t" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-purple-600/50 mt-1">AXÉ</span>
        </div>
        <div className="absolute bottom-10 right-10 hidden md:flex flex-col items-center opacity-60">
          <Flame className="w-6 h-6 text-purple-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="w-2 h-16 bg-gradient-to-b from-purple-950 to-black rounded-t" />
          <span className="text-[9px] font-mono uppercase tracking-widest text-purple-600/50 mt-1">LIA</span>
        </div>
      </section>

      {/* 3. DETAILED SERVICES & PRICING TABLE SECTION */}
      <section className="relative py-8 bg-[#020104]/50">
        <ServiceSection onSelectService={handleSelectService} />
      </section>

      {/* CLIENT TESTIMONIALS SECTION */}
      <section className="relative py-8 bg-[#010003]/60">
        <TestimonialsSection />
      </section>

      {/* 4. PIX & TRANSACTION FLOW RULES */}
      <section className="relative py-8 bg-[#030107]/70">
        <PixSection />
      </section>

      {/* 5. CONSUMER LAWS (CDC COMPLIANCE SECURE RULES ACCORDIONS) */}
      <section className="relative py-8 bg-[#010003]/80">
        <TermsSection />
      </section>

      {/* 6. DIRECT CONVERSATION FORM/LINK AGENT */}
      <section id="contato" className="w-full max-w-4xl mx-auto px-4 py-12 md:py-16 text-center scroll-mt-24 md:scroll-mt-28">
        <div className="bg-gradient-to-b from-[#0e071c] to-[#040208] rounded-2xl border border-purple-500/15 p-5 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37]/45 to-transparent" />
          
          <h3 className="font-gothic font-bold text-2xl md:text-3xl text-white tracking-wider uppercase mb-3">
            Inicie Seu Atendimento
          </h3>
          <p className="font-serif text-sm text-gray-300 max-w-lg mx-auto italic mb-8">
            "Escolha o seu serviço ideal abaixo, preencha a sua intenção principal se desejar, e conecte-se diretamente comigo no WhatsApp para darmos início."
          </p>

          <form onSubmit={handleSendContact} className="relative z-10 max-w-xl mx-auto space-y-5 sm:space-y-6 text-left">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 font-mono">
                Selecione o Serviço de Interesse
              </label>
              <select
                value={contactCategory}
                onChange={(e) => setContactCategory(e.target.value)}
                className="w-full bg-black/60 text-white px-4 py-3 rounded-lg border border-purple-500/25 focus:border-[#d4af37] focus:outline-none text-sm transition-all cursor-pointer"
              >
                <optgroup label="Tiragens">
                  <option value="Tiragem Objetiva (1 pergunta)">Tiragem Objetiva (1 pergunta) - R$ 10</option>
                  <option value="Conselho da Espiritualidade">Conselho da Espiritualidade - R$ 15</option>
                  <option value="Amor e Relacionamentos">Amor e Relacionamentos - R$ 30</option>
                  <option value="Trabalho e Financeiro">Trabalho e Financeiro - R$ 30</option>
                  <option value="Caminhos Gerais">Caminhos Gerais - R$ 40</option>
                  <option value="Tiragem Completa">Tiragem Completa - R$ 60</option>
                </optgroup>
                <optgroup label="Métodos Personalizados">
                  <option value="Método Personalizado">Método Personalizado - R$ 30</option>
                </optgroup>
                <optgroup label="Magias Individuais">
                  <option value="Prosperidade">Magia: Prosperidade - R$ 150</option>
                  <option value="Proteção Espiritual">Magia: Proteção Espiritual - R$ 180</option>
                  <option value="Estudos e Concentração">Magia: Estudos e Concentração - R$ 180</option>
                  <option value="Abertura de Caminhos Financeiros">Magia: Abertura de Caminhos Financeiros - R$ 200</option>
                  <option value="Adoçamento Amoroso">Magia: Adoçamento Amoroso - R$ 250</option>
                  <option value="Atração Amorosa">Magia: Atração Amorosa - R$ 250</option>
                  <option value="Corte de Laços">Magia: Corte de Laços - R$ 300</option>
                  <option value="Renovação de Ciclos">Magia: Renovação de Ciclos - R$ 300</option>
                </optgroup>
                <optgroup label="Coletivos de Glamour">
                  <option value="Participação no Coletivo de Glamour">Participação no Coletivo de Glamour - R$ 35</option>
                </optgroup>
              </select>
            </div>

            {/* Client Basic Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 font-mono flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Seu Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Nome Completo do Solicitante"
                  className="w-full bg-black/60 text-white px-4 py-3 rounded-lg border border-purple-500/25 focus:border-[#d4af37] focus:outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 font-mono flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Sua Data de Nascimento
                </label>
                <input
                  type="text"
                  required
                  value={clientDob}
                  onChange={(e) => setClientDob(formatDateInput(e.target.value))}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Ex: DD/MM/AAAA"
                  className="w-full bg-black/60 text-white px-4 py-3 rounded-lg border border-purple-500/25 focus:border-[#d4af37] focus:outline-none text-sm transition-all"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Client Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 font-mono flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> WhatsApp / Telefone
                </label>
                <input
                  type="tel"
                  required
                  value={clientPhone}
                  onChange={(e) => setClientPhone(formatPhoneInput(e.target.value))}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Ex: (XX) XXXXX-XXXX"
                  className="w-full bg-black/60 text-white px-4 py-3 rounded-lg border border-purple-500/25 focus:border-[#d4af37] focus:outline-none text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 font-mono flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> E-mail (Opcional)
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Seu E-mail de Contato"
                  className="w-full bg-black/60 text-white px-4 py-3 rounded-lg border border-purple-500/25 focus:border-[#d4af37] focus:outline-none text-sm transition-all"
                />
              </div>
            </div>

            {/* Love Interests Dynamic Section */}
            {([
              'Amor e Relacionamentos',
              'Adoçamento Amoroso',
              'Atração Amorosa',
              'Corte de Laços'
            ].includes(contactCategory) || contactCategory.toLowerCase().includes('amor') || contactCategory.toLowerCase().includes('adoçamento') || contactCategory.toLowerCase().includes('corte')) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl bg-purple-950/15 border border-purple-500/10 space-y-4"
              >
                <div className="text-[11px] font-mono uppercase tracking-widest text-purple-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" /> Dados do Parceiro ou Pessoa Envolvida (Opcional)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                      Nome da Outra Pessoa
                    </label>
                    <input
                      type="text"
                      value={partnerName}
                      onChange={(e) => setPartnerName(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="Nome Completo (se houver)"
                      className="w-full bg-black/60 text-white px-3.5 py-2.5 rounded-lg border border-purple-500/20 focus:border-[#d4af37] focus:outline-none text-sm transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-gray-300 mb-1.5">
                      Nascimento da Outra Pessoa
                    </label>
                    <input
                      type="text"
                      value={partnerDob}
                      onChange={(e) => setPartnerDob(formatDateInput(e.target.value))}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder="DD/MM/AAAA (se houver)"
                      className="w-full bg-black/60 text-white px-3.5 py-2.5 rounded-lg border border-purple-500/20 focus:border-[#d4af37] focus:outline-none text-sm transition-all"
                      maxLength={10}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Specific Dynamic Label/Placeholder depending on Category */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2 font-mono flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5" /> 
                {contactCategory === 'Tiragem Objetiva (1 pergunta)' ? 'Escreva sua Pergunta Objetiva' :
                 contactCategory === 'Conselho da Espiritualidade' ? 'Foco do Conselho Espiritual' :
                 contactCategory === 'Participação no Coletivo de Glamour' ? 'Sua Intenção para o Coletivo de Glamour' :
                 'Relate sua Situação Atual ou Objetivo Principal'}
              </label>
              <textarea
                value={specificDetails}
                onChange={(e) => setSpecificDetails(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={
                  contactCategory === 'Tiragem Objetiva (1 pergunta)' ? 'Ex: Irei conseguir a aprovação no projeto que apresentei nesta semana?' :
                  contactCategory === 'Conselho da Espiritualidade' ? 'Ex: Gostaria de um conselho geral sobre minha espiritualidade e meus mentores.' :
                  contactCategory === 'Amor e Relacionamentos' || contactCategory === 'Adoçamento Amoroso' || contactCategory === 'Atração Amorosa' ? 'Ex: Sinto distanciamento na relação e gostaria de entender o que está bloqueando nossa conexão.' :
                  contactCategory === 'Trabalho e Financeiro' || contactCategory === 'Abertura de Caminhos Financeiros' || contactCategory === 'Prosperidade' ? 'Ex: Busco novos clientes para meu negócio e alinhamento profissional para crescimento.' :
                  contactCategory === 'Participação no Coletivo de Glamour' ? 'Ex: Quero expandir meu brilho pessoal, magnetismo para negócios e atração.' :
                  'Escreva aqui os detalhes da sua situação ou as principais dúvidas para que eu possa analisar espiritualmente.'
                }
                rows={4}
                className="w-full bg-black/60 text-white px-4 py-3 rounded-lg border border-purple-500/25 focus:border-[#d4af37] focus:outline-none text-sm transition-all resize-none"
              />
            </div>

            {/* Glamour Photo Consent */}
            {contactCategory === 'Participação no Coletivo de Glamour' && (
              <div className="flex items-start gap-3 bg-purple-950/20 p-4 rounded-lg border border-purple-500/10">
                <input
                  type="checkbox"
                  id="photoConfirm"
                  checked={photoSentConfirm}
                  onChange={(e) => setPhotoSentConfirm(e.target.checked)}
                  className="mt-1 accent-purple-600 rounded focus:ring-0 focus:outline-none cursor-pointer"
                />
                <label htmlFor="photoConfirm" className="text-xs text-gray-300 leading-relaxed cursor-pointer select-none">
                  <strong className="text-purple-300">Confirmação de Mídia:</strong> Declaro que estou ciente de que deverei enviar uma foto nítida de rosto no WhatsApp para a realização da consagração coletiva.
                </label>
              </div>
            )}

            {/* Mandatory Disclaimer Checkbox (CDC compliance) */}
            <div className="flex items-start gap-3 bg-black/50 p-4 rounded-lg border border-purple-500/15">
              <input
                type="checkbox"
                required
                id="termsCheck"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 accent-purple-600 rounded focus:ring-0 focus:outline-none cursor-pointer"
              />
              <label htmlFor="termsCheck" className="text-xs text-gray-300 leading-relaxed cursor-pointer select-none">
                <span className="text-[#d4af37] font-semibold">Declaração de Consentimento Obrigatória:</span> Confirmo que este formulário representa apenas uma <strong className="text-white font-semibold">solicitação de atendimento inicial</strong> e contato. Compreendo que a contratação, termos de prazos, agendamento e valores serão devidamente validados pela Lia no WhatsApp antes de qualquer pagamento.
              </label>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-800 to-purple-950 hover:from-purple-700 hover:to-purple-900 text-white font-sans text-xs uppercase font-bold tracking-[0.2em] shadow-md hover:shadow-lg border border-[#d4af37]/35 hover:border-[#d4af37]/65 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#d4af37]" />
              Solicitar Serviço (WhatsApp)
            </button>
          </form>
        </div>
      </section>

      {/* 7. SECURE FOOTER */}
      <Footer />

      {/* 8. FLOATING WHATSAPP SPEED BUTTON */}
      <motion.a
        href={mainWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 p-2.5 md:p-4 rounded-full bg-green-600 text-white shadow-[0_4px_15px_rgba(22,163,74,0.5)] hover:bg-green-500 flex items-center justify-center cursor-pointer group transition-all duration-300 ${
          isInputFocused ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100'
        }`}
        title="Falar com a Lia no WhatsApp"
      >
        <MessageCircle className="w-5 h-5 md:w-6 md:h-6 fill-current text-white group-hover:scale-110 transition-transform" />
        <span className="hidden md:block absolute right-14 bg-black/80 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-lg border border-purple-500/25 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wider pointer-events-none">
          Chamar no WhatsApp 🔮
        </span>
      </motion.a>
    </div>
  );
}
