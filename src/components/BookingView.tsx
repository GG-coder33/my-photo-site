import { useState } from 'react';
import { Check, Copy, ExternalLink, Phone, Send } from 'lucide-react';
import {
  SERVICE_CATEGORIES,
  TELEGRAM_BOT_HANDLE,
  TELEGRAM_BOT_URL,
} from '../data/studioData';

export function BookingView() {
  const [copiedBot, setCopiedBot] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [shootType, setShootType] = useState(SERVICE_CATEGORIES[0].title);
  const [preferredDate, setPreferredDate] = useState('');
  const [comment, setComment] = useState('');

  const handleCopyBot = async () => {
    try {
      await navigator.clipboard.writeText(TELEGRAM_BOT_HANDLE);
      setCopiedBot(true);
      setTimeout(() => setCopiedBot(false), 2000);
    } catch {
      // Fallback ignored in restricted frames
    }
  };

  const handleCopyAndOpenTelegram = async () => {
    const parts = [
      `Здравствуйте! Хочу записаться на съёмку.`,
      `Формат: ${shootType}`,
      preferredDate ? `Желаемая дата: ${preferredDate}` : null,
      comment.trim() ? `Пожелания: ${comment.trim()}` : null,
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(parts.join('\n'));
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      // Clipboard optional
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-10">
        <p className="text-[11px] font-medium tracking-[0.22em] text-[#666666]">
          ОНЛАЙН-ЗАПИСЬ
        </p>
        <h1 className="mt-2 font-editorial text-4xl font-normal text-[#141414] sm:text-5xl">
          Запись на съёмку
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#4A4A4A]">
          Чтобы выбрать дату и обсудить детали фотосессии, напишите в мой
          Telegram-бот или свяжитесь по телефону.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Telegram Bot + Phone channels */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          <div className="rounded-2xl bg-[#141414] p-6 text-white sm:p-7">
            <p className="text-xs tracking-[0.16em] text-white/65">
              ОСНОВНОЙ СПОСОБ СВЯЗИ
            </p>
            <h2 className="mt-2 font-editorial text-3xl font-normal">
              Telegram-бот
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Быстрая запись на фотосессию, выбор свободных дат и ответы на
              вопросы через официального бота.
            </p>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-3">
              <span className="text-sm font-medium tracking-wide">
                {TELEGRAM_BOT_HANDLE}
              </span>
              <button
                type="button"
                onClick={handleCopyBot}
                className="inline-flex items-center gap-1.5 text-xs text-white/80 transition-colors hover:text-white"
              >
                {copiedBot ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Скопировано</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Копировать</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[13.5px] font-medium text-[#141414] whitespace-nowrap transition-colors hover:bg-[#EAEAEA]"
            >
              <Send className="h-4 w-4" />
              <span>Открыть {TELEGRAM_BOT_HANDLE}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-7">
            <div className="flex items-center gap-2.5 text-xs font-medium tracking-[0.14em] text-[#666666]">
              <Phone className="h-4 w-4 text-[#141414]" />
              <span>ТЕЛЕФОН ДЛЯ СВЯЗИ</span>
            </div>
            <p className="mt-3 font-editorial text-2xl font-medium text-[#141414] tabular-nums">
              +7 (•••) •••-••-••
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-[#666666]">
              Номер телефона будет добавлен позже. Пока для связи и записи
              используйте Telegram-бот {TELEGRAM_BOT_HANDLE}.
            </p>
          </div>
        </div>

        {/* Quick brief builder for Telegram */}
        <div className="rounded-2xl border border-[#EAEAEA] bg-white p-6 sm:p-8 lg:col-span-7">
          <h2 className="font-editorial text-3xl font-normal text-[#141414]">
            Подготовить заявку для бота
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#555555]">
            Заполните параметры съёмки — текст заявки скопируется в буфер
            обмена, чтобы вы могли сразу отправить его в {TELEGRAM_BOT_HANDLE}.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label
                htmlFor="booking-type"
                className="block text-xs font-medium text-[#4A4A4A]"
              >
                Формат фотосессии
              </label>
              <select
                id="booking-type"
                value={shootType}
                onChange={(e) => setShootType(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
              >
                {SERVICE_CATEGORIES.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="booking-date"
                className="block text-xs font-medium text-[#4A4A4A]"
              >
                Желаемая дата или период
              </label>
              <input
                id="booking-date"
                type="text"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                placeholder="Например: ближайшие выходные, 14:00"
                className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="booking-comment"
                className="block text-xs font-medium text-[#4A4A4A]"
              >
                Идея, локация или вопросы
              </label>
              <textarea
                id="booking-comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Кратко опишите, какая съёмка вам интересна..."
                className="mt-1.5 w-full rounded-xl border border-[#DCDCDC] bg-[#FAFAFA] px-4 py-2.5 text-sm text-[#141414] focus:border-[#141414] focus:bg-white focus:outline-none"
              />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyAndOpenTelegram}
                className="inline-flex items-center gap-2 rounded-full border border-[#141414] bg-white px-5 py-2.5 text-xs font-medium text-[#141414] whitespace-nowrap transition-colors hover:bg-[#F5F5F5]"
              >
                {copiedBrief ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>Текст заявки скопирован</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Скопировать текст заявки</span>
                  </>
                )}
              </button>

              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCopyAndOpenTelegram}
                className="inline-flex items-center gap-2 rounded-full bg-[#141414] px-6 py-2.5 text-xs font-medium text-white whitespace-nowrap transition-colors hover:bg-[#2B2B2B]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Перейти в {TELEGRAM_BOT_HANDLE}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
