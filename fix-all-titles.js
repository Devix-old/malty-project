const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content', 'recipes');

// SEO-optimized title adjustments
function optimizeTitle(title, targetMin = 50, targetMax = 60) {
  const currentLength = title.length;
  
  if (currentLength >= targetMin && currentLength <= targetMax) {
    return title; // Already in range
  }
  
  if (currentLength < targetMin) {
    // Too short - add SEO-friendly words
    let optimized = title;
    
    // Add "recept" if not present
    if (!optimized.toLowerCase().includes('recept')) {
      optimized = optimized + ' recept';
    }
    
    // Still too short? Add more context
    if (optimized.length < targetMin - 5) {
      if (!optimized.includes('klassisk') && !optimized.includes('enkel') && !optimized.includes('perfekt')) {
        optimized = optimized + ' – Klassisk favorit';
      }
    }
    
    // Final check - if still short, add more descriptive text
    if (optimized.length < targetMin) {
      const needed = targetMin - optimized.length;
      if (needed <= 10) {
        optimized = optimized + ' för familjen';
      } else {
        optimized = optimized + ' – Perfekt för hela familjen';
      }
    }
    
    return optimized;
  } else {
    // Too long - shorten intelligently
    let optimized = title;
    
    // Remove redundant words/phrases
    optimized = optimized.replace(/\s+–\s+/g, ' – ');
    optimized = optimized.replace(/\s+och\s+/g, ' & ');
    optimized = optimized.replace(/\s+med\s+/g, ' m. ');
    
    // Shorten common phrases
    optimized = optimized.replace(/Klassisk svensk favorit/g, 'Svensk klassiker');
    optimized = optimized.replace(/perfekt för hela familjen/g, 'familjefavorit');
    optimized = optimized.replace(/hela familjen/g, 'familjen');
    optimized = optimized.replace(/vardagsmat/g, 'vardag');
    optimized = optimized.replace(/vardagsfavorit/g, 'vardag');
    optimized = optimized.replace(/smakexplosion/g, 'smak');
    optimized = optimized.replace(/oemotståndlig/g, 'god');
    optimized = optimized.replace(/krispig/g, 'knäckig');
    
    // Remove extra descriptive words if still too long
    if (optimized.length > targetMax) {
      // Try to find a good break point
      const words = optimized.split(' ');
      let shortened = '';
      
      for (const word of words) {
        const test = shortened ? shortened + ' ' + word : word;
        if (test.length <= targetMax) {
          shortened = test;
        } else {
          break;
        }
      }
      
      if (shortened.length >= targetMin) {
        optimized = shortened;
      } else {
        // Last resort: truncate at word boundary near target
        const truncateAt = optimized.substring(0, targetMax).lastIndexOf(' ');
        if (truncateAt > targetMin - 10) {
          optimized = optimized.substring(0, truncateAt);
        } else {
          optimized = optimized.substring(0, targetMax);
        }
      }
    }
    
    return optimized;
  }
}

