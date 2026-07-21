export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits?: string[];
  category: 'tiragens' | 'metodos' | 'magias' | 'coletivos';
}

export interface TermClause {
  title: string;
  reference: string;
  description: string;
  details: string[];
}

export interface TarotCard {
  id: string;
  name: string;
  image: string;
  meaning: string;
  advice: string;
  type: 'Major' | 'Minor';
}
