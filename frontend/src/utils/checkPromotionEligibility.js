export const checkPromotionEligibility = (row) => {
  const tenure = row.tenure || 0;       
  const score = row.score || 0;         
  const targetLevel = row.proposedLevel; 

  let requiredTenure = 0;
  let requiredScore = 0;

  
  switch (targetLevel) {
    case 'Fresher':
      requiredTenure = 0;
      requiredScore = 3;
      break;
    case 'Junior':
      requiredTenure = 1;
      requiredScore = 3.5;
      break;
    case 'Middle':
      requiredTenure = 3;
      requiredScore = 4;
      break;
    case 'Senior':
      requiredTenure = 5;
      requiredScore = 4.5;
      break;
    case 'Lead':
      requiredTenure = 7;
      requiredScore = 4.5;
      break;
    case 'Principal':
      requiredTenure = 10;
      requiredScore = 5;
      break;
    default:
      requiredTenure = 2;
      requiredScore = 4;
  }

  const isTenureValid = tenure >= requiredTenure;
  const isScoreValid = score >= requiredScore;
  const isPassed = isTenureValid && isScoreValid;

  return {
    isPassed,
    requiredTenure,
    requiredScore,
    tenure,
    score,
    message: isPassed 
      ? `Đạt tiêu chuẩn thăng cấp lên ${targetLevel}!` 
      : `Chưa đạt (Yêu cầu: ≥ ${requiredTenure} năm, ≥ ${requiredScore} ⭐)`
  };
};