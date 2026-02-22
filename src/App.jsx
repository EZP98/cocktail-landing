import { useState, useEffect } from 'react';
import PlasmaBackground from './PlasmaBackground';

const B = '#FF6128';

/* ─── Icons ─── */
const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const Check = () => <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>;
const Send = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>;
const Logo = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 792 750" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M0 0.25234C0 0.519006 7.33333 5.98567 16.4 12.3857C80.2667 58.119 150.267 114.519 203.333 162.919C228.267 185.586 286.133 243.986 303.733 264.119C338.533 303.986 361.6 335.052 381.6 368.519C389.2 381.186 395.733 391.586 396.267 391.586C396.933 391.586 401.733 382.386 407.067 371.186C435.333 312.386 470.133 264.652 526.267 208.119C584.533 149.319 643.067 102.519 745.333 32.919C785.2 5.85234 792.267 0.785673 791.6 0.119006C790.4 -1.08099 546.8 33.5857 475.333 45.0523C461.467 47.319 449.333 49.8523 448.4 50.6523C447.067 52.119 428.667 110.919 408 180.252C402.667 197.852 398.267 212.519 398 212.786C397.467 213.319 391.867 195.586 375.333 140.919C362.4 98.119 348.4 54.3857 346.933 51.9857C345.2 49.319 362.933 51.9857 54 7.71901C28.4 3.98567 5.73333 0.65234 3.73333 0.25234C1.6 -0.0143271 0 -0.14766 0 0.25234Z"/>
    <path fill="currentColor" d="M395.734 408.386C395.334 409.052 393.067 418.519 390.667 429.586C376 499.319 350.667 555.719 308.934 611.586C292.4 633.719 260 666.519 234.667 686.786C216.133 701.586 179.467 726.652 157.733 739.586C150.933 743.586 145.333 747.186 145.333 747.719C145.333 748.786 262.134 749.719 314.8 749.186L351.6 748.652L353.2 743.186C354.134 740.119 362.267 714.119 371.334 685.586C380.4 656.919 389.467 628.652 391.334 622.519C393.2 616.519 395.2 611.586 395.867 611.586C396.934 611.586 400.4 622.119 421.867 692.919C429.6 718.252 436.667 741.186 437.467 743.852L439.067 748.919H544.267C602 748.919 649.334 748.652 649.334 748.386C649.334 748.119 643.734 744.786 637.067 740.919C593.867 716.386 546.8 680.252 514.667 646.786C454.134 583.852 417.734 514.119 400.667 428.386C398.4 416.652 396.134 407.586 395.734 408.386Z"/>
  </svg>
);
const Moon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const Sun = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const Star = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;

/* ═══════════════════════════ DATA ═══════════════════════════ */

const sources = ['Death & Co', 'Liquid Intelligence', 'PDT Cocktail Book', 'Cocktail Codex', "Meehan's Manual", 'Diffords Guide', "World's 50 Best Bars"];

const realQueries = [
  'Un drink che racconti il fuoco e la terra, con mezcal affumicato e un elemento floreale inaspettato',
  'Old fashioned con gusto egiziano, riutilizzando gli scarti del cocktail precedente',
  'Come si usa l\'olio nei cocktail? Quali errori non devo commettere?',
  'Ho ospiti a cena con acciughe del Cantabrico e Jamon iberico. Che aperitivo abbino?',
  'Un cocktail che unisca Taiwan e l\'Italia in un unico drink',
  'Posso usare le foglie di basilico leggermente annerite nel mio drink?',
];

