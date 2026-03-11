# Fiskio — Product Vision

## The Why

România are peste 700.000 de PFA-uri active și sute de mii de SRL-uri mici. Aproape toate plătesc lunar pentru un serviciu de care nu ar avea nevoie dacă ar înțelege cum funcționează sistemul fiscal. Nu plătesc pentru muncă grea — plătesc pentru că nu știu ce știe contabilul.

Sistemul actual e construit pe dependență. Contabilii nu au interes să te educe. ANAF nu are interes să fie înțeles. Nimeni nu a construit vreodată produsul care schimbă asta.

**Fiskio e primul.**

---

## The Vision Statement

> Fiskio este platforma care transformă oricine are un PFA sau SRL într-un om competent fiscal — fără contabil, fără jargon, fără surprize de la ANAF.

Nu suntem software de contabilitate. Nu suntem un contabil digital. Suntem educația fiscală activă pe care sistemul nu a oferit-o niciodată — personalizată pe entitatea ta, actualizată cu legislația în vigoare, acționabilă din prima zi.

---

## The Problem

Antreprenorii români trăiesc cu trei frici permanente:

**Frica de a greși** — "Dacă depun ceva greșit, vine ANAF cu amendă."

**Frica de a nu ști** — "Nu știu ce declarații am, când, și cât am de plătit."

**Frica de a rămâne fără bani** — "Nu știu cât pot scoate din firmă fără să mă trezesc că nu am cu ce plăti taxele."

Soluția curentă e să plătești pe cineva să poarte fricile astea în locul tău. Fiskio elimină frica la sursă — prin cunoaștere, nu prin delegare.

---

## Target Users

### Utilizatorul primar — PFA
Freelancer IT, consultant, designer, creator cu PFA activ. 1–20 tranzacții pe lună. Plătește 30–100 euro/lună pe contabilitate pentru o activitate pe care ar putea-o gestiona singur în 2–3 ore pe an dacă ar ști cum.

Regimuri acoperite în MVP:
- PFA normă de venit
- PFA sistem real
- PFA plătitor / neplătitor TVA

### Utilizatorul secundar — SRL microîntreprindere
Asociat unic, 0 angajați, activitate de servicii simplă. Nu poate planifica dividendele pentru că nu are vizibilitate asupra obligațiilor fiscale trimestriale viitoare. Plătește 70–100 euro/lună pe contabilitate.

Regimuri acoperite în MVP:
- SRL microîntreprindere 1% / 3%
- Fără angajați
- Neplătitor TVA (prima iterație)

### Ce au în comun
Vor să înțeleagă, nu să delege. Consideră că dependența de un contabil pentru o activitate simplă e un cost nejustificat. Sunt dispuși să investească timp să învețe o dată, în schimbul libertății permanente.

---

## What We Build

### Pentru PFA

| Feature | Descriere |
|---|---|
| Profil fiscal | Onboarding 5 min: tip entitate, regim, TVA, CAEN |
| Calendar fiscal personalizat | Termenele tale, nu ale tuturor. Cu 30 zile înainte. |
| Estimator taxe live | Pe măsură ce adaugi venituri, știi ce pui deoparte |
| Ghiduri interactive D212 | Fiecare câmp explicat, calcule automate, fișier gata de depus |
| Sincronizare e-Factura | Conectare OAuth2 cu SPV ANAF, facturi trase automat |
| Alerte legislative | OUG-uri relevante pentru profilul tău, traduse în impact concret |
| Biblioteca fiscală | Termeni explicați în română normală, nu din Codul Fiscal |

### Pentru SRL

| Feature | Descriere |
|---|---|
| Simulator dividende | Introduci suma, primești net în mână + toate taxele datorate + timeline plăți |
| Cash flow fiscal | Vizibilitate asupra tuturor obligațiilor trimestriale viitoare |
| Generator Decizie Asociat Unic | Document pre-completat, semnat de user, arhivat |
| Calendar trimestrial D100 | Impozit micro calculat pe CA curent, termen clar |
| Estimator CASS dividende | Calcul plafon 6 / 60 salarii minime, avertizare automată |

---

## What We Are NOT

