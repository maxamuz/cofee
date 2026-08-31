import { IconBasket, IconCheck } from "./icons";

interface Props {
  msg: string;
  onOpenCart: () => void;
}

export default function Toast({ msg, onOpenCart }: Props) {
  return (
    <div className="toast-in fixed bottom-5 left-4 right-4 z-[70] sm:left-auto sm:right-6 sm:w-auto">
      <div className="flex items-center gap-3.5 rounded-lg border border-caramel/40 bg-espresso px-4 py-3.5 text-cream shadow-2xl shadow-espresso/60">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-caramel text-lg text-espresso">
          <IconCheck />
        </span>
        <p className="text-sm font-medium leading-snug">{msg}</p>
        <button
          onClick={onOpenCart}
          className="ml-1 flex shrink-0 items-center gap-1.5 rounded-full border border-cream/20 px-3.5 py-2 text-xs font-bold text-honey transition-all hover:border-caramel hover:bg-caramel hover:text-espresso active:scale-95"
        >
          <IconBasket className="text-sm" />
          В корзину
        </button>
      </div>
    </div>
  );
}