const personalPricing = [
  { name: 'Free', price: '€0', period: '/sempre', desc: 'Esplora il prodotto', features: ['10 query / mese', 'Encyclopedia completa', 'Ricerca guidata', 'Community', 'RAG base'], cta: 'Inizia gratis' },
  { name: 'Starter', price: '€19', priceAnnual: '€15.83', period: '/mese', desc: 'Per chi vuole di più', features: ['600 query normali', '100 query Pro — Sonnet 4.5', '30 query Vision', 'Full RAG (15+ libri)', '3.000+ spirits database', 'Recipe book + export PDF', 'Voice chat 9 lingue', 'Web search in tempo reale'], cta: 'Prova Starter' },
  { name: 'Pro', price: '€49', priceAnnual: '€40.83', period: '/mese', desc: 'Accesso completo', badge: 'Consigliato', features: ['1.500 query normali', '800 query Pro — Sonnet 4.5', '100 query Vision', 'Tutto di Starter +', 'Export PDF, JSON', 'Recipe collections', 'API access (beta)', 'Priority support 12h'], cta: 'Prova Pro', highlight: true },
];

const businessPlan = {
  name: 'Business', price: '€199', priceAnnual: '€165', period: '/mese', periodAnnual: '/mese (annuale)',
  desc: 'Per bar, ristoranti e hotel', badge: 'Per il tuo locale',
  features: [
    '4.000 query normali (pool team)', '3.000 query Pro — Sonnet 4.5', '400 query Vision',
    '3 membri inclusi (max 10, +€39/seat)', 'Menu digitale + QR', 'Stock management',
    'Finance dashboard', 'Lab Diary R&D', 'Integrazione POS', 'AI sul TUO menu e stock',
    'Team collaboration + ruoli', 'Account manager dedicato', 'SLA 99.9% uptime',
  ],
  cta: 'Prova 14 giorni gratis',
};

const faq = [
  { q: 'Che differenza c\'è con ChatGPT?', a: 'Cocktail AI è addestrato su fonti professionali con 15.000+ ricette e 3.000+ spirits verificati. Non genera risposte generiche: recupera dati reali.' },
  { q: 'Posso usarlo per me e per il mio locale?', a: 'Sì. Account personale e workspace del locale sono separati, con billing indipendente.' },
  { q: 'Come funziona l\'AI per i clienti al tavolo?', a: 'Scansionano un QR, chattano con un\'AI addestrata sul TUO menu. Zero installazioni.' },
  { q: 'Si integra con il mio POS?', a: 'Sì. Nexi e altri nel piano Business.' },
  { q: 'Posso cancellare quando voglio?', a: 'Un click. Nessun vincolo, nessuna penale.' },
];

