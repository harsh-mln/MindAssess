import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const disorders = [
  {
    id: 'anxiety',
    title: 'Anxiety disorders',
    description: 'Anxiety disorders are a group of mental health disorders that includes:',
    subtypes: [
      { name: 'Generalised anxiety disorders', href: '#' },
      { name: 'Social phobias', href: '#' },
      { name: 'Specific phobias (for example, agoraphobia and claustrophobia)', href: '#' },
      { name: 'Panic disorders', href: '#' },
      { name: 'Obsessive compulsive disorder (OCD)', href: '#' },
      { name: 'Post-traumatic stress disorder (PTSD)', href: '#' },
    ],
    details: 'Untreated, anxiety disorders can lead to significant impairment on people’s daily lives.'
  },
  {
    id: 'behavioural',
    title: 'Behavioural and emotional disorders in children',
    description: 'Common behaviour disorders in children include:',
    subtypes: [
      { name: 'Oppositional defiant disorder (ODD)', href: '#' },
      { name: 'Conduct disorder (CD)', href: '#' },
      { name: 'Attention deficit hyperactivity disorder (ADHD)', href: '#' },
    ],
    details: 'Treatment for these mental health disorders can include therapy, education and medication.'
  },
  {
    id: 'bipolar',
    title: 'Bipolar affective disorder',
    description: 'Bipolar affective disorder is a type of mood disorder, previously referred to as ‘manic depression’. A person with bipolar disorder experiences episodes of mania (elation) and depression. The person may or may not experience psychotic symptoms. The exact cause is unknown, but a genetic predisposition has been clearly established. Environmental stressors can also trigger episodes of this mental illness.'
  },
  {
    id: 'depression',
    title: 'Depression',
    description: 'Depression is a mood disorder characterised by lowering of mood, loss of interest and enjoyment, and reduced energy. It is not just feeling sad. There are different types and symptoms of depression. There are varying levels of severity and symptoms related to depression. Symptoms of depression can lead to increased risk of suicidal thoughts or behaviours.'
  },
  {
    id: 'dissociation',
    title: 'Dissociation and dissociative disorders',
    description: 'Dissociation is a mental process where a person disconnects from their thoughts, feelings, memories or sense of identity. Dissociative disorders include dissociative amnesia, depersonalisation disorder and dissociative identity disorder.'
  },
  {
    id: 'eating',
    title: 'Eating disorders',
    description: 'Eating disorders include anorexia, bulimia nervosa and other binge eating disorders. Eating disorders can affect people of all ages and genders, and can have serious psychological and physical consequences.'
  },
  {
    id: 'ocd',
    title: 'Obsessive compulsive disorder',
    description: 'Obsessive compulsive disorder (OCD) is an anxiety disorder. Obsessions are recurrent thoughts, images or impulses that are intrusive and unwanted. Compulsions are time-consuming and distressing repetitive rituals.',
    details: 'Treatments include cognitive behaviour therapy (CBT) and medications.'
  },
  {
    id: 'paranoia',
    title: 'Paranoia',
    description: 'Paranoia is the irrational and persistent feeling that people are ‘out to get you’. Paranoia may be a symptom of conditions including paranoid personality disorder, delusional (paranoid) disorder and schizophrenia.',
    details: 'Treatment for paranoia includes medications and psychological support.'
  },
  {
    id: 'ptsd',
    title: 'Post-traumatic stress disorder',
    description: 'Post-traumatic stress disorder (PTSD) is a mental health condition that can develop as a response to people who have experienced any traumatic event. This can be a car or other serious accident, physical or sexual assault, war-related events or torture, or natural disasters such as bushfires or floods.'
  },
  {
    id: 'psychosis',
    title: 'Psychosis',
    description: 'People affected by psychosis can experience delusions, hallucinations and confused thinking. Psychosis can occur in a number of mental illnesses, including drug-induced psychosis, schizophrenia and mood disorders. Medication and psychological support can relieve, or even eliminate, psychotic symptoms.'
  },
  {
    id: 'schizophrenia',
    title: 'Schizophrenia',
    description: 'Schizophrenia is a complex psychotic disorder characterised by disruptions to thinking and emotions, and a distorted perception of reality. Symptoms of schizophrenia vary widely but may include hallucinations, delusions, thought disorder, social withdrawal, lack of motivation and impaired thinking and memory.',
    details: 'People with schizophrenia have a high risk of suicide. Schizophrenia is not a split personality.'
  }
];

const DiseasesPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Enable smooth scroll for anchors
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    // Fix z-index stacking context for this page only
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.style.zIndex = '40';
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('scroll', handleScroll);
      if (mainElement) {
        mainElement.style.zIndex = '10';
      }
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B0C10] pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-slate-800 py-16 mb-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <nav className="flex gap-2 text-xs font-bold uppercase tracking-wider text-brand-primary mb-4">
              <span>Health Library</span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="text-slate-400 dark:text-slate-500">Diseases & Conditions</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
              Mental Health <br />
              <span className="text-brand-primary">Disorders & Issues</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Understanding common mental health conditions is the first step toward treatment and recovery. 
              Explore our comprehensive library of research-backed information.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 dark:border-white/10">
              <img 
                src="/diseases-hero.png" 
                alt="Mental Health Analysis" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Content Navigation */}
          <aside className="lg:w-1/4 h-fit sticky top-24">
            <div className="space-y-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2x p-6 border border-slate-100 dark:border-slate-800">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  On this page
                </h2>
                <nav className="space-y-3">
                  {disorders.map((disorder) => (
                    <button
                      key={disorder.id}
                      onClick={() => scrollToSection(disorder.id)}
                      className="flex items-start gap-2 text-[15px] font-semibold text-brand-primary hover:underline hover:text-brand-primary/80 transition-all text-left group"
                    >
                      <span className="mt-1 transition-transform group-hover:translate-y-0.5">↓</span>
                      <span>{disorder.title}</span>
                    </button>
                  ))}
                  <button
                    onClick={() => scrollToSection('help')}
                    className="flex items-start gap-2 text-[15px] font-semibold text-brand-primary hover:underline hover:text-brand-primary/80 transition-all text-left pt-2 border-t border-slate-200 dark:border-slate-800 w-full group"
                  >
                    <span className="mt-1 transition-transform group-hover:translate-y-0.5">↓</span>
                    <span>Where to get help</span>
                  </button>
                </nav>
              </div>
            </div>
          </aside>

          {/* Middle: Content */}
          <main className="lg:w-3/4 space-y-20">
            {disorders.map((disorder, idx) => (
              <section
                key={disorder.id}
                id={disorder.id}
                className="scroll-mt-32 space-y-6"
              >
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white border-b-2 border-brand-primary/20 pb-4 inline-block">
                    {disorder.title}
                  </h2>
                  <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                    {disorder.description}
                  </p>
                  
                  {disorder.subtypes && (
                    <ul className="space-y-3 pl-2">
                      {disorder.subtypes.map((subtype, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/60"></div>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {subtype.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="text-slate-600 dark:text-slate-400 italic">
                    {disorder.details}
                  </p>
              </section>
            ))}

            {/* Help Section */}
            <section id="help" className="scroll-mt-32 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-3xl p-8 border border-brand-primary/20">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Where to get help</h2>
              <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                <li className="flex gap-3">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>Contact your local doctor (GP) if you're concerned about your mental health.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>Call 9152987821 for immediate crisis support.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-brand-primary font-bold">•</span>
                  <span>Counselling, medication, or both can help you treat mental illness.</span>
                </li>
              </ul>
            </section>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-brand-primary text-white shadow-2xl shadow-brand-primary/40 hover:bg-brand-primary/90 transition-colors flex items-center justify-center"
            aria-label="Back to top"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiseasesPage;
