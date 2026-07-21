import { ServiceItem, TermClause, TarotCard } from './types';

export const SERVICES: ServiceItem[] = [
  // Tiragens
  {
    id: 'tiragem_objetiva',
    name: 'Tiragem Objetiva (1 pergunta)',
    price: 10,
    description: 'Resposta rápida, direta e objetiva para uma dúvida específica através do oráculo.',
    category: 'tiragens'
  },
  {
    id: 'conselho_espiritualidade',
    name: 'Conselho da Espiritualidade',
    price: 15,
    description: 'Mensagem e direcionamento especial dos guias e mentores espirituais para o seu momento atual.',
    category: 'tiragens'
  },
  {
    id: 'amor_relacionamentos',
    name: 'Amor e Relacionamentos',
    price: 30,
    description: 'Análise detalhada de sentimentos, afinidades, bloqueios, pensamentos do ser amado e tendências futuras.',
    category: 'tiragens'
  },
  {
    id: 'trabalho_financeiro',
    name: 'Trabalho e Financeiro',
    price: 30,
    description: 'Orientação focada em carreira, finanças, tomada de decisões profissionais, negócios e caminhos de emprego.',
    category: 'tiragens'
  },
  {
    id: 'caminhos_gerais',
    name: 'Caminhos Gerais',
    price: 40,
    description: 'Panorama geral da sua vida abrangendo os principais setores e tendências para as próximas semanas.',
    category: 'tiragens'
  },
  {
    id: 'tiragem_completa',
    name: 'Tiragem Completa',
    price: 60,
    description: 'Nossa consulta mais profunda por tema, contemplando detalhadamente quatro áreas vitais: Amor, Trabalho, Espiritualidade e Conselho Final.',
    category: 'tiragens'
  },

  // Métodos Personalizados
  {
    id: 'metodo_personalizado',
    name: 'Método Personalizado',
    price: 30,
    description: 'Consulta totalmente customizada e adaptada para a sua necessidade específica do momento. Inclui análise aprofundada das energias e orientação espiritual rica em detalhes.',
    category: 'metodos'
  },

  // Magias Individuais
  {
    id: 'magia_prosperidade',
    name: 'Prosperidade',
    price: 150,
    description: 'Ritual individual de alta vibração focado na atração de abundância material, sorte, fartura e abertura de portas.',
    category: 'magias'
  },
  {
    id: 'magia_protecao',
    name: 'Proteção Espiritual',
    price: 180,
    description: 'Fechamento de corpo energético, blindando sua aura, lar e caminhos contra energias densas, inveja e ataques espirituais.',
    category: 'magias'
  },
  {
    id: 'magia_estudos',
    name: 'Estudos e Concentração',
    price: 180,
    description: 'Trabalho espiritual consagrado para expansão mental, aumento de foco, retenção de conhecimento e sucesso em provas, concursos ou vestibulares.',
    category: 'magias'
  },
  {
    id: 'magia_financeiro',
    name: 'Abertura de Caminhos Financeiros',
    price: 200,
    description: 'Desbloqueio de nós energéticos que impedem o fluxo de dinheiro, atração de novos clientes e aceleração de negócios empacados.',
    category: 'magias'
  },
  {
    id: 'magia_adocamento',
    name: 'Adoçamento Amoroso',
    price: 250,
    description: 'Consagração mística para acalmar os ânimos, trazer doçura, afeto e compreensão para o relacionamento, desfazendo desentendimentos e brigas constantes.',
    category: 'magias'
  },
  {
    id: 'magia_atracao',
    name: 'Atração Amorosa',
    price: 250,
    description: 'Fortalecimento do magnetismo pessoal, aumento do poder de sedução, brilho áurico e abertura de caminhos para receber novos e verdadeiros afetos.',
    category: 'magias'
  },
  {
    id: 'magia_corte',
    name: 'Corte de Laços',
    price: 300,
    description: 'Banimento e rompimento definitivo de conexões obsessivas, laços kármicos com ex-parceiros ou ligações energéticas doentias e limitantes.',
    category: 'magias'
  },
  {
    id: 'magia_renovacao',
    name: 'Renovação de Ciclos',
    price: 300,
    description: 'Poderosa limpeza purificadora para desfazer amarras do passado e restabelecer o fôlego áurico, abrindo novos capítulos de vida com força máxima.',
    category: 'magias'
  },

  // Coletivos de Glamour
  {
    id: 'coletivo_glamour',
    name: 'Participação no Coletivo de Glamour',
    price: 35,
    description: 'Consagração coletiva poderosa para magnetismo, encanto, poder pessoal e atração de olhares e oportunidades sob a egrégora de Pomba Gira.',
    benefits: [
      'Análise energética personalizada das suas vibrações',
      '1 Tiragem objetiva (pergunta direta) de brinde',
      'Suporte espiritual aproximado e acolhedor durante o período ativo do trabalho'
    ],
    category: 'coletivos'
  }
];