- Nu suntem software de contabilitate (nu înlocuim Saga, CIEL, sau SmartBill)
- Nu suntem aplicație de facturare (SmartBill e obligatoriu oricum via e-Factura)
- Nu suntem contabil digital (nu avem oameni în spate, nu garantăm juridic)
- Nu suntem pentru entități complexe (TVA lunar, angajați multipli, import/export)

---

## The Core Differentiator

| | SOLO / StartCo / Keez | Fiskio |
|---|---|---|
| Model | Delegare — cineva face pentru tine | Educație — tu faci, știind cum |
| Userul înțelege ceva? | Nu (intenționat) | Da (ăsta e tot produsul) |
| Scalează fără oameni? | Nu | Da |
| Cost | 30–100 euro/lună | 25–40 lei/lună |
| Rezultat pe termen lung | Dependență permanentă | Independență permanentă |

---

## Business Model

### Tiers

**Gratuit — forever**
- Calendar fiscal personalizat
- Alerte termene
- Biblioteca fiscală
- 1 profil

**Anual — 299 lei/an** *(~25 lei/lună)*
- Ghiduri interactive completare declarații
- Calcule automate taxe
- Sincronizare e-Factura
- Alerte legislative personalizate
- Export fișiere gata de depus
- Simulator dividende (SRL)

**Pe viață — 799 lei**
- Tot ce e în Anual
- Toate actualizările viitoare
- Acces beta la funcții noi

### Validare
Landing page cu waitlist înainte de a construi. Target: 200 emailuri în 30 de zile organic. Sub 200 — pivotăm mesajul. Peste 200 — construim.

---

## ANAF API Integration

Fiskio se integrează cu infrastructura oficială ANAF, nu o ocolește.

### Ce folosim
- `logincert.anaf.ro` — autentificare OAuth2 cu certificat digital calificat
- `api.anaf.ro` — upload/download e-Factura, listare mesaje SPV
- `webserviced.anaf.ro/SPVWS2` — citire vector fiscal, situație obligații, duplicate declarații

### Flow autentificare
1. Userul se autentifică o singură dată cu certificatul digital calificat
2. Fiskio obține token OAuth2 și îl stochează securizat
3. De acolo, sincronizarea e automată

### Ce NU facem prin API (limitare ANAF actuală)
Depunerea declarațiilor noi nu e disponibilă programatic. Fiskio pre-completează tot și ghidează userul până la ultimul click în SPV. Submitul îl face userul — el rămâne în control, noi eliminăm toate celelalte 95% din efort.

---

## MVP Scope

### Faza 1 — PFA only (luna 1-3)
- [ ] Onboarding profil fiscal PFA
- [ ] Calendar fiscal personalizat
- [ ] Estimator taxe anuale live
- [ ] Ghid interactiv D212 cu calcule
- [ ] Export fișier + instrucțiuni depunere SPV
- [ ] Alerte email termene

### Faza 2 — Integrare ANAF (luna 3-5)
- [ ] OAuth2 cu SPV ANAF
- [ ] Sincronizare automată e-Factura
- [ ] Citire vector fiscal din SPV
- [ ] Alerte legislative automate

### Faza 3 — SRL (luna 5-8)
- [ ] Onboarding profil SRL micro
- [ ] Simulator dividende complet
- [ ] Calendar trimestrial D100
- [ ] Generator Decizie Asociat Unic
- [ ] Cash flow fiscal vizual

---

## Tech Considerations

- **Frontend:** React / Next.js — SEO important pentru "fara contabil pfa", "declaratie unica pfa"
- **Backend:** Node.js sau similar — apeluri API ANAF, stocare tokenuri OAuth2
- **Auth:** Supabase sau similar — profil fiscal per user, date securizate
- **ANAF OAuth2:** certificate digital calificat per user, token refresh logic
- **Notificări:** email-first în MVP, push notifications în v2

---

## Success Metrics — MVP

| Metric | Target 6 luni |
|---|---|
| Utilizatori înregistrați | 500+ |
| Abonați plătitori | 100+ |
| ARR | ~30.000 lei |
| Churn anual | <20% |
| NPS | >50 |

---

## The One Thing

> Fiskio nu vinde contabilitate mai ieftină. Vinde **ultima dată când ai nevoie de un contabil.**