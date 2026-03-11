/**
 * Biblioteca fiscala — static content for fiscal education topics.
 * All values reflect 2026 fiscal year (salariul minim brut: 4,050 lei/luna).
 */

export interface BibliotecaSection {
  heading: string;
  body: string;
}

export interface BibliotecaTopic {
  slug: string;
  title: string;
  shortDescription: string;
  category: "contributii" | "impozite" | "declaratii" | "regimuri" | "tva" | "srl";
  content: BibliotecaSection[];
}

export const CATEGORY_LABELS: Record<string, string> = {
  contributii: "Contributii",
  impozite: "Impozite",
  declaratii: "Declaratii",
  regimuri: "Regimuri fiscale",
  tva: "TVA",
  srl: "SRL",
};

/** Ordered list of categories for display */
export const CATEGORY_ORDER: Array<keyof typeof CATEGORY_LABELS> = [
  "contributii",
  "impozite",
  "regimuri",
  "declaratii",
  "tva",
  "srl",
];

const TOPICS: BibliotecaTopic[] = [
  // ── CONTRIBUTII ──────────────────────────────────────────
  {
    slug: "cas",
    title: "CAS (Contributia de Asigurari Sociale)",
    shortDescription:
      "Contributia pentru pensie — 25% din venitul ales, cu praguri de 12 si 24 de salarii minime.",
    category: "contributii",
    content: [
      {
        heading: "Ce este CAS?",
        body: "CAS este contributia pe care o platesti la sistemul public de pensii. Gandeste-te la ea ca la o \"asigurare de pensie\" obligatorie. Daca ai venituri din activitati independente (PFA, profesii liberale), esti obligat sa o platesti cand venitul net anual depaseste 12 salarii minime brute.",
      },
      {
        heading: "Cat platesti?",
        body: "Cota este 25%. Nu se aplica la venitul tau real, ci la un venit ales de tine, care poate fi: 12 salarii minime brute (12 x 4,050 = 48,600 lei) sau 24 salarii minime brute (24 x 4,050 = 97,200 lei). Daca alegi baza de 12 salarii, platesti 25% x 48,600 = 12,150 lei pe an. Daca alegi baza de 24 salarii, platesti 25% x 97,200 = 24,300 lei pe an.",
      },
      {
        heading: "Cand esti obligat sa platesti?",
        body: "Esti obligat sa platesti CAS daca venitul net anual estimat (sau realizat) depaseste pragul de 12 salarii minime brute, adica 48,600 lei in 2026. Sub acest prag, CAS este optionala — dar daca nu o platesti, nu ti se calculeaza stagiu de cotizare la pensie.",
      },
      {
        heading: "Norma de venit vs. sistem real",
        body: "La norma de venit, venitul pe baza caruia se calculeaza CAS este norma stabilita de ANAF, nu venitul real incasat. La sistem real, venitul net este diferenta dintre veniturile incasate si cheltuielile deductibile. In ambele cazuri, daca depasesti pragul, alegi baza de calcul (12x sau 24x).",
      },
      {
        heading: "Cum se declara?",
        body: "CAS se declara prin Declaratia Unica (D212), depusa pana pe 25 mai. Plata se face tot pana pe 25 mai, pentru anul in curs. Daca depui pana pe 15 aprilie, beneficiezi de o reducere de 5% din impozit (nu din CAS).",
      },
    ],
  },
  {
    slug: "cass",
    title: "CASS (Contributia de Asigurari Sociale de Sanatate)",
    shortDescription:
      "Contributia pentru sanatate — 10%, cu plafon minim de 6 salarii si maxim de 72 salarii minime.",
    category: "contributii",
    content: [
      {
        heading: "Ce este CASS?",
        body: "CASS este contributia care iti da dreptul la servicii medicale gratuite in sistemul public de sanatate. Fara CASS platit, nu ai calitatea de asigurat si risti sa platesti integral consultatiile si tratamentele.",
      },
      {
        heading: "Cat platesti?",
        body: "Cota este 10%, aplicata proportional la venitul net anual realizat din activitati independente. Exista insa un plafon minim: 6 salarii minime brute (6 x 4,050 = 24,300 lei, deci minim 2,430 lei CASS pe an). Plafonul maxim este 72 salarii minime brute pe an (72 x 4,050 = 291,600 lei), deci maximum platesti 10% x 291,600 = 29,160 lei pe an, indiferent cat de mare ti-e venitul.",
      },
      {
        heading: "Calcul proportional — exemplu",
        body: "Daca ai venit net de 100,000 lei: CASS = 10% x 100,000 = 10,000 lei. Daca ai venit net de 15,000 lei (sub 6 salarii minime): tot platesti minim 2,430 lei. Daca ai venit net de 500,000 lei: platesti maxim 29,160 lei (plafonul de 72 salarii minime).",
      },
      {
        heading: "Cine este scutit?",
        body: "Sunt scutiti de CASS: persoanele care au deja calitatea de asigurat prin contractul de munca (daca esti si angajat, angajatorul iti plateste deja CASS pe salariu — dar doar daca salariul depaseste pragul). De asemenea, anumite categorii de persoane cu handicap sau veterani pot fi scutite.",
      },
      {
        heading: "Cum se declara?",
        body: "Ca si CAS, se declara prin Declaratia Unica (D212) pana pe 25 mai. CASS se datoreaza pentru anul in curs, pe baza venitului estimat, si se regularizeaza la depunerea declaratiei pentru anul urmator.",
      },
    ],
  },

  // ── IMPOZITE ─────────────────────────────────────────────
  {
    slug: "impozit-venit-pfa",
    title: "Impozit pe venit PFA",
    shortDescription:
      "10% din venitul net, dupa deducerea CAS si CASS — difera intre norma si sistem real.",
    category: "impozite",
    content: [
      {
        heading: "Cat este impozitul?",
        body: "Impozitul pe veniturile din activitati independente este 10%, aplicat la venitul net anual. Venitul net difera in functie de regimul fiscal ales: norma de venit sau sistem real.",
      },
      {
        heading: "Deducerea CAS si CASS (din 2024)",
        body: "Incepand cu anul fiscal 2024, CAS si CASS platite sunt cheltuieli deductibile la calculul impozitului. Asta inseamna ca le scazi din venitul net inainte de a aplica cei 10%. Exemplu: venit net 100,000 lei, CAS platit 12,150 lei, CASS platit 10,000 lei. Impozit = 10% x (100,000 - 12,150 - 10,000) = 10% x 77,850 = 7,785 lei.",
      },
      {
        heading: "La norma de venit",
        body: "Venitul impozabil este norma stabilita de ANAF pentru codul tau CAEN, nu venitul real incasat. Daca norma ta este 35,000 lei si ai platit CAS 12,150 lei + CASS 3,500 lei, impozitul este 10% x (35,000 - 12,150 - 3,500) = 1,935 lei. Avantajul: poti incasa mult peste norma si platesti acelasi impozit.",
      },
      {
        heading: "La sistem real",
        body: "Venitul net = venituri incasate minus cheltuieli deductibile. Ai nevoie de evidenta contabila si trebuie sa pastrezi toate facturile. Impozitul este 10% din (venit net - CAS - CASS). Avantajul: daca ai cheltuieli mari, platesti mai putin. Dezavantajul: e mai complex si necesita rigoare.",
      },
      {
        heading: "Cum si cand se plateste?",
        body: "Impozitul se declara prin Declaratia Unica (D212) si se plateste pana pe 25 mai. Daca depui D212 pana pe 15 aprilie, primesti o reducere de 5% din impozitul datorat. Plata se face in contul unic deschis la Trezorerie sau prin SPV.",
      },
    ],
  },

  // ── REGIMURI FISCALE ─────────────────────────────────────
  {
    slug: "norma-de-venit",
    title: "Norma de venit",
    shortDescription:
      "Venit fix stabilit de ANAF per cod CAEN — nu conteaza cat incasezi real, taxele sunt fixe.",
    category: "regimuri",
    content: [
      {
        heading: "Ce este norma de venit?",
        body: "Norma de venit este un sistem simplificat de impozitare in care ANAF stabileste un venit anual fix pentru fiecare cod CAEN si judet. Nu conteaza cat incasezi real — taxele se calculeaza pe baza acestei norme. Daca incasezi 200,000 lei dar norma ta este 40,000 lei, platesti taxe pe 40,000 lei.",
      },
      {
        heading: "Cine poate folosi norma de venit?",
        body: "Doar PFA-urile care au codul CAEN inclus in lista normelor publicate de directia de finante a judetului. Nu toate activitatile au norma de venit disponibila. Normele variaza si intre judete — acelasi CAEN poate avea norme diferite in Cluj fata de Brasov.",
      },
      {
        heading: "Avantaje",
        body: "Nu ai nevoie de evidenta contabila complexa. Nu trebuie sa pastrezi facturi de cheltuieli. Stii din ianuarie cat vei plati in taxe. E ideal daca ai venituri mult peste norma — platesti taxe pe un venit mai mic decat cel real.",
      },
      {
        heading: "Dezavantaje",
        body: "Daca intr-un an ai venituri mici (sau zero), tot platesti taxe pe norma intreaga. Nu poti deduce cheltuieli. Daca norma este mare si veniturile tale sunt mici, platesti mai mult decat ai plati la sistem real.",
      },
      {
        heading: "Cum afli norma ta?",
        body: "Normele de venit se publica anual de catre Directia Generala Regionala a Finantelor Publice din judetul tau. Le gasesti pe site-ul ANAF, sectiunea \"Norme de venit\", sau poti intreba la administratia fiscala locala. In estimatorul Prevo, le actualizam automat.",
      },
    ],
  },
  {
    slug: "sistem-real",
    title: "Sistem real",
    shortDescription:
      "Venituri reale minus cheltuieli reale — mai complex, dar poate fi mai ieftin daca ai cheltuieli mari.",
    category: "regimuri",
    content: [
      {
        heading: "Ce este sistemul real?",
        body: "La sistem real, impozitul se calculeaza pe diferenta reala dintre veniturile incasate si cheltuielile deductibile (venit net = venituri - cheltuieli). Trebuie sa tii evidenta tuturor facturilor emise si primite.",
      },
      {
        heading: "Ce cheltuieli sunt deductibile?",
        body: "Cheltuielile legate direct de activitatea ta: materii prime, utilitati la birou, abonamente software, deplasari de afaceri, amortizarea echipamentelor, chiria spatiului de lucru (proportional cu suprafata folosita). Nu sunt deductibile: cheltuieli personale, amenzi, protocol peste limita legala.",
      },
      {
        heading: "Avantaje fata de norma",
        body: "Daca ai cheltuieli mari (echipamente, chirie, angajati prin colaborare), venitul net scade si platesti mai putine taxe. Ai flexibilitate totala — poti optimiza legal cheltuielile. Ideal pentru freelanceri cu costuri operationale semnificative.",
      },
      {
        heading: "Dezavantaje",
        body: "Necesita evidenta contabila in partida simpla. Trebuie sa pastrezi toate facturile si bonurile. E mai greu de estimat taxele din ianuarie, pentru ca depind de veniturile si cheltuielile efective. Recomandat sa folosesti un soft de contabilitate sau sa consulti un contabil macar o data pe an.",
      },
      {
        heading: "Declaratii necesare",
        body: "Depui Declaratia Unica (D212) pana pe 25 mai. Daca esti platitor de TVA, depui si D300 trimestrial. La sistem real, trebuie sa completezi Registrul de incasari si plati si sa pastrezi documentele justificative 5 ani.",
      },
    ],
  },

  // ── DECLARATII ───────────────────────────────────────────
  {
    slug: "declaratia-unica-d212",
    title: "Declaratia Unica (D212)",
    shortDescription:
      "Declaratia anuala pentru PFA — acopera impozit, CAS si CASS intr-un singur formular.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D212?",
        body: "Declaratia Unica (formularul 212) este documentul prin care PFA-urile declara si platesc impozitul pe venit, CAS si CASS. Un singur formular inlocuieste mai multe declaratii separate — de aici numele \"unica\".",
      },
      {
        heading: "Cine depune D212?",
        body: "Toate persoanele fizice care obtin venituri din: activitati independente (PFA), drepturi de autor, inchirieri, investitii (dividende, dobanzi), activitati agricole, sau alte surse de venit care nu sunt impozitate la sursa de un angajator.",
      },
      {
        heading: "Termenele importante",
        body: "Termenul limita este 25 mai (pentru anul in curs — estimare, si pentru anul precedent — regularizare). Daca depui pana pe 15 aprilie, primesti o reducere de 5% din impozitul pe venit datorat. Aceasta reducere nu se aplica la CAS si CASS, doar la impozit.",
      },
      {
        heading: "Cum se depune?",
        body: "Se depune exclusiv online, prin SPV (Spatiul Privat Virtual) de pe site-ul ANAF. Pasii: 1) Intri in SPV cu cont sau semnatura electronica. 2) Descarci formularul PDF inteligent de pe site-ul ANAF. 3) Completezi offline, salvezi. 4) Incarci in SPV si trimiti. Primesti numar de inregistrare ca confirmare.",
      },
      {
        heading: "Ce completezi in D212?",
        body: "Capitolul I: venituri estimate pentru anul curent (impozit, CAS, CASS). Capitolul II: venituri realizate in anul precedent (regularizare). Pentru fiecare, alegi sursa de venit, regimul fiscal, si completezi sumele. Daca ai mai multe surse de venit, le declari pe toate in acelasi formular.",
      },
    ],
  },
  {
    slug: "d100",
    title: "D100 (Declaratia privind obligatiile de plata)",
    shortDescription:
      "Declaratia trimestriala a SRL-urilor micro — impozit pe cifra de afaceri.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este D100?",
        body: "Declaratia 100 este formularul prin care SRL-urile (si alte persoane juridice) declara si platesc impozitele si contributiile datorate bugetului de stat. Pentru micro-intreprinderile, acesta este documentul principal prin care declari impozitul trimestrial pe venituri.",
      },
      {
        heading: "Cine depune D100?",
        body: "Toate SRL-urile, indiferent de regimul fiscal (micro-intreprindere sau impozit pe profit). Persoanele fizice (PFA) nu depun D100 — ele folosesc Declaratia Unica (D212).",
      },
      {
        heading: "Cand se depune?",
        body: "D100 se depune trimestrial, pana pe data de 25 a lunii urmatoare trimestrului: 25 aprilie (T1), 25 iulie (T2), 25 octombrie (T3), 25 ianuarie anul urmator (T4). Plata se face in acelasi termen.",
      },
      {
        heading: "Ce declari in D100?",
        body: "Pentru SRL micro: impozitul de 1% pe cifra de afaceri realizata in trimestrul respectiv. Daca ai avut venituri de 50,000 lei in T1, declari si platesti 500 lei (1% x 50,000). In D100 declari si alte obligatii: impozit pe dividende retinute, impozit pe salarii, contributii salariale.",
      },
      {
        heading: "Cum se depune?",
        body: "Online, prin SPV, similar cu D212. SRL-urile au obligatia de a depune toate declaratiile fiscal in format electronic. Formularul D100 se descarca de pe site-ul ANAF, se completeaza si se incarca in SPV.",
      },
    ],
  },

  // ── TVA ──────────────────────────────────────────────────
  {
    slug: "tva",
    title: "TVA (Taxa pe Valoarea Adaugata)",
    shortDescription:
      "Taxa de consum — obligatorie peste 395,000 lei cifra de afaceri, cu declaratie D300 trimestriala.",
    category: "tva",
    content: [
      {
        heading: "Ce este TVA?",
        body: "TVA este o taxa pe consum pe care o colectezi de la clientii tai si o virezi la bugetul de stat. Nu este un cost al tau — esti doar intermediar. Cotele standard sunt: 19% (general), 9% (alimente, medicamente, turism), 5% (carti, locuinte sociale).",
      },
      {
        heading: "Cand devii platitor de TVA?",
        body: "Esti obligat sa te inregistrezi in scopuri de TVA cand cifra de afaceri depaseste 395,000 lei intr-un an calendaristic (sau in 12 luni consecutive). Poti opta voluntar si sub acest prag, daca ti se pare avantajos (de exemplu, daca ai multi furnizori platitori de TVA si vrei sa deduci TVA-ul de pe facturile lor).",
      },
      {
        heading: "Cum functioneaza in practica?",
        body: "Exemplu: facturezi un serviciu de 1,000 lei + 19% TVA = 1,190 lei. Clientul plateste 1,190, din care 190 este TVA colectat. Daca ai o factura de la un furnizor de 500 lei + 95 lei TVA, deduci 95 lei. La sfarsitul trimestrului, virezi la stat diferenta: 190 - 95 = 95 lei TVA de plata.",
      },
      {
        heading: "Declaratia D300",
        body: "Ca platitor de TVA, depui D300 (Decontul de TVA) trimestrial — pana pe 25 a lunii urmatoare trimestrului. In D300 raportezi TVA colectat si TVA deductibil, iar diferenta o platesti sau ti se ramburseaza.",
      },
      {
        heading: "TVA si PFA pe norma de venit",
        body: "Chiar daca esti pe norma de venit pentru impozit, daca depasesti plafonul de 395,000 lei cifra de afaceri, devii platitor de TVA. Norma de venit afecteaza doar calculul impozitului pe venit, nu si obligatia de TVA.",
      },
    ],
  },

  // ── SRL ──────────────────────────────────────────────────
  {
    slug: "micro-intreprindere",
    title: "Micro-intreprindere (SRL)",
    shortDescription:
      "SRL cu impozit de 1% pe venituri — simplu, fara contabilitate de profit, pana la 100,000 EUR.",
    category: "srl",
    content: [
      {
        heading: "Ce este o micro-intreprindere?",
        body: "O micro-intreprindere este un SRL care plateste impozit pe veniturile realizate (cifra de afaceri), nu pe profit. Este cel mai simplu regim fiscal pentru SRL-uri mici. Platesti 1% din tot ce incasezi, fara sa conteze cheltuielile.",
      },
      {
        heading: "Conditii pentru regimul micro",
        body: "Ca sa fii micro-intreprindere, trebuie sa indeplinesti simultan: cifra de afaceri sub 100,000 EUR (echivalent in lei), sa nu desfasori activitati in domeniul bancar, asigurarilor sau jocurilor de noroc, si sa nu fi optat voluntar pentru impozit pe profit.",
      },
      {
        heading: "Cum se calculeaza impozitul?",
        body: "Impozitul este 1% din veniturile realizate in fiecare trimestru. Exemplu: daca ai facturat 80,000 lei in T1, platesti 800 lei impozit. Simplu. Nu ai nevoie sa calculezi profit, nu trebuie sa optimizezi cheltuieli din perspectiva fiscala.",
      },
      {
        heading: "Declaratia D100",
        body: "Impozitul se declara trimestrial prin formularul D100, pana pe data de 25 a lunii urmatoare trimestrului. Termenele: 25 aprilie (T1), 25 iulie (T2), 25 octombrie (T3), 25 ianuarie (T4).",
      },
      {
        heading: "Ce se intampla daca depasesti 100,000 EUR?",
        body: "Daca depasesti plafonul de 100,000 EUR in cursul anului, treci la impozit pe profit (16%) incepand cu trimestrul in care ai depasit. Nu mai revii la micro in acel an. In anul urmator, daca indeplinesti din nou conditiile, poti reveni la regimul micro.",
      },
    ],
  },
  {
    slug: "dividende-srl",
    title: "Dividende SRL",
    shortDescription:
      "Cum scoti bani din SRL — 16% impozit, CASS pe praguri, si decizia asociatului unic.",
    category: "srl",
    content: [
      {
        heading: "Ce sunt dividendele?",
        body: "Dividendele sunt profitul net al SRL-ului distribuit catre asociati (proprietari). Este singura modalitate legala de a scoate bani din SRL pentru uz personal (in afara de salariu). Nu poti pur si simplu transfera bani din contul firmei in contul personal.",
      },
      {
        heading: "Cat platesti impozit pe dividende?",
        body: "Impozitul pe dividende este 16%, retinut la sursa de catre SRL. Daca SRL-ul distribuie 10,000 lei dividende brute, retine 1,600 lei impozit si iti vireaza 8,400 lei net. SRL-ul depune D205 (declaratie informativa) pentru dividendele distribuite.",
      },
      {
        heading: "CASS pe dividende",
        body: "Din 2024, daca dividendele tale depasesc anumite praguri, datorezi CASS (10%) ca persoana fizica. Pragurile: sub 6 salarii minime anuale (sub 24,300 lei) — nu platesti CASS. Intre 6x si 12x (24,300 - 48,600 lei) — CASS la baza de 6 salarii (2,430 lei). Intre 12x si 24x (48,600 - 97,200 lei) — CASS la 12 salarii (4,860 lei). Peste 24x (peste 97,200 lei) — CASS la 24 salarii (9,720 lei).",
      },
      {
        heading: "Decizia asociatului unic",
        body: "Inainte de a distribui dividende, trebuie sa emiti o \"Decizie a asociatului unic\" (daca esti singurul proprietar) sau un proces-verbal al AGA. Documentul trebuie sa mentioneze: profitul net disponibil, suma distribuita, si data platii. Fara acest document, distribuirea nu este legala.",
      },
      {
        heading: "Cand poti distribui dividende?",
        body: "Dividendele se pot distribui dupa aprobarea situatiilor financiare anuale (de regula dupa depunerea bilantului). Poti distribui si dividende interimare (trimestrial), dar exista riscul ca la final de an profitul real sa fie mai mic decat dividendele deja distribuite, caz in care trebuie sa returnezi diferenta.",
      },
    ],
  },

  // ── ALTE CONCEPTE ────────────────────────────────────────
  {
    slug: "caen",
    title: "CAEN (Clasificarea Activitatilor din Economia Nationala)",
    shortDescription:
      "Codul care descrie activitatea ta — conteaza pentru norma de venit, TVA si declaratii.",
    category: "regimuri",
    content: [
      {
        heading: "Ce este codul CAEN?",
        body: "CAEN este un cod numeric de 4 cifre care clasifica activitatea economica pe care o desfasori. De exemplu: 6201 = activitati de realizare a software-ului la comanda, 7022 = activitati de consultanta pentru afaceri. Fiecare PFA sau SRL are unul sau mai multe coduri CAEN declarate.",
      },
      {
        heading: "De ce conteaza codul CAEN?",
        body: "Codul CAEN determina: daca poti folosi norma de venit (nu toate codurile au norma), cat este norma de venit in judetul tau, daca ai restrictii pentru regimul micro (SRL), si ce obligatii specifice ai (de exemplu, anumite coduri necesita autorizatii speciale).",
      },
      {
        heading: "Unde gasesti codul tau CAEN?",
        body: "Codul CAEN este trecut in: certificatul de inregistrare la Registrul Comertului, autorizatia de functionare a PFA, sau il poti cauta in Clasificarea CAEN Rev. 2 pe site-ul INS (Institutul National de Statistica) sau pe caen.ro.",
      },
      {
        heading: "Poti schimba codul CAEN?",
        body: "Da, poti adauga sau modifica coduri CAEN prin depunerea unei cereri la Registrul Comertului (pentru SRL) sau la ANAF (pentru PFA). Daca iti schimbi activitatea principala, trebuie sa actualizezi si codul CAEN principal. Modificarea poate afecta norma de venit si alte obligatii fiscale.",
      },
    ],
  },
  {
    slug: "spv",
    title: "SPV (Spatiul Privat Virtual)",
    shortDescription:
      "Portalul online al ANAF — aici depui declaratii, vezi datorii si comunici cu Fiscul.",
    category: "declaratii",
    content: [
      {
        heading: "Ce este SPV?",
        body: "SPV (Spatiul Privat Virtual) este portalul online al ANAF prin care contribuabilii pot depune declaratii, verifica datorii, primi notificari si comunica cu administratia fiscala. Gandeste-te la el ca la un \"internet banking\" pentru taxe.",
      },
      {
        heading: "Cum obtii acces?",
        body: "Te inregistrezi online pe site-ul ANAF (www.anaf.ro > SPV). Ai nevoie de: CNP, o adresa de email valida, si o copie a cartii de identitate. Dupa inregistrare, primesti credentialele de acces pe email. Alternativ, poti accesa SPV cu semnatura electronica calificata.",
      },
      {
        heading: "Ce poti face in SPV?",
        body: "In SPV poti: depune Declaratia Unica (D212) si alte formulare fiscale, vedea situatia obligatiilor de plata (datorii si supraplati), descarca certificate de atestare fiscala, primi notificari de la ANAF, depune cereri si petitii electronice, si vizualiza istoricul declaratiilor depuse.",
      },
      {
        heading: "SPV pentru SRL",
        body: "Si SRL-urile au acces la SPV, dar cu cont separat (pe CUI-ul firmei, nu pe CNP-ul personal). Administratorul firmei se inregistreaza ca reprezentant si poate depune D100, D300 si alte declaratii ale firmei.",
      },
      {
        heading: "Sfaturi practice",
        body: "Salveaza-ti credentialele in siguranta. Activeaza notificarile pe email ca sa nu ratezi termene. Verifica periodic \"Situatia obligatiilor de plata\" sa te asiguri ca nu ai datorii necunoscute. Daca ai probleme tehnice, suna la Call Center ANAF: 031.403.91.60.",
      },
    ],
  },
];

/** Get all topics */
export function getAllTopics(): BibliotecaTopic[] {
  return TOPICS;
}

/** Get a single topic by slug */
export function getTopicBySlug(slug: string): BibliotecaTopic | undefined {
  return TOPICS.find((t) => t.slug === slug);
}

/** Get topics filtered by category */
export function getTopicsByCategory(category: string): BibliotecaTopic[] {
  return TOPICS.filter((t) => t.category === category);
}
