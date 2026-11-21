import heroLeafShadows from '../assets/images/hero_leaf_shadows_1795285996567.jpg';
import cardAboutShadows from '../assets/images/card_about_shadows_1795285997249.jpg';
import cardServicesStudio from '../assets/images/card_services_studio_1795285997555.jpg';
import cardNewsCamera from '../assets/images/card_news_camera_1795285997593.jpg';
import portfolioCitySkyline from '../assets/images/portfolio_city_skyline_1795285997512.jpg';
import portfolioConcreteFacade from '../assets/images/portfolio_concrete_facade_1795285996857.jpg';
import portfolioSidePortrait from '../assets/images/portfolio_side_portrait_1795285997350.jpg';
import portfolioLowTower from '../assets/images/portfolio_low_tower_1795285996585.jpg';

import type { HeroSlide, NewsItem, PortfolioItem, ServiceItem } from '../types';

export const TELEGRAM_BOT_HANDLE = '@photoguuuy_bot';
export const TELEGRAM_BOT_URL = 'https://t.me/photoguuuy_bot';

export const CARD_IMAGES = {
  about: cardAboutShadows,
  services: cardServicesStudio,
  news: cardNewsCamera,
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    kicker: 'ФОТОГРАФ В МОСКВЕ',
    title: 'EXPOSURE',
    subtitle: 'CAPTURE · CREATE · INSPIRE',
    description:
      'Профессиональная фотосъёмка для ваших особенных событий, эмоций и историй.',
    image: heroLeafShadows,
    imageAlt: 'Мягкие тени листвы на светлой стене фотостудии',
  },
  {
    id: 'slide-2',
    kicker: 'СТУДИЯ И ВЫЕЗДНЫЕ СЪЁМКИ',
    title: 'EXPOSURE',
    subtitle: 'LIGHT · SHADOW · CHARACTER',
    description:
      'Портретные, студийные и репортажные серии с вниманием к естественному свету и деталям.',
    image: cardServicesStudio,
    imageAlt: 'Минималистичная фотостудия с софтбоксами',
  },
  {
    id: 'slide-3',
    kicker: 'АВТОРСКИЙ ВЗГЛЯД',
    title: 'EXPOSURE',
    subtitle: 'FORM · ATMOSPHERE · TRUTH',
    description:
      'Кадры, в которых сохраняется живое настроение момента без лишней постановки.',
    image: cardAboutShadows,
    imageAlt: 'Геометрический солнечный свет на фактурной стене',
  },
];

export const DEFAULT_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'work-1',
    title: 'Отражения мегаполиса',
    category: 'Город',
    image: portfolioCitySkyline,
    exif: '35mm · f/4.0 · 1/125s · ISO 400',
    year: '2026',
  },
  {
    id: 'work-2',
    title: 'Геометрия бетона и стекла',
    category: 'Архитектура',
    image: portfolioConcreteFacade,
    exif: '50mm · f/5.6 · 1/500s · ISO 200',
    year: '2026',
  },
  {
    id: 'work-3',
    title: 'Портрет у окна',
    category: 'Портреты',
    image: portfolioSidePortrait,
    exif: '85mm · f/1.8 · 1/320s · ISO 320',
    year: '2026',
  },
  {
    id: 'work-4',
    title: 'Вертикаль пространства',
    category: 'Архитектура',
    image: portfolioLowTower,
    exif: '24mm · f/8.0 · 1/400s · ISO 100',
    year: '2026',
  },
];

export const DEFAULT_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Открыта запись на съёмки через Telegram-бота',
    date: 'Ноябрь 2026',
    category: 'Объявление',
    excerpt:
      'Теперь выбрать формат фотосессии, задать вопросы и согласовать удобную дату можно напрямую через официального бота @photoguuuy_bot.',
    image: cardNewsCamera,
  },
  {
    id: 'news-2',
    title: 'Запуск обновлённого портфолио EXPOSURE',
    date: 'Ноябрь 2026',
    category: 'Студия',
    excerpt:
      'Сайт постепенно наполняется новыми сериями фотографий, подробным прайс-листом услуг и свежими новостями о предстоящих проектах.',
    image: cardServicesStudio,
  },
];

export const SERVICE_CATEGORIES: ServiceItem[] = [
  {
    id: 'srv-portrait',
    title: 'Индивидуальный портрет',
    duration: '1–2 часа съёмки',
    deliverables: 'Авторская цветокоррекция и отбор лучших кадров',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Студийная или уличная портретная съёмка с акцентом на естественный свет, характер и композицию.',
  },
  {
    id: 'srv-lovestory',
    title: 'Парная съёмка и Love Story',
    duration: '1,5–2 часа съёмки',
    deliverables: 'Серия живых кадров и помощь с выбором локации',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Непринуждённая прогулка или камерная студийная сессия, передающая искренние эмоции.',
  },
  {
    id: 'srv-event',
    title: 'Репортаж и мероприятия',
    duration: 'От 2 часов',
    deliverables: 'Оперативная подготовка ключевых кадров',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Деловые события, выставки, камерные праздники и творческие встречи с деликатным репортажным подходом.',
  },
  {
    id: 'srv-commercial',
    title: 'Контент и архитектура',
    duration: 'По брифу',
    deliverables: 'Снимки для брендов, интерьеров и изданий',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Визуальные истории для пространств, персональных брендов и редакционных проектов.',
  },
];