/* ═══════════════════════════ APP ═══════════════════════════ */
export default function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [annual, setAnnual] = useState(false);
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return true;
    }
    return true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <div className="min-h-screen bg-white dark:bg-lounge-dark text-gray-900 dark:text-gray-100 transition-colors">

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-lounge-dark/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{background:B}}><Logo size={15} className="text-white"/></div>
              <span className="font-semibold text-[15px]">Cocktail AI</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Funzionalità</a>
              <a href="#business" className="text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Business</a>
              <a href="#pricing" className="text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Prezzi</a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>setDark(!dark)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all" aria-label="Theme">
              {dark ? <Sun/> : <Moon/>}
            </button>
            <a href="#" className="text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hidden sm:block px-3 py-1.5">Accedi</a>
            <button className="btn-brand-glow h-8 px-4 text-[13px] font-medium">Prova gratis</button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden">
        <div className="dark:opacity-15 transition-opacity"><PlasmaBackground /></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-6">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6 bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400 border border-gray-200 dark:border-white/[0.06]">L'esperto di mixology, sempre con te</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-5">
              Il tuo esperto di cocktail,<br/>potenziato dall'AI
            </h1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
              15.000 ricette verificate, 3.000+ spirits, fonti professionali. Risposte da esperto, non generiche.
            </p>
            <button className="btn-brand-glow h-11 px-7 text-sm font-medium">Prova gratis <Arrow/></button>
          </div>
        </div>

        {/* ─── Hero screenshot (Visuo-style full-width product image) ─── */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-0">
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 dark:border-white/[0.06] shadow-2xl dark:shadow-[0_8px_60px_-12px_rgba(0,0,0,0.6)] bg-white dark:bg-lounge-card">
            {/* Window chrome */}
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-gray-100 dark:border-white/[0.04] bg-gray-50 dark:bg-lounge-surface">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/70"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70"/><div className="w-2.5 h-2.5 rounded-full bg-green-400/70"/>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-white dark:bg-lounge-dark border border-gray-200 dark:border-white/[0.04] text-[10px] text-gray-400 dark:text-gray-500">
                  <Logo size={10} className="text-brand-500"/>cocktailai.app
                </div>
              </div>
            </div>
            {/* App content */}
            <div className="grid md:grid-cols-[260px_1fr] min-h-[340px]">
              {/* Sidebar */}
              <div className="hidden md:block border-r border-gray-100 dark:border-white/[0.04] p-4 space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{background:B}}><Logo size={11} className="text-white"/></div>
                  <span className="text-xs font-semibold">Cocktail AI</span>
                </div>
                {['Nuova conversazione','Negroni sbagliato','Mezcal cocktails','Menu estate 2026'].map((c,i)=>(
                  <div key={i} className={`px-3 py-2 rounded-lg text-[11px] ${i===0 ? 'bg-brand-500/10 text-brand-500 font-medium' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-white/[0.02]'}`}>{c}</div>
                ))}
                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/[0.04]">
                  <div className="flex items-center gap-1.5 px-3 py-1.5">
                    {sources.slice(0,4).map((s,i)=>(
                      <span key={i} className="text-[8px] text-gray-400 dark:text-gray-600 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/[0.03]">{s.split(' ')[0]}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Chat area */}
              <div className="p-5 sm:p-6 flex flex-col">
                <div className="flex-1 space-y-4">
                  <div className="rounded-xl rounded-br-sm px-4 py-2.5 bg-brand-500/[0.06] border border-brand-200/30 dark:bg-brand-500/8 dark:border-brand-500/10 max-w-[75%] ml-auto">
                    <p className="text-[13px] text-brand-900 dark:text-brand-200">5 twist di classici con prodotti della Costiera Amalfitana, no spritz</p>
                  </div>
                  <div className="space-y-3 max-w-[85%]">
                    <p className="text-[13px] font-bold">1. Costa Dorata</p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Twist on: Gin Fizz</p>
                    <div className="space-y-1">
                      {['50ml Gin mediterraneo','20ml Limoncello di Sfusato','15ml Sciroppo di basilico','3 gocce colatura di alici'].map((r,i)=>
                        <p key={i} className="text-[12px] text-gray-600 dark:text-gray-400"><span className="text-brand-500 mr-1.5">·</span>{r}</p>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 italic pt-2 border-t border-gray-100 dark:border-white/[0.04]">La colatura di alici dona umami che bilancia il limoncello. Servire in coppa, garnish con foglia di basilico.</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center rounded-xl border border-gray-200 dark:border-white/[0.06] px-4 py-2.5 bg-gray-50 dark:bg-lounge-surface">
                  <span className="text-[12px] text-gray-300 dark:text-gray-600 flex-1">Chiedi qualsiasi cosa...</span>
                  <button className="h-7 px-3 rounded-lg text-white text-[11px] font-medium flex items-center gap-1.5" style={{background:B}}><Send/></button>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom fade gradient */}
          <div className="h-24 bg-gradient-to-b from-transparent to-white dark:to-lounge-dark -mt-1 relative z-10"/>
        </div>
      </section>

      {/* ═══════════════════ WORKFLOW — Feature grid (Visuo-style) ═══════════════════ */}
      <section id="features" className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium mb-4 border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400">Come funziona</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Tutto ciò che serve per<br/>il mondo del bere</h2>
          </div>

          {/* Workflow grid — 2 cols, 4 cards */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Card 1 — AI Chat (image top, text bottom) */}
            <div className="workflow-card rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-lounge-card">
              <div className="relative overflow-hidden h-64 sm:h-72">
                <div className="absolute inset-0 p-5 sm:p-6">
                  <div className="mockup-inner rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                    <div className="p-4 space-y-3 flex-1">
                      <div className="rounded-lg rounded-br-sm px-3 py-2 bg-brand-500/[0.06] border border-brand-200/30 dark:bg-brand-500/8 dark:border-brand-500/10 ml-auto max-w-[85%]">
                        <p className="text-[11px] text-brand-900 dark:text-brand-200">Il mio Negroni è troppo amaro</p>
                      </div>
                      <div className="space-y-2">
                        {[
                          {n:'1',t:'Vermouth sbagliato',d:'Usa Carpano Antica o Cocchi.'},
                          {n:'2',t:'Gin troppo secco',d:'Prova Hendrick\'s o Roku.'},
                          {n:'3',t:'Proporzioni',d:'1:0.75:1.25'},
                        ].map((p,i)=>(
                          <div key={i} className="flex gap-2 items-start bg-gray-50 dark:bg-white/[0.02] rounded-lg p-2 border border-transparent dark:border-white/[0.03]">
                            <span className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold shrink-0" style={{background:B}}>{p.n}</span>
                            <div>
                              <p className="text-[10px] font-semibold">{p.t}</p>
                              <p className="text-[9px] text-gray-500 dark:text-gray-400">{p.d}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-50 dark:from-lounge-card to-transparent pointer-events-none"/>
              </div>
              <div className="px-6 sm:px-8 pb-7 sm:pb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Chiedi qualsiasi cosa</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Testo, voce o foto. L'AI risponde con fonti professionali, dati reali e consigli specifici per il tuo livello.</p>
              </div>
            </div>

            {/* Card 2 — Encyclopedia (text top, image bottom) */}
            <div className="workflow-card rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-lounge-card">
              <div className="px-6 sm:px-8 pt-7 sm:pt-8 pb-4">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">15.000+ ricette. Ogni sapore mappato.</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Classici, moderni, signature. Con storia, varianti, note tecniche e profili aromatici.</p>
              </div>
              <div className="relative overflow-hidden h-64 sm:h-72">
                <div className="absolute inset-0 p-5 sm:p-6 pt-2 sm:pt-2">
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        {name:'Negroni',cat:'Classic',color:'bg-red-500/20 dark:bg-red-500/10'},
                        {name:'Margarita',cat:'Classic',color:'bg-lime-500/20 dark:bg-lime-500/10'},
                        {name:'Penicillin',cat:'Modern',color:'bg-amber-500/20 dark:bg-amber-500/10'},
                        {name:'Paper Plane',cat:'Modern',color:'bg-orange-500/20 dark:bg-orange-500/10'},
                        {name:'Last Word',cat:'Classic',color:'bg-green-500/20 dark:bg-green-500/10'},
                        {name:'Jungle Bird',cat:'Tiki',color:'bg-pink-500/20 dark:bg-pink-500/10'},
                      ].map((c,i)=>(
                        <div key={i} className="mockup-inner rounded-xl overflow-hidden shadow-md">
                          <div className={`h-14 ${c.color}`}/>
                          <div className="p-2">
                            <p className="text-[10px] font-semibold">{c.name}</p>
                            <p className="text-[8px] text-gray-400 dark:text-gray-500">{c.cat}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mockup-inner rounded-xl p-3 shadow-md">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">Taste Map</p>
                      <div className="flex items-center justify-between gap-1.5">
                        {['Amaro','Dolce','Agrumato','Floreale','Speziato','Affumicato'].map((t,i)=>(
                          <div key={i} className="flex flex-col items-center gap-1">
                            <div className="w-7 h-7 rounded-full border-2 border-brand-500/30 flex items-center justify-center" style={{background:`rgba(255,97,40,${0.05+i*0.04})`}}>
                              <span className="text-[6px] font-bold text-brand-500">{(60+i*8)}%</span>
                            </div>
                            <span className="text-[7px] text-gray-400 dark:text-gray-500">{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 — Bar Guide (text top, list below) */}
            <div className="workflow-card rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-lounge-card">
              <div className="px-6 sm:px-8 pt-7 sm:pt-8 pb-4">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">700+ bar nel mondo</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">I migliori bar con cosa ordinare. Salva ricette, organizzale, esporta in PDF.</p>
              </div>
              <div className="relative overflow-hidden h-64 sm:h-72">
                <div className="absolute inset-0 px-5 sm:px-6 pt-0 pb-6 space-y-2">
                  {[
                    {name:'Connaught Bar',city:'London',rank:'#1',stars:5},
                    {name:'Paradiso',city:'Barcelona',rank:'#2',stars:5},
                    {name:'Tayēr + Elementary',city:'London',rank:'#3',stars:5},
                    {name:'Licorería Limantour',city:'Mexico City',rank:'#7',stars:4},
                    {name:'Handshake Speakeasy',city:'Mexico City',rank:'#8',stars:4},
                  ].map((b,i)=>(
                    <div key={i} className="mockup-inner rounded-xl px-4 py-2.5 shadow-md flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold bg-brand-500/10 text-brand-500">{b.rank}</span>
                        <div>
                          <p className="text-[12px] font-semibold">{b.name}</p>
                          <p className="text-[10px] text-gray-400 dark:text-gray-500">{b.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-brand-500">
                        {[...Array(b.stars)].map((_,j)=><Star key={j}/>)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-50 dark:from-lounge-card to-transparent pointer-events-none"/>
              </div>
            </div>

            {/* Card 4 — Business dashboard (image top, text bottom) */}
            <div id="business" className="workflow-card rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-lounge-card">
              <div className="relative overflow-hidden h-64 sm:h-72">
                <div className="absolute inset-0 p-5 sm:p-6 space-y-3">
                  <div className="grid grid-cols-3 gap-2.5">
                    {[{l:'Food Cost',v:'22.4%',c:'#22c55e'},{l:'Labor Cost',v:'31.2%',c:'#eab308'},{l:'Prime Cost',v:'53.6%',c:'#22c55e'}].map((m,i)=>(
                      <div key={i} className="mockup-inner rounded-xl p-3 text-center shadow-md">
                        <p className="text-[9px] text-gray-400 dark:text-gray-500">{m.l}</p>
                        <p className="text-lg font-bold mt-0.5" style={{color:m.c}}>{m.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mockup-inner rounded-xl p-3 shadow-md">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1.5">Stock — Alert</p>
                    {[
                      {name:'Campari 1L',qty:'2 bottiglie',status:'low'},
                      {name:'Vermouth Rosso',qty:'1 bottiglia',status:'critical'},
                      {name:'Gin Hendrick\'s',qty:'4 bottiglie',status:'ok'},
                    ].map((s,i)=>(
                      <div key={i} className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-white/[0.03] last:border-0">
                        <span className="text-[10px]">{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-gray-400 dark:text-gray-500">{s.qty}</span>
                          <span className={`w-2 h-2 rounded-full ${s.status==='critical'?'bg-red-500':s.status==='low'?'bg-yellow-500':'bg-green-500'}`}/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mockup-inner rounded-xl p-3 shadow-md">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Revenue</p>
                      <span className="text-[10px] font-bold text-green-500">+12%</span>
                    </div>
                    <p className="text-lg font-bold">€47.320</p>
                    <div className="flex items-end gap-0.5 mt-1.5 h-6">
                      {[40,55,45,70,65,80,75,90,85,95,88,100].map((h,i)=>(
                        <div key={i} className="flex-1 rounded-sm" style={{height:`${h}%`,background:i>=10?B:`rgba(255,97,40,${0.15+i*0.06})`}}/>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gray-50 dark:from-lounge-card to-transparent pointer-events-none"/>
              </div>
              <div className="px-6 sm:px-8 pb-7 sm:pb-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Il tuo locale, potenziato</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">Stock, menu, finanze, team. Un workspace con un'AI addestrata sui tuoi dati.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.06] to-transparent"/>

      {/* ═══════════════════ STATS (Visuo-style) ═══════════════════ */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium mb-4 border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400">I numeri</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">Un database che nessun<br/>chatbot può eguagliare</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {[
              {n:'15.000+',l:'Ricette verificate',d:'Classici, moderni e signature dei migliori bar al mondo'},
              {n:'3.000+',l:'Spirits nel database',d:'Ogni bottiglia con note di degustazione e storia'},
              {n:'700+',l:'Bar nel mondo',d:'World\'s 50 Best Bars e i locali più rilevanti'},
              {n:'9',l:'Lingue supportate',d:'Voice chat e risposte multilingua in tempo reale'},
            ].map((s,i)=>(
              <div key={i} className="relative rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-lounge-card p-6 sm:p-8 overflow-hidden">
                <div className="absolute -top-6 -right-4 text-[80px] sm:text-[100px] font-black text-gray-100 dark:text-white/[0.03] leading-none select-none pointer-events-none">{s.n.replace('+','')}</div>
                <div className="relative z-10">
                  <p className="text-3xl sm:text-4xl font-bold text-brand-500 mb-2">{s.n}</p>
                  <h3 className="text-base sm:text-lg font-bold mb-1.5">{s.l}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Trust sources */}
          <div className="mt-12 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-wider mb-4 text-gray-400 dark:text-gray-500">Addestrata su</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {sources.map((s,i)=><span key={i} className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.04] text-xs font-medium text-gray-500 dark:text-gray-400">{s}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.06] to-transparent"/>

      {/* ═══════════════════ CTA MID (Visuo-style) ═══════════════════ */}
      <section className="py-20 sm:py-28 px-6 ambient-glow">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium mb-4 border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400">Domande reali</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">Questo chiedono<br/>i nostri utenti</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">Non le solite domande. Le stesse che faresti a un bartender esperto, un sommelier o un head barman.</p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-3 relative z-10">
          {realQueries.map((q,i)=>(
            <div key={i} className="rounded-2xl px-5 py-4 bg-gray-50 dark:bg-lounge-card border border-gray-200 dark:border-white/[0.06] transition-all hover:border-brand-500/30 dark:hover:border-brand-500/20">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">"{q}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.06] to-transparent"/>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      <section id="pricing" className="py-20 sm:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium mb-4 border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400">Prezzi</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Prezzi chiari, nessuna sorpresa</h2>
          </div>
          <div className="flex items-center justify-center gap-3 mb-14">
            <span className={`text-sm font-medium transition-colors ${!annual ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>Mensile</span>
            <button onClick={()=>setAnnual(!annual)} className={`relative w-11 h-6 rounded-full transition-colors ${annual ? 'bg-brand-500' : 'bg-gray-300 dark:bg-white/10'}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${annual ? 'translate-x-5' : 'translate-x-0.5'}`}/>
            </button>
            <span className={`text-sm font-medium transition-colors ${annual ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>Annuale</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">-17%</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {personalPricing.map((p,i)=>(
              <div key={i} className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 border transition-all ${p.highlight
                ? 'bg-gray-50 dark:bg-lounge-card border-brand-500/30 dark:border-brand-500/20 shadow-lg shadow-brand-500/5'
                : 'bg-gray-50 dark:bg-lounge-card border-gray-200 dark:border-white/[0.06]'}`}>
                {p.badge&&<span className="inline-block px-2.5 py-1 rounded-full text-white text-[10px] font-medium mb-3" style={{background:B}}>{p.badge}</span>}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{p.desc}</p>
                <div className="mb-5">
                  <span className="text-3xl font-bold">{annual && p.priceAnnual ? p.priceAnnual : p.price}</span>
                  <span className="text-sm text-gray-400 dark:text-gray-500">{annual && p.priceAnnual ? '/mese' : p.period}</span>
                  {annual && p.priceAnnual && <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">fatturato annualmente</p>}
                </div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f,j)=><li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"><Check/>{f}</li>)}
                </ul>
                <a href="#" className={`flex items-center justify-center gap-2 h-10 rounded-full text-sm font-medium w-full transition-all ${p.highlight ? 'btn-brand-glow text-white' : 'btn-outline-brand'}`}>{p.cta}{p.highlight&&<Arrow/>}</a>
              </div>
            ))}
          </div>
          <div className="max-w-md mx-auto mt-16">
            <div className="rounded-2xl sm:rounded-3xl p-7 sm:p-8 bg-gray-50 dark:bg-lounge-card border-2 border-brand-500/30 dark:border-brand-500/20 shadow-lg shadow-brand-500/5">
              <span className="inline-block px-2.5 py-1 rounded-full text-white text-[10px] font-medium mb-3" style={{background:B}}>{businessPlan.badge}</span>
              <h3 className="text-2xl font-bold">{businessPlan.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{businessPlan.desc}</p>
              <div className="mb-2">
                <span className="text-4xl font-bold">{annual ? businessPlan.priceAnnual : businessPlan.price}</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">{annual ? businessPlan.periodAnnual : businessPlan.period}</span>
              </div>
              {!annual && <p className="text-xs text-gray-400 dark:text-gray-500 mb-5">oppure {businessPlan.priceAnnual}/mese annuale (-17%)</p>}
              {annual && <p className="text-xs text-green-500 mb-5">Risparmi €408/anno</p>}
              <ul className="space-y-2 mb-8">
                {businessPlan.features.map((f,j)=><li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"><Check/>{f}</li>)}
              </ul>
              <a href="#" className="btn-brand-glow flex items-center justify-center gap-2 h-11 rounded-full text-sm font-medium text-white w-full">{businessPlan.cta} <Arrow/></a>
            </div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.06] to-transparent"/>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="py-20 sm:py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium mb-4 border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400">FAQ</span>
            <h2 className="text-2xl sm:text-3xl font-bold">Domande frequenti</h2>
          </div>
          <div className="space-y-2">
            {faq.map((f,i)=>(
              <div key={i} className="rounded-xl sm:rounded-2xl border border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-lounge-card overflow-hidden">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                  <span className="text-sm font-medium">{f.q}</span>
                  <span className="text-gray-400 dark:text-gray-500 ml-3 text-sm transition-transform" style={{transform:openFaq===i?'rotate(45deg)':'rotate(0deg)'}}>+</span>
                </button>
                {openFaq===i&&<div className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/[0.06] to-transparent"/>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="py-24 sm:py-32 px-6 ambient-glow">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium mb-4 border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400">Inizia ora</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">Pronto a cambiare il modo<br/>in cui esplori i cocktail?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed max-w-md mx-auto">10 query gratuite, nessuna carta richiesta. Scopri perché migliaia di appassionati e professionisti scelgono Cocktail AI.</p>
          <button className="btn-brand-glow h-12 px-8 text-sm font-medium">Prova gratis <Arrow/></button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 px-6 border-t border-gray-100 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{background:B}}><Logo size={13} className="text-white"/></div>
              <span className="font-semibold text-sm">Cocktail AI</span>
            </a>
            <span className="text-xs text-gray-300 dark:text-gray-600">|</span>
            <p className="text-xs text-gray-400 dark:text-gray-500">L'esperto di mixology, potenziato dall'AI</p>
          </div>
          <div className="flex items-center gap-5">
            <a href="#features" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Funzionalità</a>
            <a href="#pricing" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Prezzi</a>
            <a href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Accedi</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-gray-100 dark:border-white/[0.04] text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">© 2026 Cocktail AI. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}
