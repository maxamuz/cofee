import { IconBasket } from "./icons";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex items-center gap-3" aria-label="КРАТЕР — на главную">
      <svg
        viewBox="0 0 40 40"
        className={`shrink-0 text-caramel transition-transform duration-500 group-hover:rotate-[18deg] ${compact ? "h-8 w-8" : "h-10 w-10"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="20" cy="20" r="18.5" opacity="0.5" />
        <path d="M8 27 17 14l4 5 4-6 7 14H8Z" fill="rgba(201,141,79,0.22)" />
        <path d="M20.5 11c0-2.2 2.6-2.2 2.6-4.4" stroke="#e5b273" />
      </svg>
      <span className="leading-none">
        <span className="font-display text-xl tracking-[0.16em] text-cream">КРАТЕР</span>
        <span className="mt-1 block text-[10px] font-medium uppercase tracking-[0.34em] text-cream/50">
          обжарка кофе
        </span>
      </span>
    </a>
  );
}

interface HeaderProps {
  count: number;
  onOpenCart: () => void;
}

export default function Header({ count, onOpenCart }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-espresso/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-medium text-cream/70 lg:flex">
          <a href="#catalog" className="transition-colors hover:text-honey">
            Каталог
          </a>
          <a href="#roast" className="transition-colors hover:text-honey">
            Обжарка
          </a>
          <a href="#contacts" className="transition-colors hover:text-honey">
            Контакты
          </a>
        </nav>

        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2.5 rounded-full border border-cream/15 bg-roast px-4 py-2.5 text-sm font-semibold text-cream transition-all hover:border-caramel hover:bg-caramel hover:text-espresso active:scale-95 sm:px-5"
          aria-label="Открыть корзину"
        >
          <IconBasket className="text-lg" />
          <span className="hidden sm:inline">Корзина</span>
          {count > 0 && (
            <span
              key={count}
              className="badge-pop absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-caramel px-1.5 text-xs font-bold text-espresso"
            >
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
