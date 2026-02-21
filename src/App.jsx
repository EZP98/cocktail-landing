import { useState } from 'react';
import PlasmaBackground from './PlasmaBackground';

const B = '#FF6128'; // brand
const B_BG = '#FFF4EE';
const B_BORDER = 'rgba(255,97,40,0.15)';

const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const Check = () => <svg className="w-4 h-4 text-green-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>;

// ═══════════════════════════ DATA ═══════════════════════════
const personal = {
  hero: { badge: 'Il tuo esperto di mixology', title: 'Chiedi. Scopri. Mixa.', sub: 'Basta scrollare ricette generiche. Chiedi quello che vuoi sapere sul bere bene — dai cocktail agli spirits, dai vini ai bar migliori — e ricevi risposte da esperto.', cta: 'Inizia gratis', note: '10 query gratuite · Nessuna carta richiesta' },
  conversation: {
    question: 'Devo creare un cocktail signature per un evento a tema Costiera Amalfitana.',
    title: 'Costa Dorata',
    ingredients: ['50ml Gin mediterraneo', '20ml Limoncello di Sfusato Amalfitano', '15ml Sciroppo di basilico fresco', '10ml Succo fresco di limone sfusato', '3 gocce di colatura di alici', 'Prosecco per allungare'],
    footer: 'La colatura di alici dona una nota umami che bilancia perfettamente la dolcezza.'
  },
  features: [
    { n: '01', title: 'Ricette e Tecniche', desc: 'Shake vs stir, fat-wash, super juice, pre-batch. Non solo il come, ma il perché.' },
    { n: '02', title: 'Spirits e Ingredienti', desc: '3.000+ spirits con profili aromatici, ABV, origine. Ogni bottiglia ha una storia.' },
    { n: '03', title: 'Abbinamenti', desc: 'Cibo + drink, occasione + cocktail. Consigli su misura per ogni situazione.' },
    { n: '04', title: 'Crea il tuo Signature', desc: 'Dagli un brief, ti propone qualcosa di unico con bilanciamento calcolato.' },
    { n: '05', title: 'Bar Guide', desc: '700+ bar dei World\'s 50 Best. Cosa ordinare, cosa aspettarsi, come arrivarci.' },
  ],
  comparison: [
    { label: 'Ricette', them: 'Generiche', us: 'Database verificato' },
    { label: 'Fonti', them: 'Internet generico', us: 'Death & Co, PDT, Diffords…' },
    { label: 'Spirits', them: 'Info base', us: '3.000+ con note degustazione' },
    { label: 'Tecniche', them: 'Teoria', us: 'Il perché + errori comuni' },
    { label: 'Bar guide', them: '—', us: '700+ bar, cosa ordinare' },
    { label: 'Signature', them: 'Ricette casuali', us: 'Bilanciamento calcolato' },
  ],
  stats: [
    { value: '3.000+', label: 'Spirits', detail: 'Con ABV e note degustazione' },
    { value: '15+', label: 'Libri', detail: 'Testi di riferimento mondiali' },
    { value: '700+', label: 'Bar', detail: "World's 50 Best e oltre" },
    { value: '9', label: 'Lingue', detail: 'Voice chat multilingua' },
  ],
  sources: ['Death & Co', 'Liquid Intelligence', 'PDT Cocktail Book', 'Cocktail Codex', "Meehan's Manual", 'Diffords Guide'],
  pricing: [
    { name: 'Free', price: '€0', period: '/sempre', desc: 'Per provare', features: ['10 query gratuite al mese', 'Ricette e tecniche', 'Database spirits'], limits: ['Query limitate', 'No modalità Pro'], cta: 'Inizia gratis' },
    { name: 'Starter', price: '€19', period: '/mese', desc: 'Per chi vuole esplorare', features: ['600 query normali', '100 query Pro (Sonnet)', '30 query Vision (foto bottiglie)', 'Database 3.000+ spirits', '15+ libri di riferimento', 'Voice chat 9 lingue'], cta: 'Prova Starter' },
    { name: 'Pro', price: '€49', period: '/mese', desc: 'Per chi vuole tutto', badge: 'Consigliato', features: ['1.500 query normali', '800 query Pro (Sonnet)', '100 query Vision', 'Accesso API', 'Priority support', 'Aggiornamenti continui'], cta: 'Prova Pro', highlight: true },
  ],
  audiences: [
    { name: 'Home bartender', desc: 'Ti guida passo passo, spiega gli errori comuni, aiuta a scegliere le bottiglie giuste per iniziare.', features: ['Ricette adattate a cosa hai', 'Budget per iniziare', 'Tecniche spiegate semplici'] },
    { name: 'Bartender professionista', desc: 'Calcoli veloci, idee per il menu, come fanno al Connaught? Il tuo secondo cervello dietro al bancone.', features: ['Pre-batch e scaling', 'Signature dei top bar', 'Tecniche avanzate'] },
    { name: 'Curioso', desc: 'Vuoi capire cosa bevi, scoprire nuovi spirits, sapere dove andare quando viaggi?', features: ['Storia dei cocktail', 'Guide ai migliori bar', 'Spirits spiegati'] },
  ],
  faq: [
    { q: 'È diverso da ChatGPT?', a: 'Molto. ChatGPT dà risposte generiche. Cocktail AI è addestrato su fonti professionali: sa il perché delle cose, conosce i pattern dei top bar, crea cocktail originali su brief specifici.' },
    { q: 'Quali fonti usate?', a: "Libri di riferimento (Death & Co, Liquid Intelligence, PDT, Cocktail Codex), database spirits verificati, signature dai World's 50 Best Bars." },
    { q: 'Posso chiedere di vini?', a: 'Certo. Conosce vini, spirits, produttori — anche piccoli come Pippo Greco nel Cilento — abbinamenti cibo-drink, tutto il mondo del beverage.' },
    { q: 'Posso cancellare quando voglio?', a: 'Sì. Un click e via. Nessun vincolo.' },
  ],
  deepDive: {
    q: 'Il mio Negroni mi viene sempre troppo amaro, cosa sbaglio?',
    intro: 'Il Negroni amaro dipende quasi sempre da tre cose specifiche:',
    errors: [
      { title: 'Vermouth sbagliato', problem: 'Molti usano vermouth dry pensando di ridurre l\'amarezza.', fix: 'Usa vermouth DOLCE rosso: Carpano Antica Formula o Cocchi di Torino.' },
      { title: 'Gin troppo secco', problem: 'Un London Dry aggressivo amplifica l\'amarezza del Campari.', fix: 'Prova Hendrick\'s (floreale), Roku (equilibrato), o Bombay Sapphire.' },
      { title: 'Proporzioni', problem: 'Troppo Campari o troppo poco vermouth.', fix: 'Prova 1 oz gin, 0.75 oz Campari, 1.25 oz vermouth. Il "Negroni Soft".' },
    ],
    tip: 'E ricorda: STIRA per 30 secondi, non shakeare. Agitando crei aria e l\'amarezza si esalta.',
    test: 'Test rapido: Roku + Carpano + Campari ridotto. Se così ti piace, hai trovato il problema.'
  },
};

