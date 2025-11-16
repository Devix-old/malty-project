const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content', 'recipes');

function hasDuplicateKeys(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    matter(fileContents);
    return false; // No error, no duplicates
  } catch (error) {
    return error.reason && error.reason.includes('duplicated mapping key');
  }
}

function fixFile(filePath) {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Find frontmatter boundaries
  const startMatch = fileContents.match(/^---\n/);
  if (!startMatch) return false;
  
  // Find the end of frontmatter (first --- after start)
  let endIndex = fileContents.indexOf('\n---', 4);
  if (endIndex === -1) return false;
  
  const frontmatterText = fileContents.substring(4, endIndex);
  const content = fileContents.substring(endIndex + 5);
  
  // Split into lines and track keys
  const lines = frontmatterText.split('\n');
  const cleanedLines = [];
  const seenKeys = new Set();
  let inMultiLineBlock = false;
  let currentKey = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if this is a top-level key (starts at beginning, has colon)
    const keyMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
    
    if (keyMatch && !line.match(/^\s/)) {
      const key = keyMatch[1];
      const value = keyMatch[2].trim();
      
      if (seenKeys.has(key)) {
        console.log(`  Removing duplicate: ${key}`);
        // Skip this duplicate key
        inMultiLineBlock = (value === '' || value === '|');
        currentKey = key;
        continue;
      }
      
      seenKeys.add(key);
      currentKey = key;
      cleanedLines.push(line);
      inMultiLineBlock = (value === '' || value === '|');
    } else if (inMultiLineBlock && currentKey && seenKeys.has(currentKey)) {
      // Continuation of a valid multiline value
      cleanedLines.push(line);
    } else if (line.match(/^\s/)) {
      // Indented line - part of previous key's value
      if (currentKey && seenKeys.has(currentKey)) {
        cleanedLines.push(line);
      }
      // Otherwise skip (it's part of a duplicate key we're removing)
    } else if (!trimmed) {
      // Empty line
      cleanedLines.push(line);
    } else {
      // Other content - keep it
      cleanedLines.push(line);
    }
  }
  
  const cleanedFrontmatter = cleanedLines.join('\n');
  const newContent = `---\n${cleanedFrontmatter}\n---${content}`;
  
  // Verify it works
  try {
    matter(newContent);
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  } catch (e) {
    console.error(`  Failed to fix: ${e.message}`);
    return false;
  }
}

// Find all files with duplicates
const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.mdx'));
const filesWithDuplicates = [];

console.log('Scanning for files with duplicate keys...\n');

for (const file of files) {
  const filePath = path.join(contentDirectory, file);
  if (hasDuplicateKeys(filePath)) {
    filesWithDuplicates.push(filePath);
  }
}

if (filesWithDuplicates.length === 0) {
  console.log('No files with duplicate keys found!');
  process.exit(0);
}

console.log(`Found ${filesWithDuplicates.length} file(s) with duplicate keys:\n`);

let fixed = 0;
for (const filePath of filesWithDuplicates) {
  console.log(`Fixing: ${path.basename(filePath)}`);
  if (fixFile(filePath)) {
    fixed++;
    console.log(`  ✓ Fixed\n`);
  } else {
    console.log(`  ✗ Failed\n`);
  }
}

console.log(`\nFixed ${fixed} out of ${filesWithDuplicates.length} file(s).`);