export const TERMS_CLAUSES: TermClause[] = [
  {
    title: 'Direito à Informação Adequada e Clara',
    reference: 'Art. 6º, III do CDC (Lei 8.078/1990)',
    description: 'Este portal assegura o direito básico do consumidor à informação clara, precisa e ostensiva sobre todos os serviços de oráculos e rituais.',
    details: [
      'Cada serviço exibe seu preço exato em Reais (R$), descrição de escopo e categoria.',
      'Não há cobranças ocultas, adicionais não informados ou taxas extras surpresas.',
      'O consumidor tem o direito de compreender exatamente o que está adquirindo antes de qualquer ação.'
    ]
  },
  {
    title: 'Proteção contra Práticas Abusivas',
    reference: 'Art. 6º, IV e Art. 39 do CDC',
    description: 'Assegura a proteção do cliente contra métodos comerciais coercitivos, abusivos ou que se aproveitem de sua vulnerabilidade.',
    details: [
      'Garantia de livre arbítrio total na escolha das tiragens e rituais.',
      'O oráculo funciona estritamente como ferramenta de autoconhecimento e orientação, nunca como coerção ou ameaça.',
      'Nenhum serviço espiritual pode ser empurrado de forma forçada ou com apelos de pânico.'
    ]
  },
  {
    title: 'Nulidade de Cláusulas Abusivas',
    reference: 'Art. 51, IV do CDC',
    description: 'Garante que disposições contratuais ou combinados verbais que desequilibrem a relação de consumo em desfavor do cliente sejam consideradas nulas.',
    details: [
      'Regras justas e de boa-fé em relação a reagendamentos de consultas de tarô.',
      'Equilíbrio e bom senso na devolução ou crédito em caso de impossibilidade justificada de ambas as partes.',
      'Preservação da dignidade e equidade da relação de consumo.'
    ]
  },
  {
    title: 'Boa-Fé Objetiva e Equilíbrio Contratual',
    reference: 'Art. 4º e Art. 51 do CDC',
    description: 'Fundamento que exige transparência, honestidade e respeito mútuco na contratação e execução das consultas e magias.',
    details: [
      'Clareza nos prazos de agendamento e na entrega das leituras espirituais.',
      'Comprometimento com a verdade e com as práticas seguras no universo oracular.',
      'Respeito absoluto à privacidade e sigilo absoluto sobre os dados e histórias partilhados.'
    ]
  },
  {
    title: 'Contato Prévio Obrigatório Antes do Pagamento',
    reference: 'Cláusula de Procedimento de Segurança (CDC e Boas Práticas)',
    description: 'Para assegurar a qualidade e personalização extrema do atendimento, NENHUM pagamento deve ser realizado sem conversa prévia no canal de atendimento.',
    details: [
      'Antes de transferir qualquer valor via Pix, o cliente DEVE enviar mensagem via WhatsApp para alinhar detalhes da consulta.',
      'Nessa conversa, serão checados: disponibilidade de horários, a exatidão do método escolhido para sua dúvida e o prazo aproximado de entrega.',
      'Transferências sem contato prévio poderão ser recusadas e o respectivo reembolso será feito de forma integral sob análise.',
      'Ao prosseguir, você confirma que compreende a importância desse filtro humano protetivo.'
    ]
  },
  {
    title: 'Solicitação de Serviços',
    reference: 'Cláusula - Solicitação de Serviços',
    description: 'Este site possui caráter institucional, destinado exclusivamente à apresentação dos serviços oferecidos e ao encaminhamento de solicitações de atendimento.',
    details: [
      '1. Funcionamento da solicitação: Ao selecionar um serviço, como uma tiragem de cartas ou qualquer outro atendimento disponível, o usuário será direcionado para um formulário de solicitação. O formulário deverá ser preenchido com as informações solicitadas para possibilitar a análise do pedido e o atendimento adequado.',
      '2. Envio da solicitação: Após o preenchimento do formulário, o usuário deverá clicar no botão "Solicitar Serviço". Esse botão abrirá automaticamente uma conversa no WhatsApp do profissional responsável, contendo uma mensagem automática com todas as respostas informadas no formulário. O envio da mensagem não representa a contratação automática do serviço, servindo apenas como solicitação inicial de atendimento.',
      '3. Contato prévio: Após o recebimento da solicitação, o profissional analisará as informações enviadas, esclarecerá eventuais dúvidas, informará disponibilidade, prazo, valor e demais condições do serviço. Somente após esse contato prévio, e caso haja concordância entre as partes, poderá ser solicitado o pagamento para início da prestação do serviço.',
      '4. Natureza do site: O site não realiza atendimentos automáticos, não processa pagamentos nem executa consultas de forma instantânea. Todas as solicitações dependem da análise e da confirmação do profissional responsável pelo atendimento.',
      '5. Comunicação: As mensagens automáticas geradas pelo site têm a finalidade exclusiva de facilitar o envio das informações ao profissional, não constituindo confirmação de agendamento, contratação ou aprovação do serviço.'
    ]
  }
];