const business = {
  hero: { badge: 'Per bar, ristoranti e hotel', title: 'Il tuo locale. Automatizzato.', sub: 'Gestisci lo stock in tempo reale, crea il menu digitale, lascia che l\'AI assista i clienti al tavolo.', cta: 'Richiedi demo', note: '14 giorni gratis · Setup in 5 minuti' },
  features: [
    { n: '01', title: 'Stock Automatizzato', desc: 'Monitora inventario in tempo reale, ricevi alert sotto-soglia, genera ordini fornitori con un click.' },
    { n: '02', title: 'Menu Digitale', desc: 'QR al tavolo, menu sempre aggiornato, allergeni e descrizioni. Modifica prezzi in massa.' },
    { n: '03', title: 'AI al Tavolo', desc: 'I clienti chattano con un\'AI che conosce IL TUO menu. Upselling intelligente +18% scontrino.' },
    { n: '04', title: 'Consulenza Business', desc: 'Analisi margini, pricing strategy, posizionamento. Come un consulente 24/7.' },
    { n: '05', title: 'Analytics', desc: 'Dashboard vendite real-time, trend per fascia oraria, KPI sempre sotto controllo.' },
  ],
  comparison: [
    { label: 'Stock', them: 'Inserimento manuale', us: 'Tracking automatico + previsioni' },
    { label: 'Menu', them: 'PDF statico', us: 'Digitale + QR + AI' },
    { label: 'Clienti', them: 'Zero interazione', us: 'AI al tavolo 24/7' },
    { label: 'Consulenza', them: '€500/h consulente', us: 'Inclusa nel piano' },
    { label: 'Analytics', them: 'Report base', us: 'Dashboard real-time + insights' },
    { label: 'Setup', them: 'Settimane', us: '5 minuti' },
  ],
  stats: [
    { value: '-30%', label: 'Sprechi', detail: 'Stock management intelligente' },
    { value: '+18%', label: 'Scontrino', detail: 'AI upselling al tavolo' },
    { value: '2 ore', label: 'Risparmiate/giorno', detail: 'Su ordini e inventory' },
    { value: '4.9★', label: 'Rating', detail: 'Soddisfazione clienti' },
  ],
  sources: ['Diageo Bar Academy', 'Tales of the Cocktail', 'Drink International', 'CLASS Magazine', 'Imbibe', 'Diffords Guide'],
  pricing: [
    { name: 'Starter', price: '€79', period: '/mese', desc: 'Per il bar indipendente', features: ['1 sede', 'Menu digitale + QR', 'Stock management base', 'AI al tavolo (500 chat/mese)', 'Support email'], cta: 'Inizia gratis' },
    { name: 'Professional', price: '€199', period: '/mese', desc: 'Per locali strutturati', badge: 'Più scelto', features: ['Fino a 3 sedi', 'Menu digitale illimitato', 'Stock + ordini automatici', 'AI al tavolo illimitata', 'Analytics dashboard', 'Consulenza mensile 1h', 'Priority support'], cta: 'Prova gratis 14 giorni', highlight: true },
    { name: 'Enterprise', price: 'Custom', period: '', desc: 'Per catene e hotel', features: ['Sedi illimitate', 'Integrazione POS/PMS', 'AI personalizzata', 'Consulenza dedicata', 'Account manager', 'SLA garantito', 'API access'], cta: 'Contattaci' },
  ],
  audiences: [
    { name: 'Cocktail bar', desc: 'Menu sempre aggiornato, stock sotto controllo, AI che consiglia i tuoi signature.', features: ['Menu QR dinamico', 'Stock management', 'AI sommelier'] },
    { name: 'Ristorante', desc: 'Integra la drink list con il food menu, suggerimenti abbinamenti, gestione cantina.', features: ['Pairing automatici', 'Gestione cantina', 'Training staff'] },
    { name: 'Hotel & Resort', desc: 'Multi-outlet, multi-lingua, integrazione PMS.', features: ['Multi-sede', '12 lingue', 'Integrazione PMS'] },
  ],
  faq: [
    { q: 'Come funziona l\'AI al tavolo?', a: 'I clienti scansionano un QR e chattano con un\'AI addestrata sul TUO menu. Tu controlli cosa può e non può dire.' },
    { q: 'Si integra con il mio POS?', a: 'Sì, integrazioni con SumUp, Worldline e altri. API complete nel piano Enterprise.' },
    { q: 'Come funziona lo stock automatico?', a: 'Imposti soglie minime, l\'AI monitora le vendite. Alert e ordini con un click.' },
    { q: 'I clienti devono installare qualcosa?', a: 'No. Scansionano il QR, si apre la chat nel browser. Zero friction.' },
  ],
  deepDive: {
    q: 'Vorrei qualcosa di rinfrescante ma non troppo alcolico, cosa mi consigli?',
    intro: 'L\'AI conosce il TUO menu e risponde in base ai TUOI cocktail:',
    errors: [
      { title: 'Analizza la richiesta', problem: 'Rinfrescante + bassa gradazione.', fix: 'Filtra il menu per ABV < 15% e profilo "fresco/agrumato".' },
      { title: 'Suggerisce dal tuo menu', problem: 'Non cocktail generici, ma i TUOI.', fix: '"Ti consiglio il nostro Garden Spritz: cetriolo, elderflower, prosecco. Solo 8% vol."' },
      { title: 'Upselling intelligente', problem: 'Aumenta lo scontrino medio.', fix: '"Vuoi abbinarlo alle nostre olive taggiasche?"' },
    ],
    tip: 'L\'AI è addestrata sul tuo menu, i tuoi prezzi, le tue descrizioni.',
    test: 'Risultato medio: +18% scontrino, -40% domande ripetitive al bancone.'
  },
};

