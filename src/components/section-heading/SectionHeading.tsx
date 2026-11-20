import { VscDebugBreakpointData } from "react-icons/vsc";

type SectionHeadingProps = { title: string };

/** Gold "• Title" heading followed by a rule, used above every news block. */
export function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <>
      <h2 className="flex items-center text-[1.6rem] font-extrabold capitalize text-gold">
        <VscDebugBreakpointData aria-hidden />
        <span className="ml-1">{title}</span>
      </h2>
      <hr />
    </>
  );
}
