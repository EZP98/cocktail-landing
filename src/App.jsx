import { useState, useEffect } from 'react';
import PlasmaBackground from './PlasmaBackground';

const B = '#FF6128';

/* ─── Icons ─── */
const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const Check = () => <svg className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>;
const Send = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>;
const MicIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;
const CameraIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>;
const Down = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>;
const Logo = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 792 750" className={className} xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M0 0.25234C0 0.519006 7.33333 5.98567 16.4 12.3857C80.2667 58.119 150.267 114.519 203.333 162.919C228.267 185.586 286.133 243.986 303.733 264.119C338.533 303.986 361.6 335.052 381.6 368.519C389.2 381.186 395.733 391.586 396.267 391.586C396.933 391.586 401.733 382.386 407.067 371.186C435.333 312.386 470.133 264.652 526.267 208.119C584.533 149.319 643.067 102.519 745.333 32.919C785.2 5.85234 792.267 0.785673 791.6 0.119006C790.4 -1.08099 546.8 33.5857 475.333 45.0523C461.467 47.319 449.333 49.8523 448.4 50.6523C447.067 52.119 428.667 110.919 408 180.252C402.667 197.852 398.267 212.519 398 212.786C397.467 213.319 391.867 195.586 375.333 140.919C362.4 98.119 348.4 54.3857 346.933 51.9857C345.2 49.319 362.933 51.9857 54 7.71901C28.4 3.98567 5.73333 0.65234 3.73333 0.25234C1.6 -0.0143271 0 -0.14766 0 0.25234Z"/>
    <path fill="currentColor" d="M395.734 408.386C395.334 409.052 393.067 418.519 390.667 429.586C376 499.319 350.667 555.719 308.934 611.586C292.4 633.719 260 666.519 234.667 686.786C216.133 701.586 179.467 726.652 157.733 739.586C150.933 743.586 145.333 747.186 145.333 747.719C145.333 748.786 262.134 749.719 314.8 749.186L351.6 748.652L353.2 743.186C354.134 740.119 362.267 714.119 371.334 685.586C380.4 656.919 389.467 628.652 391.334 622.519C393.2 616.519 395.2 611.586 395.867 611.586C396.934 611.586 400.4 622.119 421.867 692.919C429.6 718.252 436.667 741.186 437.467 743.852L439.067 748.919H544.267C602 748.919 649.334 748.652 649.334 748.386C649.334 748.119 643.734 744.786 637.067 740.919C593.867 716.386 546.8 680.252 514.667 646.786C454.134 583.852 417.734 514.119 400.667 428.386C398.4 416.652 396.134 407.586 395.734 408.386Z"/>
  </svg>
);
const Moon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const Sun = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;

/* ─── Chat UI components ─── */
const ChatWindow = ({ label, children, showInput, className = '' }) => (
  <div className={`glow-card bg-white dark:bg-lounge-card rounded-2xl shadow-xl dark:shadow-none overflow-hidden border border-gray-200 dark:border-transparent ${className}`}>
    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-white/[0.04]">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80"/>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80"/>
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/80"/>
      </div>
      <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{label||'Cocktail AI'}</span>
      <div className="w-12"/>
    </div>
    <div className="p-5 space-y-4">{children}</div>
    {showInput && (
      <div className="px-4 py-3 border-t border-gray-100 dark:border-white/[0.04]">
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/[0.06] px-3 py-2">
          <span className="text-sm text-gray-300 dark:text-gray-600 flex-1">Chiedi qualsiasi cosa...</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-600"><MicIcon/></button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 dark:text-gray-600"><CameraIcon/></button>
            <button className="h-7 px-3 rounded-full text-white text-xs font-medium flex items-center gap-1.5" style={{background:B}}>Crea <Send/></button>
          </div>
        </div>
      </div>
    )}
  </div>
);

const UserMsg = ({ children }) => (
  <div className="rounded-2xl rounded-br-md px-4 py-3 border bg-brand-500/[0.08] border-brand-200/40 dark:bg-brand-500/10 dark:border-brand-500/15">
    <p className="text-sm leading-relaxed text-brand-900 dark:text-brand-200">{children}</p>
  </div>
);

/* ═══════════════════════════ DATA ═══════════════════════════ */

const sources = ['Death & Co', 'Liquid Intelligence', 'PDT Cocktail Book', 'Cocktail Codex', "Meehan's Manual", 'Diffords Guide', "World's 50 Best Bars"];

const numbers = [
  { value: '15.000+', label: 'ricette verificate' },
  { value: '3.000+', label: 'spirits nel database' },
  { value: '700+', label: 'bar mappati' },
  { value: '15+', label: 'libri di riferimento' },
  { value: '9', label: 'lingue supportate' },
];

