import type { ReactNode } from "react";

type AuthCardProps = { title: string; children: ReactNode };

/** Full-screen photo background with the centred white login / register card. */
export function AuthCard({ title, children }: AuthCardProps) {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/image/newpac.jpg)" }}
    >
      <div className="grid min-h-screen place-items-center bg-[#111111c2] px-3 py-8">
        <div className="w-[380px] max-w-full rounded-t-[15px] bg-white shadow-[0_15px_20px_rgba(0,0,0,0.2)]">
          <div className="rounded-t-[12px] bg-[#111] text-center text-[35px] font-semibold leading-[100px] text-white">
            {title}
          </div>
          <div className="px-[30px] py-[25px] max-narrow:px-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
