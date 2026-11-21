import type {
  NewsItem,
  PortfolioCategory,
  PortfolioItem,
  ServiceItem,
} from '../types';

export type ServiceSegmentFilter = 'ALL' | 'B2B' | 'B2C';

export interface PortfolioFormInput {
  title: string;
  category: Exclude<PortfolioCategory, 'Все'>;
  location: string;
  camera: string;
  exif: string;
  imageData: string;
}

export interface NewsFormInput {
  title: string;
  category: string;
  excerpt: string;
  imageData?: string;
}

export interface BookingBriefInput {
  shootType: string;
  preferredDate: string;
  comment: string;
}

export function filterPortfolioByCategory(
  items: PortfolioItem[],
  category: PortfolioCategory
): PortfolioItem[] {
  if (category === 'Все') return items;
  return items.filter((item) => item.category === category);
}

export function filterServicesBySegment(
  services: ServiceItem[],
  segment: ServiceSegmentFilter
): ServiceItem[] {
  if (segment === 'ALL') return services;
  return services.filter((service) => service.segment === segment);
}

export function validateAndCreatePortfolioItem(
  input: PortfolioFormInput,
  now = Date.now(),
  year = String(new Date().getFullYear())
): { item?: PortfolioItem; error?: string } {
  const title = input.title.trim();
  const location = input.location.trim();
  const camera = input.camera.trim();
  const exif = input.exif.trim();

  if (!title || !location || !camera || !input.imageData) {
    return {
      error:
        'Укажите название, город съёмки, камеру (бренд и модель) и выберите фотографию.',
    };
  }

  return {
    item: {
      id: `work-${now}`,
      title,
      category: input.category,
      location,
      camera,
      image: input.imageData,
      exif: exif || 'Авторская съёмка',
      year,
    },
  };
}

export function validateAndCreateNewsItem(
  input: NewsFormInput,
  now = Date.now(),
  formattedDate?: string
): { item?: NewsItem; error?: string } {
  const title = input.title.trim();
  const excerpt = input.excerpt.trim();
  const category = input.category.trim();

  if (!title || !excerpt) {
    return {
      error: 'Заполните заголовок и текст новости.',
    };
  }

  const date =
    formattedDate ||
    new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(now));

  return {
    item: {
      id: `news-${now}`,
      title,
      category: category || 'Новости',
      date,
      excerpt,
      image: input.imageData || undefined,
    },
  };
}

export function formatBookingBrief(input: BookingBriefInput): string {
  const parts = [
    'Здравствуйте! Хочу записаться на съёмку.',
    `Формат: ${input.shootType}`,
    input.preferredDate.trim()
      ? `Желаемая дата: ${input.preferredDate.trim()}`
      : null,
    input.comment.trim() ? `Пожелания: ${input.comment.trim()}` : null,
  ].filter(Boolean);

  return parts.join('\n');
}
