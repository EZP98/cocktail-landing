import { useState } from 'react';
import PlasmaBackground from './PlasmaBackground';

// Brand color: #FF6128 (matching the real app)
const BRAND = '#FF6128';
const BRAND_BG = '#FFF3ED';
const BRAND_BORDER = 'rgba(255, 97, 40, 0.15)';

export default function App() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');

  // ==================== CONTENUTI PERSONAL ====================
  const content = {
    nav: {
      personal: 'Personal',
      business: 'Business',
      pricing: 'Prezzi',
      login: 'Accedi',
      cta: 'Prova gratis'
    },

    hero: {
      badge: 'Il tuo esperto di mixology',
      title: 'Chiedi. Scopri. Mixa.',
      subtitle: 'Basta scrollare ricette generiche. Chiedi quello che vuoi sapere sul bere bene — dai cocktail agli spirits, dai vini ai bar migliori — e ricevi risposte da esperto.',
      cta: 'Inizia gratis',
      ctaNote: '10 query gratuite • Nessuna carta richiesta'
    },

    heroExample: {
      badge: 'Vedi come funziona',
      question: 'Devo creare un cocktail signature per un evento a tema Costiera Amalfitana. Quali ingredienti rappresentano quel territorio?',
      answer: {
        title: 'Costa Dorata',
        intro: 'La Costiera offre una palette di sapori unici. Ecco un cocktail che racconta quel territorio:',
        ingredients: [
          '50ml Gin mediterraneo',
          '20ml Limoncello di Sfusato Amalfitano',
          '15ml Sciroppo di basilico fresco',
          '10ml Succo fresco di limone sfusato',
          '3 gocce di colatura di alici (si, hai letto bene!)',
          'Prosecco per allungare'
        ],
        concept: 'La colatura di alici dona una nota umami che bilancia perfettamente la dolcezza. Un viaggio sensoriale nella Divina.',
      }
    },

    themes: [
      {
        id: 'ricette',
        icon: '1',
        title: 'Ricette e Tecniche',
        subtitle: 'Come si fa, perche si fa cosi',
        examples: [
          { question: 'Perche alcuni drink si shakenano e altri si stirrano?', answer: "La regola d'oro: SHAKE quando hai succhi, uova, panna. STIR quando hai solo spiriti. Lo shake crea aerazione e emulsione, lo stir mantiene la chiarezza e la texture liscia dei cocktail spirit-forward come Martini e Negroni.", detail: 'Se shakeri un Martini lo rendi torbido. Se stiri un Daiquiri rimane separato.' },
          { question: 'Come fare un super juice di limone con acido citrico?', answer: 'Grattugia le bucce di 8-10 limoni (solo giallo, no albedo). Infusione in 400ml acqua per 4-6 ore. Filtra. Aggiungi 5-7g acido citrico sciolto. Il risultato dura 3-4 settimane invece di 2.', detail: 'Per piu complessita: usa mix di acido citrico (4g) + malico (3g).' },
          { question: 'Devo fare il pre-batch di un drink con ginger beer, come gestisco la carbonazione?', answer: 'NON mettere la ginger beer nel batch. Prepara tutto il resto, conserva in frigo (dura 3-4 giorni). Aggiungi la ginger beer SOLO al momento del servizio.', detail: 'Se proprio devi: aggiungila 15-20 min prima del servizio, non ore prima.' }
        ]
      },
      {
        id: 'spirits',
        icon: '2',
        title: 'Spirits e Ingredienti',
        subtitle: 'Ogni bottiglia ha una storia',
        examples: [
          { question: "Cos'e lo Shochu giapponese e come si differenzia dal sake?", answer: "Lo Shochu e un DISTILLATO (25% ABV), il Sake e un FERMENTATO (16% ABV). Lo Shochu sta al Sake come il brandy sta al vino.", detail: 'Nei cocktail: prova a sostituire vodka o gin con Shochu.' },
          { question: 'Voglio fare un Penicillin ma non ho Islay scotch. Cosa posso usare?', answer: "L'Islay nel Penicillin non e la base, e un elemento di carattere. Usa uno scotch dolce come Cardhu 12 per la base, poi aggiungi 0.25 oz di pimento dram per le note speziate-affumicate.", detail: "Alternativa: Mezcal al posto dell'Islay." },
          { question: 'Cosa mi sai dire del Salecaro di Pippo Greco?', answer: 'Fiano 100% dal Cilento, Agropoli (SA). Giallo paglierino con lampi verdognoli. Profumo: agrumi, mela, pera, ginestra. In bocca: affilato, polposo, finale lungo. ~12 euro.', detail: 'Pippo Greco ha sostituito gli uliveti di famiglia con vigne. 3 ettari vitati.' }
        ]
      },
      {
        id: 'abbinamenti',
        icon: '3',
        title: 'Abbinamenti',
        subtitle: 'Cibo + drink, occasione + cocktail',
        examples: [
          { question: "Ho ospiti a cena, mangiamo acciughe del Cantabrico e jamon iberico. Che aperitivo?", answer: "Con ingredienti salati e umami, serve qualcosa di SECCO, MINERALE, leggermente AMARO. Proposta: Garibaldi rivisitato — 1 oz Campari, 2 oz succo arancia fresca, 0.5 oz vermouth secco.", detail: 'Alternativa: Melon y Jamon ispirato ad Angelita, Madrid.' },
          { question: 'Ho 100 euro per iniziare un home bar. Quali bottiglie compro?', answer: '6 bottiglie per fare 50+ cocktail: Beefeater Gin (16 euro), Martini Rosso (10 euro), Martini Extra Dry (10 euro), Bacardi Carta Blanca (13 euro), Jim Beam (16 euro), Campari (10 euro). Tot: 75 euro. Con 25 euro prendi shaker, jigger, bar spoon e Angostura.', detail: 'Cosa NON comprare ancora: Tequila, Vodka, amari speciali.' },
          { question: 'Quanta tonica mi serve per una bottiglia di gin da 75cl?', answer: 'Con proporzione classica 1:2 (50ml gin : 100ml tonica), da 750ml fai 15 gin tonic. Ti servono 1,5 litri di tonica.', detail: 'Consiglio: compra una bottiglia extra. I gin tonic finiscono sempre prima del previsto.' }
        ]
      },
      {
        id: 'signature',
        icon: '4',
        title: 'Crea il tuo Signature',
        subtitle: 'Dagli un brief, ti propone qualcosa di unico',
        examples: [
          { question: 'Un drink amaricante con retrogusto affumicato e vegetale', answer: 'VERDANT SMOKE — 45ml whisky torbato Islay, 30ml Amaro Montenegro, 15ml vermouth secco, 2 dash Angostura, 1 dash Fernet-Branca. Stirred, rocks glass, twist di limone affumicato.', detail: 'Filosofia Death & Co: base spirit caratterizzata + elemento amaro + vermouth e bitter.' },
          { question: 'Cocktail per evento tema Costiera Amalfitana', answer: 'COSTA DORATA — 50ml gin mediterraneo, 20ml limoncello di Sfusato, 15ml sciroppo basilico, 10ml succo limone, 3 gocce colatura di alici, top prosecco.', detail: 'La colatura di alici sembra folle ma dona umami che bilancia la dolcezza.' },
          { question: "Qualcosa di tropicale ma non banale per l'estate", answer: 'Prova un Jungle Bird rivisitato: rum giamaicano, Campari, succo ananas, lime, sciroppo orgeat. L\'amaro del Campari taglia la dolcezza tropicale.', detail: 'Il Jungle Bird originale e del 1978, Kuala Lumpur Hilton.' }
        ]
      },
      {
        id: 'bars',
        icon: '5',
        title: 'I Migliori Bar',
        subtitle: 'Conosce i top 700+ e cosa ordinare',
        examples: [
          { question: 'Parlami del Paradiso di Barcellona', answer: "Speakeasy nascosto dietro un negozio di pastrami (entri dalla porta del frigo). Fondato da Giacomo Giannotti. Attualmente #1 al mondo secondo World's 50 Best Bars. Menu con drink come esperienze multisensoriali.", detail: 'Signature da provare: The Cloud, Kriptonita, Supercool Martini.' },
          { question: 'Vado a Londra, quali bar devo visitare?', answer: "Satan's Whiskers (Bethnal Green) — #1 UK. Connaught Bar (Mayfair) — martini dal carrello. Tayer + Elementary (Shoreditch) — One Sip Martini a 4 sterline. Amaro (Kensington) — guava pisco sour.", detail: 'Anche: Eve (Covent Garden), The Aubrey (Knightsbridge), Kwant (Mayfair).' },
          { question: 'Chi ha creato il Porn Star Martini?', answer: "Douglas Ankrah, bartender ghanese di Londra, 2002 al LAB Bar. L'idea gli venne in un locale di striptease a Cape Town. Ricetta: vodka vaniglia, Passoa, passion fruit. Lo champagne si beve DOPO il frutto, PRIMA del cocktail.", detail: 'Ankrah e scomparso nel 2021. Il drink e entrato nella lista IBA dei classici nel 2024.' }
        ]
      }
    ],

    whyDifferent: {
      badge: 'Perche e diverso',
      title: 'Non risposte. Conversazioni.',
      subtitle: 'Ecco cosa succede quando chiedi qualcosa:',
      cards: [
        {
          category: 'Tecniche',
          title: 'Shake vs Stir',
          intro: "La differenza tra shakeare e stirrare non e solo una questione di movimento. Quando shakeri, incorpori aria e crei una texture piu leggera. Quando stirri, mantieni la limpidezza e la densita degli spirits. La diluizione cambia: 25% con lo shake, 15% con lo stir.",
          points: [
            { label: 'Shake', desc: 'con succhi, sciroppi, uova' },
            { label: 'Stir', desc: 'solo spirits, niente torbidita' },
            { label: 'Diluizione', desc: 'shake 25%, stir 15%' },
            { label: 'Temperatura', desc: 'shake piu freddo' }
          ],
          tip: 'Un Martini shakerato diventa "bruised" — perde eleganza e limpidezza.'
        },
        {
          category: 'Diagnosi',
          title: 'Negroni troppo amaro',
          intro: "Se il tuo Negroni risulta troppo amaro, il problema e quasi sempre in uno di questi tre punti. Non e il Campari il colpevole — e il bilanciamento. Anche il ghiaccio conta: cubetti vecchi diluiscono male.",
          points: [
            { label: 'Troppo Campari', desc: 'prova 25ml invece di 30' },
            { label: 'Ghiaccio vecchio', desc: 'diluisce male' },
            { label: 'Vermouth ossidato', desc: 'dura 4 settimane' },
            { label: 'Gin sbagliato', desc: 'serve London Dry' }
          ],
          tip: 'Trucco pro: aggiungi 1 barspoon di sciroppo 2:1 per bilanciare.'
        },
        {
          category: 'Bar Guide',
          title: 'Londra: dove bere',
          intro: "Londra ha la scena cocktail piu competitiva al mondo. Al Connaught Bar ordina il Martini al carrello. Al Tayer + Elementary prova i 'One Sip' a 4 sterline. Satan's Whiskers e il bar di quartiere con la Margarita migliore della citta.",
          points: [
            { label: 'Connaught Bar', desc: 'Martini al carrello' },
            { label: 'Tayer + Elementary', desc: 'One Sip a 4 sterline' },
            { label: "Satan's Whiskers", desc: 'la Margarita' },
            { label: 'Swift', desc: 'whisky selection' }
          ],
          tip: 'Prenota Connaught con anticipo. Gli altri vanno bene walk-in.'
        },
        {
          category: 'Spirits',
          title: 'Sake vs Shochu',
          intro: "Sake e Shochu sono entrambi giapponesi, ma completamente diversi. Il Sake e fermentato dal riso (~15% ABV). Lo Shochu e distillato (25-35% ABV), puo essere fatto da riso, orzo (mugi), patata dolce (imo).",
          points: [
            { label: 'Sake', desc: 'fermentato, ~15% ABV' },
            { label: 'Shochu', desc: 'distillato, 25-35% ABV' },
            { label: 'Imo', desc: 'da patata dolce, terroso' },
            { label: 'Mugi', desc: 'da orzo, piu morbido' }
          ],
          tip: 'Per cocktail, prova Mugi Shochu in un Highball con soda e limone.'
        }
      ]
    },

    expertQuestions: {
      badge: 'Profondita',
      title: 'Non ricette banali. Domande da esperti.',
      subtitle: 'Ecco il tipo di domande che puoi fare — e il livello di risposta che ricevi.',
      questions: [
        { q: 'Gin mediterraneo vs nordico per un Negroni?', a: 'Confronta profili aromatici e suggerisce abbinamenti specifici per il tuo palato.' },
        { q: 'Quanto costava un Daiquiri nel 1920?', a: "Conosce la storia E fa calcoli contestualizzati al potere d'acquisto dell'epoca." },
        { q: 'Spirit giapponese sotto 40% per drink affumicato?', a: 'Ricerca su 3.000+ spirits per profilo aromatico, ABV, origine geografica.' }
      ]
    },

    comparison: {
      badge: 'La differenza',
      title: 'Non e ChatGPT. E un esperto di mixology.',
      subtitle: 'Risposte verificate da fonti professionali, non ricette copiate da blog generici.',
      competitor: 'ChatGPT',
      rows: [
        { label: 'Ricette', competitor: 'Generiche', us: 'Database verificato' },
        { label: 'Fonti', competitor: 'Internet generico', us: 'Death & Co, PDT, Diffords...' },
        { label: 'Spirits', competitor: 'Info base', us: '3.000+ con note degustazione' },
        { label: 'Tecniche', competitor: 'Teoria', us: 'Il perche + errori comuni' },
        { label: 'Bar guide', competitor: '—', us: '700+ bar, cosa ordinare' },
        { label: 'Creazione signature', competitor: 'Ricette casuali', us: 'Bilanciamento calcolato' }
      ]
    },

    audiences: {
      badge: 'Per tutti i livelli',
      title: "Appassionato o professionista, c'e qualcosa per te.",
      subtitle: 'Che tu stia iniziando o che lavori dietro un bancone, Cocktail AI si adatta al tuo livello.',
      cards: [
        {
          name: 'Home bartender',
          desc: 'Vuoi fare cocktail migliori a casa? Ti guida passo passo, ti spiega gli errori comuni, ti aiuta a scegliere le bottiglie giuste per iniziare.',
          features: ['Ricette adattate a cosa hai', 'Budget per iniziare', 'Tecniche spiegate semplici']
        },
        {
          name: 'Bartender professionista',
          desc: 'Calcoli veloci, idee per il menu, come fanno al Connaught? Il tuo secondo cervello dietro al bancone.',
          features: ['Pre-batch e scaling istantanei', 'Signature dei top bar', 'Tecniche avanzate']
        },
        {
          name: 'Curioso',
          desc: 'Vuoi capire cosa bevi, scoprire nuovi spirits, sapere dove andare quando viaggi? Chiedi qualsiasi cosa.',
          features: ['Storia dei cocktail', 'Guide ai migliori bar', 'Spirits spiegati']
        }
      ]
    },

    deepDive: {
      badge: 'Risposte vere, non generiche',
      title: 'Conoscenza da esperto.',
      subtitle: 'Quando chiedi qualcosa di tecnico:',
      question: 'Il mio Negroni mi viene sempre troppo amaro, cosa sbaglio?',
      answer: {
        intro: 'Il Negroni amaro dipende quasi sempre da tre cose specifiche:',
        errors: [
          {
            title: 'Vermouth sbagliato',
            problem: 'Molti usano vermouth dry o bianco pensando di ridurre l\'amarezza.',
            solution: 'Usa vermouth DOLCE rosso: Carpano Antica Formula o Cocchi di Torino.'
          },
          {
            title: 'Gin troppo secco',
            problem: "Un London Dry aggressivo amplifica l'amarezza del Campari.",
            solution: "Prova Hendrick's (floreale), Roku (equilibrato), o Bombay Sapphire."
          },
          {
            title: 'Proporzioni',
            problem: 'Troppo Campari o troppo poco vermouth.',
            solution: 'Prova 1 oz gin, 0.75 oz Campari, 1.25 oz vermouth. Il "Negroni Soft".'
          }
        ],
        technique: "E ricorda: STIRA per 30 secondi, non shakeare. Agitando crei aria e l'amarezza si esalta.",
        test: 'Test rapido: Roku + Carpano + Campari ridotto. Se cosi ti piace, hai trovato il problema.'
      }
    },

    credibility: {
      title: 'Da dove arriva tutto questo',
      subtitle: 'Fonti autorevoli, non blog random.',
      stats: [
        { value: '3.000+', label: 'Spirits', detail: 'Con ABV e note di degustazione' },
        { value: '15+', label: 'Libri', detail: 'Testi di riferimento mondiali' },
        { value: '700+', label: 'Bar', detail: "World's 50 Best e oltre" },
        { value: '9', label: 'Lingue', detail: 'Voice chat multilingua' }
      ],
      sources: [
        'Death & Co',
        'Liquid Intelligence',
        'PDT Cocktail Book',
        'Cocktail Codex',
        'Meehan\'s Manual',
        'Diffords Guide'
      ]
    },

    pricing: {
      title: 'Semplice, senza sorprese',
      subtitle: 'Prova gratis, poi decidi.',
      plans: [
        {
          name: 'Free',
          price: '0',
          period: '/sempre',
          desc: 'Per provare',
          features: [
            '10 query gratuite al mese',
            'Ricette e tecniche',
            'Database spirits'
          ],
          limitations: [
            'Query limitate',
            'No modalita Pro'
          ],
          cta: 'Inizia gratis',
          highlight: false
        },
        {
          name: 'Starter',
          price: '19',
          period: '/mese',
          desc: 'Per chi vuole esplorare',
          features: [
            '600 query normali',
            '100 query Pro (Sonnet)',
            '30 query Vision (foto bottiglie)',
            'Database completo 3.000+ spirits',
            '15+ libri di riferimento',
            'Voice chat 9 lingue'
          ],
          cta: 'Prova Starter',
          highlight: false
        },
        {
          name: 'Pro',
          price: '49',
          period: '/mese',
          desc: 'Per chi vuole tutto',
          badge: 'Consigliato',
          features: [
            '1.500 query normali',
            '800 query Pro (Sonnet)',
            '100 query Vision',
            'Accesso API',
            'Priority support',
            'Aggiornamenti continui'
          ],
          cta: 'Prova Pro',
          highlight: true
        }
      ]
    },

    faq: {
      title: 'Domande frequenti',
      items: [
        {
          q: 'E diverso da ChatGPT?',
          a: "Molto. ChatGPT da risposte generiche. Cocktail AI e addestrato su fonti professionali: sa il perche delle cose, conosce i pattern dei top bar, crea cocktail originali su brief specifici."
        },
        {
          q: 'Quali fonti usate?',
          a: "Libri di riferimento (Death & Co, Liquid Intelligence, PDT, Cocktail Codex), database spirits verificati, signature dai World's 50 Best Bars, aggiornamenti continui."
        },
        {
          q: 'Posso chiedere di vini?',
          a: "Certo. Conosce vini, spirits, produttori — anche piccoli come Pippo Greco nel Cilento — abbinamenti cibo-drink, tutto il mondo del beverage."
        },
        {
          q: 'Posso cancellare quando voglio?',
          a: "Si. Un click e via. Nessun vincolo."
        }
      ]
    },

    finalCta: {
      title: 'Pronto a bere meglio?',
      subtitle: '10 query gratuite. Poi decidi tu.',
      cta: 'Inizia gratis'
    },

    footer: {
      madeWith: 'Fatto con passione per chi ama bere bene',
      copy: '© 2026 Cocktail AI'
    }
  };

  // ==================== CONTENUTI BUSINESS ====================
  const businessContent = {
    nav: content.nav,
    hero: {
      badge: 'Per bar, ristoranti e hotel',
      title: 'Il tuo locale. Automatizzato.',
      subtitle: 'Gestisci lo stock in tempo reale, crea e pubblica il tuo menu digitale, lascia che l\'AI assista i clienti al tavolo. Il futuro del tuo bar e qui.',
      cta: 'Richiedi demo',
      ctaNote: '14 giorni gratis • Setup in 5 minuti'
    },
    heroExample: {
      badge: 'Vedi come funziona',
      question: 'Mostrami lo stato dello stock e suggerisci cosa ordinare questa settimana.',
      answer: {
        title: 'Stock Report',
        intro: 'Ecco la situazione attuale del tuo inventario:',
        ingredients: [
          'Campari — 2 bottiglie (sotto soglia minima)',
          'Lime freschi — 12 pezzi (finiscono domani)',
          'Gin Tanqueray — 8 bottiglie (ok per 2 settimane)',
          'Vermouth Rosso — 5 bottiglie (ok)',
          'Sciroppo orgeat — ESAURITO',
          'Ordine suggerito: 340 euro per 10 giorni'
        ],
        concept: 'Basandomi sulle vendite degli ultimi 30 giorni, ti consiglio di ordinare entro mercoledi per evitare rotture di stock nel weekend.',
      }
    },
    themes: [
      {
        id: 'stock', icon: '1', title: 'Stock Automatizzato',
        examples: [
          { question: 'Quanto Campari mi serve per il weekend?', answer: 'Calcolo basato su storico vendite e prenotazioni.', detail: 'Previsione: 4.5 bottiglie.' },
          { question: 'Alert quando finisce qualcosa', answer: 'Notifiche automatiche sotto soglia minima.', detail: 'Configura le soglie per prodotto.' },
          { question: 'Genera ordine fornitore', answer: 'Lista ottimizzata con quantita e costi.', detail: 'Export PDF o invio diretto.' }
        ]
      },
      {
        id: 'menu', icon: '2', title: 'Menu Digitale',
        examples: [
          { question: 'Crea pagina per il mio signature', answer: 'Genera descrizione, foto placeholder, pricing.', detail: 'Pubblica con un click.' },
          { question: 'QR code per ogni tavolo', answer: 'Menu consultabile da smartphone.', detail: 'I clienti vedono ingredienti e allergeni.' },
          { question: 'Aggiorna prezzi in massa', answer: 'Modifica tutti i cocktail del +5% in un click.', detail: 'Storico modifiche salvato.' }
        ]
      },
      {
        id: 'ai-tavolo', icon: '3', title: 'AI al Tavolo',
        examples: [
          { question: 'Il cliente chiede un drink dolce senza vodka', answer: "L'AI suggerisce dal TUO menu, non generico.", detail: 'Conosce i tuoi cocktail.' },
          { question: 'Che gin usate nel Negroni?', answer: 'Risponde con le info del tuo locale.', detail: 'Addestrato sui tuoi dati.' },
          { question: 'Posso avere la ricetta?', answer: 'Condivide solo cio che vuoi rendere pubblico.', detail: 'Tu controlli cosa mostrare.' }
        ]
      },
      {
        id: 'consulenza', icon: '4', title: 'Consulenza Business',
        examples: [
          { question: 'Come migliorare il margine del 10%?', answer: 'Analisi menu, pricing, fornitori alternativi.', detail: "Piano d'azione concreto." },
          { question: 'Voglio aprire un secondo locale', answer: 'Checklist, budget, errori da evitare.', detail: 'Basato su casi reali.' },
          { question: 'Il mio bar non attira under 30', answer: 'Strategie di posizionamento e comunicazione.', detail: 'Trend e preferenze per target.' }
        ]
      },
      {
        id: 'analytics', icon: '5', title: 'Analytics',
        examples: [
          { question: 'Qual e il mio cocktail piu venduto?', answer: 'Dashboard con vendite, margini, trend.', detail: 'Dati in tempo reale.' },
          { question: 'A che ora vendo piu Spritz?', answer: 'Analisi per fascia oraria e giorno.', detail: 'Ottimizza il personale.' },
          { question: 'Confronto con mese scorso', answer: 'Report automatici settimanali/mensili.', detail: 'KPI sempre sotto controllo.' }
        ]
      }
    ],
    whyDifferent: {
      badge: 'La piattaforma',
      title: "Tutto sotto controllo. In un'unica dashboard.",
      subtitle: 'Stock, menu, clienti, analytics. Vedi tutto, gestisci tutto, da un solo posto.',
      cards: [
        { category: 'Stock', title: 'Inventario in tempo reale', type: 'stock-dashboard', description: 'Sai sempre cosa hai, cosa sta finendo, cosa ordinare. Zero sorprese, zero sprechi.' },
        { category: 'Menu', title: 'Menu editor', type: 'menu-editor', description: 'Aggiungi drink, modifica prezzi, attiva happy hour. Tutto in tempo reale, su ogni tavolo.' },
        { category: 'Analytics', title: 'Vendite e trend', type: 'analytics', description: 'Qual e il drink piu venduto? A che ora? Quanto margine fa? Risposte immediate.' },
        { category: 'Clienti', title: 'AI al tavolo', type: 'customer-chat', description: "I clienti scansionano, chattano, ordinano. L'AI conosce il tuo menu e fa upselling per te." }
      ]
    },
    expertQuestions: {
      badge: "Casi d'uso",
      title: 'Domande che i tuoi competitor non possono fare.',
      subtitle: 'Ecco cosa chiedono i bar manager che usano Cocktail AI:',
      questions: [
        { q: 'Quanto Campari mi serve per il weekend con 200 coperti prenotati?', a: 'Calcolo basato su storico vendite, prenotazioni e stagionalita.' },
        { q: 'Il mio Espresso Martini ha food cost troppo alto, come lo abbasso?', a: 'Analisi ingredienti, alternative, ottimizzazione senza perdere qualita.' },
        { q: 'Crea un menu estivo con margine minimo 75%', a: 'Genera 6 proposte con ingredienti, costi, pricing suggerito.' }
      ]
    },
    comparison: {
      badge: 'Il confronto',
      title: 'Non e un gestionale. E il tuo partner.',
      subtitle: 'La differenza tra Cocktail AI Business e le soluzioni tradizionali.',
      competitor: 'Gestionale tradizionale',
      rows: [
        { label: 'Stock', competitor: 'Inserimento manuale', us: 'Tracking automatico + previsioni' },
        { label: 'Menu', competitor: 'PDF statico', us: 'Digitale + QR + AI' },
        { label: 'Clienti', competitor: 'Zero interazione', us: 'AI al tavolo 24/7' },
        { label: 'Consulenza', competitor: '500 euro/h consulente', us: 'Inclusa nel piano' },
        { label: 'Analytics', competitor: 'Report base', us: 'Dashboard real-time + insights' },
        { label: 'Setup', competitor: 'Settimane', us: '5 minuti' }
      ]
    },
    audiences: {
      badge: 'Per ogni tipo di locale',
      title: "Dal cocktail bar all'hotel 5 stelle.",
      subtitle: 'Cocktail AI Business si adatta alla tua realta.',
      cards: [
        { name: 'Cocktail bar', desc: 'Menu sempre aggiornato, stock sotto controllo, AI che consiglia i tuoi signature.', features: ['Menu QR dinamico', 'Stock management', 'AI sommelier'] },
        { name: 'Ristorante', desc: 'Integra la drink list con il food menu, suggerimenti abbinamenti, gestione cantina.', features: ['Pairing automatici', 'Gestione cantina', 'Training staff'] },
        { name: 'Hotel & Resort', desc: 'Multi-outlet, multi-lingua, integrazione PMS. Esperienza consistente in ogni punto vendita.', features: ['Multi-sede', '12 lingue', 'Integrazione PMS'] }
      ]
    },
    deepDive: {
      badge: "Vedi l'AI in azione",
      title: "Il cliente scansiona. L'AI risponde.",
      subtitle: 'Ecco cosa succede quando un cliente usa il QR al tavolo:',
      question: 'Vorrei qualcosa di rinfrescante ma non troppo alcolico, cosa mi consigli?',
      answer: {
        intro: "L'AI conosce il TUO menu e risponde in base ai TUOI cocktail:",
        errors: [
          { title: 'Analizza la richiesta', problem: 'Il cliente vuole: rinfrescante + bassa gradazione.', solution: 'Filtra il tuo menu per ABV < 15% e profilo "fresco/agrumato".' },
          { title: 'Suggerisce dal tuo menu', problem: 'Non cocktail generici, ma i TUOI signature.', solution: '"Ti consiglio il nostro Garden Spritz: cetriolo, elderflower, prosecco. Solo 8% vol."' },
          { title: 'Upselling intelligente', problem: 'Aumenta lo scontrino medio senza essere invadente.', solution: '"Vuoi abbinarlo alle nostre olive taggiasche? Perfette con le note erbacee."' }
        ],
        technique: "L'AI e addestrata sul tuo menu, i tuoi prezzi, le tue descrizioni. I clienti ricevono un'esperienza personalizzata, tu riduci il carico sul personale.",
        test: 'Risultato medio: +18% scontrino, -40% domande ripetitive al bancone.'
      }
    },
    credibility: {
      title: 'Risultati dei nostri clienti',
      subtitle: 'Dati reali da bar che usano Cocktail AI Business.',
      stats: [
        { value: '-30%', label: 'Sprechi', detail: 'Stock management intelligente' },
        { value: '+18%', label: 'Scontrino', detail: 'AI upselling al tavolo' },
        { value: '2 ore', label: 'Risparmiate', detail: 'Al giorno su ordini e inventory' },
        { value: '4.9', label: 'Rating', detail: 'Soddisfazione clienti' }
      ],
      sources: ['Diageo Bar Academy', 'Tales of the Cocktail', 'Drink International', 'CLASS Magazine', 'Imbibe', 'Diffords Guide']
    },
    pricing: {
      title: 'Piani per ogni dimensione',
      subtitle: "Dal cocktail bar all'hotel 5 stelle.",
      plans: [
        {
          name: 'Starter',
          price: '79',
          period: '/mese',
          desc: 'Per il bar indipendente',
          features: ['1 sede', 'Menu digitale + QR', 'Stock management base', 'AI al tavolo (500 chat/mese)', 'Support email'],
          cta: 'Inizia gratis',
          highlight: false
        },
        {
          name: 'Professional',
          price: '199',
          period: '/mese',
          desc: 'Per locali strutturati',
          badge: 'Piu scelto',
          features: ['Fino a 3 sedi', 'Menu digitale illimitato', 'Stock + ordini automatici', 'AI al tavolo illimitata', 'Analytics dashboard', 'Consulenza mensile 1h', 'Priority support'],
          cta: 'Prova gratis 14 giorni',
          highlight: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: '',
          desc: 'Per catene e hotel',
          features: ['Sedi illimitate', 'Integrazione POS/PMS', 'AI personalizzata sul brand', 'Consulenza dedicata', 'Account manager', 'SLA garantito', 'API access'],
          cta: 'Contattaci',
          highlight: false
        }
      ]
    },
    faq: {
      title: 'Domande frequenti',
      items: [
        { q: "Come funziona l'AI al tavolo?", a: "I clienti scansionano un QR e chattano con un'AI addestrata sul TUO menu. Puo consigliare drink, spiegare ingredienti, suggerire abbinamenti. Tu controlli cosa puo e non puo dire." },
        { q: 'Si integra con il mio gestionale/POS?', a: "Si, abbiamo integrazioni con SumUp, Worldline e altri. Per sistemi custom, offriamo API complete nel piano Enterprise." },
        { q: 'Come gestisce lo stock automatico?', a: "Colleghi i tuoi fornitori, imposti le soglie minime, e l'AI monitora le vendite. Quando un prodotto sta per finire, ricevi alert e puoi generare l'ordine con un click." },
        { q: "I clienti devono scaricare un'app?", a: "No, funziona tutto via browser. Scansionano il QR, si apre la chat. Zero friction, nessuna installazione." }
      ]
    },
    finalCta: {
      title: 'Pronto a trasformare il tuo locale?',
      subtitle: "Stock automatico, menu digitale, AI al tavolo. Tutto in un'unica piattaforma.",
      cta: 'Richiedi demo'
    },
    footer: content.footer
  };

  const activeContent = activeTab === 'business' ? businessContent : content;

  const bentoPerson = {
    main: { icon: '01', title: 'Ricette e Tecniche', stat: 'Database verificato', desc: 'dalle classiche alle creazioni dei migliori bar al mondo.', features: ['Tecniche spiegate passo passo', 'Varianti e twist moderni', 'Storia di ogni drink'] },
    cards: [
      { icon: '02', title: 'Spirits', desc: '3.000+ spirits catalogati per profilo aromatico, ABV e origine.' },
      { icon: '03', title: 'Abbinamenti', desc: 'Cosa servire con ostriche? Che aperitivo per la cena giapponese?' },
      { icon: '04', title: 'Signature', desc: 'Crea il tuo cocktail originale con guida AI passo passo.' },
      { icon: '05', title: 'Bar Guide', desc: '700+ bar nei World\'s 50 Best, cosa ordinare in ognuno.', highlight: true }
    ]
  };

  const bentoBusiness = {
    main: { icon: '01', title: 'Stock Automatizzato', stat: 'Mai piu rotture di stock', desc: 'Monitora inventario in tempo reale, ricevi alert, genera ordini con un click.', features: ['Alert sotto-soglia automatici', 'Previsione basata su vendite', 'Ordini fornitori in 1 click'] },
    cards: [
      { icon: '02', title: 'Menu Digitale', desc: 'QR al tavolo, menu sempre aggiornato, allergeni e descrizioni automatiche.' },
      { icon: '03', title: 'AI al Tavolo', desc: "I clienti chattano con un'AI che conosce IL TUO menu e consiglia." },
      { icon: '04', title: 'Consulenza', desc: 'Strategie per margini, pricing, posizionamento. Come avere un consulente 24/7.' },
      { icon: '05', title: 'Analytics', desc: 'Dashboard vendite, trend, KPI. Sai sempre come sta andando.', highlight: true }
    ]
  };

  const activeBento = activeTab === 'business' ? bentoBusiness : bentoPerson;

  const Arrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  );

  const Check = () => (
    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 text-sm" style={{ fontFamily: "'Geist', -apple-system, sans-serif" }}>

      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-lg" style={{ background: BRAND }}>C</div>
              <span className="font-semibold text-lg">Cocktail</span>
            </div>
            <div className="hidden md:flex items-center p-0.5 gap-0.5 rounded-xl bg-gray-100 w-fit">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex items-center gap-1.5 px-2.5 h-8 text-sm font-medium rounded-[10px] transition-all ${activeTab === 'personal' ? 'bg-white border border-gray-200 text-gray-900 shadow-sm' : 'bg-transparent border border-transparent text-gray-500 hover:bg-gray-50'}`}
              >
                {content.nav.personal}
              </button>
              <button
                onClick={() => setActiveTab('business')}
                className={`flex items-center gap-1.5 px-2.5 h-8 text-sm font-medium rounded-[10px] transition-all ${activeTab === 'business' ? 'bg-white border border-gray-200 text-gray-900 shadow-sm' : 'bg-transparent border border-transparent text-gray-500 hover:bg-gray-50'}`}
              >
                {content.nav.business}
              </button>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900">{content.nav.pricing}</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-900">{content.nav.login}</a>
            <button className="flex items-center justify-center py-[7px] rounded-[10px] px-4 font-medium text-[13px] transition-all text-white" style={{ backgroundColor: BRAND }}>
              <span className="flex items-center gap-1.5">
                <span>{content.nav.cta}</span>
                <Arrow />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ==================== HERO + PLASMA ==================== */}
      <section className="relative pt-20 pb-8 px-6">
        <PlasmaBackground />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium mb-6" style={{ background: BRAND_BG, borderColor: BRAND_BORDER, color: BRAND }}>
            <span>{activeContent.hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight mb-6 text-gray-900" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
            {activeContent.hero.title}
          </h1>

          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8 leading-relaxed">
            {activeContent.hero.subtitle}
          </p>

          <div className="flex flex-col items-center gap-4">
            <button className="flex items-center justify-center py-3 rounded-[10px] px-6 font-medium text-base transition-all text-white hover:opacity-90" style={{ backgroundColor: BRAND }}>
              <span className="flex items-center gap-2">
                <span>{activeContent.hero.cta}</span>
                <Arrow />
              </span>
            </button>
            <p className="text-sm text-gray-400">{activeContent.hero.ctaNote}</p>
          </div>
        </div>
      </section>

      {/* ==================== ESEMPIO CONVERSAZIONE ==================== */}
      <section className="py-20 px-6" style={{ backgroundColor: BRAND_BG }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative" style={{ height: '500px' }}>
              <div className="absolute bg-white rounded-2xl shadow-xl overflow-hidden" style={{ width: '320px', height: '280px', top: '0', left: '0', border: '1px solid rgba(0,0,0,0.08)' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-md">Ricerche recenti</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {[
                    { icon: '01', name: 'Negroni Sbagliato', cat: 'Cocktails' },
                    { icon: '02', name: 'Sciroppo al miele', cat: 'Preparazioni', active: true },
                    { icon: '03', name: 'Whisky giapponesi', cat: 'Spirits' },
                    { icon: '04', name: 'Bar a Barcellona', cat: 'Bar Guide' }
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${item.active ? '' : 'hover:bg-gray-50'}`} style={item.active ? { background: BRAND_BG } : {}}>
                      <span className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white" style={{ background: BRAND }}>{item.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.cat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute rounded-2xl shadow-2xl overflow-hidden" style={{ width: '340px', height: '380px', bottom: '0', right: '0', backgroundColor: BRAND_BG, border: `1px solid ${BRAND_BORDER}` }}>
                <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: `1px solid ${BRAND_BORDER}` }}>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <span className="text-xs font-medium px-3 py-1 rounded-md" style={{ color: BRAND, background: 'rgba(255,97,40,0.1)' }}>Costa Dorata</span>
                  </div>
                </div>
                <div className="p-5" style={{ fontSize: '12px' }}>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Costa Dorata</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">La Costiera offre una palette di sapori unici:</p>
                  <div className="space-y-1 mb-4">
                    {activeContent.heroExample.answer.ingredients.map((ing, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: BRAND }} />
                        <span className="text-gray-700">{ing}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 italic text-[11px] pt-3" style={{ borderTop: `1px solid ${BRAND_BORDER}` }}>
                    {activeContent.heroExample.answer.concept}
                  </p>
                </div>
              </div>
            </div>

            <div className="md:pl-8">
              <span className="text-sm font-medium uppercase tracking-wide mb-3 block" style={{ color: BRAND }}>
                {activeContent.heroExample.badge}
              </span>
              <h2 className="text-4xl font-semibold mb-4 leading-tight">
                Chiedi qualsiasi cosa.<br/>Ottieni risposte da esperto.
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Non risposte generiche. Conoscenza profonda con ingredienti territoriali, tecniche specifiche, e il perche dietro ogni scelta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PERCHE E DIVERSO ==================== */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>{activeContent.whyDifferent.badge}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">{activeContent.whyDifferent.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{activeContent.whyDifferent.subtitle}</p>
          </div>

          {activeTab === 'personal' ? (
            <>
              {activeContent.whyDifferent.cards.map((card, idx) => (
                <div key={idx} className={`grid md:grid-cols-2 gap-12 items-center ${idx < activeContent.whyDifferent.cards.length - 1 ? 'mb-20' : ''}`}>
                  {idx % 2 === 0 ? (
                    <>
                      <div className="rounded-3xl border border-gray-200 overflow-hidden relative" style={{ height: '400px' }}>
                        <div className="rounded-2xl shadow-xl overflow-hidden absolute" style={{ width: '80%', left: '50%', transform: 'translateX(-50%)', top: '40px', backgroundColor: BRAND_BG, border: `1px solid ${BRAND_BORDER}` }}>
                          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${BRAND_BORDER}` }}>
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                            <span className="text-xs font-medium" style={{ color: BRAND }}>{card.category}</span>
                          </div>
                          <div className="p-5">
                            <h4 className="font-semibold text-gray-900 mb-3 text-lg">{card.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{card.intro}</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide mb-2 block" style={{ color: BRAND }}>{card.category}</span>
                        <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{card.intro}</p>
                        <p className="mt-4 text-sm font-medium" style={{ color: BRAND }}>{card.tip}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wide mb-2 block" style={{ color: BRAND }}>{card.category}</span>
                        <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{card.intro}</p>
                        <p className="mt-4 text-sm font-medium" style={{ color: BRAND }}>{card.tip}</p>
                      </div>
                      <div className="rounded-3xl border border-gray-200 overflow-hidden relative" style={{ height: '400px' }}>
                        <div className="rounded-2xl shadow-xl overflow-hidden absolute" style={{ width: '80%', left: '50%', transform: 'translateX(-50%)', top: '40px', backgroundColor: BRAND_BG, border: `1px solid ${BRAND_BORDER}` }}>
                          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${BRAND_BORDER}` }}>
                            <div className="flex gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                            </div>
                            <span className="text-xs font-medium" style={{ color: BRAND }}>{card.category}</span>
                          </div>
                          <div className="p-5">
                            <h4 className="font-semibold text-gray-900 mb-3 text-lg">{card.title}</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{card.intro}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-20">
              {activeContent.whyDifferent.cards.map((card, idx) => (
                <div key={idx} className="grid md:grid-cols-2 gap-12 items-center">
                  {idx % 2 === 0 ? (
                    <>
                      <DashboardMockup card={card} />
                      <div>
                        <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{card.description}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{card.description}</p>
                      </div>
                      <DashboardMockup card={card} />
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== BENTO GRID ==================== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>Esplora per categoria</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">
              {activeTab === 'business' ? 'Strumenti per far crescere il tuo locale.' : 'Dalla tecnica specifica alla curiosita piu strana.'}
            </h2>
          </div>

          <div className="grid grid-cols-4 grid-rows-2 gap-4" style={{ height: '520px' }}>
            <div className="col-span-2 row-span-2 bg-white border border-gray-200 rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white" style={{ background: BRAND }}>{activeBento.main.icon}</span>
                <h3 className="font-semibold text-gray-900">{activeBento.main.title}</h3>
              </div>
              <p className="text-gray-600 text-sm mb-6 max-w-[280px]">
                <span className="font-medium text-gray-900">{activeBento.main.stat}</span>, {activeBento.main.desc}
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                {activeBento.main.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2"><Check />{feature}</li>
                ))}
              </ul>
            </div>

            {activeBento.cards.map((card, i) => (
              <div key={i} className={`col-span-1 row-span-1 rounded-3xl p-5 relative overflow-hidden ${card.highlight ? '' : 'bg-white border border-gray-200'}`} style={card.highlight ? { backgroundColor: BRAND_BG, border: `1px solid ${BRAND_BORDER}` } : {}}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white" style={{ background: BRAND }}>{card.icon}</span>
                  <h3 className="font-semibold text-gray-900 text-sm">{card.title}</h3>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DOMANDE ESPERTE ==================== */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>{activeContent.expertQuestions.badge}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">{activeContent.expertQuestions.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{activeContent.expertQuestions.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {activeContent.expertQuestions.questions.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-gray-900 leading-relaxed">
                  <span className="font-semibold">"{item.q}"</span>{' '}{item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMPARATIVA ==================== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>{activeContent.comparison.badge}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">{activeContent.comparison.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{activeContent.comparison.subtitle}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 border-b border-gray-200">
              <div className="p-4"></div>
              <div className="p-4 text-center font-medium text-gray-400 border-l border-gray-200">{activeContent.comparison.competitor}</div>
              <div className="p-4 text-center font-medium border-l border-gray-200" style={{ color: BRAND }}>Cocktail AI</div>
            </div>
            {activeContent.comparison.rows.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 ${i < activeContent.comparison.rows.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="p-4 text-sm font-medium">{row.label}</div>
                <div className="p-4 text-center border-l border-gray-100"><span className="text-gray-400">{row.competitor}</span></div>
                <div className="p-4 text-center border-l border-gray-100"><span className="text-gray-900">{row.us}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DEEP DIVE ==================== */}
      <section className="py-24 px-6" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>{activeContent.deepDive.badge}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">{activeContent.deepDive.title}</h2>
            <p className="text-gray-500">{activeContent.deepDive.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="sticky top-8">
              <div className="rounded-2xl p-8 relative overflow-hidden" style={{ backgroundColor: BRAND_BG, border: `1px solid ${BRAND_BORDER}` }}>
                <div className="flex gap-1.5 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">U</div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Tu chiedi:</p>
                    <p className="text-lg font-medium text-gray-900 leading-relaxed">"{activeContent.deepDive.question}"</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-xs text-gray-500">Errori comuni</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">30s</p>
                  <p className="text-xs text-gray-500">Tempo stir</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
                  <p className="text-2xl font-bold text-gray-900">1</p>
                  <p className="text-xs text-gray-500">Test rapido</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl shadow-xl overflow-hidden bg-white" style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ background: BRAND }}>C</div>
                  <span className="font-medium text-gray-700 text-sm">Cocktail AI</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: BRAND_BG, color: BRAND }}>Pro</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6">{activeContent.deepDive.answer.intro}</p>
                <div className="space-y-4 mb-6">
                  {activeContent.deepDive.answer.errors.map((err, i) => (
                    <div key={i} className="rounded-xl p-4" style={{ backgroundColor: '#FAFAFA' }}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 text-white" style={{ background: BRAND }}>{i + 1}</div>
                        <div>
                          <h4 className="font-semibold mb-1 text-gray-900">{err.title}</h4>
                          <p className="text-sm text-gray-500 mb-2">{err.problem}</p>
                          <div className="flex items-start gap-2">
                            <Check />
                            <p className="text-sm text-gray-800">{err.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-4 mb-4 flex items-start gap-3" style={{ backgroundColor: BRAND_BG, border: `1px solid ${BRAND_BORDER}` }}>
                  <span className="text-xl">*</span>
                  <p className="text-sm text-gray-700">{activeContent.deepDive.answer.technique}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs">T</span>
                  {activeContent.deepDive.answer.test}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CREDIBILITA ==================== */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>I numeri</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">{activeContent.credibility.title}</h2>
            <p className="text-gray-500">{activeContent.credibility.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {activeContent.credibility.stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="font-medium mb-1">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.detail}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl p-6">
            <p className="text-sm font-medium text-gray-500 mb-4">Alcune delle nostre fonti:</p>
            <div className="flex flex-wrap gap-3">
              {activeContent.credibility.sources.map((source, i) => (
                <span key={i} className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm">{source}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">{activeContent.pricing.title}</h2>
            <p className="text-gray-500">{activeContent.pricing.subtitle}</p>
          </div>
          <div className={`grid gap-6 ${activeContent.pricing.plans.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {activeContent.pricing.plans.map((plan, i) => (
              <div key={i} className={`bg-white rounded-2xl p-8 border ${plan.highlight ? 'shadow-lg' : 'border-gray-200'}`} style={plan.highlight ? { borderColor: BRAND, borderWidth: '2px' } : {}}>
                {plan.badge && (
                  <span className="inline-block px-3 py-1 rounded-full text-white text-xs font-medium mb-4" style={{ backgroundColor: BRAND }}>{plan.badge}</span>
                )}
                <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price === 'Custom' ? '' : '\u20AC'}{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 mt-0.5">&#10003;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                  {plan.limitations?.map((f, j) => (
                    <li key={`l-${j}`} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="mt-0.5">&#10007;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#" className={`flex items-center justify-center gap-2 py-3 rounded-[10px] font-medium transition-all ${plan.highlight ? 'text-white hover:opacity-90' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} style={plan.highlight ? { backgroundColor: BRAND } : {}}>
                  {plan.cta}
                  {plan.highlight && <Arrow />}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900">{activeContent.faq.title}</h2>
          </div>
          <div className="space-y-4">
            {activeContent.faq.items.map((item, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-5 flex items-center justify-between text-left">
                  <span className="font-medium text-gray-900">{item.q}</span>
                  <span className="text-gray-400 text-xl ml-4">{openFaq === i ? '\u2212' : '+'}</span>
                </button>
                {openFaq === i && <div className="px-6 pb-5 text-gray-600">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MARQUEE ==================== */}
      <section className="py-12 overflow-hidden border-y border-gray-100">
        <div className="marquee-container">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="marquee-content">
                {['Negroni','Martini','Old Fashioned','Margarita','Daiquiri','Espresso Martini','Whisky Sour','Mojito'].map((name, j) => (
                  <span key={j}><span className="mx-8 text-2xl font-semibold text-gray-300">{name}</span><span className="mx-8 text-gray-300">&bull;</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AUDIENCES ==================== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium mb-4" style={{ color: BRAND }}>{activeContent.audiences.badge}</p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">{activeContent.audiences.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{activeContent.audiences.subtitle}</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {activeContent.audiences.cards.map((card, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-200">
                <p className="text-gray-900 leading-relaxed mb-4">
                  <span className="font-semibold">{card.name}.</span>{' '}{card.desc}
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  {card.features.map((feature, j) => (
                    <li key={j}>&bull; {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SECOND MARQUEE ==================== */}
      <section className="py-8 overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-track-reverse">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="marquee-content">
                {['Death & Co','Connaught Bar','Paradiso',"Satan's Whiskers",'Tayer + Elementary','Licoreria Limantour','Jigger & Pony','Handshake Speakeasy'].map((name, j) => (
                  <span key={j}><span className="mx-6 text-lg text-gray-400">{name}</span><span className="mx-4" style={{ color: BRAND }}>&#10022;</span></span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4 text-gray-900">{activeContent.finalCta.title}</h2>
          <p className="text-gray-500 mb-8">{activeContent.finalCta.subtitle}</p>
          <button className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-[10px] text-white font-medium text-base hover:opacity-90 transition-all" style={{ backgroundColor: BRAND }}>
            <span>{activeContent.finalCta.cta}</span>
            <Arrow />
          </button>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background: BRAND }}>C</div>
            <span className="font-semibold">Cocktail AI</span>
          </div>
          <p className="text-sm text-gray-500">{activeContent.footer.madeWith}</p>
          <p className="text-sm text-gray-400">{activeContent.footer.copy}</p>
        </div>
      </footer>
    </div>
  );
}

// ==================== BUSINESS DASHBOARD MOCKUPS ====================
function DashboardMockup({ card }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-gray-500">{card.category}</span>
      </div>

      {card.type === 'stock-dashboard' && (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Inventario</h4>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Live</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
              <div><p className="text-sm font-medium text-gray-900">Campari</p><p className="text-xs text-gray-500">2 bottiglie rimaste</p></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-red-500 rounded-full" style={{width: '15%'}}></div></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <div><p className="text-sm font-medium text-gray-900">Lime freschi</p><p className="text-xs text-gray-500">Finiscono domani</p></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 rounded-full" style={{width: '25%'}}></div></div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div><p className="text-sm font-medium text-gray-900">Gin Tanqueray</p><p className="text-xs text-gray-500">8 bottiglie - OK</p></div>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{width: '80%'}}></div></div>
            </div>
          </div>
          <button className="w-full mt-4 py-2 text-white text-sm font-medium rounded-lg" style={{ background: BRAND }}>Genera ordine</button>
        </div>
      )}

      {card.type === 'menu-editor' && (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Menu</h4>
            <button className="text-xs px-3 py-1 text-white rounded-full" style={{ background: BRAND }}>+ Aggiungi</button>
          </div>
          <div className="space-y-2">
            {[{name:'Negroni',sub:'Gin, Campari, Vermouth',price:'12',on:true},{name:'Spritz',sub:'Aperol, Prosecco, Soda',price:'9',on:true},{name:'Mai Tai',sub:'Rum, Lime, Orgeat',price:'14',on:false}].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${!item.on ? 'opacity-60' : ''}`}>
                <div><p className="text-sm font-medium text-gray-900">{item.name}</p><p className="text-xs text-gray-500">{item.sub}</p></div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{'\u20AC'}{item.price}</span>
                  <div className={`w-8 h-5 rounded-full relative ${item.on ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full ${item.on ? 'right-0.5' : 'left-0.5'}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {card.type === 'analytics' && (
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Vendite oggi</h4>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-xl font-bold text-gray-900">{'\u20AC'}847</p><p className="text-xs text-gray-500">Ricavi</p></div>
            <div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-xl font-bold text-gray-900">94</p><p className="text-xs text-gray-500">Drink</p></div>
            <div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-xl font-bold text-green-600">72%</p><p className="text-xs text-gray-500">Margine</p></div>
          </div>
          <div className="space-y-2">
            {[{n:'Spritz',v:32},{n:'Negroni',v:28},{n:'Margarita',v:18}].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{i+1}. {item.n}</span>
                <span className="font-medium">{item.v} venduti</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {card.type === 'customer-chat' && (
        <div className="p-4 bg-gray-100" style={{maxWidth: '280px', margin: '0 auto'}}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="text-white p-3 text-center" style={{ background: BRAND }}>
              <p className="font-semibold text-sm">Bar Roma</p>
              <p className="text-xs opacity-80">AI Sommelier</p>
            </div>
            <div className="p-3 space-y-3" style={{fontSize: '12px'}}>
              <div className="bg-gray-100 rounded-xl rounded-tl-none p-2 max-w-[85%]">
                <p className="text-gray-700">Ciao! Cosa ti va di bere stasera?</p>
              </div>
              <div className="rounded-xl rounded-tr-none p-2 max-w-[85%] ml-auto text-white" style={{ background: BRAND }}>
                <p>Qualcosa di fresco e leggero</p>
              </div>
              <div className="bg-gray-100 rounded-xl rounded-tl-none p-2 max-w-[85%]">
                <p className="text-gray-700">Ti consiglio il nostro <strong>Garden Spritz</strong>: cetriolo, elderflower, prosecco. Solo 8% vol. {'\u20AC'}9</p>
              </div>
              <div className="rounded-xl p-2 text-center" style={{ background: BRAND_BG, border: `1px solid ${BRAND_BORDER}` }}>
                <p className="font-medium text-xs" style={{ color: BRAND }}>Aggiungi al tavolo</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
