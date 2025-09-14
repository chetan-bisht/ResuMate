import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const gradientClass = score > 69
    ? 'from-green-100'
    : score > 49
      ? 'from-yellow-100'
      : 'from-red-100';

  // Determine icon based on score
  const iconSrc = score > 69
    ? '/icons/ats-good.svg'
    : score > 49
      ? '/icons/ats-warning.svg'
      : '/icons/ats-bad.svg';

  // Determine subtitle based on score
  const subtitle = score > 69
    ? 'Great Job!'
    : score > 49
      ? 'Good Start'
      : 'Needs Improvement';

  return (
    <div className="modern-ats-card rounded-3xl w-full p-8 animate-fade-in">
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <img src={iconSrc} alt="ATS Score Icon" className="w-16 h-16 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">ATS Score</h2>
          <p className="text-4xl font-extrabold text-indigo-600 mt-1">{score}/100</p>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-3 text-indigo-700">{subtitle}</h3>
        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              suggestion.type === "good"
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50"
                : "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200/50"
            }`}>
              <div className={`p-2 rounded-full ${
                suggestion.type === "good" ? "bg-green-100" : "bg-yellow-100"
              }`}>
                <img
                  src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                  alt={suggestion.type === "good" ? "Check" : "Warning"}
                  className="w-5 h-5"
                />
              </div>
              <p className={`text-lg leading-relaxed ${
                suggestion.type === "good" ? "text-green-800" : "text-amber-800"
              }`}>
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200/50">
        <p className="text-indigo-800 text-lg font-medium italic text-center">
          Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
        </p>
      </div>
    </div>
  )
}

export default ATS