import heroLeafShadows from '../assets/images/hero_leaf_shadows_1795285996567.jpg';
import cardAboutShadows from '../assets/images/card_about_shadows_1795285997249.jpg';
import cardServicesStudio from '../assets/images/card_services_studio_1795285997555.jpg';
import cardNewsCamera from '../assets/images/card_news_camera_1795285997593.jpg';
import portfolioCitySkyline from '../assets/images/portfolio_city_skyline_1795285997512.jpg';
import portfolioConcreteFacade from '../assets/images/portfolio_concrete_facade_1795285996857.jpg';
import portfolioSidePortrait from '../assets/images/portfolio_side_portrait_1795285997350.jpg';
import portfolioLowTower from '../assets/images/portfolio_low_tower_1795285996585.jpg';
import b2bCommercialFashion from '../assets/images/b2b_commercial_fashion_1795290441621.jpg';
import b2bBusinessEvent from '../assets/images/b2b_business_event_1795290440999.jpg';
import b2cWeddingStory from '../assets/images/b2c_wedding_story_1795290440522.jpg';
import b2cFamilyPortrait from '../assets/images/b2c_family_portrait_1795290440989.jpg';

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
    kicker: 'ФОТОГРАФ В ЧЕЛЯБИНСКЕ',
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
  // B2B — Коммерция и бизнес
  {
    id: 'b2b-advertising',
    segment: 'B2B',
    title: 'Рекламная и имиджевая съёмка',
    duration: 'По брифу',
    deliverables: 'Кадры для наружной рекламы, сайтов и кампаний бренда',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Постановочная и студийная коммерческая съёмка для продвижения компаний, продуктов и визуального позиционирования бизнеса.',
    image: b2bCommercialFashion,
    imageAlt: 'Пример рекламной и имиджевой съёмки в студии',
  },
  {
    id: 'b2b-catalog',
    segment: 'B2B',
    title: 'Каталожная съёмка и лукбуки',
    duration: 'От 2 часов',
    deliverables: 'Серии для одежды, обуви, украшений и маркетплейсов',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Чистая предметная и fashion-съёмка коллекций одежды, обуви, аксессуаров и ювелирных изделий с точной передачей фактур.',
    image: cardServicesStudio,
    imageAlt: 'Студийный свет для каталожной съёмки и лукбуков',
  },
  {
    id: 'b2b-event',
    segment: 'B2B',
    title: 'Бизнес-репортаж и мероприятия',
    duration: 'От 2 часов',
    deliverables: 'Оперативный отбор кадров для прессы и соцсетей',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Репортажное сопровождение конференций, форумов, корпоративных событий, презентаций и деловых встреч.',
    image: b2bBusinessEvent,
    imageAlt: 'Пример бизнес-репортажа с делового мероприятия',
  },
  {
    id: 'b2b-brand',
    segment: 'B2B',
    title: 'Контент-съёмка для экспертов и личного бренда',
    duration: '1,5–3 часа',
    deliverables: 'Визуальный банк фотографий на месяц и более',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Деловые и лайфстайл-портреты для предпринимателей, специалистов и руководителей под соцсети, медиа и выступления.',
    image: cardNewsCamera,
    imageAlt: 'Рабочая атмосфера контент-съёмки для личного бренда',
  },
  // B2C — Частные съёмки
  {
    id: 'b2c-wedding',
    segment: 'B2C',
    title: 'Фото свадьбы',
    duration: 'От 4 часов / полный день',
    deliverables: 'Авторская обработка и полная история свадебного дня',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Деликатная репортажная и постановочная съёмка сборов, церемонии, прогулки и банкета с живыми эмоциями.',
    image: b2cWeddingStory,
    imageAlt: 'Пример свадебной фотографии на прогулке',
  },
  {
    id: 'b2c-family',
    segment: 'B2C',
    title: 'Семейные и детские фотосессии',
    duration: '1–2 часа',
    deliverables: 'Тёплые семейные кадры в студии, дома или на прогулке',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Естественные съёмки с детьми и близкими без скованности — тёплые моменты, которые остаются в семейном архиве.',
    image: b2cFamilyPortrait,
    imageAlt: 'Пример семейной и детской фотосессии',
  },
  {
    id: 'b2c-graduation',
    segment: 'B2C',
    title: 'Выпускные альбомы',
    duration: 'Групповые и индивидуальные сессии',
    deliverables: 'Портреты, общие кадры и подготовка макетов',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Современные выпускные фотосессии для школ, колледжей и вузов в студии и городских локациях.',
    image: cardAboutShadows,
    imageAlt: 'Пример художественного освещения для выпускных портретов',
  },
  {
    id: 'b2c-portrait',
    segment: 'B2C',
    title: 'Частные портреты',
    duration: '1–2 часа',
    deliverables: 'Индивидуальный подбор образов, света и локации',
    priceStatus: 'Цена будет добавлена позже',
    description:
      'Персональная фотосессия для себя: минималистичные студийные портреты, творческие образы и городские прогулки.',
    image: portfolioSidePortrait,
    imageAlt: 'Пример частного художественного портрета',
  },
];
