import { motion } from 'motion/react';
import { Star, Quote, Sparkles } from 'lucide-react';

interface Testimonial {
  name: string;
  service: string;
  text: string;
  rating: number;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mariana S.',
    service: 'Adoçamento Amoroso',
    text: 'A energia entre eu e meu parceiro estava muito pesada, com brigas diárias. Após o ritual de adoçamento da Lia, tudo se acalmou de uma forma indescritível. Hoje conversamos com muita leveza e carinho. Só tenho a agradecer por esse trabalho maravilhoso!',
    rating: 5,
    date: 'Junho de 2026'
  },
  {
    name: 'Rodrigo M.',
    service: 'Tiragem Completa',
    text: 'Fiz a tiragem completa e fiquei impressionado com a precisão dos detalhes. A Lia não apenas revelou as situações presentes, mas me deu conselhos valiosos de como agir na minha carreira. Segui as orientações e tudo fluiu muito bem!',
    rating: 5,
    date: 'Julho de 2026'
  },
  {
    name: 'Amanda K.',
    service: 'Corte de Laços',
    text: 'Estava presa a um ciclo repetitivo e doloroso com meu ex há mais de dois anos. O ritual de corte de laços da Lia me trouxe uma paz interior que há muito tempo eu não sentia. Finalmente me sinto livre e pronta para viver minha própria vida.',
    rating: 5,
    date: 'Maio de 2026'
  },
  {
    name: 'Fernanda L.',
    service: 'Coletivo de Glamour',
    text: 'Participar do coletivo de glamour foi uma experiência incrível. Senti meu magnetismo e autoestima aumentarem de forma absurda logo nos primeiros dias. As pessoas começaram a me elogiar mais e me sinto muito dona de mim.',
    rating: 5,
    date: 'Julho de 2026'
  }
];

export default function TestimonialsSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 scroll-mt-24 md:scroll-mt-28" id="depoimentos" aria-labelledby="testimonials-title">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/20 text-[#d4af37] text-xs font-sans font-semibold uppercase mb-4 tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          Relatos de Quem Já Consultou
        </div>
        <h2 id="testimonials-title" className="text-3xl md:text-5xl font-gothic font-bold text-white tracking-wide uppercase mb-4">
          Depoimentos de Axé
        </h2>
        <p className="font-serif text-lg text-gray-300 max-w-2xl mx-auto italic">
          "A maior satisfação do meu trabalho é ver a transformação, a clareza e o reequilíbrio na vida de quem me procura."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((testimonial, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-gradient-to-b from-[#180e33] to-[#0e071e] rounded-xl border border-purple-500/20 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-[#d4af37]/40 transition-all duration-300"
          >
            {/* Background quote mark */}
            <Quote className="absolute -top-4 -right-4 w-24 h-24 text-purple-900/10 pointer-events-none group-hover:text-purple-900/20 transition-colors" />

            <div>
              {/* Stars & Service tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-sans font-semibold bg-[#4b0082]/30 text-purple-200 border border-purple-500/10 uppercase tracking-wider">
                  {testimonial.service}
                </span>
              </div>

              {/* Text */}
              <p className="font-serif text-sm text-gray-100 leading-relaxed italic mb-6">
                "{testimonial.text}"
              </p>
            </div>

            {/* Author info */}
            <div className="flex items-center justify-between pt-4 border-t border-purple-500/5 mt-auto">
              <div>
                <span className="font-sans font-bold text-white text-sm block">
                  {testimonial.name}
                </span>
                <span className="text-[11px] text-gray-400 font-sans">
                  Cliente Atendido
                </span>
              </div>
              <span className="text-[11px] text-purple-300 font-mono">
                {testimonial.date}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
