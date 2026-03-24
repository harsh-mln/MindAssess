export const generateReport = (responses) => {
  const scores = {
    "Anxiety Markers": 0,
    "Depression Markers": 0,
    "Focus & ADHD": 0,
    "Trauma & Stress": 0,
    "Impact & Function": 0
  };
  let runtimeGlobalTotal = 0;
  console.log(`--- Report Generation Start: Processing ${responses.length} responses ---`);

  // Tally scores based on category
  responses.forEach((r, index) => {
    const scoreVal = Number(r.scoreValue) || 0;
    runtimeGlobalTotal += scoreVal;
    
    console.log(`[Response ${index + 1}] Category: "${r.category}", Score: ${scoreVal}`);

    const rawCategory = (r.category || "").trim();
    const cleanCategory = rawCategory.toLowerCase();
    
    // Find matching key in our scores object (case-insensitive)
    const matchKey = Object.keys(scores).find(key => 
      key.toLowerCase() === cleanCategory
    );

    if (matchKey) {
      scores[matchKey] += scoreVal;
    } 
    // Legacy mapping support
    else if (cleanCategory.includes('anxiety')) {
      scores["Anxiety Markers"] += scoreVal;
    } 
    else if (cleanCategory.includes('depression')) {
      scores["Depression Markers"] += scoreVal;
    }
    // General fallback
    else {
      scores["Impact & Function"] += scoreVal;
    }
  });

  const totalScore = runtimeGlobalTotal;
  console.log('Final Categorized Scores:', scores);
  console.log('Final Calculated Global Total:', totalScore);

  // Maximum score per category (3 questions * 2)
  const MAX_CAT = 6;
  const MIN_CAT = -6;

  const determineLevel = (score) => {
    if (score <= -2) return 'Stable';
    if (score <= 2) return 'Mildly Stressed';
    if (score <= 4) return 'Moderate Burden';
    return 'High Burden';
  };

  let summaryText = `Following your comprehensive multi-disorder screen, your results indicate `;
  
  if (totalScore <= 0) {
    summaryText += `a highly resilient psychological state with minimal active clinical indicators. Continue your current self-care practices.`;
  } else if (totalScore <= 10) {
    summaryText += `mild psychological friction across some areas. These are common during stress but worth monitoring for patterns.`;
  } else if (totalScore <= 20) {
    summaryText += `a moderate level of psychological burden. We recommend scheduling a consultation with a mental health professional for a deeper evaluation.`;
  } else {
    summaryText += `a significant level of clinical burden. Your markers for distress are high, and we strongly advise immediate clinical support.`;
  }

  const breakdown = {};
  Object.keys(scores).forEach(cat => {
    const level = determineLevel(scores[cat]);
    breakdown[cat] = {
      score: scores[cat],
      maxScore: MAX_CAT,
      level: level,
      insight: getInsight(cat, level)
    };
  });

  return {
    overview: summaryText,
    breakdown,
    totalScore
  };
};

const getInsight = (category, level) => {
  const insights = {
    "Anxiety Markers": {
      Stable: "Your nervous system markers are well-regulated. Anxiety is currently within normal clinical limits.",
      "Mildly Stressed": "Minor physiological hyper-arousal detected. Short breathing exercises may help during peaks.",
      "Moderate Burden": "Predictable patterns of worry are impacting your daily state. Awareness techniques are recommended.",
      "High Burden": "Significant markers for GAD or Panic detected. Professional intervention is suggested to manage symptoms."
    },
    "Depression Markers": {
      Stable: "No significant depressive affect detected. Emotional regulation appears strong.",
      "Mildly Stressed": "Slight indicators of low mood or energy. Monitor sleep and social engagement closely.",
      "Moderate Burden": "Markers suggest persistent anhedonia or low affect. A behavioral activation plan could be beneficial.",
      "High Burden": "Strong indicators of clinical depression. This warrants immediate consultation with a professional."
    },
    "Focus & ADHD": {
      Stable: "Executive functioning and focus appear to be within stable ranges for your context.",
      "Mildly Stressed": "Occasional distractibility detected, possibly stress-related. Try mono-tasking strategies.",
      "Moderate Burden": "Noticeable disruption in concentration and task completion. Consider an ADHD-focused evaluation.",
      "High Burden": "Severe executive dysfunction markers. Clinical support for ADHD or concentration is highly recommended."
    },
    "Trauma & Stress": {
      Stable: "No signs of acute traumatic stress or intrusive memory patterns in your current state.",
      "Mildly Stressed": "Slight sensitivity to past stressors detected. Focus on present-moment grounding.",
      "Moderate Burden": "Intrusive thoughts or detachment markers are evident. Specialized stress-trauma support is advised.",
      "High Burden": "Significant indicators of PTSD or severe traumatic stress. Trauma-informed clinical care is priority."
    },
    "Impact & Function": {
      Stable: "Your mental state is currently allowing for effective social and occupational functioning.",
      "Mildly Stressed": "Functional impact is minimal but noticeable in certain high-stress social environments.",
      "Moderate Burden": "Clear signs that your mental health is creating friction in your social life and work productivity.",
      "High Burden": "Critical impact on functional health. Professional support is necessary to restore daily operations."
    }
  };
  return insights[category] ? (insights[category][level] || "") : "";
};