export const TAROT_CARDS: TarotCard[] = [
  {
    id: 'mago',
    name: 'O Mago',
    image: '🔮',
    meaning: 'Poder de manifestação, foco, novos começos e força de vontade.',
    advice: 'Você tem todas as ferramentas necessárias para moldar o seu destino neste momento. Foque sua energia e aja com determinação.',
    type: 'Major'
  },
  {
    id: 'sacerdotisa',
    name: 'A Sacerdotisa',
    image: '🌙',
    meaning: 'Intuição profunda, sabedoria interior, mistério e paciência.',
    advice: 'As respostas que você procura estão dentro de você. Confie nos seus pressentimentos e aguarde o momento certo para se revelar.',
    type: 'Major'
  },
  {
    id: 'imperatriz',
    name: 'A Imperatriz',
    image: '👑',
    meaning: 'Abundância, criatividade, fertilidade e nutrição.',
    advice: 'Momento de colheita e florescimento. Nutra seus planos com amor e observe-os crescerem com riqueza e vigor.',
    type: 'Major'
  },
  {
    id: 'roda_fortuna',
    name: 'A Roda da Fortuna',
    image: '☸️',
    meaning: 'Mudanças inevitáveis, ciclos, destino e novas oportunidades.',
    advice: 'O universo está em constante movimento. Aceite as mudanças de ciclo e esteja pronto para agarrar as novas portas que se abrem.',
    type: 'Major'
  },
  {
    id: 'estrela',
    name: 'A Estrela',
    image: '⭐',
    meaning: 'Esperança, cura espiritual, inspiração e serenidade.',
    advice: 'Mantenha a fé e a mente calma. Uma luz guia está iluminando o seu caminho e trazendo cura e refrigério para as suas dores.',
    type: 'Major'
  },
  {
    id: 'sol',
    name: 'O Sol',
    image: '☀️',
    meaning: 'Sucesso absoluto, clareza, vitalidade, verdade e alegria.',
    advice: 'A verdade brilha forte. Celebre sua energia vital, pois o sucesso e a felicidade estão garantidos na sua jornada imediata.',
    type: 'Major'
  },
  {
    id: 'eremita',
    name: 'O Eremita',
    image: '🕯️',
    meaning: 'Autoconhecimento, reflexão profunda, solitude sagrada e busca por respostas.',
    advice: 'Hora de se recolher um pouco e buscar sua própria luz interior. No silêncio e na calma, as respostas aparecerão claramente.',
    type: 'Major'
  },
  {
    id: 'forca',
    name: 'A Força',
    image: '🦁',
    meaning: 'Controle emocional, coragem, determinação e compaixão.',
    advice: 'Domine seus medos e impulsos com suavidade e firmeza. Sua maior força reside na resiliência e no equilíbrio interior.',
    type: 'Major'
  }
];
