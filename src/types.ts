export type TabId =
  | 'home'
  | 'services'
  | 'news'
  | 'portfolio'
  | 'booking'
  | 'about'
  | 'contacts';

export interface HeroSlide {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
}

export type PortfolioCategory = 'Все' | 'Портреты' | 'Архитектура' | 'Город';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'Все'>;
  image: string;
  exif: string;
  year: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  duration: string;
  deliverables: string;
  priceStatus: string;
  description: string;
}
