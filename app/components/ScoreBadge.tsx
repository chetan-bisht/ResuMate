interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeClass = '';
  let badgeText = '';
  let iconSrc = '';

  if (score > 70) {
    badgeClass = 'modern-score-badge';
    badgeText = 'Excellent';
    iconSrc = '/icons/check.svg';
  } else if (score > 49) {
    badgeClass = 'modern-score-badge-good';
    badgeText = 'Good Progress';
    iconSrc = '/icons/warning.svg';
  } else {
    badgeClass = 'modern-score-badge-bad';
    badgeText = 'Needs Attention';
    iconSrc = '/icons/cross.svg';
  }

  return (
    <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${badgeClass}`}>
      <img src={iconSrc} alt="status" className="w-4 h-4" />
      <p className="text-sm font-bold">{badgeText}</p>
    </div>
  );
};

export default ScoreBadge;