import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const supplementsData = [
  { 
    name: 'Acidophilus', 
    content: 'Acidophilus, also called Lactobacillus acidophilus, is a bacterium found in the mouth, intestine and vagina. It is used as a probiotic. Probiotics are live microorganisms meant to keep or improve the good bacteria in the body. Each type of probiotic supplement, and each strain of each type, works in different ways. As a supplement, acidophilus is sold as capsules, tablets, wafers, powders and a vaginal suppository. Besides its use as a supplement, acidophilus also is found in some dairy products, such as yogurt. It is commercially added to many foods too. People often take acidophilus to treat a type of vaginal inflammation, called bacterial vaginosis, and digestive disorders. They also may take it to boost the growth of good bacteria.' 
  },
  { 
    name: 'Aloe', 
    content: 'Melatonin is a hormone in your body that plays a role in sleep. The production and release of melatonin in the brain is connected to time of day, increasing when it\'s dark and decreasing when it\'s light. Melatonin production declines with age. Melatonin is also available as a supplement, typically as an oral tablet or capsule. Most melatonin supplements are made in a lab. People commonly use melatonin for sleep disorders, such as insomnia and jet lag.' 
  },
  { 
    name: 'Coenzyme Q10', 
    content: 'Coenzyme Q10 is an antioxidant the body naturally makes. Coenzyme Q10 also is called CoQ10. Antioxidants can help protect the body from cell damage. Cells use CoQ10 for growth and to make energy. Levels of CoQ10 in your body lower as you get older. People with certain conditions such as heart disease or those who take medicines to lower cholesterol, called statins, may have lower CoQ10 levels. Meat, fish and nuts have CoQ10. The amount of CoQ10 found in these foods isn\'t usually enough to raise CoQ10 levels by much. CoQ10 dietary supplements come as capsules, chewable tablets and liquid syrups. COQ10 also can be given by a tube inserted in a vein, called intravenous. IV is short for intravenous. CoQ10 might help prevent or treat certain heart conditions, as well as migraine headaches.' 
  },
  { 
    name: 'Creatine', 
    content: 'Creatine is a compound that comes from three amino acids. Creatine is found mostly in your body\'s muscles as well as in the brain. Most people get creatine through seafood and red meat — though at levels far below those found in synthetically made creatine supplements. The body\'s liver, pancreas and kidneys also can make about 1 gram of creatine per day. Your body stores creatine as phosphocreatine primarily in your muscles, where it\'s used for energy. As a result, people take creatine orally to improve athletic performance and increase muscle mass. People also use oral creatine to treat certain brain disorders, neuromuscular conditions, congestive heart failure and other conditions. Topical creatine might be used to treat aging skin.' 
  },
  { 
    name: 'DHEA', 
    content: 'Dehydroepiandrosterone (DHEA) is a hormone that your body naturally produces in the adrenal gland. DHEA helps produce other hormones, including testosterone and estrogen. Natural DHEA levels peak in early adulthood and then slowly fall as you age. A synthetic version of DHEA is available as a tablet, capsule, powder, topical cream and gel. People use DHEA as an anti-aging therapy and to improve physical performance. DHEA is also used to treat depression and symptoms of menopause.' 
  },
  { 
    name: 'Evening primrose', 
    content: 'Evening primrose oil is extracted from the seeds of the evening primrose plant. It is often used for skin conditions and hormonal balance.' 
  },
  { 
    name: 'Fish oil', 
    content: 'Fish oil is a rich source of omega-3 fatty acids. It is widely taken for heart health, reducing inflammation, and supporting brain function.' 
  },
  { 
    name: 'Flaxseed and flaxseed oil', 
    content: 'Flaxseed is high in fiber and omega-3 fatty acids. It may help improve digestive health and may lower cholesterol levels.' 
  },
  { 
    name: 'Folate (folic acid)', 
    content: 'Folate is a B-vitamin that is naturally present in many foods. It is essential for DNA synthesis and cell division, particularly during pregnancy.' 
  },
  { 
    name: 'Ginkgo', 
    content: 'Ginkgo biloba is one of the oldest living tree species. It is often used to support memory and cognitive function through improved blood circulation.' 
  },
  { 
    name: 'Glucosamine', 
    content: 'Glucosamine is a natural compound found in cartilage. It is commonly used as a supplement to help manage joint pain and support joint health.' 
  },
  { 
    name: 'Honey', 
    content: 'Honey has been used as a natural remedy for centuries. It has antioxidant and antibacterial properties and is often used to soothe sore throats.' 
  },
  { 
    name: 'L-arginine', 
    content: 'L-arginine is an amino acid that helps the body build protein. It also changes into nitric oxide, which helps blood vessels relax and improve circulation.' 
  },
  { 
    name: 'Marijuana', 
    content: 'Cannabis contains compounds like CBD and THC. In medical contexts, it may be used for pain relief, nausea management, and certain neurological conditions.' 
  },
  { 
    name: 'Melatonin', 
    content: 'Melatonin is a hormone that your brain produces in response to darkness. It helps with the timing of your circadian rhythms and sleep.' 
  },
  { 
    name: 'Milk thistle', 
    content: 'Milk thistle is an herbal remedy derived from the milk thistle plant. It is primarily used to support liver health and detoxification.' 
  },
  { 
    name: 'Niacin', 
    content: 'Niacin (Vitamin B3) is essential for converting food into energy. It may help manage cholesterol levels and supports skin and nervous system health.' 
  },
  { 
    name: 'Red yeast rice', 
    content: 'Red yeast rice contains compounds that may help lower cholesterol. It is a traditional Chinese culinary and medicinal product.' 
  },
  { 
    name: 'SAMe', 
    content: 'S-Adenosyl-L-methionine (SAMe) is a compound found naturally in the body. It may help with depression, osteoarthritis, and liver conditions.' 
  },
  { 
    name: 'St. John\'s wort', 
    content: 'St. John\'s wort is a plant with yellow flowers used in traditional medicine. It is primarily used for mild-to-moderate depression.' 
  },
  { 
    name: 'Tea tree oil', 
    content: 'Tea tree oil comes from the leaves of Melaleuca alternifolia. It has antiseptic properties and is used topically for skin conditions.' 
  },
  { 
    name: 'Vitamin A', 
    content: 'Vitamin A is essential for vision, immune function, and skin health. It is found in many foods like carrots, spinach, and liver.' 
  },
  { 
    name: 'Vitamin B-6', 
    content: 'Vitamin B-6 is important for normal brain development and for keeping the nervous system and immune system healthy.' 
  },
  { 
    name: 'Vitamin B-12', 
    content: 'Vitamin B-12 is crucial for nerve tissue health, brain function, and the production of red blood cells.' 
  },
  { 
    name: 'Vitamin C', 
    content: 'Vitamin C is an antioxidant that helps protect cells and is necessary for the growth, development and repair of all body tissues.' 
  },
  { 
    name: 'Vitamin D', 
    content: 'Vitamin D helps regulate the amount of calcium and phosphate in the body. It is essential for bone, teeth and muscle health.' 
  },
  { 
    name: 'Vitamin E', 
    content: 'Vitamin E is a potent antioxidant that supports the immune system and helps cells regenerate. It is also good for skin and eye health.' 
  },
  { 
    name: 'Zinc', 
    content: 'Zinc is a nutrient that people need to stay healthy. It is found in cells throughout the body and helps the immune system fight off invading bacteria and viruses.' 
  }
];

