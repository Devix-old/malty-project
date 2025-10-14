# Redaktörsguide - Malty

En komplett guide för redaktörer och innehållsskapare på Malty. Lär dig hur du skapar, redigerar och publicerar recept och artiklar.

## 📋 Innehållsförteckning

1. [Komma igång](#komma-igång)
2. [Skriva recept](#skriva-recept)
3. [Skriva bloggartiklar](#skriva-bloggartiklar)
4. [Bildhantering](#bildhantering)
5. [SEO-riktlinjer](#seo-riktlinjer)
6. [Stilguide](#stilguide)
7. [Vanliga frågor](#vanliga-frågor)

## Komma igång

### Arbetsflöde

1. **Planera** - Bestäm vad du ska skriva
2. **Fotografera** - Ta eller välj bilder
3. **Testa** - Laga rätten/testa receptet
4. **Skriv** - Skapa innehållet
5. **Granska** - Kontrollera kvalitet
6. **Publicera** - Lägg till i content-mappen

### Filstruktur

```
content/
├── recipes/        # Recept (MDX-filer)
├── articles/       # Bloggartiklar (MDX-filer)
└── authors/        # Författarprofiler (JSON-filer)
```

## Skriva recept

### Receptmall

Använd alltid denna mall när du skapar ett nytt recept:

```markdown
---
id: "unik-siffra"
title: "Exakt receptnamn (inklusive specialitet i parentes)"
slug: "url-vanligt-namn"
excerpt: "Kort, lockande beskrivning på max 160 tecken för SEO"
author: "Ditt fullständiga namn"
authorSlug: "ditt-slug"
publishedAt: "YYYY-MM-DD"
updatedAt: "YYYY-MM-DD"
category: "Vardagsmat"
tags: ["Tag1", "Tag2", "Tag3"]
difficulty: "Lätt|Medel|Avancerad"
prepTimeMinutes: 15
cookTimeMinutes: 30
totalTimeMinutes: 45
servings: 4
caloriesPerServing: 450
ingredients:
  - section: ""
    title: ""
    items:
      - "mängd + enhet + ingrediens"
steps:
  - order: 1
    title: "Kort rubrik"
    description: "Detaljerad beskrivning"
    timeMinutes: 5
    tip: "Extra tips (valfritt)"
equipment: ["Redskap1", "Redskap2"]
allergens: ["Mjölk", "Gluten"]
substitutions: ["Ersättning 1", "Ersättning 2"]
storage: "Förvaringsanvisningar"
notes: "Extra anteckningar"
nutrition:
  - name: "Protein"
    value: 25
    unit: "g"
ratingAverage: 4.5
ratingCount: 100
heroImage:
  src: "/images/recipes/filnamn.jpg"
  alt: "Beskrivande alt-text på svenska"
---

## Inledning

Skriv en lockande inledning som förklarar varför detta recept är fantastiskt.

## Varför du kommer älska detta recept

Lista 2-3 anledningar.

## Tips för bästa resultat

Lista viktiga tips.

## Variationer

Förslag på hur man kan variera receptet.
```

### Skriva ingredienser

**Bra exempel:**
- ✅ "2 dl vetemjöl"
- ✅ "500 g kycklingfilé, tärnad"
- ✅ "1 gul lök, hackad"
- ✅ "Salt och peppar efter smak"

**Undvik:**
- ❌ "Mjöl (cirka 2 dl)" - var specifik!
- ❌ "En burk tomater" - ange storlek (400 g)
- ❌ "Lite salt" - säg "½ tsk" eller "efter smak"

**Gruppregler:**
- Använd sektioner för tydlighet (t.ex. "Deg", "Fyllning", "Glasyr")
- Lista ingredienser i den ordning de används
- Var specifik med förberedelser ("hackad", "riven", "tärnad")

### Skriva steg

**Bra exempel:**

```markdown
- order: 1
  title: "Förbered ingredienser"
  description: "Hacka löken fint och pressa vitlöken. Skär kycklingen i bitar på cirka 3 cm. Ställ fram alla ingredienser så du har dem redo."
  timeMinutes: 5
```

**Riktlinjer:**
- Ett steg = en handling eller relaterade handlingar
- Börja med ett verb ("Hacka", "Stek", "Blanda")
- Var specifik med värme och tid
- Använd "tip" för extra råd
- Inkludera tidsangivelse för varje steg

**Undvik:**
- För långa steg (max 2-3 meningar)
- Antaganden om kunskap
- Vaga instruktioner ("tills det är klart")

### Kategorier

Välj EN kategori som bäst beskriver receptet:

- **Vardagsmat** - Snabba vardagsmiddagar
- **Festmat** - För speciella tillfällen
- **Vegetariskt** - Helt vegetariska rätter
- **Bakning** - Bröd, kakor, bullar
- **Desserter** - Söta efterrätter
- **Soppor & Grytor** - Varma rätter i gryta
- **Sallader** - Huvudrätt-sallader
- **Fisk & Skaldjur** - Fiskrecepter
- **Grillmat** - För grill/BBQ

### Taggar

Lägg till 3-8 relevanta taggar:

**Tillagningsmetod:**
- Ugnsbakat, Stekt, Kokt, Grillat, Wok

**Råvara:**
- Kyckling, Lax, Köttfärs, Bönor, Pasta

**Tid:**
- Snabb middag (< 30 min), Vardagmat

**Diet:**
- Vegetariskt, Veganskt, Glutenfritt, Laktosfritt

**Stil:**
- Italienskt, Asiatiskt, Svenskt, Mexikanskt

**Tillfälle:**
- Festmat, Comfort food, Sommarmat

### Svårighetsgrad

- **Lätt** - Få steg, enkla tekniker, svår att misslyckas
- **Medel** - Lite mer komplicerat, någon teknik krävs
- **Avancerad** - Kräver erfarenhet och precision

### Tidsangivelser

**Var realistisk:**
- **prepTimeMinutes** - Hacka, skala, mäta upp
- **cookTimeMinutes** - Faktisk tillagn ingstid vid spisen/ugnen
- **totalTimeMinutes** - Totalt från start till färdigt (inkl. jäsning/marinering)

## Skriva bloggartiklar

### Artikeltyper

**Tekniker** - Hur man gör något
- Exempel: "Grundläggande knivtekniker"
- Fokus: Steg-för-steg instruktioner

**Guider** - Omfattande information
- Exempel: "Kompletta guiden till pasta"
- Fokus: Djupgående kunskap

**Råvaror** - Om specifika ingredienser
- Exempel: "10 kryddor varje kök bör ha"
- Fokus: Kunskap och tips

**Tips** - Snabba, praktiska råd
- Exempel: "15 genvägar i köket"
- Fokus: Actionable tips

### Artikelstruktur

```markdown
# Huvudrubrik (H1)

Inledning som förklarar vad artikeln handlar om och varför läsaren ska bry sig.

## Första avsnittet (H2)

Brödtext med konkret information.

### Underavsnitt (H3)

Mer detaljer.

## Nästa avsnitt

Fortsätt strukturerat.

## Sammanfattning

Kort summering av viktigaste punkterna.
```

### Skrivtips

**Gör:**
- ✅ Skriv kort och koncist
- ✅ Använd aktiva verb
- ✅ Dela upp långa stycken
- ✅ Använd listor för läsbarhet
- ✅ Inkludera exempel
- ✅ Lägg till visuella element (bilder, tabeller)

**Undvik:**
- ❌ Långa meningar (max 20-25 ord)
- ❌ Jargong utan förklaring
- ❌ Passiva formuleringar
- ❌ Långa stycken (max 3-4 rader)

## Bildhantering

### Bildkrav

**Recept hjältebild:**
- Format: JPG eller WebP
- Storlek: Minst 1200x800px (16:10 ratio)
- Max filstorlek: 500KB
- Namn: beskrivande-slug-namn.jpg

**Bloggbilder:**
- Format: JPG eller WebP
- Storlek: Minst 1200x675px (16:9 ratio)
- Max filstorlek: 300KB

### Bildplacering

Lägg bilder i rätt mapp:
```
public/
├── images/
│   ├── recipes/     # Receptbilder
│   ├── blog/        # Bloggbilder
│   └── authors/     # Författarbilder
```

### Alt-text riktlinjer

**Bra exempel:**
- ✅ "Krämig svamprisotto i stor kastrull med färsk timjan som garnering"
- ✅ "Nybakade kanelbullar med pärlsocker på bakplåt"

**Dåliga exempel:**
- ❌ "Risotto" (för kort)
- ❌ "Bild på mat" (inte beskrivande)
- ❌ "IMG_1234" (använd aldrig filnamn)

**Riktlinjer:**
- Beskriv VAD som syns
- Var specifik men koncis (max 125 tecken)
- Skriv på svenska
- Inkludera relevanta detaljer
- Beskr iv inte "bild av" - börja direkt med beskrivningen

## SEO-riktlinjer

### Titel (Title)

**Format:** "Exakt receptnamn (specialitet)" 

**Exempel:**
- ✅ "Krämig svamprisotto (klar på 30 minuter)"
- ✅ "Klassiska kanelbullar (bästa grundreceptet)"
- ✅ "Svenska köttbullar med gräddsås"

**Riktlinjer:**
- 50-60 tecken totalt
- Inkludera sökord naturligt
- Var specifik och lockande
- Inkludera fördel i parentes

### Excerpt (Meta Description)

**Längd:** 140-160 tecken

**Bra exempel:**
```
"En klassisk italiensk risotto med blandsvamp, parmesan och färsk timjan. Perfekt som huvudrätt eller tillbehör."
```

**Riktlinjer:**
- Beskriv receptet/artikeln
- Inkludera nyckelsökord
- Var lockande men ärlig
- Avsluta inte mitt i mening

### Slug (URL)

**Format:** små bokstäver, bindestreck, inga specialtecken

**Bra exempel:**
- ✅ "kramig-svamprisotto"
- ✅ "klassiska-kanelbullar"
- ✅ "svenska-kottbullar"

**Dåliga exempel:**
- ❌ "Krämig_Svamprisotto"
- ❌ "risotto123"
- ❌ "recept-for-risotto-med-svamp"

### Sökord

**Primärt sökord:** Huvudingrediensen eller rättnamnet  
**Sekundära sökord:** Tillagningsmetod, kök, diet

**Exempel för "Vegetarisk chili":**
- Primärt: "vegetarisk chili"
- Sekundära: "vegansk chili", "chili med bönor", "mexikansk mat"

**Använd sökord:**
- I title
- I excerpt
- I första stycket
- I minst en rubrik
- I alt-text

## Stilguide

### Tone of voice

Malty är:
- **Varm** - Som en vän som delar ett recept
- **Hjälpsam** - Förklarar utan att vara nedlåtande
- **Modern** - Fräscht språk, inte stelt
- **Konkret** - Inga vaga instruktioner

**Exempel:**

Bra: "Låt köttet vila i 10 minuter - det gör det saftigare!"  
Dåligt: "Man bör eventuellt låta köttet vila en stund."

### Svenska språkregler

**Måttenheter:**
- Använd dl, msk, tsk (inte cups/tbsp)
- "2 dl" inte "2dl" (mellanslag)
- Skriv ut "matsked" i text, "msk" i ingrediens lista

**Temperatur:**
- Grader Celsius: "200°C"
- Skriv "°C" i receptsteg

**Tal:**
- Skriv ut 1-12: "fem ägg", "åtta skivor"
- Använd siffror från 13: "15 minuter", "200 g"
- I ingredienslista: alltid siffror

**Svenska specialtecken:**
- Å, Ä, Ö - använd alltid korrekt

### Formatering

**Rubriker:**
- H1: En per sida (receptnamn/artikeltitel)
- H2: Huvudavsnitt
- H3: Underavsnitt
- Använd inte H4-H6

**Listor:**
- Punktlistor för icke-ordnade saker
- Numrerade listor för steg/sekvenser
- Använd emojis sparsamt (☑️ ✅ ❌)

**Betoning:**
- **Fetstil** för viktig information
- *Kursiv* för betoning (använd sällan)
- Undvik VERSALER

## Vanliga frågor

### Hur lång ska ett recept vara?

**Ingredienslistan:** 5-20 ingredienser (optimalt 8-12)  
**Steg:** 4-10 steg (optimalt 5-7)  
**Introduktion:** 100-200 ord  
**Total text:** 300-600 ord

### Hur många taggar ska jag använda?

**Minimum:** 3 taggar  
**Optimalt:** 5-7 taggar  
**Maximum:** 10 taggar

### När ska jag uppdatera updatedAt?

Uppdatera `updatedAt` när du gör:
- Större ändringar i recept
- Ny information tillkommer
- Bilder byts ut
- Felrättningar

Uppdatera INTE för:
- Stavfel fixar
- Mindre omformuleringar

### Hur hanterar jag affiliatelänkar?

1. Markera tydligt: "Denna länk är en affiliate-länk"
2. Använd `rel="nofollow sponsored"`
3. Var ärlig om produkten

### Kan jag använda andra sources recept?

**NEJ** - Kopiera ALDRIG recept från andra.

**JA** - Du kan inspireras och skapa din egen version:
1. Laga rätten själv
2. Gör egna ändringar
3. Skriv med egna ord
4. Ta egna bilder

### Hur ofta ska vi publicera?

**Recept:** 2-3 per vecka  
**Artiklar:** 1-2 per vecka  
**Minimum:** Något varje vecka

### Vad gör jag om jag hittar ett fel?

1. Rätta felet direkt i MDX-filen
2. Uppdatera `updatedAt`
3. Commit med meddelande: "Fix: [vad du fixade]"

### Hur testar jag receptet lokalt?

```bash
# Starta dev server
npm run dev

# Öppna i browser
http://localhost:3000/recept/ditt-recept-slug
```

## Checklista före publicering

### Alla recept

- [ ] Titel är beskrivande och SEO-vänlig
- [ ] Excerpt är 140-160 tecken
- [ ] Slug är korrekt formaterad
- [ ] Kategori är vald
- [ ] Minst 5 taggar
- [ ] Svårighetsgrad är satt
- [ ] Tider är realistiska
- [ ] Alla ingredienser har mängd + enhet
- [ ] Ingredienser är i användningsordning
- [ ] Steg är tydliga och konkreta
- [ ] Varje steg har tidsangivelse
- [ ] Equipment-lista är komplett
- [ ] Allergener är listade
- [ ] Hjältebild finns och är optimerad
- [ ] Alt-text är beskrivande på svenska
- [ ] Ingen stavfel (kör genom spellcheck)
- [ ] Receptet är testat

### Alla artiklar

- [ ] Titel är lockande
- [ ] Excerpt fångar intresset
- [ ] Slug är korrekt
- [ ] Kategori är vald
- [ ] Taggar är relevanta
- [ ] Rubriker har logisk hierarki (H1 > H2 > H3)
- [ ] Stycken är korta (max 4 rader)
- [ ] Listor används för läsbarhet
- [ ] Bilder har alt-text
- [ ] Inga stavfel
- [ ] Läsbarhet är god (testa högt)
- [ ] Länkar fungerar
- [ ] Minst 500 ord (för SEO)

---

**Frågor?** Kontakta redaktionsledningen på redaktion@malty.se

**Lycka till med ditt skapande! 👨‍🍳📝**

