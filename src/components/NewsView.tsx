import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import type { NewsItem } from '../types';
import { validateAndCreateNewsItem } from '../utils/studioLogic';

interface NewsViewProps {
  newsItems: NewsItem[];
  onAddNews: (item: NewsItem) => void;
  onDeleteNews: (id: string) => void;
}

export function NewsView({
  newsItems,
  onAddNews,
  onDeleteNews,
}: NewsViewProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Новости студии');
  const [excerpt, setExcerpt] = useState('');
  const [imageData, setImageData] = useState<string>('');
  const [error, setError] = useState('');

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
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
    const result = validateAndCreateNewsItem({
      title,
      category,
      excerpt,
      imageData,
    });

    if (result.error || !result.item) {
      setError(result.error ?? 'Заполните заголовок и текст новости.');
      return;
    }

    onAddNews(result.item);
    setTitle('');
    setCategory('Новости студии');
    setExcerpt('');
    setImageData('');
    setError('');
    setIsFormOpen(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
      <section className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-[#111111] p-6 sm:flex-row sm:items-end sm:p-10">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-[#FF4500] uppercase">
            Журнал и обновления
          </p>
          <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-[#ffe0e0] sm:text-5xl">
            Новости
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-gray-400">
            Публикуйте здесь свежие новости, анонсы съёмочных дней, новые серии
            и специальные предложения.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FF4500] px-5 py-2.5 text-xs font-semibold text-black whitespace-nowrap shrink-0 transition-transform hover:scale-[1.03]"
        >
          {isFormOpen ? (
            <>
              <X className="h-4 w-4" />
              <span>Скрыть форму</span>
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              <span>Добавить новость</span>
            </>
          )}
        </button>
      </section>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/15 bg-[#111111] p-6 sm:p-8"
        >
          <h2 className="font-editorial text-2xl font-medium tracking-tight text-white">
            Новая публикация
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="news-title"
                className="block text-xs font-medium text-white/70"
              >
                Заголовок новости
              </label>
              <input
                id="news-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Открыта запись на зимние фотосессии"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF4500] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="news-category"
                className="block text-xs font-medium text-white/70"
              >
                Рубрика
              </label>
              <input
                id="news-category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Анонс, Студия, Проект..."
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF4500] focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="news-excerpt"
              className="block text-xs font-medium text-white/70"
            >
              Текст новости
            </label>
            <textarea
              id="news-excerpt"
              rows={4}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Расскажите подробнее о событии, датах или условиях..."
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#FF4500] focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="news-image"
              className="block text-xs font-medium text-white/70"
            >
              Обложка новости (необязательно)
            </label>
            <input
              id="news-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
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
              onClick={() => setIsFormOpen(false)}
              className="rounded-full border border-white/15 px-5 py-2.5 text-xs font-medium text-white/80 hover:bg-white/10"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#FF4500] px-6 py-2.5 text-xs font-semibold text-black hover:opacity-90"
            >
              Опубликовать
            </button>
          </div>
        </form>
      )}

      {newsItems.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-12 text-center">
          <p className="font-editorial text-2xl font-medium text-white">
            Новостей пока нет
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Нажмите «Добавить новость», чтобы опубликовать первую запись.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#111111] transition-colors duration-300 hover:border-[#FF4500]/50"
            >
              {item.image && (
                <div className="h-52 w-full overflow-hidden bg-[#080808]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-white/55">
                    <div className="flex items-center gap-2">
                      <span className="text-[#FF4500]">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{item.date}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteNews(item.id)}
                      aria-label={`Удалить новость: ${item.title}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h2 className="mt-3 font-editorial text-2xl font-medium leading-snug tracking-tight text-white">
                    {item.title}
                  </h2>

                  <p className="mt-2.5 text-sm leading-relaxed text-gray-400">
                    {item.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
