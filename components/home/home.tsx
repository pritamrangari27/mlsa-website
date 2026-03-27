import { AccordionText } from "@/components/CrazyComponents/tsx/AccordinText";

export default function AccordionTextPage() {
  return (
    <div className="bg-[#0a0f1e] min-h-screen px-12 py-10">
      <AccordionText />
      <div className="mt-5 ml-20 flex flex-col gap-4">
        <h1 className="text-white text-4xl font-bold tracking-widest">
          MICROSOFT LEARN STUDENT AMBASSADORS
        </h1>
        <h4 className="text-gray-200 text-4xl">
          Student driven community - AISSMS IOIT
        </h4>
        <button className="text-gray-400 text-lg text-left">
          More than a chapter - where every mind pens the next big page
        </button>
      </div>
    </div>
  );
}