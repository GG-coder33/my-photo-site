import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import type { NewsItem } from '../types';

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
    if (!title.trim() || !excerpt.trim()) {
      setError('Заполните заголовок и текст новости.');
      return;
    }

    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date());

    onAddNews({
      id: `news-${Date.now()}`,
      title: title.trim(),
      category: category.trim() || 'Новости',
      date: formattedDate,
      excerpt: excerpt.trim(),
      image: imageData || undefined,
    });

    setTitle('');
    setCategory('Новости студии');
    setExcerpt('');
    setImageData('');
    setError('');
    setIsFormOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col justify-between gap-4 rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:flex-row sm:items-end sm:p-8">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-[#666666]">
            ЖУРНАЛ И ОБНОВЛЕНИЯ
          </p>
          <h1 className="mt-2 font-editorial text-4xl font-normal text-[#141414] sm:text-5xl">
            Новости
          </h1>
          <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#4A4A4A]">
            Публикуйте здесь свежие новости, анонсы съёмочных дней, новые серии
            и специальные предложения.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141414] px-5 py-2.5 text-[13.5px] font-medium text-white whitespace-nowrap shrink-0 transition-colors hover:bg-[#2B2B2B]"
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
          className="rounded-2xl border border-[#E0E0E0] bg-white p-6 sm:p-8"
        >
          <h2 className="font-editorial text-2xl font-medium text-[#141414]">
            Новая публикация
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="news-title"
                className="block text-xs font-medium text-[#4A4A4A]"
              >
                Заголовок новости
              </label>
              <input
                id="news-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Например: Открыта запись на зимние фотосессии"
                className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="news-category"
                className="block text-xs font-medium text-[#4A4A4A]"
              >
                Рубрика
              </label>
              <input
                id="news-category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Анонс, Студия, Проект..."
                className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="news-excerpt"
              className="block text-xs font-medium text-[#4A4A4A]"
            >
              Текст новости
            </label>
            <textarea
              id="news-excerpt"
              rows={4}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Расскажите подробнее о событии, датах или условиях..."
              className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="news-image"
              className="block text-xs font-medium text-[#4A4A4A]"
            >
              Обложка новости (необязательно)
            </label>
            <input
              id="news-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1.5 block w-full text-xs text-[#555555] file:mr-3 file:rounded-full file:border file:border-[#DCDCDC] file:bg-[#F5F5F5] file:px-4 file:py-2 file:text-xs file:font-medium file:text-[#141414] hover:file:bg-[#EAEAEA]"
            />
          </div>

          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded-full border border-[#DCDCDC] px-5 py-2.5 text-xs font-medium text-[#333333] hover:bg-[#F5F5F5]"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#141414] px-6 py-2.5 text-xs font-medium text-white hover:bg-[#2B2B2B]"
            >
              Опубликовать
            </button>
          </div>
        </form>
      )}

      {newsItems.length === 0 ? (
        <div className="rounded-2xl border border-[#EAEAEA] bg-white p-10 text-center">
          <p className="font-editorial text-2xl text-[#141414]">
            Новостей пока нет
          </p>
          <p className="mt-2 text-sm text-[#666666]">
            Нажмите «Добавить новость», чтобы опубликовать первую запись.
          </p>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white"
            >
              {item.image && (
                <div className="h-52 w-full overflow-hidden bg-[#F0F0F0]">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-[#737373]">
                    <div className="flex items-center gap-2">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{item.date}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteNews(item.id)}
                      aria-label={`Удалить новость: ${item.title}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#888888] transition-colors hover:bg-[#F5F5F5] hover:text-[#141414]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h2 className="mt-2.5 font-editorial text-2xl font-medium leading-snug text-[#141414]">
                    {item.title}
                  </h2>

                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-[#4A4A4A]">
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