const marqueeNames = ['Negroni','Martini','Old Fashioned','Margarita','Daiquiri','Espresso Martini','Whisky Sour','Mojito'];
const marqueeBarNames = ['Death & Co','Connaught Bar','Paradiso',"Satan's Whiskers",'Tayēr + Elementary','Licorería Limantour','Jigger & Pony','Handshake Speakeasy'];

// ═══════════════════════════ APP ═══════════════════════════
export default function App() {
  const [tab, setTab] = useState('personal');
  const [openFaq, setOpenFaq] = useState(null);
  const d = tab === 'business' ? business : personal;

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ─── NAV ─── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{background:B}}>C</div>
              <span className="font-semibold text-base">Cocktail</span>
            </div>
            <div className="hidden md:flex items-center p-0.5 gap-0.5 rounded-lg bg-gray-100">
              {['personal','business'].map(t=>(
                <button key={t} onClick={()=>setTab(t)} className={`px-3 h-7 text-xs font-medium rounded-md transition-all capitalize ${tab===t?'bg-white shadow-sm text-gray-900 border border-gray-200':'text-gray-500'}`}>{t==='personal'?'Personal':'Business'}</button>
              ))}
            </div>
            <a href="#pricing" className="hidden md:block text-sm text-gray-500 hover:text-gray-900">Prezzi</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900 hidden sm:block">Accedi</a>
            <button className="h-8 px-4 rounded-lg text-white text-xs font-medium flex items-center gap-1.5" style={{background:B}}>Prova gratis <Arrow/></button>
          </div>
        </div>
      </nav>

      {/* ─── HERO + PLASMA ─── */}
      <section className="relative overflow-hidden">
        <PlasmaBackground />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-6" style={{background:B_BG, color:B, border:`1px solid ${B_BORDER}`}}>{d.hero.badge}</span>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.1] mb-6">{d.hero.title}</h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8 leading-relaxed">{d.hero.sub}</p>
          <button className="h-11 px-6 rounded-lg text-white font-medium inline-flex items-center gap-2" style={{background:B}}>{d.hero.cta} <Arrow/></button>
          <p className="text-sm text-gray-400 mt-4">{d.hero.note}</p>
        </div>
      </section>

      {/* ─── CONVERSATION MOCKUP (personal only) ─── */}
      {tab === 'personal' && (
        <section className="py-20 px-6" style={{background:B_BG}}>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4">
              {/* User bubble */}
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100 max-w-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">U</div>
                  <span className="text-xs text-gray-400">Tu chiedi:</span>
                </div>
                <p className="text-sm text-gray-800 leading-relaxed">{personal.conversation.question}</p>
              </div>
              {/* AI response */}
              <div className="bg-white rounded-2xl p-5 shadow-lg max-w-md ml-4" style={{border:`1px solid ${B_BORDER}`}}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold" style={{background:B}}>C</div>
                  <span className="text-xs font-medium" style={{color:B}}>Cocktail AI</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{personal.conversation.title}</h4>
                <div className="space-y-1.5 mb-4">
                  {personal.conversation.ingredients.map((ing,i)=>(
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:B}}/>{ing}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 italic pt-3 border-t border-gray-100">{personal.conversation.footer}</p>
              </div>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{color:B}}>Vedi come funziona</span>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-4 leading-tight">Chiedi qualsiasi cosa.<br/>Ottieni risposte da esperto.</h2>
              <p className="text-gray-600 leading-relaxed">Non risposte generiche. Conoscenza profonda con ingredienti territoriali, tecniche specifiche, e il perché dietro ogni scelta.</p>
            </div>
          </div>
        </section>
      )}

      {/* ─── FEATURES GRID ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{color:B}}>Esplora</span>
            <h2 className="text-3xl sm:text-4xl font-semibold">{tab==='business'?'Strumenti per far crescere il tuo locale.':'Dalla tecnica specifica alla curiosità più strana.'}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {d.features.map((f,i)=>(
              <div key={i} className={`rounded-2xl p-6 border transition-all hover:shadow-md ${i===0?'sm:col-span-2 lg:col-span-2':''}`} style={i===d.features.length-1?{background:B_BG,borderColor:B_BORDER}:{borderColor:'#e4e4e7'}}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{background:B}}>{f.n}</span>
                  <h3 className="font-semibold">{f.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEEP DIVE ─── */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{color:B}}>Risposte vere, non generiche</span>
            <h2 className="text-3xl sm:text-4xl font-semibold">Conoscenza da esperto.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Question */}
            <div className="rounded-2xl p-6" style={{background:B_BG,border:`1px solid ${B_BORDER}`}}>
              <div className="flex items-start gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-500 shrink-0">U</div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tu chiedi:</p>
                  <p className="text-base font-medium leading-relaxed">"{d.deepDive.q}"</p>
                </div>
              </div>
            </div>
            {/* Answer */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"/>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400"/>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[8px] font-bold" style={{background:B}}>C</div>
                  <span className="text-xs font-medium text-gray-600">Cocktail AI</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{background:B_BG,color:B}}>Pro</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-700 mb-4">{d.deepDive.intro}</p>
                <div className="space-y-3 mb-4">
                  {d.deepDive.errors.map((e,i)=>(
                    <div key={i} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{background:B}}>{i+1}</div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1">{e.title}</h4>
                          <p className="text-xs text-gray-500 mb-1">{e.problem}</p>
                          <div className="flex items-start gap-1.5"><Check/><p className="text-xs text-gray-800">{e.fix}</p></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg p-3 text-xs text-gray-700" style={{background:B_BG,border:`1px solid ${B_BORDER}`}}>💡 {d.deepDive.tip}</div>
                <p className="text-xs text-gray-400 mt-3">🧪 {d.deepDive.test}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COMPARISON ─── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{color:B}}>La differenza</span>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-3">{tab==='business'?'Non è un gestionale. È il tuo partner.':'Non è ChatGPT. È un esperto di mixology.'}</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50">
              <div className="p-3 text-xs font-medium text-gray-500"></div>
              <div className="p-3 text-xs font-medium text-gray-400 text-center border-l border-gray-200">{tab==='business'?'Gestionale':'ChatGPT'}</div>
              <div className="p-3 text-xs font-medium text-center border-l border-gray-200" style={{color:B}}>Cocktail AI</div>
            </div>
            {d.comparison.map((r,i)=>(
              <div key={i} className="grid grid-cols-3 border-b border-gray-100 last:border-0">
                <div className="p-3 text-sm font-medium">{r.label}</div>
                <div className="p-3 text-sm text-gray-400 text-center border-l border-gray-100">{r.them}</div>
                <div className="p-3 text-sm text-gray-900 text-center border-l border-gray-100 font-medium">{r.us}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{color:B}}>I numeri</span>
            <h2 className="text-3xl sm:text-4xl font-semibold">{tab==='business'?'Risultati dei nostri clienti':'Da dove arriva tutto questo'}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {d.stats.map((s,i)=>(
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <p className="text-3xl font-bold mb-1">{s.value}</p>
                <p className="text-sm font-medium mb-0.5">{s.label}</p>
                <p className="text-xs text-gray-500">{s.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {d.sources.map((s,i)=><span key={i} className="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-xs">{s}</span>)}
          </div>
        </div>
      </section>

      {/* ─── AUDIENCES ─── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{color:B}}>Per tutti</span>
            <h2 className="text-3xl sm:text-4xl font-semibold">{tab==='business'?'Dal cocktail bar all\'hotel 5 stelle.':'Appassionato o professionista.'}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {d.audiences.map((a,i)=>(
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="font-semibold mb-2">{a.name}</h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{a.desc}</p>
                <ul className="space-y-1.5">
                  {a.features.map((f,j)=><li key={j} className="flex items-center gap-2 text-xs text-gray-500"><Check/>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="pricing" className="py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{color:B}}>Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-semibold">{tab==='business'?'Piani per ogni dimensione':'Semplice, senza sorprese'}</h2>
          </div>
          <div className={`grid gap-4 ${d.pricing.length===3?'md:grid-cols-3':'md:grid-cols-2'}`}>
            {d.pricing.map((p,i)=>(
              <div key={i} className={`bg-white rounded-2xl p-6 border ${p.highlight?'shadow-lg':'border-gray-200'}`} style={p.highlight?{borderColor:B,borderWidth:'2px'}:{}}>
                {p.badge&&<span className="inline-block px-2.5 py-1 rounded-full text-white text-[10px] font-medium mb-3" style={{background:B}}>{p.badge}</span>}
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{p.desc}</p>
                <div className="mb-5"><span className="text-3xl font-bold">{p.price}</span><span className="text-sm text-gray-500">{p.period}</span></div>
                <ul className="space-y-2.5 mb-6">
                  {p.features.map((f,j)=><li key={j} className="flex items-start gap-2 text-sm"><span className="text-green-500 mt-0.5">✓</span>{f}</li>)}
                  {p.limits?.map((f,j)=><li key={`l${j}`} className="flex items-start gap-2 text-sm text-gray-400"><span className="mt-0.5">✗</span>{f}</li>)}
                </ul>
                <a href="#" className={`flex items-center justify-center gap-2 h-10 rounded-lg text-sm font-medium transition-all ${p.highlight?'text-white':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} style={p.highlight?{background:B}:{}}>{p.cta}{p.highlight&&<Arrow/>}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider mb-3 block" style={{color:B}}>FAQ</span>
            <h2 className="text-3xl font-semibold">Domande frequenti</h2>
          </div>
          <div className="space-y-3">
            {d.faq.map((f,i)=>(
              <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                  <span className="text-sm font-medium">{f.q}</span>
                  <span className="text-gray-400 text-lg ml-3">{openFaq===i?'−':'+'}</span>
                </button>
                {openFaq===i&&<div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ─── */}
      <section className="py-10 overflow-hidden border-y border-gray-100">
        <div className="flex w-max animate-marquee">
          {[...Array(2)].map((_,i)=><div key={i} className="flex items-center">{marqueeNames.map((n,j)=><span key={j} className="mx-8 text-2xl font-semibold text-gray-200 whitespace-nowrap">{n}</span>)}</div>)}
        </div>
      </section>

      <section className="py-6 overflow-hidden">
        <div className="flex w-max animate-marquee-reverse">
          {[...Array(2)].map((_,i)=><div key={i} className="flex items-center">{marqueeBarNames.map((n,j)=><span key={j}><span className="mx-6 text-base text-gray-400 whitespace-nowrap">{n}</span><span className="mx-3" style={{color:B}}>✦</span></span>)}</div>)}
        </div>
      </section>

      {/* ─── CTA FINALE ─── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">{tab==='business'?'Pronto a trasformare il tuo locale?':'Pronto a bere meglio?'}</h2>
          <p className="text-gray-500 mb-8">{tab==='business'?'Stock automatico, menu digitale, AI al tavolo.':'10 query gratuite. Poi decidi tu.'}</p>
          <button className="h-11 px-6 rounded-lg text-white font-medium inline-flex items-center gap-2" style={{background:B}}>{d.hero.cta} <Arrow/></button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{background:B}}>C</div>
            <span className="font-semibold text-sm">Cocktail AI</span>
          </div>
          <p className="text-xs text-gray-500">Fatto con passione per chi ama bere bene</p>
          <p className="text-xs text-gray-400">© 2026 Cocktail AI</p>
        </div>
      </footer>
    </div>
  );
}
