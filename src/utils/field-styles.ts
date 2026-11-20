export type FieldStyle = "bordered" | "soft";

/** Tailwind classes shared by text inputs, textareas and selects. */
export const fieldClasses: Record<FieldStyle, string> = {
  bordered:
    "w-full rounded-md border border-[#ced4da] bg-white px-3 py-2 text-base text-[#212529] focus:border-[#86b7fe] focus:outline-none focus:ring-4 focus:ring-[#0d6efd]/25",
  soft: "w-full border-0 bg-[#eee] px-4 py-3 text-[0.8rem] focus:outline focus:outline-1 focus:outline-navy",
};
