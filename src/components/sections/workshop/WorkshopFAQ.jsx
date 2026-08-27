import { Reveal } from "../../Reveal";
import { ChevronDown } from "lucide-react";

export default function WorkshopFAQ({ faqData }) {
  return (
    <section className="py-24 px-6 bg-white relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </Reveal>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <details className="group bg-slate-50 border border-slate-200 rounded-2xl [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between font-bold cursor-pointer list-none text-slate-800 text-lg md:text-xl p-6 transition-colors hover:text-blue-600">
                  <span className="pr-8">{faq.question}</span>
                  <span className="transition-transform duration-300 group-open:-rotate-180 flex-shrink-0 bg-white p-2 rounded-full shadow-sm">
                    <ChevronDown className="w-6 h-6 text-blue-600" />
                  </span>
                </summary>
                <div className="text-slate-600 text-lg leading-relaxed px-6 pb-6 pt-0 border-t border-slate-100 mt-2">
                  <div className="pt-4">{faq.answer}</div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
