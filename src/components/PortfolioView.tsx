import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import type { PortfolioCategory, PortfolioItem } from '../types';

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
  const [exif, setExif] = useState('');
  const [imageData, setImageData] = useState('');
  const [error, setError] = useState('');

  const filteredItems =
    selectedCategory === 'Все'
      ? items
      : items.filter((item) => item.category === selectedCategory);

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
    if (!title.trim() || !imageData) {
      setError('Выберите фотографию и укажите название работы.');
      return;
    }

    onAddPhoto({
      id: `work-${Date.now()}`,
      title: title.trim(),
      category,
      image: imageData,
      exif: exif.trim() || 'Авторская съёмка',
      year: String(new Date().getFullYear()),
    });

    setTitle('');
    setCategory('Портреты');
    setExif('');
    setImageData('');
    setError('');
    setIsUploadOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-[#666666]">
            ИЗБРАННЫЕ СЕРИИ
          </p>
          <h1 className="mt-2 font-editorial text-4xl font-normal text-[#141414] sm:text-5xl">
            Портфолио
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#4A4A4A]">
            Галерея моих фотографий и съёмочных серий. Нажмите на любой снимок,
            чтобы открыть полноэкранный просмотр.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsUploadOpen((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] px-5 py-2.5 text-[13.5px] font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2B2B2B]"
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
          className="rounded-2xl border border-[#E0E0E0] bg-white p-6 sm:p-8"
        >
          <h2 className="font-editorial text-2xl font-medium text-[#141414]">
            Добавить фотографию в портфолио
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label
                htmlFor="photo-title"
                className="block text-xs font-medium text-[#4A4A4A]"
              >
                Название работы
              </label>
              <input
                id="photo-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Вечерний портрет"
                className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="photo-category"
                className="block text-xs font-medium text-[#4A4A4A]"
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
                className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
              >
                <option value="Портреты">Портреты</option>
                <option value="Архитектура">Архитектура</option>
                <option value="Город">Город</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="photo-exif"
                className="block text-xs font-medium text-[#4A4A4A]"
              >
                Параметры (необязательно)
              </label>
              <input
                id="photo-exif"
                type="text"
                value={exif}
                onChange={(e) => setExif(e.target.value)}
                placeholder="50mm · f/1.8 · ISO 200"
                className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="photo-file"
              className="block text-xs font-medium text-[#4A4A4A]"
            >
              Файл фотографии
            </label>
            <input
              id="photo-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1.5 block w-full text-xs text-[#555555] file:mr-3 file:rounded-full file:border file:border-[#DCDCDC] file:bg-[#F5F5F5] file:px-4 file:py-2 file:text-xs file:font-medium file:text-[#141414] hover:file:bg-[#EAEAEA]"
            />
          </div>

          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsUploadOpen(false)}
              className="rounded-full border border-[#DCDCDC] px-5 py-2.5 text-xs font-medium text-[#333333] hover:bg-[#F5F5F5]"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#141414] px-6 py-2.5 text-xs font-medium text-white hover:bg-[#2B2B2B]"
            >
              Добавить в галерею
            </button>
          </div>
        </form>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                active
                  ? 'bg-[#141414] text-white'
                  : 'border border-[#E5E5E5] bg-white text-[#4A4A4A] hover:border-[#141414] hover:text-[#141414]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-[#EAEAEA] bg-white p-10 text-center">
          <p className="font-editorial text-2xl text-[#141414]">
            В этой категории пока нет снимков
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const globalIndex = items.findIndex((i) => i.id === item.id);
            return (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white"
              >
                <button
                  type="button"
                  onClick={() => onOpenLightbox(globalIndex)}
                  className="relative block aspect-[4/3] w-full overflow-hidden bg-[#EAEAEA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141414]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>

                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <h2 className="font-editorial text-xl font-medium text-[#141414]">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-xs text-[#666666]">
                      {item.category} ·{' '}
                      <span className="tabular-nums">{item.exif}</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeletePhoto(item.id)}
                    aria-label={`Удалить фото: ${item.title}`}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#888888] transition-colors hover:bg-[#F5F5F5] hover:text-[#141414]"
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
