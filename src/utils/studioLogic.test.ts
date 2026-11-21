/// <reference types="node" />
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPortfolioByCategory,
  filterServicesBySegment,
  formatBookingBrief,
  validateAndCreateNewsItem,
  validateAndCreatePortfolioItem,
} from './studioLogic';
import type { PortfolioItem, ServiceItem } from '../types';

const SAMPLE_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: 'Город на рассвете',
    category: 'Город',
    location: 'Челябинск',
    camera: 'Canon EOS R6',
    image: 'data:image/png;base64,abc',
    exif: '35mm',
    year: '2026',
  },
  {
    id: '2',
    title: 'Горный хребет',
    category: 'Природа',
    location: 'Таганай',
    camera: 'Nikon Z6 II',
    image: 'data:image/png;base64,def',
    exif: '24mm',
    year: '2026',
  },
];

const SAMPLE_SERVICES: ServiceItem[] = [
  {
    id: 's1',
    segment: 'B2B',
    title: 'Рекламная съёмка',
    duration: 'По брифу',
    deliverables: 'Кадры',
    priceStatus: 'По запросу',
    description: 'B2B',
    image: 'img1',
    imageAlt: 'img1',
  },
  {
    id: 's2',
    segment: 'B2C',
    title: 'Фото свадьбы',
    duration: 'Полный день',
    deliverables: 'История дня',
    priceStatus: 'По запросу',
    description: 'B2C',
    image: 'img2',
    imageAlt: 'img2',
  },
];

test('filterPortfolioByCategory returns all or matching items', () => {
  assert.equal(filterPortfolioByCategory(SAMPLE_PORTFOLIO, 'Все').length, 2);
  assert.equal(filterPortfolioByCategory(SAMPLE_PORTFOLIO, 'Природа').length, 1);
  assert.equal(filterPortfolioByCategory(SAMPLE_PORTFOLIO, 'Спорт').length, 0);
});

test('filterServicesBySegment filters B2B and B2C accurately', () => {
  assert.equal(filterServicesBySegment(SAMPLE_SERVICES, 'ALL').length, 2);
  assert.equal(filterServicesBySegment(SAMPLE_SERVICES, 'B2B')[0].id, 's1');
  assert.equal(filterServicesBySegment(SAMPLE_SERVICES, 'B2C')[0].id, 's2');
});

test('validateAndCreatePortfolioItem requires title, city, camera, and image', () => {
  const missingCity = validateAndCreatePortfolioItem({
    title: 'Снимок',
    category: 'Спорт',
    location: '  ',
    camera: 'Canon EOS R6',
    exif: '',
    imageData: 'data:image/png;base64,xyz',
  });
  assert.ok(missingCity.error);
  assert.equal(missingCity.item, undefined);

  const missingCamera = validateAndCreatePortfolioItem({
    title: 'Снимок',
    category: 'Спорт',
    location: 'Челябинск',
    camera: '',
    exif: '',
    imageData: 'data:image/png;base64,xyz',
  });
  assert.ok(missingCamera.error);

  const valid = validateAndCreatePortfolioItem(
    {
      title: ' Финиш ',
      category: 'Спорт',
      location: ' Челябинск ',
      camera: ' Canon EOS R5 ',
      exif: '',
      imageData: 'data:image/png;base64,xyz',
    },
    1000,
    '2026'
  );
  assert.equal(valid.error, undefined);
  assert.deepEqual(valid.item, {
    id: 'work-1000',
    title: 'Финиш',
    category: 'Спорт',
    location: 'Челябинск',
    camera: 'Canon EOS R5',
    image: 'data:image/png;base64,xyz',
    exif: 'Авторская съёмка',
    year: '2026',
  });
});

test('validateAndCreateNewsItem requires title and excerpt', () => {
  const invalid = validateAndCreateNewsItem({
    title: '',
    category: '',
    excerpt: 'Текст',
  });
  assert.ok(invalid.error);

  const valid = validateAndCreateNewsItem(
    {
      title: ' Новая серия ',
      category: '',
      excerpt: ' Описание серии ',
    },
    2000,
    '10 ноября 2026'
  );
  assert.equal(valid.error, undefined);
  assert.deepEqual(valid.item, {
    id: 'news-2000',
    title: 'Новая серия',
    category: 'Новости',
    date: '10 ноября 2026',
    excerpt: 'Описание серии',
    image: undefined,
  });
});

test('formatBookingBrief formats non-empty booking fields', () => {
  const brief = formatBookingBrief({
    shootType: 'Фото свадьбы',
    preferredDate: ' 12 августа ',
    comment: ' Выезд в парк ',
  });
  assert.equal(
    brief,
    'Здравствуйте! Хочу записаться на съёмку.\nФормат: Фото свадьбы\nЖелаемая дата: 12 августа\nПожелания: Выезд в парк'
  );
});
