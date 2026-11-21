import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import type { PortfolioCategory, PortfolioItem } from '../types';
import {
  filterPortfolioByCategory,
  validateAndCreatePortfolioItem,
} from '../utils/studioLogic';

interface PortfolioViewProps {
  items: PortfolioItem[];
  onAddPhoto: (item: PortfolioItem) => void;
  onDeletePhoto: (id: string) => void;
  onOpenLightbox: (index: number) => void;
}

const CATEGORIES: PortfolioCategory[] = [
  'Все',
  'Портреты',
  'Архитектура',
  'Город',
  'Природа',
  'Спорт',
];

export function PortfolioView({
  items,
  onAddPhoto,
  onDeletePhoto,
  onOpenLightbox,
}: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>('Все');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] =
    useState<Exclude<PortfolioCategory, 'Все'>>('Портреты');
  const [location, setLocation] = useState('');
  const [camera, setCamera] = useState('');
  const [exif, setExif] = useState('');
  const [imageData, setImageData] = useState('');
  const [error, setError] = useState('');

  const filteredItems = filterPortfolioByCategory(items, selectedCategory);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageData(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = validateAndCreatePortfolioItem({
      title,
      category,
      location,
      camera,
      exif,
      imageData,
    });

    if (result.error || !result.item) {
      setError(
        result.error ??
          'Укажите название, город съёмки, камеру (бренд и модель) и выберите фотографию.'
      );
      return;
    }

    onAddPhoto(result.item);
    setTitle('');
    setCategory('Портреты');
    setLocation('');
    setCamera('');
    setExif('');
    setImageData('');
    setError('');
    setIsUploadOpen(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
      <section className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:flex-row sm:items-end sm:p-10">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-[#FF4500] uppercase">
            Избранные серии
          </p>
          <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-[#ffe0e0] sm:text-5xl">
            Портфолио
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-400">
            Галерея фотографий и съёмочных серий. Нажмите на любой снимок, чтобы
            открыть полноэкранный просмотр.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadOpen((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF4500] px-5 py-2.5 text-xs font-semibold text-black whitespace-nowrap shrink-0 transition-transform hover:scale-[1.03]"
        >
          {isUploadOpen ? (
            <>
              <X className="h-4 w-4" />
              <span>Закрыть</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Загрузить фото</span>
            </>
          )}
        </button>
      </section>

      {isUploadOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/15 bg-[#111111] p-6 sm:p-8"
        >
          <h2 className="font-editorial text-2xl font-medium tracking-tight text-white">
            Добавить фотографию в портфолио
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label
                htmlFor="photo-title"
                className="block text-xs font-medium text-white/70"
              >
                Название работы
              </label>
              <input
                id="photo-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Вечерний портрет"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF4500] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="photo-category"
                className="block text-xs font-medium text-white/70"
              >
                Категория
              </label>
              <select
                id="photo-category"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as Exclude<PortfolioCategory, 'Все'>
                  )
                }
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white focus:border-[#FF4500] focus:outline-none"
              >
                <option value="Портреты">Портреты</option>
                <option value="Архитектура">Архитектура</option>
                <option value="Город">Город</option>
                <option value="Природа">Природа</option>
                <option value="Спорт">Спорт</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="photo-location"
                className="block text-xs font-medium text-white/70"
              >
                Где сделано (город)
              </label>
              <input
                id="photo-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Например: Челябинск"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF4500] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="photo-camera"
                className="block text-xs font-medium text-white/70"
              >
                Камера (бренд и модель)
              </label>
              <input
                id="photo-camera"
                type="text"
                list="camera-suggestions"
                value={camera}
                onChange={(e) => setCamera(e.target.value)}
                placeholder="Например: Canon EOS R6, Nikon Z6 II"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF4500] focus:outline-none"
              />
              <datalist id="camera-suggestions">
                <option value="Canon EOS R5" />
                <option value="Canon EOS R6" />
                <option value="Canon EOS 5D Mark IV" />
                <option value="Nikon Z6 II" />
                <option value="Nikon Z7 II" />
                <option value="Nikon D850" />
                <option value="Sony A7 IV" />
                <option value="Fujifilm X-T5" />
              </datalist>
            </div>

            <div className="sm:col-span-2 lg:col-span-2">
              <label
                htmlFor="photo-exif"
                className="block text-xs font-medium text-white/70"
              >
                Параметры съёмки (необязательно)
              </label>
              <input
                id="photo-exif"
                type="text"
                value={exif}
                onChange={(e) => setExif(e.target.value)}
                placeholder="50mm · f/1.8 · 1/250s · ISO 200"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF4500] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="photo-file"
              className="block text-xs font-medium text-white/70"
            >
              Файл фотографии
            </label>
            <input
              id="photo-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1.5 block w-full text-xs text-white/60 file:mr-3 file:rounded-full file:border file:border-white/15 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-[#FF4500] hover:file:text-black"
            />
          </div>

          {error && (
            <p role="alert" className="mt-3 text-xs font-medium text-[#FF6B4A]">
              {error}
            </p>
          )}

          <div className="mt-6 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium text-white/80 hover:bg-white/10"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#FF4500] px-6 py-2.5 text-xs font-semibold text-black hover:opacity-90"
            >
              Добавить в галерею
            </button>
          </div>
        </form>
      )}

      {/* Segmented filter bar */}
      <div
        role="tablist"
        aria-label="Категории портфолио"
        className="inline-flex w-fit flex-wrap items-center gap-1 rounded-2xl border border-white/10 bg-[#111111] p-1"
      >
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                active
                  ? 'bg-[#FF4500] text-black font-semibold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-12 text-center">
          <p className="font-editorial text-2xl font-medium text-white">
            В категории «{selectedCategory}» пока нет снимков
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Вы можете загрузить свои фотографии прямо в этот раздел.
          </p>
          <button
            type="button"
            onClick={() => {
              if (selectedCategory !== 'Все') {
                setCategory(selectedCategory);
              }
              setIsUploadOpen(true);
            }}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF4500] px-5 py-2.5 text-xs font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Загрузить фото</span>
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const globalIndex = items.findIndex((i) => i.id === item.id);
            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111111] transition-colors duration-300 hover:border-[#FF4500]/50"
              >
                <button
                  type="button"
                  onClick={() => onOpenLightbox(globalIndex)}
                  aria-label={`Открыть снимок: ${item.title}`}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-[#080808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </button>

                <div className="flex items-start justify-between gap-3 p-5">
                  <div>
                    <h2 className="font-editorial text-lg font-medium tracking-tight text-white">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs text-white/65">
                      <span className="text-[#FF4500]">{item.category}</span>
                      {item.location ? ` · ${item.location}` : ''}
                      {item.camera ? ` · ${item.camera}` : ''}
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-white/40 tabular-nums">
                      {item.exif}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeletePhoto(item.id)}
                    aria-label={`Удалить фото: ${item.title}`}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}
