import React from 'react'

interface SummaryProps {
  feedback: Feedback;
}

import ScoreGauge from './ScoreGauge';

const Summary: React.FC<SummaryProps> = ({ feedback }) => {
  const score = feedback.overallScore || 0;
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-emerald-400 to-green-500';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return '/icons/check.svg';
    if (score >= 60) return '/icons/warning.svg';
    return '/icons/cross.svg';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent!';
    if (score >= 60) return 'Good Job!';
    return 'Needs Work';
  };

  return (
    <div className="relative modern-summary-card w-full p-8 animate-fade-in overflow-hidden group">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-rose-200/20 rounded-full blur-lg group-hover:scale-125 transition-transform duration-500"></div>

      {/* Header with icon */}
      <div className="text-center mb-6 relative z-10">
        <div className="inline-flex items-center gap-3 mb-3">
          <div className={`p-3 rounded-full bg-gradient-to-r ${getScoreColor(score)} shadow-lg`}>
            <img src={getScoreIcon(score)} alt="score" className="w-6 h-6 filter brightness-0 invert" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
            Overall Performance
          </h2>
        </div>
        <p className="text-gray-600 text-lg font-medium">{getScoreText(score)}</p>
      </div>

      {/* Score Gauge */}
      <div className="flex flex-col items-center mb-6 relative z-10">
        <ScoreGauge score={score} />
      </div>

      {/* Score breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 relative z-10">
        <div className="text-center p-4 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-xl border border-indigo-100/50 backdrop-blur-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-2xl font-bold text-indigo-600">{feedback.ATS?.score || 0}</div>
          <div className="text-sm text-gray-600 font-medium">ATS Score</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-xl border border-purple-100/50 backdrop-blur-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-2xl font-bold text-purple-600">{feedback.toneAndStyle?.score || 0}</div>
          <div className="text-sm text-gray-600 font-medium">Tone & Style</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-pink-50/80 to-rose-50/80 rounded-xl border border-pink-100/50 backdrop-blur-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-2xl font-bold text-pink-600">{feedback.content?.score || 0}</div>
          <div className="text-sm text-gray-600 font-medium">Content</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 rounded-xl border border-emerald-100/50 backdrop-blur-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-2xl font-bold text-emerald-600">{feedback.structure?.score || 0}</div>
          <div className="text-sm text-gray-600 font-medium">Structure</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-cyan-50/80 to-blue-50/80 rounded-xl border border-cyan-100/50 backdrop-blur-sm hover:shadow-md transition-shadow duration-300">
          <div className="text-2xl font-bold text-cyan-600">{feedback.skills?.score || 0}</div>
          <div className="text-sm text-gray-600 font-medium">Skills</div>
        </div>
        {/* Empty div for centering the last item in odd grid */}
        <div className="hidden md:block"></div>
      </div>

      {/* Resume Analysis Section */}
      <div className="mt-8 relative z-10">
        <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-gray-800 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
          Resume Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Content */}
          <div className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 rounded-xl border border-indigo-100/50 backdrop-blur-sm p-4 hover:shadow-md transition-shadow duration-300">
            <h4 className="text-lg font-semibold text-indigo-700 mb-3">Content</h4>
            <div className="space-y-2">
              {feedback.content?.tips?.slice(0, 2).map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`p-1 rounded-full flex-shrink-0 ${tip.type === "good" ? "bg-green-100" : "bg-yellow-100"}`}>
                    <img
                      src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                      alt="tip"
                      className="w-3 h-3"
                    />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/80 rounded-xl border border-purple-100/50 backdrop-blur-sm p-4 hover:shadow-md transition-shadow duration-300">
            <h4 className="text-lg font-semibold text-purple-700 mb-3">Skills</h4>
            <div className="space-y-2">
              {feedback.skills?.tips?.slice(0, 2).map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`p-1 rounded-full flex-shrink-0 ${tip.type === "good" ? "bg-green-100" : "bg-yellow-100"}`}>
                    <img
                      src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                      alt="tip"
                      className="w-3 h-3"
                    />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tone & Style */}
          <div className="bg-gradient-to-br from-pink-50/80 to-rose-50/80 rounded-xl border border-pink-100/50 backdrop-blur-sm p-4 hover:shadow-md transition-shadow duration-300">
            <h4 className="text-lg font-semibold text-pink-700 mb-3">Tone & Style</h4>
            <div className="space-y-2">
              {feedback.toneAndStyle?.tips?.slice(0, 2).map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`p-1 rounded-full flex-shrink-0 ${tip.type === "good" ? "bg-green-100" : "bg-yellow-100"}`}>
                    <img
                      src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                      alt="tip"
                      className="w-3 h-3"
                    />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Structure */}
          <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/80 rounded-xl border border-emerald-100/50 backdrop-blur-sm p-4 hover:shadow-md transition-shadow duration-300">
            <h4 className="text-lg font-semibold text-emerald-700 mb-3">Structure</h4>
            <div className="space-y-2">
              {feedback.structure?.tips?.slice(0, 2).map((tip, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className={`p-1 rounded-full flex-shrink-0 ${tip.type === "good" ? "bg-green-100" : "bg-yellow-100"}`}>
                    <img
                      src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                      alt="tip"
                      className="w-3 h-3"
                    />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance indicator */}
      <div className="text-center relative z-10 mt-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/50 shadow-sm">
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getScoreColor(score)} animate-pulse`}></div>
          <span className="text-sm font-semibold text-gray-700">
            {score >= 80 ? 'Ready for Success' : score >= 60 ? 'Getting There' : 'Room for Improvement'}
          </span>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-indigo-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
    </div>
  )
}

export default Summary