// Files and their target titles (manually optimized)
const titleFixes = {
  'appelpaj-med-kanel.mdx': 'Äppelpaj med kanel recept – Klassisk svensk favorit med krydda',
  'appelpaj-med-kardemumma.mdx': 'Äppelpaj med kardemumma recept – Kryddig variant med täcke',
  'appelpaj-utan-socker-nyttig.mdx': 'Äppelpaj utan socker recept – Krispig och nyttig variant',
  'basta-kladdkaka-recept-chokladkaka.mdx': 'Bästa kladdkaka recept – Rinnig chokladkaka med lyxig smak',
  'basta-kladdkaka-recept.mdx': 'Bästa kladdkaka recept – Perfekt kladdig chokladkaka för fika',
  'basta-kladdkakan.mdx': 'Bästa kladdkakan recept – Perfekt kladdig chokladkaka för fika',
  'belgiska-vafflor-recept.mdx': 'Belgiska våfflor recept – Krispig frukostlyx med bär och sirap',
  'chokladbollar-med-bryggkaffe.mdx': 'Chokladbollar med bryggkaffe recept – Klassisk fika med kaffe',
  'chokladbollar-med-brynt-smor.mdx': 'Chokladbollar med brynt smör recept – Klassisk fika med twist',
  'chokladbollar-med-kaffe-recept.mdx': 'Chokladbollar med kaffe recept – Klassisk fika med vuxen twist',
  'chokladbollar-med-ragflingor.mdx': 'Chokladbollar med rågflingor recept – Rustikt och fiberrikt fika',
  'chokladbollar-utan-havregryn.mdx': 'Chokladbollar utan havregryn recept – Krämig lyx med chokladsmak',
  'chokladbollar-utan-socker-recept.mdx': 'Chokladbollar utan socker recept – Krämig fika med kokos och kärlek',
  'enkla-laxratter-recept.mdx': 'Recept med lax – Enkel ugnslax med krämig sås och dill',
  'fetaostfylld-lax-med-dill-och-citron.mdx': 'Recept lax – Fetaostfylld lax med dill och citron för lyxig vardag',
  'filips-basta-kladdkaka.mdx': 'Filips bästa kladdkaka recept – Familjens favorit chokladkaka',
  'frasiga-vafflor-recept.mdx': 'Belgiska våfflor recept – Frasiga, lyxiga och perfekta med glass',
  'gravad-lax-recept.mdx': 'Gravad lax recept – Klassisk smakrik tradition för fest och vardag',
  'italienska-kycklingkottbullar-i-graddig-sas.mdx': 'Italienska kycklingköttbullar recept – Krämig sås och smakrik',
  'kallrokt-lax-recept.mdx': 'Kallrökt lax recept – Klassisk smakrik tradition för fest och vardag',
  'kladdig-kladdkaka-klassisk.mdx': 'Kladdig kladdkaka recept – Klassisk chokladkaka för hela familjen',
  'kladdkaka-med-mork-choklad.mdx': 'Kladdkaka med mörk choklad recept – Rinnig och lyxig chokladkaka',
  'klassisk-lasagne.mdx': 'Klassisk lasagne recept – Enkel och krämig med ostsås för familjen',
  'klassiska-vafflor-recept.mdx': 'Klassiska våfflor recept – Frasiga, lyxiga och perfekta för hela familjen',
  'kryddig-fars-i-salladsblad-med-ris-och-chilimajo.mdx': 'Kryddig färs i salladsblad recept – Med ris och chilimajonnäs',
  'kyckling-recept.mdx': 'Kyckling recept – Klassisk ugnsrostad med citron och kryddor för familjen',
  'kycklingbullar-i-curryjordnotssas.mdx': 'Kycklingbullar i curryjordnötssås recept – Krämig och smakrik',
  'kycklingfarsbiffar-mediterranean-dream.mdx': 'Kycklingfärsbiffar recept – Medelhavsinspirerad med fetaost och oliver',
  'lax-pastasas-recept.mdx': 'Lax pastasås recept – Krämig och smakrik med dill och citron',
  'laxsallad-med-bulgur-avokado-och-korianderdressing.mdx': 'Laxsallad med bulgur recept – Med avokado och korianderdressing',
  'one-pot-med-kyckling-och-ris.mdx': 'One-pot med kyckling och ris recept – Enkel och smakrik vardagsrätt',
  'oppen-kycklinglasagne.mdx': 'Öppen kycklinglasagne recept – Krämig klassiker med ost och köttfärs',
  'pasta-carbonara-recept.mdx': 'Pasta carbonara recept – Klassisk italiensk rätt med ägg och bacon',
  'rawfood-bollar.mdx': 'Rawfood bollar recept – Nyttiga och smakrika utan bakning för hela familjen',
  'recept-appelpaj-smuldeg.mdx': 'Recept äppelpaj smuldeg – Klassisk svensk favorit med knäckigt täcke',
  'recept-gravad-lax.mdx': 'Recept gravad lax – Klassisk smakrik tradition för fest och vardag',
  'recept-kyckling.mdx': 'Recept med kyckling – Klassisk ugnsrostad med citron och kryddor',
  'recept-med-kyckling.mdx': 'Recept med kyckling – Snabb wok med grönsaker och smakrik sås',
  'salsicciapasta-recept.mdx': 'Salsicciapasta recept – Italiensk klassiker med korv och tomat för familjen',
  'scones-med-filmjolk.mdx': 'Scones med filmjölk recept – Saftiga, gyllene och lättbakade frukostfavoriter',
  'snabb-kladdkaka-recept.mdx': 'Snabb kladdkaka recept – Färdig på 20 minuter med choklad och smak',
  'sticky-rice-bowl-vietnam.mdx': 'Sticky rice bowl recept – Vietnamesisk klassiker med ris och grönsaker',
  'svenska-pannkakor-klassisk.mdx': 'Svenska pannkakor recept – Klassisk variant för hela familjen',
  'thailandsk-gryta-med-kycklingfars-och-citrongras.mdx': 'Thailändsk gryta med kycklingfärs recept – Fräsch, het och krämig',
  'vafflor-recept.mdx': 'Våfflor recept – Frasiga, lyxiga och perfekta för hela familjen med glass',
  'varmrokt-lax-recept.mdx': 'Varmrökt lax recept – Klassisk smakrik tradition för fest och vardag',
  'vinnaren-kladdkaka.mdx': 'Vinnaren kladdkaka recept – Perfekt kladdig chokladkaka för hela familjen',
  'wallenbergare-pa-kycklingfars.mdx': 'Wallenbergare på kycklingfärs recept – Klassisk svensk favorit med sås'
};

