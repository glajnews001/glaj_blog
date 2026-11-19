import { VscDebugBreakpointData } from "react-icons/vsc";

export function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-2">
      <h2 className="flex items-center gap-2 text-[1.6rem] font-bold capitalize text-[goldenrod]">
        <VscDebugBreakpointData />
        {title}
      </h2>
      <hr className="mt-2 border-[#01017a]/40" />
    </div>
  );
}