const realQueries = [
  'Un drink che racconti il fuoco e la terra, con mezcal affumicato e un elemento floreale inaspettato',
  'Old fashioned con gusto egiziano, riutilizzando gli scarti del cocktail precedente',
  'Come si usa l\'olio nei cocktail? Quali errori non devo commettere?',
  'Ho ospiti a cena con acciughe del Cantabrico e Jamon iberico. Che aperitivo abbino?',
  'Menu degustazione 8 sezioni usando solo drink e piatti che ho già nel mio sistema',
  'Un cocktail che unisca Taiwan e l\'Italia in un unico drink',
  'Crea 5 twist di classici con prodotti tipici della Costiera Amalfitana, no spritz',
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
    '4.000 query normali (pool team)',
    '3.000 query Pro — Sonnet 4.5',
    '400 query Vision',
    '3 membri inclusi (max 10, +€39/seat)',
    'Menu digitale + QR condivisibile',
    'Stock management in tempo reale',
    'Finance dashboard completa',
    'Lab Diary per R&D',
    'Integrazione POS (Nexi e altri)',
    'AI addestrata sul TUO menu e stock',
    'Team collaboration + ruoli',
    'Account manager dedicato',
    'SLA 99.9% uptime',
  ],
  cta: 'Prova 14 giorni gratis',
};