function fixTitle(filePath, newTitle) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Update title
    data.title = newTitle;
    
    // Reconstruct file
    const frontmatterString = Object.entries(data)
      .map(([key, value]) => {
        if (value === null || value === undefined) return null;
        if (Array.isArray(value)) {
          return `${key}:\n${value.map(item => 
            typeof item === 'object' ? `  - ${JSON.stringify(item)}` : `  - "${String(item).replace(/"/g, '\\"')}"`
          ).join('\n')}`;
        }
        if (typeof value === 'object' && value !== null) {
          if (Object.keys(value).length === 0) return `${key}: {}`;
          return `${key}:\n${Object.entries(value).map(([k, v]) => 
            typeof v === 'string' ? `  ${k}: "${String(v).replace(/"/g, '\\"')}"` :
            typeof v === 'number' || typeof v === 'boolean' ? `  ${k}: ${v}` :
            `  ${k}: "${JSON.stringify(v).replace(/"/g, '\\"')}"`
          ).join('\n')}`;
        }
        if (typeof value === 'boolean') return `${key}: ${value}`;
        if (typeof value === 'number') return `${key}: ${value}`;
        const str = String(value);
        if (/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?)?$/.test(str)) {
          return `${key}: "${str}"`;
        }
        if (str.includes('\n')) {
          return `${key}: |\n${str.split('\n').map(l => '  ' + l).join('\n')}`;
        }
        return `${key}: "${str.replace(/"/g, '\\"')}"`;
      })
      .filter(Boolean)
      .join('\n');
    
    const newContent = `---\n${frontmatterString}\n---\n\n${content || ''}`;
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error fixing ${filePath}:`, error.message);
    return false;
  }
}

// Process all files
const files = Object.keys(titleFixes);
let fixed = 0;
let failed = 0;

console.log(`Fixing ${files.length} file titles...\n`);

for (const filename of files) {
  const filePath = path.join(contentDirectory, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`✗ ${filename} - File not found`);
    failed++;
    continue;
  }
  
  const newTitle = titleFixes[filename];
  const length = newTitle.length;
  
  if (length < 50 || length > 60) {
    console.log(`⚠ ${filename} - Title length ${length} (should be 50-60)`);
  }
  
  if (fixTitle(filePath, newTitle)) {
    console.log(`✓ ${filename} - ${length} chars: "${newTitle}"`);
    fixed++;
  } else {
    console.log(`✗ ${filename} - Failed to update`);
    failed++;
  }
}

console.log(`\n=== Summary ===`);
console.log(`Fixed: ${fixed}`);
console.log(`Failed: ${failed}`);

