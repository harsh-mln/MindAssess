const generateReport = (responses) => {
  let anxietyScore = 0;
  let depressionScore = 0;

  // Tally scores based on category embedded in question context
  responses.forEach(r => {
    if (r.category === 'GAD-7 (Anxiety)') anxietyScore += r.scoreValue;
    if (r.category === 'PHQ-9 (Depression)') depressionScore += r.scoreValue;
  });

  const totalScore = anxietyScore + depressionScore;

  // Clinical Maximums
  const MAX_PHQ9 = 27;
  const MAX_GAD7 = 21;

  // Standard PHQ-9 Thresholds
  const determinePHQ9Level = (score) => {
    if (score <= 4) return 'Minimal';
    if (score <= 9) return 'Mild';
    if (score <= 14) return 'Moderate';
    if (score <= 19) return 'Moderately Severe';
    return 'Severe';
  };

  // Standard GAD-7 Thresholds
  const determineGAD7Level = (score) => {
    if (score <= 4) return 'Minimal';
    if (score <= 9) return 'Mild';
    if (score <= 14) return 'Moderate';
    return 'Severe';
  };

  const anxietyLevel = determineGAD7Level(anxietyScore);
  const depressionLevel = determinePHQ9Level(depressionScore);

  let summaryText = `Based on your responses to the clinical PHQ-9 and GAD-7 assessments, your profile indicates `;
  
  if (totalScore < 10) {
    summaryText += `a stable mental health presentation with minimal active symptomatology.`;
  } else if (totalScore < 20) {
    summaryText += `mild to moderate mental health stressors that warrant behavioral observation.`;
  } else {
    summaryText += `a significant psychological burden that highly suggests seeking professional consultation.`;
  }

  const generatedReport = {
    overview: summaryText,
    breakdown: {
      "GAD-7 (Anxiety)": {
        score: anxietyScore,
        maxScore: MAX_GAD7,
        level: anxietyLevel,
        insight: getInsight('Anxiety', anxietyLevel)
      },
      "PHQ-9 (Depression)": {
        score: depressionScore,
        maxScore: MAX_PHQ9,
        level: depressionLevel,
        insight: getInsight('Depression', depressionLevel)
      }
    },
    totalScore
  };

  return generatedReport;
};

const getInsight = (category, level) => {
  const insights = {
    Anxiety: {
      Minimal: "Your anxiety markers are remarkably low. Continue implementing your current coping mechanisms.",
      Mild: "You're exhibiting slight signs of psychological friction. Consider brief mindfulness exercises.",
      Moderate: "Your responses denote a sustained state of hyper-arousal. Pattern disruption techniques are recommended.",
      Severe: "Critical levels of anxiety reported. This level of nervous system activation requires clinical attention."
    },
    Depression: {
      Minimal: "No significant depressive markers isolated. Affect appears regulated.",
      Mild: "Transient low mood detected. Monitor sleep architecture and social engagement.",
      Moderate: "Pronounced anhedonia and low energy indicated. Therapeutic intervention could be highly beneficial.",
      "Moderately Severe": "Your depressive score suggests major impacts on daily function. Consult a mental health provider.",
      Severe: "Severe depressive symptomatology evident. Immediate clinical evaluation is strongly advised."
    }
  };
  return insights[category][level] || "";
};

module.exports = { generateReport };
