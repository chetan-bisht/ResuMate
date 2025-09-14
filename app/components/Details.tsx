import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "../components/Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
      <div
          className={cn(
              "flex flex-row gap-2 items-center px-3 py-1.5 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300",
              score > 69
                  ? "modern-score-badge"
                  : score > 39
                      ? "modern-score-badge-good"
                      : "modern-score-badge-bad"
          )}
      >
        <img
            src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
            alt="score"
            className="size-4"
        />
        <p className="text-base font-bold">
          {score}/100
        </p>
      </div>
  );
};

const CategoryHeader = ({
                            title,
                            categoryScore,
                          }: {
    title: string;
    categoryScore: number;
  }) => {
    return (
        <div className="modern-category-header">
          <p className="text-2xl font-bold text-gray-800">{title}</p>
          <ScoreBadge score={categoryScore} />
        </div>
    );
  };

const CategoryContent = ({
                             tips,
                           }: {
    tips: { type: "good" | "improve"; tip: string; explanation: string }[];
  }) => {
    // Limit tips to maximum 4 for consistent sizing
    const limitedTips = tips.slice(0, 4);

    return (
        <div className="flex flex-col gap-6 items-center w-full min-h-[400px]">
          <div className="modern-tip-grid w-full px-6 py-5 grid grid-cols-2 gap-4">
            {limitedTips.map((tip, index) => (
                <div className="flex flex-row gap-3 items-center p-3 rounded-lg bg-white/60 backdrop-blur-sm shadow-sm" key={index}>
                  <div className={`p-2 rounded-full ${tip.type === "good" ? "bg-green-100" : "bg-yellow-100"}`}>
                    <img
                        src={
                          tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                        }
                        alt="score"
                        className="size-4"
                    />
                  </div>
                  <p className="text-base font-medium text-gray-700">{tip.tip}</p>
                </div>
            ))}
          </div>
         <div className="flex flex-col gap-4 w-full">
           {limitedTips.map((tip, index) => (
               <div
                   key={index + tip.tip}
                   className={cn(
                       "flex flex-col gap-3 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]",
                       tip.type === "good"
                           ? "modern-details-tip"
                           : "modern-details-tip-improve"
                   )}
               >
                 <div className="flex flex-row gap-3 items-center">
                   <div className={`p-2 rounded-full ${tip.type === "good" ? "bg-green-100" : "bg-yellow-100"}`}>
                     <img
                         src={
                           tip.type === "good"
                               ? "/icons/check.svg"
                               : "/icons/warning.svg"
                         }
                         alt="score"
                         className="size-5"
                     />
                   </div>
                   <p className="text-xl font-bold">{tip.tip}</p>
                 </div>
                 <p className="text-base leading-relaxed">{tip.explanation}</p>
               </div>
           ))}
         </div>
      </div>
   );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
      <div className="flex flex-col gap-4 w-full">
        <Accordion>
          <AccordionItem id="tone-style">
            <AccordionHeader itemId="tone-style">
              <CategoryHeader
                  title="Tone & Style"
                  categoryScore={feedback.toneAndStyle?.score || 0}
              />
            </AccordionHeader>
            <AccordionContent itemId="tone-style">
              <CategoryContent tips={feedback.toneAndStyle?.tips || []} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="content">
            <AccordionHeader itemId="content">
              <CategoryHeader
                  title="Content"
                  categoryScore={feedback.content?.score || 0}
              />
            </AccordionHeader>
            <AccordionContent itemId="content">
              <CategoryContent tips={feedback.content?.tips || []} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="structure">
            <AccordionHeader itemId="structure">
              <CategoryHeader
                  title="Structure"
                  categoryScore={feedback.structure?.score || 0}
              />
            </AccordionHeader>
            <AccordionContent itemId="structure">
              <CategoryContent tips={feedback.structure?.tips || []} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem id="skills">
            <AccordionHeader itemId="skills">
              <CategoryHeader
                  title="Skills"
                  categoryScore={feedback.skills?.score || 0}
              />
            </AccordionHeader>
            <AccordionContent itemId="skills">
              <CategoryContent tips={feedback.skills?.tips || []} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
  );
};

export default Details;