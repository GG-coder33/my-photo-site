import { useState } from 'react';
import { Check, Copy, ExternalLink, MessageCircle, Send } from 'lucide-react';
import {
  PERSONAL_TELEGRAM_HANDLE,
  PERSONAL_TELEGRAM_URL,
  SERVICE_CATEGORIES,
  TELEGRAM_BOT_HANDLE,
  TELEGRAM_BOT_URL,
} from '../data/studioData';
import { formatBookingBrief } from '../utils/studioLogic';

export function BookingView() {
  const [copiedBot, setCopiedBot] = useState(false);
  const [copiedPersonal, setCopiedPersonal] = useState(false);
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

  const handleCopyPersonal = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_TELEGRAM_HANDLE);
      setCopiedPersonal(true);
      setTimeout(() => setCopiedPersonal(false), 2000);
    } catch {
      // Fallback ignored in restricted frames
    }
  };

  const handleCopyAndOpenTelegram = async () => {
    const brief = formatBookingBrief({
      shootType,
      preferredDate,
      comment,
    });

    try {
      await navigator.clipboard.writeText(brief);
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      // Clipboard optional
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-12 sm:px-8 sm:py-16">
      <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-10">
        <p className="text-xs font-medium tracking-[0.2em] text-[#9D8EFF] uppercase">
          Онлайн-запись
        </p>
        <h1 className="mt-2 font-editorial text-4xl font-medium tracking-tight text-[#ffe0e0] sm:text-5xl">
          Запись на съёмку
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-gray-400">
          Чтобы выбрать дату и обсудить детали фотосессии, напишите в
          Telegram-бот {TELEGRAM_BOT_HANDLE} или мне напрямую в Telegram{' '}
          {PERSONAL_TELEGRAM_HANDLE}.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <div className="rounded-3xl bg-[#9D8EFF] p-7 text-black shadow-[0_20px_50px_rgba(157,142,255,0.2)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/70">
              Основной способ связи
            </p>
            <h2 className="mt-2 font-editorial text-2xl font-medium tracking-tight text-black sm:text-3xl">
              Telegram-бот
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-black/80">
              Быстрая запись на фотосессию, выбор свободных дат и ответы на
              вопросы через официального бота.
            </p>

            <div className="mt-5 flex items-center justify-between rounded-2xl border border-black/15 bg-black/10 px-4 py-3">
              <span className="text-sm font-semibold text-black">
                {TELEGRAM_BOT_HANDLE}
              </span>
              <button
                type="button"
                onClick={handleCopyBot}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-black/80 transition-opacity hover:text-black"
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
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-semibold text-white whitespace-nowrap transition-transform hover:scale-[1.02]"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Открыть {TELEGRAM_BOT_HANDLE}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#111111] p-7 sm:p-8">
            <div className="flex items-center gap-2.5 text-xs font-medium text-white/60">
              <MessageCircle className="h-4 w-4 text-[#9D8EFF]" />
              <span>Личный Telegram</span>
            </div>
            <p className="mt-3 font-editorial text-2xl font-medium text-white">
              {PERSONAL_TELEGRAM_HANDLE}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-400">
              Напишите мне напрямую в Telegram, если хотите лично обсудить идею,
              локацию или коммерческий проект.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <a
                href={PERSONAL_TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-all hover:scale-[1.03] hover:bg-[#9D8EFF]"
              >
                <span>Написать {PERSONAL_TELEGRAM_HANDLE}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyPersonal}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 transition-colors hover:border-[#9D8EFF]/60 hover:text-white"
              >
                {copiedPersonal ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#9D8EFF]" />
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
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111111] p-7 sm:p-8 lg:col-span-7">
          <h2 className="font-editorial text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Подготовить заявку для Telegram
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Заполните параметры съёмки — текст заявки скопируется в буфер
            обмена, чтобы вы могли сразу отправить его в {TELEGRAM_BOT_HANDLE}{' '}
            или {PERSONAL_TELEGRAM_HANDLE}.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <label
                htmlFor="booking-type"
                className="block text-xs font-medium text-white/70"
              >
                Формат фотосессии
              </label>
              <select
                id="booking-type"
                value={shootType}
                onChange={(e) => setShootType(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white focus:border-[#9D8EFF] focus:outline-none"
              >
                {SERVICE_CATEGORIES.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.segment} · {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="booking-date"
                className="block text-xs font-medium text-white/70"
              >
                Желаемая дата или период
              </label>
              <input
                id="booking-date"
                type="text"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                placeholder="Например: ближайшие выходные, 14:00"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#9D8EFF] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="booking-comment"
                className="block text-xs font-medium text-white/70"
              >
                Идея, локация или вопросы
              </label>
              <textarea
                id="booking-comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Кратко опишите, какая съёмка вам интересна..."
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-[#050505] px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#9D8EFF] focus:outline-none"
              />
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleCopyAndOpenTelegram}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-white whitespace-nowrap transition-colors hover:border-[#9D8EFF]/60 hover:bg-white/10"
              >
                {copiedBrief ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#9D8EFF]" />
                    <span>Текст скопирован</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Скопировать заявку</span>
                  </>
                )}
              </button>

              <a
                href={TELEGRAM_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCopyAndOpenTelegram}
                className="inline-flex items-center gap-2 rounded-full bg-[#9D8EFF] px-6 py-2.5 text-xs font-semibold text-black whitespace-nowrap transition-transform hover:scale-[1.03]"
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