const faq = [
  { q: 'Che differenza c\'è con ChatGPT?', a: 'Cocktail AI è addestrato su fonti professionali — Death & Co, Liquid Intelligence, PDT — con 15.000+ ricette e 3.000+ spirits verificati. Non genera risposte generiche: recupera dati reali.' },
  { q: 'Posso usarlo sia per me che per il mio locale?', a: 'Sì. Account personale e workspace del locale sono separati, con billing indipendente.' },
  { q: 'Come funziona l\'AI per i clienti al tavolo?', a: 'Scansionano un QR, chattano con un\'AI addestrata sul TUO menu. Tu controlli cosa può dire. Zero installazioni.' },
  { q: 'Si integra con il mio POS?', a: 'Sì. Nexi e altri nel piano Business.' },
  { q: 'Posso chiedere di vini e spirits?', a: 'Certo. Vini, spirits, produttori, abbinamenti cibo-drink, tutto il mondo del beverage.' },
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
            <button onClick={()=>setDark(!dark)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all" aria-label="Toggle theme">
              {dark ? <Sun/> : <Moon/>}
            </button>
            <a href="#" className="text-[13px] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hidden sm:block px-3 py-1.5 transition-colors">Accedi</a>
            <button className="btn-brand-glow h-8 px-4 text-[13px] font-medium">Prova gratis</button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden">
        <div className="dark:opacity-15 transition-opacity"><PlasmaBackground /></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-8">
          {/* Text */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.08] tracking-tight mb-5">
              L'AI che sa<br/>di cocktail.
            </h1>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-lg mx-auto mb-8 leading-relaxed">
              Addestrata su Death & Co, Liquid Intelligence e i migliori bar al mondo. Risposte da esperto, non da Wikipedia.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button className="btn-brand-glow h-11 px-6 text-sm font-medium">Prova gratis <Arrow/></button>
              <a href="#features" className="btn-outline-brand h-11 px-6 text-sm font-medium">Scopri di più <Down/></a>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">10 query gratuite · Nessuna carta richiesta</p>
          </div>

          {/* Product demo — the product IS the hero (Cursor/Perplexity approach) */}
          <div className="max-w-3xl mx-auto">
            <ChatWindow showInput>
              <UserMsg>Un drink con mezcal affumicato e un elemento floreale inaspettato, servito in un bar della Costiera</UserMsg>
              <div>
                <h4 className="text-base font-bold mb-1">Humo Florido</h4>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 uppercase tracking-wider font-medium">Twist on: Mezcal Sour</p>
                <div className="space-y-1 mb-3">
                  {['45ml Mezcal Espadín (Del Maguey Vida)','20ml Sciroppo di lavanda','25ml Lime fresco','10ml Crème de Violette','1 dash Mole bitters','Bianco d\'uovo'].map((ing,i)=>(
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-brand-500 font-semibold">·</span>{ing}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic border-t border-gray-100 dark:border-white/[0.04] pt-2">
                  La lavanda e la violetta creano un ponte floreale che ammorbidisce l'affumicatura del mezcal senza mascherarla. Il mole bitters aggiunge profondità terrosa.
                </p>
                <div className="flex items-center gap-2 mt-3 text-xs text-gray-400 dark:text-gray-500">
                  <span className="px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/[0.06]">Coppa vintage</span>
                  <span className="px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/[0.06]">Dry shake + wet shake</span>
                  <span className="px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/[0.06]">Petalo di lavanda</span>
                </div>
              </div>
            </ChatWindow>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST BAR ═══════════════════ */}
      <section className="section-glow border-y border-gray-100 dark:border-white/[0.04] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-center mb-5 text-gray-400 dark:text-gray-500">Addestrata su</p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {sources.map((s,i)=><span key={i} className="glow-card px-4 py-1.5 rounded-full bg-white dark:bg-transparent border border-gray-200 dark:border-transparent text-xs font-medium text-gray-600 dark:text-gray-400">{s}</span>)}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-center">
            {numbers.map((n,i)=>(
              <div key={i}>
                <p className="text-xl sm:text-2xl font-bold text-brand-500">{n.value}</p>
                <p className="text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">{n.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES — BENTO ═══════════════════ */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-lg mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block text-brand-500">Funzionalità</span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Chiedi qualsiasi cosa.</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3">Testo, voce o foto di una bottiglia. L'AI risponde con fonti professionali, dati reali, consigli specifici.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card 1 — Large: AI Chat with mini demo */}
            <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2 glow-card-accent rounded-2xl p-6 bg-brand-50 border border-brand-200/40 dark:bg-transparent dark:border-transparent flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{background:B}}>AI</span>
                <div>
                  <h3 className="text-lg font-semibold">AI Esperta</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Testo · Voce · Vision · Web search</p>
                </div>
              </div>
              {/* Mini chat preview inside the card */}
              <div className="flex-1 rounded-xl bg-white dark:bg-lounge-card border border-gray-200 dark:border-white/[0.04] p-4 space-y-3">
                <div className="rounded-xl rounded-br-md px-3 py-2 bg-brand-500/[0.06] border border-brand-200/30 dark:bg-brand-500/8 dark:border-brand-500/10">
                  <p className="text-xs text-brand-900 dark:text-brand-200">Posso usare le foglie di basilico leggermente annerite nel mio drink?</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-gray-700 dark:text-gray-300"><strong>Dipende dal livello di ossidazione.</strong> Foglie leggermente scure ai bordi sono ancora utilizzabili — il sapore cambia verso note più terrose e meno fresche.</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Se le foglie sono mollicce o marroni al centro, scartale. Per un Gin Basil Smash, usa solo foglie croccanti e verdi.</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 dark:text-gray-500">
                    <span className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/[0.06]">Liquid Intelligence p.142</span>
                    <span className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-white/[0.06]">Cocktail Codex</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 — Encyclopedia */}
            <div className="glow-card rounded-2xl p-6 bg-white border border-gray-200 dark:bg-transparent dark:border-transparent">
              <p className="text-3xl font-bold text-brand-500 mb-1">15.000+</p>
              <h3 className="text-lg font-semibold mb-2">Encyclopedia</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Classici, moderni, signature dei migliori bar al mondo. Ogni drink con storia, varianti e note tecniche.</p>
            </div>

            {/* Card 3 — Taste Map */}
            <div className="glow-card rounded-2xl p-6 bg-white border border-gray-200 dark:bg-transparent dark:border-transparent">
              <div className="flex items-center gap-2 mb-3">
                {['Amaro','Dolce','Agrumato','Floreale','Affumicato'].map((t,i)=>(
                  <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-medium border border-gray-200 dark:border-white/[0.06] text-gray-500 dark:text-gray-400">{t}</span>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2">Taste Map</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Esplora connessioni tra ingredienti e profili aromatici. Scopri combinazioni che funzionano.</p>
            </div>

            {/* Card 4 — Vision */}
            <div className="glow-card rounded-2xl p-6 bg-white border border-gray-200 dark:bg-transparent dark:border-transparent">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-3">
                <CameraIcon/>
              </div>
              <h3 className="text-lg font-semibold mb-2">Vision</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Scatta una foto a una bottiglia. L'AI la riconosce, ti dice tutto e suggerisce cocktail.</p>
            </div>

            {/* Card 5 — Bar Guide */}
            <div className="glow-card rounded-2xl p-6 bg-white border border-gray-200 dark:bg-transparent dark:border-transparent">
              <p className="text-3xl font-bold text-brand-500 mb-1">700+</p>
              <h3 className="text-lg font-semibold mb-2">Bar Guide</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">World's 50 Best e oltre. Cosa ordinare, cosa aspettarsi. I migliori bar vicino a te.</p>
            </div>

            {/* Card 6 — Recipe Book */}
            <div className="glow-card rounded-2xl p-6 bg-white border border-gray-200 dark:bg-transparent dark:border-transparent">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center mb-3 text-brand-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Recipe Book</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Salva, organizza, esporta in PDF. La tua collezione personale, sempre con te.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ DEEP DIVE ═══════════════════ */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-lounge-card/50">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-lg mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block text-brand-500">Non ChatGPT</span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Risposte da esperto.</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3">Le stesse domande, risposte completamente diverse. Noi citiamo le fonti, diamo quantità esatte, spieghiamo il perché.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="glow-card-accent rounded-2xl p-6 md:sticky md:top-20 bg-brand-50 border border-brand-200/40 dark:bg-transparent dark:border-transparent">
              <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 dark:text-gray-500 mb-3">Query reale</p>
              <p className="text-lg font-medium leading-relaxed text-brand-900 dark:text-brand-200">"Il mio Negroni mi viene sempre troppo amaro, cosa sbaglio?"</p>
              <div className="mt-6 pt-4 border-t border-brand-200/30 dark:border-brand-500/10">
                <p className="text-xs text-gray-400 dark:text-gray-500">ChatGPT direbbe "usa meno Campari". Noi andiamo a fondo — vermouth specifici, gin specifici, proporzioni esatte.</p>
              </div>
            </div>
            <ChatWindow>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Il Negroni amaro dipende quasi sempre da tre cose:</p>
                <div className="space-y-3 mb-4">
                  {[
                    { n:'1', title: 'Vermouth sbagliato', text: 'Usa vermouth dolce rosso: Carpano Antica Formula o Cocchi di Torino. Non vermouth dry.' },
                    { n:'2', title: 'Gin troppo secco', text: 'Un London Dry amplifica l\'amarezza. Prova Hendrick\'s o Roku.' },
                    { n:'3', title: 'Proporzioni', text: '1 oz gin, 0.75 oz Campari, 1.25 oz vermouth — il "Negroni Soft".' },
                  ].map((p,i)=>(
                    <div key={i} className="bg-gray-50 dark:bg-white/[0.02] rounded-xl p-3 border border-transparent dark:border-white/[0.04]">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{background:B}}>{p.n}</span>
                        <div>
                          <p className="text-sm font-semibold mb-0.5">{p.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{p.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg p-3 text-xs text-gray-700 dark:text-gray-300 bg-brand-50 border border-brand-200/40 dark:bg-brand-500/5 dark:border-brand-500/15">
                  <strong>Pro tip:</strong> stira per 30 secondi, non shakeare. Agitando crei aria e l'amarezza si esalta.
                </div>
              </div>
            </ChatWindow>
          </div>
        </div>
      </section>

      {/* ═══════════════════ QUERY WALL ═══════════════════ */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-lg mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block text-brand-500">Domande reali</span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Questo chiedono i nostri utenti.</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3">Non "come si fa un Mojito". Domande creative, tecniche, specifiche.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {realQueries.map((q,i)=>(
              <div key={i} className="glow-card rounded-2xl rounded-br-md px-5 py-4 bg-white border border-gray-200 dark:bg-transparent dark:border-transparent transition-all">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">"{q}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BUSINESS ═══════════════════ */}
      <section id="business" className="py-24 px-6 section-glow bg-gray-50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-lg mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block text-brand-500">Business</span>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">Il tuo locale, potenziato.</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3">Stock, menu, finanze, team. Un workspace con un'AI che conosce il TUO business.</p>
          </div>

          {/* Business bento */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {[
              { title: 'Stock in tempo reale', desc: 'Inventario aggiornato, alert sotto-soglia, ordini fornitori.', tags: ['Alert','Bulk','Fornitori'], accent: true },
              { title: 'Menu digitale + QR', desc: 'Prezzi aggiornabili in massa, link pubblico, QR al tavolo.' },
              { title: 'Finance dashboard', desc: 'Entrate, uscite, labor cost, margini per singolo drink.' },
              { title: 'AI per il tuo team', desc: 'Conosce il TUO menu, i TUOI prezzi, le TUE ricette.' },
              { title: 'Lab Diary', desc: 'Testa nuovi drink, salva varianti, calcola costi.' },
              { title: 'Team fino a 10', desc: 'Ruoli, permessi, conversazioni condivise, pool query.', accent: true },
            ].map((f,i)=>(
              <div key={i} className={`rounded-2xl p-5 border transition-all ${f.accent
                ? 'glow-card-accent bg-brand-50 border-brand-200/40 dark:bg-transparent dark:border-transparent'
                : 'glow-card bg-white border-gray-200 dark:bg-transparent dark:border-transparent'}`}>
                <h3 className="text-base font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
                {f.tags && (
                  <div className="flex items-center gap-1.5 mt-3">
                    {f.tags.map((t,j)=><span key={j} className="px-2 py-0.5 rounded-full text-[10px] border border-gray-200 dark:border-white/[0.06] text-gray-400 dark:text-gray-500">{t}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Business demo */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-3">Analisi finanziaria in una domanda.</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-5">L'AI accede ai tuoi dati reali: stock, vendite, costi del personale.</p>
              <ul className="space-y-2">
                {['Food cost e margini reali','Labor cost sul fatturato','Drink con margine peggiore'].map((t,i)=>(
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><Check/>{t}</li>
                ))}
              </ul>
            </div>
            <ChatWindow label="AI del tuo locale">
              <UserMsg>Food cost medio, labor cost %, prime cost. E i 3 drink con margine peggiore.</UserMsg>
              <div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[{l:'Food Cost',v:'22.4%',c:'#22c55e'},{l:'Labor Cost',v:'31.2%',c:'#eab308'},{l:'Prime Cost',v:'53.6%',c:'#22c55e'}].map((m,i)=>(
                    <div key={i} className="bg-gray-50 dark:bg-white/[0.02] rounded-xl p-3 text-center border border-transparent dark:border-white/[0.04]">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-0.5">{m.l}</p>
                      <p className="text-lg font-bold" style={{color:m.c}}>{m.v}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {[{n:'Espresso Martini Premium',m:'60%'},{n:'Whisky Sour (Nikka)',m:'60%'},{n:'Jungle Bird',m:'61%'}].map((d,i)=>(
                    <div key={i} className="flex items-center justify-between text-xs bg-gray-50 dark:bg-white/[0.02] rounded-lg px-3 py-2 border border-transparent dark:border-white/[0.04]">
                      <span className="text-gray-700 dark:text-gray-300">{d.n}</span>
                      <span className="font-semibold text-yellow-600 dark:text-yellow-400">{d.m}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 italic">Alza l'Espresso Martini a €14 → margine 66%.</p>
              </div>
            </ChatWindow>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block text-brand-500">Prezzi</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Prezzi chiari.</h2>
          </div>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mb-14">
            <span className={`text-sm font-medium transition-colors ${!annual ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>Mensile</span>
            <button onClick={()=>setAnnual(!annual)} className={`relative w-11 h-6 rounded-full transition-colors ${annual ? 'bg-brand-500' : 'bg-gray-300 dark:bg-white/10'}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${annual ? 'translate-x-5' : 'translate-x-0.5'}`}/>
            </button>
            <span className={`text-sm font-medium transition-colors ${annual ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>Annuale</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">-17%</span>
          </div>

          {/* Personal */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {personalPricing.map((p,i)=>(
              <div key={i} className={`rounded-2xl p-6 border transition-all ${p.highlight
                ? 'glow-card-accent bg-white dark:bg-transparent border-brand-500/30 dark:border-transparent'
                : 'glow-card bg-white dark:bg-transparent border-gray-200 dark:border-transparent'}`}>
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

          {/* Business */}
          <div className="max-w-md mx-auto mt-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-center mb-6 text-brand-500">Business</p>
            <div className="glow-card-accent rounded-2xl p-8 bg-white dark:bg-transparent border-2 border-brand-500/30 dark:border-transparent">
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

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-transparent">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Domande frequenti</h2>
          <div className="space-y-2">
            {faq.map((f,i)=>(
              <div key={i} className="glow-card bg-white dark:bg-transparent border border-gray-200 dark:border-transparent rounded-xl overflow-hidden">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                  <span className="text-sm font-medium">{f.q}</span>
                  <span className="text-gray-400 dark:text-gray-500 ml-3 text-sm">{openFaq===i?'−':'+'}</span>
                </button>
                {openFaq===i&&<div className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA FINALE ═══════════════════ */}
      <section className="py-28 px-6 ambient-glow">
        <div className="max-w-xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Prova. È gratis.</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">10 query gratuite, nessuna carta richiesta.</p>
          <button className="btn-brand-glow h-12 px-7 text-sm font-medium">Inizia gratis <Arrow/></button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 px-6 border-t border-gray-100 dark:border-white/[0.04]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <a href="#" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{background:B}}><Logo size={13} className="text-white"/></div>
            <span className="font-semibold text-sm">Cocktail AI</span>
          </a>
          <p className="text-xs text-gray-400 dark:text-gray-500">© 2026 Cocktail AI</p>
        </div>
      </footer>
    </div>
  );
}
