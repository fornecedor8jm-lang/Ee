import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { Sparkles, Compass, Shield, HeartHandshake, Eye, Search, AlertCircle, MessageCircle } from 'lucide-react';

interface ServiceSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServiceSection({ onSelectService }: ServiceSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tiragens' | 'metodos' | 'magias' | 'coletivos'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'Todos', icon: Sparkles },
    { id: 'tiragens', name: 'Tiragens', icon: Compass },
    { id: 'metodos', name: 'Métodos Custom', icon: HeartHandshake },
    { id: 'magias', name: 'Magias Individuais', icon: Shield },
    { id: 'coletivos', name: 'Coletivos de Glamour', icon: Eye },
  ];

  const filteredServices = SERVICES.filter(service => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getWhatsAppLink = (serviceName: string) => {
    const text = `Olá! Gostaria de saber mais sobre os serviços de Oráculo & Magia. Meu interesse é: ${serviceName}. Poderia me passar mais informações?`;
    return `https://contate.me/5561991345182?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16" id="servicos">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[#d4af37] text-xs font-mono uppercase mb-4 tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Menu de Trabalhos & Oráculos
        </div>
        <h2 className="text-3xl md:text-5xl font-gothic font-bold text-white tracking-wide uppercase mb-4">
          Nossos Serviços Espirituais
        </h2>
        <p className="font-serif text-lg text-gray-300 max-w-2xl mx-auto italic">
          "Cada consulta e magia é conduzida com máximo respeito, sigilo, ética e alinhamento com as egrégoras de luz para direcionar seus caminhos."
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-black/40 p-4 rounded-xl border border-purple-500/15">
        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-800 to-[#6a0dad] text-white border-b-2 border-[#d4af37] shadow-[0_0_15px_rgba(106,13,173,0.4)]'
                    : 'bg-[#100c1e]/40 text-gray-400 hover:text-white hover:bg-purple-950/20 border border-purple-500/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#d4af37]' : ''}`} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar consulta ou ritual..."
            className="w-full bg-[#05030a] text-white pl-10 pr-4 py-2.5 rounded-lg border border-purple-500/25 focus:border-[#d4af37] focus:outline-none text-sm transition-all"
          />
        </div>
      </div>

      {/* Services Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => (
            <motion.div
              layout
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-gradient-to-b from-[#110a22]/80 to-[#06030c]/95 rounded-xl border border-purple-500/15 p-6 hover:border-[#d4af37]/40 transition-all duration-500 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_4px_30px_rgba(106,13,173,0.25)] relative group overflow-hidden"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-1 left-1 text-[#d4af37]/20 font-serif text-sm opacity-0 group-hover:opacity-100 transition-opacity">⚜</div>
              <div className="absolute top-1 right-1 text-[#d4af37]/20 font-serif text-sm opacity-0 group-hover:opacity-100 transition-opacity">⚜</div>

              <div>
                {/* Category tag */}
                <div className="flex justify-between items-center mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest bg-purple-950/60 text-purple-300 uppercase font-semibold">
                    {service.category === 'tiragens' && '🔮 Tiragem'}
                    {service.category === 'metodos' && '✨ Método Especial'}
                    {service.category === 'magias' && '🕯️ Ritual Individual'}
                    {service.category === 'coletivos' && '💋 Coletivo Glamour'}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-gothic font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors leading-snug">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="font-serif text-sm text-gray-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Benefits for collectives */}
                {service.benefits && (
                  <ul className="mb-6 space-y-2.5 bg-purple-950/20 p-4 rounded-lg border border-purple-500/10">
                    <span className="block text-[11px] font-mono uppercase tracking-wider text-[#d4af37] font-semibold mb-1">
                      Benefícios Incluídos:
                    </span>
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs font-sans text-gray-300">
                        <span className="text-[#d4af37] mt-0.5">✦</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Price & CTA */}
              <div className="mt-auto pt-4 border-t border-purple-500/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-purple-400 font-mono">VALOR DO TRABALHO</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-[#d4af37] font-mono mr-1">R$</span>
                    <span className="text-2xl font-bold text-white font-mono tracking-tight group-hover:text-[#d4af37] transition-colors">
                      {service.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectService(service.name)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-black/40 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-[#4b0082]/35 hover:border-[#d4af37]/40 transition-all font-sans text-xs uppercase font-bold tracking-widest cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Preencher Formulário
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredServices.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <AlertCircle className="w-10 h-10 text-[#d4af37] mx-auto mb-3 animate-bounce" />
            <p className="font-serif text-lg text-gray-400">
              Nenhum trabalho espiritual foi encontrado com esses termos.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-4 px-4 py-2 rounded-lg bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs hover:bg-purple-900/50 transition-all"
            >
              Ver Tudo
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
