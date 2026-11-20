import { BsFillBellFill, BsFillEnvelopeFill, BsJustify, BsPersonCircle } from "react-icons/bs";

type AdminHeaderProps = { userName: string; onMenu: () => void };

export function AdminHeader({ userName, onMenu }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-[60px] shrink-0 items-center justify-between bg-white px-4 shadow-[0_6px_7px_-3px_rgba(0,0,0,0.35)] tablet:px-[30px]">
      <button type="button" onClick={onMenu} aria-label="Open menu" className="text-xl min-[993px]:invisible">
        <BsJustify />
      </button>
      <div className="flex items-center gap-2.5 text-xl">
        <BsFillBellFill aria-hidden />
        <BsFillEnvelopeFill aria-hidden />
        <BsPersonCircle aria-hidden />
        <span className="hidden max-w-[10rem] truncate text-sm tablet:inline">{userName}</span>
      </div>
    </header>
  );
}