const SupplementItem = ({ supplement }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left group hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors px-2 rounded-t-lg"
      >
        <span className={`text-[17px] font-bold transition-colors ${isOpen ? 'text-brand-primary' : 'text-slate-700 dark:text-slate-300 group-hover:text-brand-primary'}`}>
          {supplement.name}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 90 : 0 }}
          className={`w-5 h-5 transition-colors ${isOpen ? 'text-brand-primary' : 'text-slate-400 group-hover:text-brand-primary'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 pt-2 px-2 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400 font-medium whitespace-pre-line">
              {supplement.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SupplementsPage = () => {
  // Split data into two columns for desktop
  const midpoint = Math.ceil(supplementsData.length / 2);
  const leftColumn = supplementsData.slice(0, midpoint);
  const rightColumn = supplementsData.slice(midpoint);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0C10] pb-24">
      {/* Header Section */}
      <div className="bg-slate-50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 py-12 mb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="flex gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary mb-6">
            <span>Health Library</span>
            <span className="text-slate-300 dark:text-slate-700">/</span>
            <span className="text-slate-400 dark:text-slate-500">Drugs & Supplements</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
            Herbs, supplements <br className="hidden md:block" />
            and <span className="text-brand-primary">vitamins</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Our comprehensive guide to natural remedies, essential vitamins, and dietary supplements. 
            Click on any item below to learn more about its uses and benefits.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-0">
          <div className="space-y-0">
            {leftColumn.map((item, idx) => (
              <SupplementItem key={idx} supplement={item} />
            ))}
          </div>
          <div className="space-y-0">
            {rightColumn.map((item, idx) => (
              <SupplementItem key={idx} supplement={item} />
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-20 p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Medical Disclaimer
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed italic">
            This information is for educational purposes only. Always consult with a qualified healthcare professional before starting any new supplement, 
            especially if you are taking medications or have underlying health conditions. Natural doesn't always mean safe; some supplements can have 
            significant side effects or drug interactions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SupplementsPage;
