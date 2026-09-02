import { useState, type FormEvent } from "react";
import { Logo } from "./Header";
import {
  IconArrowRight,
  IconCamera,
  IconCheck,
  IconClock,
  IconMail,
  IconPhone,
  IconPin,
  IconPlane,
} from "./icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const subscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setState("error");
      return;
    }
    setState("done");
  };

  return (
    <footer id="contacts" className="scroll-mt-20 border-t border-cream/10 bg-[#16100b] text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-18">
        {/* brand */}
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/50">
            Обжариваем спешелти-кофе с 2017 года. Работаем напрямую с фермерами
            и импортёрами, каппим каждую партию и не держим зерно дольше месяца.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: IconPlane, label: "Телеграм" },
              { icon: IconCamera, label: "Фото" },
              { icon: IconMail, label: "Почта" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#top"
                aria-label={label}
                onClick={(e) => e.preventDefault()}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-lg text-cream/70 transition-all hover:-translate-y-0.5 hover:border-caramel hover:text-caramel"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* contacts */}
        <div className="lg:col-span-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.26em] text-caramel">Контакты</h4>
          <ul className="mt-5 flex flex-col gap-4 text-sm">
            <li className="flex items-start gap-3">
              <IconPin className="mt-0.5 shrink-0 text-lg text-caramel" />
              <span className="text-cream/70">
                Москва, Лялин переулок, 5, вход 2
                <span className="block text-xs text-cream/40">м. Курская, 7 минут пешком</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <IconPhone className="mt-0.5 shrink-0 text-lg text-caramel" />
              <a href="tel:+74951203864" className="text-cream/70 transition-colors hover:text-honey">
                +7 (495) 120-38-64
              </a>
            </li>
            <li className="flex items-start gap-3">
              <IconClock className="mt-0.5 shrink-0 text-lg text-caramel" />
              <span className="text-cream/70">
                Пн–Пт 9:00–21:00
                <span className="block text-xs text-cream/40">Сб–Вс 10:00–20:00 · обжарка вт и чт</span>
              </span>
            </li>
          </ul>
        </div>

        {/* subscribe */}
        <div className="md:col-span-2 lg:col-span-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.26em] text-caramel">
            Свежие лоты — в почту
          </h4>
          <p className="mt-5 text-sm leading-relaxed text-cream/50">
            Раз в две недели пишем о новых микролотах и открытых каппингах. Без спама.
          </p>

          {state === "done" ? (
            <p className="toast-in mt-5 flex items-center gap-2.5 rounded-md border border-caramel/40 bg-caramel/10 px-4 py-3.5 text-sm font-semibold text-honey">
              <IconCheck className="text-lg" />
              Вы в списке! Первое письмо — о свежем урожае.
            </p>
          ) : (
            <form onSubmit={subscribe} className="mt-5" noValidate>
              <div className="flex items-center gap-2 border-b border-cream/25 pb-2 transition-colors focus-within:border-caramel">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="ваша@почта.ру"
                  aria-label="Электронная почта"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-cream/35"
                />
                <button
                  type="submit"
                  aria-label="Подписаться"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-caramel text-espresso transition-all hover:bg-honey active:scale-90"
                >
                  <IconArrowRight />
                </button>
              </div>
              {state === "error" && (
                <p className="mt-2 text-xs font-medium text-honey">
                  Похоже, в адресе опечатка — проверьте и попробуйте ещё раз.
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/35 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2017–2026 Обжарочная «КРАТЕР»</p>
          <p>Демо-магазин: все лоты и цены вымышлены, но любовь к кофе — настоящая</p>
        </div>
      </div>
    </footer>
  );
}
